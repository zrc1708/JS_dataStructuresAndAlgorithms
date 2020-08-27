import BinarySearchTree from './BinarySearchTree'

class Node {
    constructor(key) {
        this.key = key; // 节点值
        this.left = null; // 左侧子节点引用
        this.right = null; // 右侧子节点引用
    }
}

class RedBlackNode extends Node {
    constructor(key) {
        super(key);
        this.key = key;
        this.color = Colors.RED;
        this.parent = null;
    }
    isRed() {
        return this.color === Colors.RED;
    }
}

// 红黑树也是一个自平衡二叉搜索树。
// 对 AVL 树插入和移除节点可能会造成旋转，所以我们需要一个包含多次插入和删除的自平衡树，红黑树是比较好的。

// 在红黑树中，每个节点都遵循以下规则：
// (1) 顾名思义，每个节点不是红的就是黑的；
// (2) 树的根节点是黑的；
// (3) 所有叶节点都是黑的（用 NULL 引用表示的节点）；
// (4) 如果一个节点是红的，那么它的两个子节点都是黑的；
// (5) 不能有两个相邻的红节点，一个红节点不能有红的父节点或子节点；
// (6) 从给定的节点到它的后代节点（NULL 叶节点）的所有路径包含相同数量的黑色节点。


class RedBlackTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }

    // 向红黑树中插入节点
    insertNode(node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new RedBlackNode(key);
                node.left.parent = node; // {8} 
                return node.left; // {9} 
            } else {
                return this.insertNode(node.left, key);
            }
        } else if (node.right == null) {
            node.right = new RedBlackNode(key);
            node.right.parent = node; // {10} 
            return node.right; // {11} 
        } else {
            return this.insertNode(node.right, key);
        }
    }
    // 逻辑和二叉搜索树中的一样。不同之处在于我们保存了指向被插入节点父节点的引用（行{8}和行{10}），
    // 并且返回了节点的引用（行{9}和行{11}），这样我们可以在后面验证树的属性。

    // 在插入节点后验证红黑树属性
    fixTreeProperties(node) {
        while (node && node.parent && node.parent.color.isRed() // {1} 
            &&
            node.color !== Colors.BLACK) { // {2} 
            let parent = node.parent; // {3} 
            const grandParent = parent.parent; // {4} 
            // 情形 A：父节点是左侧子节点
            if (grandParent && grandParent.left === parent) { // {5} 
                const uncle = grandParent.right; // {6} 
                // 情形 1A：叔节点也是红色——只需要重新填色
                if (uncle && uncle.color === Colors.RED) { // {7} 
                    grandParent.color = Colors.RED;
                    parent.color = Colors.BLACK;
                    uncle.color = Colors.BLACK;
                    node = grandParent; // {8} 
                } else {
                    // 情形 2A：节点是右侧子节点——左旋转
                    if (node === parent.right) {
                        this.rotationRR(parent); // {12} 
                        node = parent; // {13} 
                        parent = node.parent; // {14} 
                    }
                    // 情形 3A：节点是左侧子节点——右旋转
                    this.rotationLL(grandParent); // {15} 
                    parent.color = Colors.BLACK; // {16} 
                    grandParent.color = Colors.RED; // {17} 
                    node = parent; // {18}
                }
            } else { // 情形 B：父节点是右侧子节点
                const uncle = grandParent.left; // {9} 
                // 情形 1B：叔节点是红色——只需要重新填色
                if (uncle && uncle.color === Colors.RED) { // {10} 
                    grandParent.color = Colors.RED;
                    parent.color = Colors.BLACK;
                    uncle.color = Colors.BLACK;
                    node = grandParent;
                } else {
                    // 情形 2B：节点是左侧子节点——左旋转
                    if (node === parent.left) {
                        this.rotationLL(parent); // {19} 
                        node = parent;
                        parent = node.parent;
                    }
                    // 情形 3B：节点是右侧子节点——左旋转
                    this.rotationRR(grandParent); // {20} 
                    parent.color = Colors.BLACK;
                    grandParent.color = Colors.RED;
                    node = parent;
                }
            }
        }
        this.root.color = Colors.BLACK; // {11} 
    }

    // 左左旋转（右旋转）
    rotationLL(node) {
        const tmp = node.left;
        node.left = tmp.right;
        if (tmp.right && tmp.right.key) {
            tmp.right.parent = node;
        }
        tmp.parent = node.parent;
        if (!node.parent) {
            this.root = tmp;
        } else {
            if (node === node.parent.left) {
                node.parent.left = tmp;
            } else {
                node.parent.right = tmp;
            }
        }
        tmp.right = node;
        node.parent = tmp;
    }
    // 右右旋转（左旋转）
    rotationRR(node) {
        const tmp = node.right;
        node.right = tmp.left;
        if (tmp.left && tmp.left.key) {
            tmp.left.parent = node;
        }
        tmp.parent = node.parent;
        if (!node.parent) {
            this.root = tmp;
        } else {
            if (node === node.parent.left) {
                node.parent.left = tmp;
            } else {
                node.parent.right = tmp;
            }
        }
        tmp.left = node;
        node.parent = tmp;
    }
}