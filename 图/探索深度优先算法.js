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

// 我们可以用该算法做更多的事情，而不只是输出被访问顶点的顺序。

// 对于给定的图 G，我们希望深度优先搜索算法遍历图 G 的所有节点，
// 构建“森林”（有根树的一个集合）以及一组源顶点（根），并输出两个数组：发现时间和完成探索时间。
// 我们可以修改 depthFirstSearch 函数来返回一些信息：
//  顶点 u 的发现时间 d[u]； 
//  当顶点 u 被标注为黑色时，u 的完成探索时间 f[u]； 
//  顶点 u 的前溯点 p[u]。

// 让我们来看看改进了的 DFS 方法的实现。
const DFS = graph => {
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const color = initializeColor(vertices);
    const d = {};
    const f = {};
    const p = {};
    const time = {
        count: 0
    }; // {1} 
    for (let i = 0; i < vertices.length; i++) { // {2} 
        f[vertices[i]] = 0;
        d[vertices[i]] = 0;
        p[vertices[i]] = null;
    }
    for (let i = 0; i < vertices.length; i++) {
        if (color[vertices[i]] === Colors.WHITE) {
            DFSVisit(vertices[i], color, d, f, p, time, adjList);
        }
    }
    return { // {3} 
        discovery: d,
        finished: f,
        predecessors: p
    };
};
const DFSVisit = (u, color, d, f, p, time, adjList) => {
    color[u] = Colors.GREY;
    d[u] = ++time.count; // {4} 
    const neighbors = adjList.get(u);
    for (let i = 0; i < neighbors.length; i++) {
        const w = neighbors[i];
        if (color[w] === Colors.WHITE) {
            p[w] = u; // {5} 
            DFSVisit(w, color, d, f, p, time, adjList);
        }
    }
    color[u] = Colors.BLACK;
    f[u] = ++time.count; // {6} 
};
// 我们需要声明一个变量来追踪发现时间和完成探索时间（行{1}）
// 接下来，我们声明数组 d、f 和 p（行{2}），还需要为图的每一个顶点来初始化这些数组。
// 在这个方法结尾处返回这些值（行{3}），之后我们要用到它们。
// 当一个顶点第一次被发现时，我们追踪其发现时间（行{4}）。
// 当它是由引自顶点 u 的边而被发现的，我们追踪它的前溯点（行{5}）。
// 最后，当这个顶点被完全探索后，我们追踪其完成时间（行{6}）。