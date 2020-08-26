const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    EQUALS: 0
};

function defaultCompare(a, b) {
    if (a === b) {
        return Compare.EQUALS;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

class Node {
    constructor(key) {
        this.key = key; // 节点值
        this.left = null; // 左侧子节点引用
        this.right = null; // 右侧子节点引用
    }
}

export default class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn; // 用来比较节点值
        this.root = null; // Node 类型的根节点
    }

    // 向二叉搜索树中插入一个键
    insert(key) {
        if (this.root == null) { // {1} 
            this.root = new Node(key); // {2} 
        } else {
            this.insertNode(this.root, key); // {3} 
        }
    }
    insertNode(node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) { // {4} 
            if (node.left == null) { // {5} 
                node.left = new Node(key); // {6} 
            } else {
                this.insertNode(node.left, key); // {7} 
            }
        } else {
            if (node.right == null) { // {8} 
                node.right = new Node(key); // {9} 
            } else {
                this.insertNode(node.right, key); // {10} 
            }
        }
    }
    // 如果树非空，需要找到插入新节点的位置。因此，在调用 insertNode 方法时要通过参数传入树的根节点和要插入的节点。
    // 如果新节点的键小于当前节点的键（现在，当前节点就是根节点）（行{4}），那么需要检查当前节点的左侧子节点。
    // 注意在这里，由于键可能是复杂的对象而不是数，我们使用传入二叉搜索树构造函数的 compareFn 函数来比较值。
    // 如果它没有左侧子节点（行{5}），就在那里插入新的节点（行{6}）。
    // 如果有左侧子节点，需要通过递归调用 insertNode方法（行{7}）继续找到树的下一层。
    // 在这里，下次要比较的节点将会是当前节点的左侧子节点（左侧节点子树）。
    //  如果节点的键比当前节点的键大，同时当前节点没有右侧子节点（行{8}），就在那里插入新的节点（行{9}）。
    // 如果有右侧子节点，同样需要递归调用 insertNode 方法，但是要用来和新节点比较的节点将会是右侧子节点（右侧节点子树）（行{10}）。

    // 中序遍历，以从最小到最大的顺序访问所有节点，中序遍历的一种应用就是对树进行排序操作。
    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback);
    }
    inOrderTraverseNode(node, callback) {
        if (node != null) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right, callback);
        }
    }
    // 先序遍历，是以优先于后代节点的顺序访问每个节点的。先序遍历的一种应用是打印一个结构化的文档。
    preOrderTraverse(callback) {
        this.preOrderTraverseNode(this.root, callback);
    }
    preOrderTraverseNode(node, callback) {
        if (node != null) {
            callback(node.key);
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback);
        }
    }
    // 后序遍历，后序遍历的一种应用是计算一个目录及其子目录中所有文件所占空间的大小。
    postOrderTraverse(callback) {
        this.postOrderTraverseNode(this.root, callback);
    }
    postOrderTraverseNode(node, callback) {
        if (node != null) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }

    // 寻找树的最小键
    min() {
        return this.minNode(this.root);
    }
    minNode(node) {
        let current = node;
        while (current != null && current.left != null) {
            current = current.left;
        }
        return current;
    }
    // 寻找树的最大键
    max() {
        return this.maxNode(this.root);
    }
    maxNode(node) {
        let current = node;
        while (current != null && current.right != null) { // {5} 
            current = current.right;
        }
        return current;
    }
    // 搜索一个特定的值
    search(key) {
        return this.searchNode(this.root, key);
    }
    searchNode(node, key) {
        if (node == null) {
            return false;
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            return this.searchNode(node.left, key);
        } else if (
            this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            return this.searchNode(node.right, key);
        } else {
            return true;
        }
    }

    // 移除一个节点
    // 传入 root 和要移除的键作为参数（行{1}）。
    // 我要提醒大家的一件非常重要的事情：root 被赋值为 removeNode 方法的返回值。我们稍后会明白其中的原因。
    remove(key) {
        this.root = this.removeNode(this.root, key); // {1} 
    }
    removeNode(node, key) {
        if (node == null) { // {2} 
            return null;
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) { // {3} 
            node.left = this.removeNode(node.left, key); // {4} 
            return node; // {5} 
        } else if (
            this.compareFn(key, node.key) === Compare.BIGGER_THAN) { // {6} 
            node.right = this.removeNode(node.right, key); // {7} 
            return node; // {8} 
        } else {
            // 键等于 node.key 
            // 第一种情况
            if (node.left == null && node.right == null) { // {9} 
                node = null; // {10} 
                return node; // {11} 
            }
            // 第二种情况
            if (node.left == null) { // {12} 
                node = node.right; // {13} 
                return node; // {14} 
            } else if (node.right == null) { // {15} 
                node = node.left; // {16} 
                return node; // {17} 
            }
            // 第三种情况
            const aux = this.minNode(node.right); // {18} 
            node.key = aux.key; // {19} 
            node.right = this.removeNode(node.right, aux.key); // {20} 
            return node; // {21} 
        }
    }
    // 我们来看行{2}，如果正在检测的节点为 null，那么说明键不存在于树中，所以返回 null。
    // 如果不为 null，我们需要在树中找到要移除的键。因此，如果要找的键比当前节点的值小（行{3}），就沿着树的左边找到下一个节点（行{4}）。
    // 如果要找的键比当前节点的值大（行{6}），那么就沿着树的右边找到下一个节点（行{7}），也就是说我们要分析它的子树。
    // 如果我们找到了要找的键（键和 node.key 相等），就需要处理三种不同的情况。

    // 没有左侧或右侧子节点的叶节点——行{9}。在这种情况下，我们要做的就是给这个节点赋予 null 值来移除它（行{9}）
    // 在这里，这个节点没有任何子节点，但是它有一个父节点，需要通过返回 null 来将对应的父节点指针赋予 null 值（行{11}）。

    // 移除有一个左侧子节点或右侧子节点的节点。这种情况下，需要跳过这个节点，直接将父节点指向它的指针指向子节点。
    // 如果这个节点没有左侧子节点（行{12}），也就是说它有一个右侧子节点。
    // 因此我们把对它的引用改为对它右侧子节点的引用（行{13}）并返回更新后的节点（行{14}）。
    // 如果这个节点没有右侧子节点，也是一样——把对它的引用改为对它左侧子节点的引用（行{16}）并返回更新后的值（行{17}）。

    // 第三种情况，也是最复杂的情况，那就是要移除的节点有两个子节点——左侧子节点和右侧子节点。要移除有两个子节点的节点，需要执行四个步骤。
    // (1) 当找到了要移除的节点后，需要找到它右边子树中最小的节点（它的继承者——行{18}）。
    // (2) 然后，用它右侧子树中最小节点的键去更新这个节点的值（行{19}）。通过这一步，我们改变了这个节点的键，也就是说它被移除了。
    // (3) 但是，这样在树中就有两个拥有相同键的节点了，这是不行的。要继续把右侧子树中的最小节点移除，毕竟它已经被移至要移除的节点的位置了（行{20}）。
    // (4) 最后，向它的父节点返回更新后节点的引用（行{21}）。
}