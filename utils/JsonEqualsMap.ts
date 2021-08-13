export default class JsonEqualsMap<K, V> {
  inner: { [key: string]: V } = {};

  public get size(): number {
    return Object.keys(this.inner).length;
  }

  keys(): K[] {
    return Array.from(Object.keys(this.inner), (keyString) =>
      JSON.parse(keyString)
    );
  }

  entries(): [key: K, value: V][] {
    return Array.from(Object.entries(this.inner), ([keyString, value]) => {
      return [JSON.parse(keyString), value];
    });
  }

  values(): V[] {
    return Array.from(Object.values(this.inner));
  }

  clear(): void {
    this.inner = {}
  }

  delete(key: K): boolean {
    return delete this.inner[JSON.stringify(key)];
  }

  get(key: K): V | undefined {
    return this.inner[JSON.stringify(key)];
  }

  has(key: K): boolean {
    return JSON.stringify(key) in this.inner;
  }

  set(key: K, value: V): this {
    this.inner[JSON.stringify(key)] = value;
    return this;
  }
}
