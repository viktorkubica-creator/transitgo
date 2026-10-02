type CacheEntry<T> = { value: T; expiresAt: number };

export class InMemoryCache {
  private store = new Map<string, CacheEntry<any>>();
  constructor(private readonly nowFn = () => Date.now()) {}

  get<T>(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (this.nowFn() > entry.expiresAt) {
      this.store.delete(key);
      return undefined;
    }
    return entry.value as T;
  }

  set<T>(key: string, value: T, ttlMs: number) {
    this.store.set(key, { value, expiresAt: this.nowFn() + ttlMs });
  }
}
