import crypto from 'crypto';
import { PspAdapter, PaymentIntent } from '../psp/PspAdapter';
import { IdempotencyStore } from '../psp/IdempotencyStore';

export type IntentState = PaymentIntent & { idempotencyKey?: string };

export class IntentService {
  private intents = new Map<string, IntentState>();
  private byKey = new IdempotencyStore<IntentState>(30 * 60 * 1000);
  constructor(private readonly psp: PspAdapter, private readonly webhookSecret = 'training-webhook-secret') {}

  async create(amount: number, currency: 'EUR', idempotencyKey?: string): Promise<IntentState> {
    if (idempotencyKey) {
      const existing = this.byKey.get(idempotencyKey);
      if (existing) return existing;
    }
    const intent = await this.psp.createPaymentIntent(amount, currency);
    const state: IntentState = { ...intent, idempotencyKey };
    this.intents.set(state.id, state);
    if (idempotencyKey) this.byKey.set(idempotencyKey, state);
    return state;
  }

  transitionToSucceeded(id: string) {
    const i = this.intents.get(id);
    if (!i) throw new Error('not_found');
    i.status = 'succeeded';
  }

  verifyWebhook(signature: string | undefined, body: string) {
    if (!signature) return false;
    const hmac = crypto.createHmac('sha256', this.webhookSecret).update(body).digest('hex');
    return signature === `sha256=${hmac}`;
  }

  all() {
    return Array.from(this.intents.values());
  }
}
