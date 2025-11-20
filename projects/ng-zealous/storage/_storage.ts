export abstract class _ZStorage {
  protected abstract storage: Storage | undefined;

  setItem<T>(key: string, value: T) {
    try {
      this.storage?.setItem(key, JSON.stringify(value));
    } catch {
      console.warn('ZStorage: unable to "setItem"', key, value);
    }
  }

  getItem<T>(key: string): T | null {
    try {
      const value = this.storage?.getItem(key) ?? null;
      return value ? (JSON.parse(value) as T) : null;
    } catch {
      console.warn('ZStorage: unable to "getItem" for key', key);
      return null;
    }
  }

  removeItem(key: string) {
    this.storage?.removeItem(key);
  }

  clear() {
    this.storage?.clear();
  }
}
