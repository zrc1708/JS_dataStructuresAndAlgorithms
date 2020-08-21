// 到 HashTable 类，也叫 HashMap 类，它是 Dictionary 类的一种散列表实现方式。

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

class HashTable {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }

    // 创建散列函数
    loseloseHashCode(key) {
        if (typeof key === 'number') { // {1} 
            return key;
        }
        const tableKey = this.toStrFn(key); // {2} 
        let hash = 0; // {3} 
        for (let i = 0; i < tableKey.length; i++) {
            hash += tableKey.charCodeAt(i); // {4} 
        }
        return hash % 37; // {5} 
    }
    hashCode(key) {
        return this.loseloseHashCode(key);
    }
    // loseloseHashCode 方法中，我们首先检验 key 是否是一个数（行{1}）。
    // 如果是，我们直接将其返回。
    // 然后，给定一个 key 参数，我们就能根据组成 key 的每个字符的 ASCII 码值的和得到一个数。
    // 所以，首先需要将 key 转换为一个字符串（行{2}），防止 key 是一个对象而不是字符串。
    // 我们需要一个 hash 变量来存储这个总和（行{3}）。
    // 然后，遍历 key 并将从 ASCII表中查到的每个字符对应的 ASCII 值加到 hash 变量中（行{4}），
    // 可以使用 JavaScript 的 String类中的 charCodeAt 方法。
    // 最后，返回 hash 值。为了得到比较小的数值，
    // 我们会使用 hash 值和一个任意数做除法的余数（%）（行{5}）——这可以规避操作数超过数值变量最大表示范围的风险。

    //  将键和值加入散列表
    put(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            this.table[position] = new ValuePair(key, value);
            return true;
        }
        return false;
    }
    //  从散列表中获取一个值
    get(key) {
        const valuePair = this.table[this.hashCode(key)];
        return valuePair == null ? undefined : valuePair.value;
    }
    // 从散列表中移除一个值
    remove(key) {
        const hash = this.hashCode(key);
        const valuePair = this.table[hash];
        if (valuePair != null) {
            delete this.table[hash];
            return true;
        }
        return false;
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const keys = Object.keys(this.table);
        let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
        for (let i = 1; i < keys.length; i++) {
            objString = `${objString},{${keys[i]} => ${this.table[keys[i]].toString()}}`;
        }
        return objString;
    }
}