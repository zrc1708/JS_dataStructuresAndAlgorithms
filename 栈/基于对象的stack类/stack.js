// 创建一个 Stack 类最简单的方式是使用一个数组来存储其元素
// 但在使用数组时，大部分方法的时间复杂度是 O(n)
// 我们需要迭代整个数组直到找到要找的那个元素,如果数组有更多元素的话，所需的时间会更长。
// 另外，数组是元素的一个有序集合，为了保证元素排列有序，它会占用更多的内存空间。
// 所以也可以使用一个JavaScript 对象来存储所有的栈元素，保证它们的顺序并且遵循 LIFO 原则

class Stack {
    // 使用一个 count 属性来帮助我们记录栈的大小（也能帮助我们从数据结构中添加和删除元素）
    constructor() {
        this.count = 0;
        this.items = {};
    }

    // 向栈中插入元素
    push(element) { 
        this.items[this.count] = element; 
        this.count++; 
    }
    // 验证是否为空栈
    isEmpty() { 
        return this.count === 0; 
    }
    // 验证栈的大小
    size() { 
        return this.count; 
    }
    // 从栈中移除元素
    pop() { 
        if (this.isEmpty()) {
            return undefined; 
        } 
        this.count--; // {2} 
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
    // 查看栈顶的值
    peek() { 
        if (this.isEmpty()) { 
            return undefined; 
        } 
        return this.items[this.count - 1]; 
    }
    // 清空栈
    clear() { 
        this.items = {}; 
        this.count = 0; 
    }
    // 创建 toString 方法
    toString() { 
        if (this.isEmpty()) { 
            return ''; 
        } 
        let objString = `${this.items[0]}`;
        for (let i = 1; i < this.count; i++) { 
            objString = `${objString},${this.items[i]}`;
        } 
        return objString; 
    }
}