/**
 * Creates a rune that perists to local storage.
 *
 * https://www.youtube.com/watch?v=HnNgkwHZIII
 */
export declare class LocalStore<T> {
    _rune: T;
    _key: string;
    constructor(key: string, value: T);
    get value(): T;
    set value(newVal: T);
    persist(): void;
    serialize(value: T): string;
    deserialize(item: string): T;
}
export declare function localStore<T>(key: string, value: T): LocalStore<T>;
//# sourceMappingURL=localStore.svelte.d.ts.map