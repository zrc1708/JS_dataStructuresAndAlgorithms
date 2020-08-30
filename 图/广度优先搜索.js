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

// 当要标注已经访问过的顶点时，我们用三种颜色来反映它们的状态。
//  白色：表示该顶点还没有被访问。
//  灰色：表示该顶点被访问过，但并未被探索过。
//  黑色：表示该顶点被访问过且被完全探索过。
// 为了有助于在广度优先和深度优先算法中标记顶点，我们要使用 Colors 变量（作为一个枚举器）
const Colors = {
    WHITE: 0,
    GREY: 1,
    BLACK: 2
};

// 还需要一个辅助对象来帮助存储顶点是否被访问过。
// 在算法的开头，所有的顶点会被标记为未访问（白色）。
// 我们要用下面的函数来初始化每个顶点的颜色。
const initializeColor = vertices => {
    const color = {};
    for (let i = 0; i < vertices.length; i++) {
        color[vertices[i]] = Colors.WHITE;
    }
    return color;
};

// 广度优先搜索算法会从指定的第一个顶点开始遍历图，先访问其所有的邻点（相邻顶点），
// 就像一次访问图的一层。换句话说，就是先宽后深地访问顶点
// 以下是从顶点 v 开始的广度优先搜索算法所遵循的步骤。
// (1) 创建一个队列 Q。
// (2) 标注 v 为被发现的（灰色），并将 v 入队列 Q。
// (3) 如果 Q 非空，则运行以下步骤：
//    (a) 将 u 从 Q 中出队列；
//    (b) 标注 u 为被发现的（灰色）；
//    (c) 将 u 所有未被访问过的邻点（白色）入队列；
//    (d) 标注 u 为已被探索的（黑色）。

const breadthFirstSearch = (graph, startVertex, callback) => {
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const color = initializeColor(vertices); // {1} 
    const queue = new Queue(); // {2} 
    queue.enqueue(startVertex); // {3} 
    while (!queue.isEmpty()) { // {4} 
        const u = queue.dequeue(); // {5} 
        const neighbors = adjList.get(u); // {6} 
        color[u] = Colors.GREY; // {7} 
        for (let i = 0; i < neighbors.length; i++) { // {8} 
            const w = neighbors[i]; // {9} 
            if (color[w] === Colors.WHITE) { // {10} 
                color[w] = Colors.GREY; // {11} 
                queue.enqueue(w); // {12} 
            }
        }
        color[u] = Colors.BLACK; // {13} 
        if (callback) { // {14} 
            callback(u);
        }
    }
};
// 我们要做的第一件事情是用 initializeColor函数来将 color 数组初始化为白色（行{1}）。
// 我们还需要声明和创建一个 Queue 实例（行{2}），它将会存储待访问和待探索的顶点。
// 照着开头解释过的步骤，breadthFirstSearch 方法接收一个图实例和顶点作为算法的起始点。
// 起始顶点是必要的，我们将此顶点入队列（行{3}）。
// 如果队列非空（行{4}），我们将通过出队列（行{5}）操作从队列中移除一个顶点，并取得一个包含其所有邻点的邻接表（行{6}）。
// 该顶点将被标注为灰色（行{7}），表示我们发现了它（但还未完成对其的探索）。
// 对于 u（行{8}）的每个邻点，我们取得其值（该顶点的名字——行{9}），
// 如果它还未被访问过（颜色为白色——行{10}），则将其标注为我们已经发现了它（颜色设置为灰色——行{11}），
// 并将这个顶点加入队列（行{12}）。
// 这样当其从队列中出列的时候，我们可以完成对其的探索。
// 当完成探索该顶点和其相邻顶点后，我们将该顶点标注为已探索过的（颜色设置为黑色——行{13}）。
// 我们实现的这个 breadthFirstSearch 方法也接收一个回调（我们在第 10 章中遍历树时使用了一个相似的方法）。
// 这个参数是可选的，如果我们传递了回调函数（行{14}），就会用到它。