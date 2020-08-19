import {defaultEquals} from './util'
import {Node} from './linked-list-models' // {1}

// 对于 LinkedList 数据结构，我们从声明 count 属性开始（行{2}），它用来存储链表中的元素数量。

// 我们要实现一个名为 indexOf 的方法，它使我们能够在链表中找到一个特定的元素。
// 要比较链表中的元素是否相等，我们需要使用一个内部调用的函数，名为 equalsFn（行{4}）。
// 使用linkedList 类的开发者可以自行传入用于比较两个 JavaScript 对象或值是否相等的自定义函数。
// 如果没有传入这个自定义函数，该数据结构将使用 defaultEquals 函数

// 由于该数据结构是动态的，我们还需要将第一个元素的引用保存下来。我们可以用一个叫作head 的元素保存引用（行{3}）
// 要表示链表中的第一个以及其他元素，我们需要一个助手类，叫作 Node（行{1}）。
// Node类表示我们想要添加到链表中的项。它包含一个 element 属性，该属性表示要加入链表元素的值；
// 以及一个 next 属性，该属性是指向链表中下一个元素的指针。

export default class LinkedList {
    constructor(equalsFn = defaultEquals) {
        this.count = 0; // {2} 
        this.head = undefined; // {3} 
        this.equalsFn = equalsFn; // {4} 
    }

    // 向链表尾部添加元素
    push(element) {
        const node = new Node(element);
        let current;
        if (this.head == null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next != null) {
                current = current.next;
            }
            // 将其 next 赋为新元素，建立链接
            current.next = node;
        }
        this.count++;
    }
    // 循环迭代链表直到目标位置
    getElementAt(index) {
        if (index >= 0 && index <= this.count) {
            let node = this.head;
            for (let i = 0; i < index && node != null; i++) {
                node = node.next;
            }
            return node;
        }
        return undefined;
    }
    // 从链表中移除元素(从特定位置移除)
    removeAt(index) {
        // 检查越界值
        if (index >= 0 && index < this.count) {
            let current = this.head;
            // 移除第一项
            if (index === 0) {
                this.head = current.next;
            } else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
    //  在任意位置插入元素
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            if (index === 0) {
                const current = this.head;
                node.next = current;
                this.head = node;
            } else {
                const previous = this.getElementAt(index - 1);
                const current = previous.next;
                node.next = current;
                previous.next = node;
            }
            this.count++; // 更新链表的长度
            return true;
        }
        return false;
    }
    //  indexOf 方法：返回一个元素的位置
    indexOf(element) {
        let current = this.head;
        for (let i = 0; i < this.count && current != null; i++) {
            if (this.equalsFn(element, current.element)) {
                return i;
            }
            current = current.next;
        }
        return -1;
    }
    //  从链表中移除元素（移除指定的元素）
    remove(element) {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }
    // 获取链表长度
    size() {
        return this.count;
    }
    // 判断链表是否为空
    isEmpty() {
        return this.size() === 0;
    }
    // 获取链表头节点
    getHead() {
        return this.head;
    }
    //  toString 方法
    toString() {
        if (this.head == null) { 
            return '';
        }
        let objString = `${this.head.element}`;  
        let current = this.head.next;  
        for (let i = 1; i < this.size() && current != null; i++) { 
            objString = `${objString},${current.element}`;
            current = current.next;
        }
        return objString; 
    }
}