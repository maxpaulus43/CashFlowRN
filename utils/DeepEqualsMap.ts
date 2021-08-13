export default class DeepEqualsMap<K, V> {
  inner: Map<string, V> = new Map();

  public get size(): number {
    return this.inner.size;
  }

  keys(): K[] {
    return Array.from(this.inner.keys(), (keyString) => JSON.parse(keyString));
  }

  entries(): [key: K, value: V][] {
    return Array.from(this.inner.entries(), ([keyString, value]) => {
      return [JSON.parse(keyString), value];
    });
  }

  values(): V[] {
    return Array.from(this.inner.values());
  }

  clear(): void {
    this.inner.clear();
  }

  delete(key: K): boolean {
    return this.inner.delete(JSON.stringify(key));
  }

  get(key: K): V | undefined {
    return this.inner.get(JSON.stringify(key));
  }

  has(key: K): boolean {
    return this.inner.has(JSON.stringify(key));
  }

  set(key: K, value: V): this {
    this.inner.set(JSON.stringify(key), value);
    return this;
  }
}
