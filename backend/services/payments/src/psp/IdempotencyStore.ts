export class IdempotencyStore<T> {
  private store = new Map<string, { value: T; createdAt: number }>();
  constructor(private readonly ttlMs = 10 * 60 * 1000, private nowFn = () => Date.now()) {}

  get(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (this.nowFn() - entry.createdAt > this.ttlMs) {
      this.store.delete(key);
      return undefined;
    }
    return entry.value;
  }

  set(key: string, value: T) {
    this.store.set(key, { value, createdAt: this.nowFn() });
  }
}
