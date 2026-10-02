export type Alert = { id: string; line: string; title: string; description: string; startsAt: string; endsAt?: string };
const alerts: Alert[] = [
  { id: 'a1', line: '1', title: 'Track maintenance', description: 'Minor delays expected', startsAt: new Date().toISOString() }
];

export const alertsRepo = {
  list(): Alert[] {
    return alerts.slice().reverse();
  },
  add(a: Omit<Alert, 'id'>) {
    const id = String(alerts.length + 1);
    const rec: Alert = { id, ...a };
    alerts.push(rec);
    return rec;
  }
};
