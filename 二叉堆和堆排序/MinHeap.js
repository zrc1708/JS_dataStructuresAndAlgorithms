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

// 要比较储存在数据结构中的值，我们要使用 compareFn（行{1}），
// 在没有传入自定义函数的时候进行基本的比较，和之前一样。我们将会使用数组来存储数据（行{2}）。

// 交换函数
function swap(array, a, b) {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

// 二叉树有两种表示方式。
// 第一种是使用一个动态的表示方式，也就是指针（用节点表示），之前使用过。
// 第二种是使用一个数组，通过索引值检索父节点、左侧和右侧子节点的值。

// 创建最小堆类
class MinHeap {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn; // {1} 
        this.heap = []; // {2} 
    }

    // 要访问使用普通数组的二叉树节点，我们可以用下面的方式操作 index。
    // 对于给定位置 index 的节点：
    // 它的左侧子节点的位置是 2 * index + 1（如果位置可用）；
    // 它的右侧子节点的位置是 2 * index + 2（如果位置可用）；
    // 它的父节点位置是 index / 2（如果位置可用）。
    getLeftIndex(index) {
        return 2 * index + 1;
    }
    getRightIndex(index) {
        return 2 * index + 2;
    }
    getParentIndex(index) {
        if (index === 0) {
            return undefined;
        }
        return Math.floor((index - 1) / 2);
    }

    // 向堆中插入值
    // 向堆中插入值是指将值插入堆的底部叶节点（数组的最后一个位置——行{1}）再执行siftUp 方法（行{2}），
    // 表示我们将要将这个值和它的父节点进行交换，直到父节点小于这个插入的值。
    insert(value) {
        if (value != null) {
            this.heap.push(value); // {1} 
            this.siftUp(this.heap.length - 1); // {2} 
            return true;
        }
        return false;
    }

    // 上移操作
    siftUp(index) {
        let parent = this.getParentIndex(index); // {1} 
        while (index > 0 && this.compareFn(this.heap[parent], this.heap[index]) == Compare.BIGGER_THAN) { // {2} 
            swap(this.heap, parent, index); // {3} 
            index = parent;
            parent = this.getParentIndex(index); // {4} 
        }
    }
    // siftUp 方法接收插入值的位置作为参数。我们同样需要获取其父节点的位置（行{1}）。
    // 如果插入的值小于它的父节点（行{2}——在最小堆中，或在最大堆中比父节点大），那么
    // 我们将这个元素和父节点交换（行{3}）。
    // 我们重复这个过程直到堆的根节点也经过了交换节点和父节点位置的操作（行{4}）。

    // 导出堆中的最小值或最大值
    extract() {
        if (this.isEmpty()) {
            return undefined; // {1} 
        }
        if (this.size() === 1) {
            return this.heap.shift(); // {2} 
        }
        const removedValue = this.heap.shift(); // {3} 
        this.siftDown(0); // {4} 
        return removedValue; // {5} 
    }
    // 如果堆为空，也就是没有值可以导出，那么我们可以返回 undefined（行{1}）。
    // 如果堆中只有一个值，我们可以直接移除并返回它（行{2}）。
    // 但是，如果堆中有不止一个值，我们需要将第一个值移除（行{3}），存储到一个临时变量中以便在执行完下移操作后（行{4}）返回它（行{5}）

    // 下移操作
    siftDown(index) {
        let element = index;
        const left = this.getLeftIndex(index); // {1} 
        const right = this.getRightIndex(index); // {2} 
        const size = this.size();
        if (left < size && this.compareFn(this.heap[element], this.heap[left]) == Compare.BIGGER_THAN) { // {3} 
            element = left; // {4} 
        }
        if (right < size && this.compareFn(this.heap[element], this.heap[right]) == Compare.BIGGER_THAN) { // {5} 
            element = right; // {6} 
        }
        if (index !== element) { // {7} 
            swap(this.heap, index, element); // {8} 
            this.siftDown(element); // {9} 
        }
    }
    // siftDown 方法接收移除元素的位置作为参数。我们会将 index 复制到 element 变量中。
    // 我们同样要获取左侧子节点（行{1}）和右侧子节点（行{2}）的值。
    // 下移操作表示将元素和最小子节点（最小堆）和最大子节点（最大堆）进行交换。
    // 如果元素比左侧子节点要小（行{3}——且 index 合法），我们就交换元素和它的左侧子节点（行{4}）。
    // 如果元素小于它的右侧子节点（行{5}——且 index 合法），我们就交换元素和它的右侧子节点（行{6}）。
    // 在找到最小子节点的位置后，我们要检验它的值是否和 element 相同（传入 siftDown 方 法——行{7}）——和自己交换是没有意义的！
    // 如果不是，就将它和最小的 element 交换（行{8}），并且重复这个过程（行{9}）直到 element 被放在正确的位置上。

    size() {
        return this.heap.length;
    }
    isEmpty() {
        return this.size() === 0;
    }
    findMinimum() {
        return this.isEmpty() ? undefined : this.heap[0]; // {1} 
    }
}