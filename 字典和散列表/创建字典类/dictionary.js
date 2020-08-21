function defaultToString(item) {
    if (item === null) {
        return 'NULL';
    } else if (item === undefined) {
        return 'UNDEFINED';
    } else if (typeof item === 'string' || item instanceof String) {
        return `${item}`;
    }
    return item.toString();
}

class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    toString() {
        return `[#${this.key}: ${this.value}]`;
    }
}

class Dictionary {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }

    // 向字典中添加新元素。如果 key 已经存在，那么已存在的 value 会被新的值覆盖。
    set(key, value) {
        if (key != null && value != null) {
            const tableKey = this.toStrFn(key); // {1} 
            this.table[tableKey] = new ValuePair(key, value); // {2} 
            return true;
        }
        return false;
    }
    //  从字典中移除一个值
    remove(key) {
        if (this.hasKey(key)) {
            delete this.table[this.toStrFn(key)];
            return true;
        }
        return false;
    }
    // 如果某个键值存在于该字典中，返回 true，否则返回 false。
    hasKey(key) {
        return this.table[this.toStrFn(key)] != null;
    }
    //  从字典中检索一个值
    get(key) {
        const valuePair = this.table[this.toStrFn(key)];
        return valuePair == null ? undefined : valuePair.value;
    }
    // 删除该字典中的所有值。
    clear() {
        this.table = {};
    }
    // 返回字典所包含值的数量。
    size() {
        return Object.keys(this.table).length;
    }
    // 检验字典是否为空
    isEmpty() {
        return this.size() === 0;
    }
    // 将字典所包含的所有键名以数组形式返回。
    keys() {
        return this.keyValues().map(valuePair => valuePair.key);
    }
    // 将字典所包含的所有数值以数组形式返回。
    values() {
        return this.keyValues().map(valuePair => valuePair.value);
    }
    // 将字典中所有[键，值]对返回。
    keyValues() {
        return Object.values(this.table);
    }
    // 迭代字典中所有的键值对。callbackFn 有两个参数：key 和value。
    // 该方法可以在回调函数返回 false 时被中止（和 Array 类中的 every 方法相似）。
    forEach(callbackFn) {
        const valuePairs = this.keyValues();
        for (let i = 0; i < valuePairs.length; i++) {
            const result = callbackFn(valuePairs[i].key, valuePairs[i].value); 
            if (result === false) {
                break; 
            }
        }
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const valuePairs = this.keyValues();
        let objString = `${valuePairs[0].toString()}`; 
        for (let i = 1; i < valuePairs.length; i++) {
            objString = `${objString},${valuePairs[i].toString()}`;
        }
        return objString; 
    }
}