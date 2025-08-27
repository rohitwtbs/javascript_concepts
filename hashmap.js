// Simple HashMap implementation in JavaScript
class HashMap {
  constructor(size = 16) {
    this.buckets = Array(size).fill(null).map(() => []);
    this.size = size;
  }

  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) % this.size;
    }
    return hash;
  }

  set(key, value) {
    const idx = this._hash(key);
    for (let pair of this.buckets[idx]) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    this.buckets[idx].push([key, value]);
  }

  get(key) {
    const idx = this._hash(key);
    for (let pair of this.buckets[idx]) {
      if (pair[0] === key) {
        return pair[1];
      }
    }
    return undefined;
  }

  has(key) {
    const idx = this._hash(key);
    for (let pair of this.buckets[idx]) {
      if (pair[0] === key) {
        return true;
      }
    }
    return false;
  }

  delete(key) {
    const idx = this._hash(key);
    for (let i = 0; i < this.buckets[idx].length; i++) {
      if (this.buckets[idx][i][0] === key) {
        this.buckets[idx].splice(i, 1);
        return true;
      }
    }
    return false;
  }
}

// Usage example:
const map = new HashMap();
map.set('foo', 42);
map.set('bar', 99);
console.log(map.get('foo')); // 42
console.log(map.has('bar')); // true
map.delete('foo');
console.log(map.get('foo')); // undefined