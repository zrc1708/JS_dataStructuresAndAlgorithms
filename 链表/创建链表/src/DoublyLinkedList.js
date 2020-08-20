// 双向链表

import {defaultEquals} from './util'
import {Node} from './linked-list-models' // {1}
import LinkedList from './src/LinkedList'

class DoublyNode extends Node { // {1} 
    constructor(element, next, prev) {
        super(element, next); // {2} 
        this.prev = prev; // {3} 新增的
    }
}

// DoublyLinkedList 类是一种特殊的 LinkedList 类，我们要扩展 LinkedList 类（行{4}）。
// 这表示 DoublyLinkedList 类将继承（可访问）LinkedList 类中所有的属性和方法。
// 一开始，在 DoublyLinkedList 的构造函数中，我们要调用 LinkedList 的构造函数（行{5}），
// 它会初始化 equalsFn、count 和 head 属性。另外，我们也会保存对链表最后一个元素的引用（tail——行{6}）。
// 双向链表提供了两种迭代的方法：从头到尾，或者从尾到头。我们也可以访问一个特定节点的下一个或前一个元素。
// 为了实现这种行为，还需要追踪每个节点的前一个节点。
// 所以除了 Node类中的 element 和 next 属性，DoubleLinkedList 会使用一个特殊的节点，
// 这个名为DoublyNode 的节点有一个叫作 prev 的属性（行{3}）。
// DoublyNode 扩展了 Node 类，因此我们可以继承 element 和 next 属性（行{1}）。
// 由于使用了继承，我们需要在 DoublyNode 类的构造函数中调用 Node 的构造函数（行{2}）。

class DoublyLinkedList extends LinkedList { // {4} 
    constructor(equalsFn = defaultEquals) {
        super(equalsFn); // {5} 
        this.tail = undefined; // {6} 新增的
    }

    // 向任意位置插入一个新元素
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new DoublyNode(element);
            let current = this.head;
            if (index === 0) {
                if (this.head == null) {
                    this.head = node;
                    this.tail = node;
                } else {
                    node.next = this.head;
                    current.prev = node;
                    this.head = node;
                }
            } else if (index === this.count) {
                current = this.tail;
                current.next = node;
                node.prev = current;
                this.tail = node;
            } else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                node.next = current;
                previous.next = node;
                current.prev = node;
                node.prev = previous;
            }
            this.count++;
            return true;
        }
        return false;
    }
    // 从任意位置移除元素
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) {
                this.head = current.next;  
                if (this.count === 1) {  
                    this.tail = undefined;
                } else {
                    this.head.prev = undefined; 
                }
            } else if (index === this.count - 1) { 
                current = this.tail; 
                this.tail = current.prev;  
                this.tail.next = undefined; 
            } else {
                current = this.getElementAt(index); 
                const previous = current.prev; 
                previous.next = current.next; 
                current.next.prev = previous; 
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
}