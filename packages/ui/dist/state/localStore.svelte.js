import { browser } from '$app/environment';
/**
 * Creates a rune that perists to local storage.
 *
 * https://www.youtube.com/watch?v=HnNgkwHZIII
 */
export class LocalStore {
    _rune = $state();
    _key = '';
    constructor(key, value) {
        this._key = key;
        this._rune = value;
        if (browser) {
            const item = localStorage.getItem(key);
            if (item)
                this._rune = this.deserialize(item);
        }
        /** Effect.root allows creation outside of a component. */
        $effect.root(() => {
            $effect(() => {
                this.persist();
            });
            return () => { };
        });
    }
    get value() {
        return this._rune;
    }
    set value(newVal) {
        this._rune = newVal;
    }
    persist() {
        localStorage.setItem(this._key, this.serialize(this._rune));
    }
    serialize(value) {
        return JSON.stringify(value);
    }
    deserialize(item) {
        return JSON.parse(item);
    }
}
export function localStore(key, value) {
    return new LocalStore(key, value);
}
