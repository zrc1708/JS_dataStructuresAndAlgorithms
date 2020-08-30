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

const Colors = {
    WHITE: 0,
    GREY: 1,
    BLACK: 2
};

const initializeColor = vertices => {
    const color = {};
    for (let i = 0; i < vertices.length; i++) {
        color[vertices[i]] = Colors.WHITE;
    }
    return color;
};

// 之前只展示了 BFS 算法的工作原理。我们可以用该算法做更多事情，而不只是输出被访问顶点的顺序。
// 例如，考虑如何来解决下面这个问题。
// 给定一个图 G 和源顶点 v，找出每个顶点 u 和 v 之间最短路径的距离（以边的数量计）。

// 对于给定顶点 v，广度优先算法会访问所有与其距离为 1 的顶点，接着是距离为 2 的顶点，以此类推。
// 所以，可以用广度优先算法来解这个问题。

// 我们可以修改 breadthFirstSearch 方法以返回给我们一些信息：
//  从 v 到 u 的距离 distances[u]； 
//  前溯点 predecessors[u]，用来推导出从 v 到其他每个顶点 u 的最短路径。

const BFS = (graph, startVertex) => {
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const color = initializeColor(vertices);
    const queue = new Queue();
    const distances = {}; // {1} 距离
    const predecessors = {}; // {2} 前溯点
    queue.enqueue(startVertex);
    for (let i = 0; i < vertices.length; i++) { // {3} 
        distances[vertices[i]] = 0; // {4} 
        predecessors[vertices[i]] = null; // {5} 
    }
    while (!queue.isEmpty()) {
        const u = queue.dequeue();
        const neighbors = adjList.get(u);
        color[u] = Colors.GREY;
        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i];
            if (color[w] === Colors.WHITE) {
                color[w] = Colors.GREY;
                distances[w] = distances[u] + 1; // {6} 
                predecessors[w] = u; // {7} 
                queue.enqueue(w);
            }
        }
        color[u] = Colors.BLACK;
    }
    return { // {8} 
        distances,
        predecessors
    };
};
// 这个版本的 BFS 方法有些什么改变？
// 我们还需要声明数组 distances（行{1}）来表示距离，以及 predecessors 数组（行{2}）来表示前溯点。
// 下一步则是对于图中的每一个顶点（行{3}），用 0 来初始化数组 distances （行{4}），用 null 来初始化数组 predecessors（行{5}）。
// 当我们发现顶点 u 的邻点 w 时，则设置 w 的前溯点值为 u（行{7}）。
// 我们还通过给distances[u]加 1 来增加 v 和 w 之间的距离（u 是 w 的前溯点，distances[u]的值已经有了）。
// 方法最后返回了一个包含 distances 和 predecessors 的对象（行{8}）。

