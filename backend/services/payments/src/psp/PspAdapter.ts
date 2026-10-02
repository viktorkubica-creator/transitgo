export type PaymentIntent = {
  id: string;
  clientSecret: string;
  amount: number;
  currency: 'EUR';
  status: 'requires_action' | 'processing' | 'succeeded';
};

export interface PspAdapter {
  // Creates a payment intent (FR-022) and prepares for wallet flows (FR-023) and tokenisation (FR-024)
  createPaymentIntent(amount: number, currency: 'EUR'): Promise<PaymentIntent>;
}
