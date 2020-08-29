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

class Dictionary {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }

    set(key, value) {
        if (key != null && value != null) {
            const tableKey = this.toStrFn(key); // {1} 
            this.table[tableKey] = new ValuePair(key, value); // {2} 
            return true;
        }
        return false;
    }
    remove(key) {
        if (this.hasKey(key)) {
            delete this.table[this.toStrFn(key)];
            return true;
        }
        return false;
    }
    hasKey(key) {
        return this.table[this.toStrFn(key)] != null;
    }
    get(key) {
        const valuePair = this.table[this.toStrFn(key)];
        return valuePair == null ? undefined : valuePair.value;
    }
    clear() {
        this.table = {};
    }
    size() {
        return Object.keys(this.table).length;
    }
    isEmpty() {
        return this.size() === 0;
    }
    keys() {
        return this.keyValues().map(valuePair => valuePair.key);
    }
    values() {
        return this.keyValues().map(valuePair => valuePair.value);
    }
    keyValues() {
        return Object.values(this.table);
    }
    forEach(callbackFn) {
        const valuePairs = this.keyValues();
        for (let i = 0; i < valuePairs.length; i++) {
            const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
            if (result === false) {
                break;
            }
        }
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const valuePairs = this.keyValues();
        let objString = `${valuePairs[0].toString()}`;
        for (let i = 1; i < valuePairs.length; i++) {
            objString = `${objString},${valuePairs[i].toString()}`;
        }
        return objString;
    }
}

// Graph 构造函数可以接收一个参数来表示图是否有向（行{1}），默认情况下，图是无向的。
// 我们使用邻接表法,使用一个数组来存储图中所有顶点的名字（行{2}），以及一个字典（之前已经实现）来存储邻接表（行{3}）。
// 字典将会使用顶点的名字作为键，邻接顶点列表作为值。

class Graph {
    constructor(isDirected = false) {
        this.isDirected = isDirected; // {1} 
        this.vertices = []; // {2} 
        this.adjList = new Dictionary(); // {3} 
    }

    // 向图中添加一个新的顶点
    addVertex(v) {
        if (!this.vertices.includes(v)) { // {5} 
            this.vertices.push(v); // {6} 
            this.adjList.set(v, []); // {7} 
        }
    }
    // 这个方法接收顶点 v 作为参数。
    // 只有在这个顶点不存在于图中时（行{5}）我们将该顶点添加到顶点列表中（行{6}），
    // 并且在邻接表中，设置顶点 v 作为键对应的字典值为一个空数组（行{7}）。

    // 来添加顶点之间的边
    addEdge(v, w) {
        if (!this.adjList.get(v)) {
            this.addVertex(v); // {8} 
        }
        if (!this.adjList.get(w)) {
            this.addVertex(w); // {9} 
        }
        this.adjList.get(v).push(w); // {10} 
        if (!this.isDirected) {
            this.adjList.get(w).push(v); // {11} 
        }
    }
    // 这个方法接收两个顶点作为参数，也就是我们要建立连接的两个顶点。
    // 在连接顶点之前，需要验证顶点是否存在于图中。如果顶点 v 或 w 不存在于图中，要将它们加入顶点列表（行{8}和 行{9}）。
    // 然后，通过将 w 加入到 v 的邻接表中，我们添加了一条自顶点 v 到顶点 w 的边（行{10}）。
    // 如果你想实现一个有向图，则行{10}就足够了。由于本案例中大多数的例子都是基于无向图的，我们需要添加一条自 w 到 v 的边（行{11}）。

    // 两个取值的方法：一个返回顶点列表，另一个返回邻接表。
    getVertices() {
        return this.vertices;
    }
    getAdjList() {
        return this.adjList;
    }

    toString() {
        let s = '';
        for (let i = 0; i < this.vertices.length; i++) { // {15} 
            s += `${this.vertices[i]} -> `;
            const neighbors = this.adjList.get(this.vertices[i]); // {16} 
            for (let j = 0; j < neighbors.length; j++) { // {17} 
                s += `${neighbors[j]} `;
            }
            s += '\n'; // {18} 
        }
        return s;
    }
}