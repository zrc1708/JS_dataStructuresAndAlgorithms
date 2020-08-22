// 分离链接法包括为散列表的每一个位置创建一个链表并将元素存储在里面。
// 它是解决冲突的最简单的方法，但是在 HashTable 实例之外还需要额外的存储空间。

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

function defaultEquals(a, b) {
    return a === b;
}

class Node {
    constructor(element) {
        this.element = element;
        this.next = undefined;
    }
}

class LinkedList {
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

// 对于分离链接和线性探查来说，只需要重写三个方法：put、get 和 remove。这三个方法在每种技术实现中都是不同的。

class HashTableSeparateChaining {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }

    // put
    put(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            if (this.table[position] == null) { 
                this.table[position] = new LinkedList(); 
            }
            this.table[position].push(new ValuePair(key, value));
            return true;
        }
        return false;
    }
    // get
    get(key) {
        const position = this.hashCode(key);
        const linkedList = this.table[position];
        if (linkedList != null && !linkedList.isEmpty()) { 
            let current = linkedList.getHead(); 
            while (current != null) { 
                if (current.element.key === key) {
                    return current.element.value; 
                }
                current = current.next;
            }
        }
        return undefined;
    }
    // remove
    remove(key) {
        const position = this.hashCode(key);
        const linkedList = this.table[position];
        if (linkedList != null && !linkedList.isEmpty()) {
            let current = linkedList.getHead();
            while (current != null) {
                if (current.element.key === key) { 
                    linkedList.remove(current.element); 
                    if (linkedList.isEmpty()) { 
                        delete this.table[position]; 
                    }
                    return true;  
                }
                current = current.next;  
            }
        }
        return false; 
    }

    // 以下方法均未改动

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