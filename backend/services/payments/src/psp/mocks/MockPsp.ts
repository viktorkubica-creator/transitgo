import { PspAdapter, PaymentIntent } from '../PspAdapter';
import { v4 as uuidv4 } from 'uuid';

// Mock PSP for training – avoids naming a real provider (RISK-004)
export class MockPsp implements PspAdapter {
  async createPaymentIntent(amount: number, currency: 'EUR'): Promise<PaymentIntent> {
    return {
      id: uuidv4(),
      clientSecret: uuidv4(),
      amount,
      currency,
      status: 'requires_action'
    };
  }
}
