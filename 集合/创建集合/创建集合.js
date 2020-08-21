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
}