// 双端队列（deque，或称 double-ended queue）是一种允许我们同时从前端和后端添加和移除元素的特殊队列。

class Deque { 
    constructor() { 
        this.count = 0; 
        this.lowestCount = 0; 
        this.items = {}; 
    } 

    // 检查队列是否为空
    isEmpty() { 
        return this.count - this.lowestCount === 0; 
    }
    // 向双端队列的前端添加元素
    addFront(element) { 
        if (this.isEmpty()) { 
            this.addBack(element); 
        } else if (this.lowestCount > 0) { 
            this.lowestCount--; 
            this.items[this.lowestCount] = element; 
        } else { 
            for (let i = this.count; i > 0; i--) {  
                this.items[i] = this.items[i - 1]; 
            } 
            this.count++; 
            this.lowestCount = 0; 
            this.items[0] = element;  
        } 
    }
    //  向双端队列后端添加元素
    addBack(element) { 
        this.items[this.count] = element; 
        this.count++; 
    }
    // 移除双端队列前端第一个元素
    removeFront() { 
        if (this.isEmpty()) { 
            return undefined; 
        } 
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }
    // 移除双端队列后端第一个元素
    removeBack(){
        if (this.isEmpty()) {
            return undefined; 
        } 
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
    // 返回双端队列前端第一个元素
    peekFront(){
        if (this.isEmpty()) { 
            return undefined; 
        } 
        return this.items[this.lowestCount]
    }
    // 返回双端队列后端第一个元素
    peekBack(){
        if (this.isEmpty()) { 
            return undefined; 
        } 
        return this.items[this.count-1]
    }
    // 获取双端队列长度
    size() { 
        return this.count - this.lowestCount; 
    }
    // 清空队列
    clear() { 
        this.items = {}; 
        this.count = 0; 
        this.lowestCount = 0; 
    }
    //  创建 toString 方法
    toString() { 
        if (this.isEmpty()) { 
            return ''; 
        } 
        let objString = `${this.items[this.lowestCount]}`; 
        for (let i = this.lowestCount + 1; i < this.count; i++) { 
            objString = `${objString},${this.items[i]}`; 
        } 
        return objString; 
    }
}