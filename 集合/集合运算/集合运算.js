class Set {
    constructor() {
        this.items = {};
    }

    // 检验某个元素是否存在于集合中
    has(element){ 
        return Object.prototype.hasOwnProperty.call(this.items, element);
    };
    // 向集合添加一个新元素
    add(element) { 
        if (!this.has(element)) { 
            this.items[element] = element;
            return true; 
        } 
        return false; 
    }
    // 从集合移除一个元素
    delete(element) { 
        if (this.has(element)) { 
            delete this.items[element]; 
           return true; 
        } 
        return false; 
    }
    // 移除集合中的所有元素
    clear() { 
        this.items = {};
    }
    // 返回集合所包含元素的数量
    size() { 
        return Object.keys(this.items).length; 
    };
    sizeLegacy() { 
        let count = 0; 
        for(let key in this.items) {
            if(this.items.hasOwnProperty(key)) {
                count++;
            }
        } 
        return count; 
    };
    // 返回一个包含集合中所有值（元素）的数组
    values() { 
        return Object.values(this.items); 
    }
    valuesLegacy() { 
        let values = []; 
        for(let key in this.items) {
            if(this.items.hasOwnProperty(key)) { 
                values.push(key);  
            } 
        } 
        return values; 
    };
    // 并集 
    union(otherSet) { 
        const unionSet = new Set();
        this.values().forEach(value => unionSet.add(value));
        otherSet.values().forEach(value => unionSet.add(value));
        return unionSet; 
    }
    // 交集
    intersection(otherSet) {
        const intersectionSet = new Set();
        const values = this.values();
        const otherValues = otherSet.values();
        let biggerSet = values; 
        let smallerSet = otherValues; 
        if (otherValues.length - values.length > 0) {
            biggerSet = otherValues;
            smallerSet = values;
        }
        smallerSet.forEach(value => { 
            if (biggerSet.includes(value)) {
                intersectionSet.add(value);
            }
        });
        return intersectionSet;
    }
    // 差集
    difference(otherSet) {
        const differenceSet = new Set();
        this.values().forEach(value => { 
            if (!otherSet.has(value)) { 
                differenceSet.add(value); 
            }
        });
        return differenceSet;
    }
    // 子集
    isSubsetOf(otherSet) {
        if (this.size() > otherSet.size()) {
            return false;
        }
        let isSubset = true; 
        this.values().every(value => { 
            if (!otherSet.has(value)) { 
                isSubset = false; 
                return false;
            }
            return true; 
        });
        return isSubset;
    }
}