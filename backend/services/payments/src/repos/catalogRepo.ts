export type Product = { id: string; name: string; priceCents: number; durationHours?: number };
export type Order = { id: string; productId: string; amount: number; currency: 'EUR'; createdAt: string; status: 'paid' | 'refunded' };
export type Refund = { id: string; orderId: string; amount: number; createdAt: string };

const products: Product[] = [
  { id: 'prod_single', name: 'Single ticket', priceCents: 150 },
  { id: 'prod_24h', name: '24h ticket', priceCents: 450, durationHours: 24 }
];
const orders: Order[] = [];
const refunds: Refund[] = [];

export const catalogRepo = {
  list(): Product[] {
    return products.slice();
  }
};

export const ordersRepo = {
  create(productId: string, amount: number, currency: 'EUR'): Order {
    const o: Order = { id: `ord_${orders.length + 1}`, productId, amount, currency, createdAt: new Date().toISOString(), status: 'paid' };
    orders.push(o);
    return o;
  },
  list(): Order[] {
    return orders.slice().reverse();
  }
};

export const refundsRepo = {
  create(orderId: string, amount: number): Refund {
    const r: Refund = { id: `rf_${refunds.length + 1}`, orderId, amount, createdAt: new Date().toISOString() };
    refunds.push(r);
    const o = orders.find((x) => x.id === orderId);
    if (o) o.status = 'refunded';
    return r;
  },
  list(): Refund[] {
    return refunds.slice().reverse();
  }
};
