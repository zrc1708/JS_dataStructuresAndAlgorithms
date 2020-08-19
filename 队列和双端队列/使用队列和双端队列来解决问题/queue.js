// 为了写出一个在获取元素时更高效的数据结构，我们将使用一个对象来存储我们的元素（行{3}）。
// 也可以声明一个 count 属性来帮助我们控制队列的大小（行{1}）
// 由于我们将要从队列前端移除元素，同样需要一个变量来帮助我们追踪第一个元素。因此，声明一个 lowestCount变量（行{2}）。

class Queue {
    constructor() {
        this.count = 0; // {1} 
        this.lowestCount = 0; // {2} 
        this.items = {}; // {3} 
    }

    //  向队列添加元素
    enqueue(element) { 
        this.items[this.count] = element; 
        this.count++; 
    }
    // 检查队列是否为空
    isEmpty() { 
        return this.count - this.lowestCount === 0; 
    }
    // 获取队列长度
    size() { 
        return this.count - this.lowestCount; 
    }
    // 从队列移除元素
    dequeue() { 
        if (this.isEmpty()) { 
            return undefined; 
        } 
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }
    // 查看队列头元素
    peek() { 
        if (this.isEmpty()) { 
           return undefined; 
        } 
        return this.items[this.lowestCount]; 
    }
    // 清空队列
    clear() { 
        this.items = {}; 
        this.count = 0; 
        this.lowestCount = 0; 
    }
    // 创建 toString 方法
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