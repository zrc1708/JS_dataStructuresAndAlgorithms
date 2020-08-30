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

// 深度优先搜索算法将会从第一个指定的顶点开始遍历图，沿着路径直到这条路径最后一个顶
// 点被访问了，接着原路回退并探索下一条路径。换句话说，它是先深度后广度地访问顶点

// 深度优先搜索算法不需要一个源顶点。在深度优先搜索算法中，若图中顶点 v 未访问，则访问该顶点 v。

// 要访问顶点 v，照如下步骤做：
// (1) 标注 v 为被发现的（灰色）；
// (2) 对于 v 的所有未访问（白色）的邻点 w，访问顶点 w；
// (3) 标注 v 为已被探索的（黑色）。

const depthFirstSearch = (graph, callback) => { // {1} 
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const color = initializeColor(vertices);
    for (let i = 0; i < vertices.length; i++) { // {2} 
        if (color[vertices[i]] === Colors.WHITE) { // {3} 
            depthFirstSearchVisit(vertices[i], color, adjList, callback); // {4} 
        }
    }
};

const depthFirstSearchVisit = (u, color, adjList, callback) => {
    color[u] = Colors.GREY; // {5} 
    if (callback) { // {6} 
        callback(u);
    }
    const neighbors = adjList.get(u); // {7} 
    for (let i = 0; i < neighbors.length; i++) { // {8} 
        const w = neighbors[i]; // {9} 
        if (color[w] === Colors.WHITE) { // {10} 
            depthFirstSearchVisit(w, color, adjList, callback); // {11} 
        }
    }
    color[u] = Colors.BLACK; // {12} 
};

// depthFirstSearch 函数接收一个 Graph 类实例和回调函数作为参数（行{1}）。
// 在初始化每个顶点的颜色后，对于图实例中每一个未被访问过的顶点（行{2}和行{3}），
// 我们调用私有的递归函数 depthFirstSearchVisit，传递的参数为要访问的顶点 u、颜色数组以及回调函数（行{4}）。
// 当访问顶点 u 时，我们标注其为被发现的（灰色——行{5}）。
// 如果有 callback 函数的话（行{6}），则执行该函数输出已访问过的顶点。
// 接下来的一步是取得包含顶点 u 所有邻点的列表（行{7}）。
// 对于顶点 u 的每一个未被访问过（颜色为白色——行{10}和行{8}）的邻点 w（行{9}），
// 我们将调用 depthFirstSearchVisit 函数，传递 w 和其他参数（行{11}——添加顶点 w 入栈，这样接下来就能访问它）。
// 最后，在该顶点和邻点按深度访问之后，我们回退，意思是该顶点已被完全探索，并将其标注为黑色（行{12}）