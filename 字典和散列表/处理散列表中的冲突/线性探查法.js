// 另一种解决冲突的方法是线性探查。之所以称作线性，是因为它处理冲突的方法是将元素直接存储到表中，而不是在单独的数据结构中。
// 当想向表中某个位置添加一个新元素的时候，如果索引为 position 的位置已经被占据了，就尝试 position+1 的位置。
// 如果 position+1 的位置也被占据了，就尝试 position+2 的位置，以此类推，直到在散列表中找到一个空闲的位置。

// 线性探查技术分为两种。
// 第一种是软删除方法。我们使用一个特殊的值（标记）来表示键值对被删除了（惰性删除或软删除），而不是真的删除它。
// 第二种方法需要检验是否有必要将一个或多个元素移动到之前的位置
// 两种方法都有各自的优缺点

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

// 第二种方法
class HashTableLinearProbing {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }

    // put
    put(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            if (this.table[position] == null) {
                this.table[position] = new ValuePair(key, value);
            } else {
                let index = position + 1;
                while (this.table[index] != null) {
                    index++;
                }
                this.table[index] = new ValuePair(key, value);
            }
            return true;
        }
        return false;
    }
    // get
    get(key) {
        const position = this.hashCode(key);
        if (this.table[position] != null) {
            if (this.table[position].key === key) {
                return this.table[position].value;
            }
            let index = position + 1;
            while (this.table[index] != null && this.table[index].key !== key) {
                index++;
            }
            if (this.table[index] != null && this.table[index].key === key) {
                return this.table[position].value;
            }
        }
        return undefined;
    }
    // remove
    remove(key) {
        const position = this.hashCode(key);
        if (this.table[position] != null) {
            if (this.table[position].key === key) {
                delete this.table[position]; // {1} 
                this.verifyRemoveSideEffect(key, position); // {2} 
                return true;
            }
            let index = position + 1;
            while (this.table[index] != null && this.table[index].key !== key) {
                index++;
            }
            if (this.table[index] != null && this.table[index].key === key) {
                delete this.table[index]; // {3} 
                this.verifyRemoveSideEffect(key, index); // {4} 
                return true;
            }
        }
        return false;
    }
    // 在 get 方法中，当我们找到了要找的 key 后，返回它的值。在 remove 方法中，我们会从散列表中删除元素。
    // 可以直接从原始 hash 位置找到元素（行{1}），如果有冲突并被处理了，我们可以在另一个位置找到元素（行{3}）。
    // 由于我们不知道在散列表的不同位置上是否存在具有相同 hash 的元素，需要验证删除操作是否有副作用。
    // 如果有，就需要将冲突的元素移动至一个之前的位置，这样就不会产生空位置（行{2}和行{4}）。
    // 要完成这项工作，我们将会创建一个工具方法，声明如下。
    verifyRemoveSideEffect(key, removedPosition) {
        const hash = this.hashCode(key); // {1} 
        let index = removedPosition + 1; // {2} 
        while (this.table[index] != null) { // {3} 
            const posHash = this.hashCode(this.table[index].key); // {4} 
            if (posHash <= hash || posHash <= removedPosition) { // {5} 
                this.table[removedPosition] = this.table[index]; // {6} 
                delete this.table[index];
                removedPosition = index;
            }
            index++;
        }
    }
    // verifyRemoveSideEffect 方法接收两个参数：被删除的 key 和该 key 被删除的位置。
    // 首先，我们要获取被删除的 key 的 hash 值（行{1}——也可以将该值作为一个参数传入这个方法）。
    // 然后，我们会从下一个位置开始迭代散列表（行{2}）直到找到一个空位置（行{3}）。
    // 当空位置被找到后，表示元素都在合适的位置上，不需要进行移动（或更多的移动）。
    // 当迭代随后的元素时，我们需要计算当前位置上元素的 hash 值（行{4}）。
    // 如果当前元素的 hash 值小于或等于原始的 hash 值（行{5}）或者当前元素的 hash 值小于或等于 removedPosition
    // （也就是上一个被移除 key 的 hash 值），表示我们需要将当前元素移动至 removedPosition 的位置（行{6}）。
    // 移动完成后，我们可以删除当前的元素（因为它已经被复制到 removedPosition 的位置了）。
    // 我们还需要将 removedPosition 更新为当前的 index，然后重复这个过程。

    // 以下均未改动
    loseloseHashCode(key) {
        if (typeof key === 'number') {
            return key;
        }
        const tableKey = this.toStrFn(key);
        let hash = 0;
        for (let i = 0; i < tableKey.length; i++) {
            hash += tableKey.charCodeAt(i);
        }
        return hash % 37;
    }
    hashCode(key) {
        return this.loseloseHashCode(key);
    }
    isEmpty() {
        return this.size() === 0;
    }
    size() {
        return Object.keys(this.table).length;
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