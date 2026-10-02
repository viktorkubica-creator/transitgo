import crypto from 'crypto';

export type Ticket = { id: string; productId: string; userId: string; active: boolean; createdAt: string };
const tickets: Ticket[] = [];
const secret = 'training-ticket-secret';

export const ticketRepo = {
  create(productId: string, userId: string): Ticket {
    const t: Ticket = { id: `t_${tickets.length + 1}`, productId, userId, active: false, createdAt: new Date().toISOString() };
    tickets.push(t);
    return t;
  },
  activate(id: string) {
    const t = tickets.find((x) => x.id === id);
    if (!t) throw new Error('not_found');
    t.active = true;
  },
  list(userId: string) {
    return tickets.filter((t) => t.userId === userId);
  },
  signQr(id: string) {
    // Signed rotating token (training mock)
    const nonce = Math.floor(Date.now() / 30000); // 30s
    const h = crypto.createHmac('sha256', secret).update(`${id}.${nonce}`).digest('hex');
    return `${id}.${nonce}.${h}`;
  },
  verifyQr(token: string) {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    const [id, nonceStr, sig] = parts;
    const h = crypto.createHmac('sha256', secret).update(`${id}.${nonceStr}`).digest('hex');
    return h === sig;
  }
};
