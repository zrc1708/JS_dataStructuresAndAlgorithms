// BST 存在一个问题：取决于你添加的节点数，树的一条边可能会非常深；
// 也就是说，树的一条分支会有很多层，而其他的分支却只有几层，
// 这会在需要在某条边上添加、移除和搜索某个节点时引起一些性能问题。
// 为了解决这个问题，有一种树叫作 Adelson-Velskii-Landi 树（AVL 树）。
// AVL 树是一种自平衡二叉搜索树，意思是任何一个节点左右两侧子树的高度之差最多为 1。

import BinarySearchTree from './BinarySearchTree'

function defaultCompare(a, b) {
    if (a === b) {
        return Compare.EQUALS;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

// 为了避免直接在代码中处理平衡因子的数值，
// 我们要创建一个用来作为计数器的JavaScript 常量。
const BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5
};

// 重写insert、insertNode 和 removeNode 方法。所有其他的 BST 方法将会被AVLTree 类继承。
class AVLTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }

    // 计算一个节点高度
    getNodeHeight(node) {
        if (node == null) {
            return -1;
        }
        return Math.max(
            this.getNodeHeight(node.left), this.getNodeHeight(node.right)
        ) + 1;
    }
    // 计算一个节点的平衡因子并返回其值
    getBalanceFactor(node) {
        const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
        switch (heightDifference) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT;
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
            case 2:
                return BalanceFactor.UNBALANCED_LEFT;
            default:
                return BalanceFactor.BALANCED;
        }
    }

    // 左左（LL）：向右的单旋转
    rotationLL(node) {
        const tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;
        return tmp;
    }
    // 右右（RR）：向左的单旋转
    rotationRR(node) {
        const tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        return tmp;
    }
    // 左右（LR）：向右的双旋转
    rotationLR(node) {
        node.left = this.rotationRR(node.left);
        return this.rotationLL(node);
    }
    // 右左（RL）：向左的双旋转
    rotationRL(node) {
        node.right = this.rotationLL(node.right);
        return this.rotationRR(node);
    }

    // 向 AVL 树插入节点
    insert(key) {
        this.root = this.insertNode(this.root, key);
    }
    insertNode(node, key) {
        // 像在 BST 树中一样插入节点
        if (node == null) {
            return new Node(key);
        } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.insertNode(node.left, key);
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.insertNode(node.right, key);
        } else {
            return node; // 重复的键
        }
        // 如果需要，将树进行平衡操作
        const balanceFactor = this.getBalanceFactor(node); // {1} 
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) { // {2} 
            if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) { // {3} 
                node = this.rotationLL(node); // {4} 
            } else {
                return this.rotationLR(node); // {5} 
            }
        }
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) { // {6} 
            if (
                this.compareFn(key, node.right.key) === Compare.BIGGER_THAN
            ) { // {7} 
                node = this.rotationRR(node); // {8} 
            } else {
                return this.rotationRL(node); // {9} 
            }
        }
        return node;
    }
    // 在向 AVL 树插入节点后，我们需要检查树是否需要进行平衡，因此要使用递归计算以每个插入树的节点为根的节点的平衡因子（行{1}），然后对每种情况应用正确的旋转。
    // 如果在向左侧子树插入节点后树不平衡了（行{2}），我们需要比较是否插入的键小于左侧子节点的键（行{3}）。如果是，我们要进行 LL 旋转（行{4}）。否则，要进行 LR 旋转（行{5}）。
    // 如果在向右侧子树插入节点后树不平衡了（行{6}），我们需要比较是否插入的键小于右侧子节点的键（行{7}）。如果是，我们要进行 RR 旋转（行{8}）。否则，要进行 RL 旋转（行{9}）。

    // 从 AVL 树中移除节点
    removeNode(node, key) {
        node = super.removeNode(node, key); // {1} 
        if (node == null) {
            return node; // null，不需要进行平衡
        }
        // 检测树是否平衡
        const balanceFactor = this.getBalanceFactor(node); // {2} 
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) { // {3} 
            const balanceFactorLeft = this.getBalanceFactor(node.left); // {4} 
            if (balanceFactorLeft === BalanceFactor.BALANCED ||balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) { // {5} 
                return this.rotationLL(node); // {6} 
            }
            if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) { // {7} 
                return this.rotationLR(node.left); // {8} 
            }
        }
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) { // {9} 
            const balanceFactorRight = this.getBalanceFactor(node.right); // {10} 
            if (balanceFactorRight === BalanceFactor.BALANCED ||balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) { // {11} 
                return this.rotationRR(node); // {12} 
            }
            if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) { // {13} 
                return this.rotationRL(node.right); // {14} 
            }
        }
        return node;
    }
    // 既然 AVLTree 类是 BinarySearchTree 类的子类，我们也可以使用 BST 的 removeNode方法来从 AVL 树中移除节点（行{1}）。
    // 在从 AVL 树中移除节点后，我们需要检查树是否需要进行平衡，所以使用递归计算以每个移除的节点为根的节点的平衡因子（行{2}），然后需要对每种情况应用正确的旋转。
    // 如果在从左侧子树移除节点后树不平衡了（行{3}），我们要计算左侧子树的平衡因子（行{4}）。
    // 如果左侧子树向左不平衡（行{5}），要进行 LL 旋转（行{6}）；如果左侧子树向右不平衡（行{7}），要进行 LR 旋转（行{8}）。
    // 最后一种情况是，如果在从右侧子树移除节点后树不平衡了（行{9}），我们要计算右侧子树的平衡因子（行{10}）。
    // 如果右侧子树向右不平衡（行{11}），要进行 RR 旋转（行{12}）；如果右侧子树向左不平衡（行{13}），要进行 LR 旋转（行{14}）。
}