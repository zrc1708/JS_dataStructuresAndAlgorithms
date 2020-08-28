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

function swap(array, a, b) {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

function heapify(array, index, heapSize, compareFn) {
    let largest = index;
    const left = (2 * index) + 1;
    const right = (2 * index) + 2;
    if (left < heapSize && compareFn(array[left], array[index]) > 0) {
        largest = left;
    }
    if (right < heapSize && compareFn(array[right], array[largest]) > 0) {
        largest = right;
    }
    if (largest !== index) {
        swap(array, index, largest);
        heapify(array, largest, heapSize, compareFn);
    }
}
// heapify 函数和我们创建的 siftDown 方法有相同的代码。
// 不同之处是我们会将堆本身、堆的大小和要使用的比较函数传入作为参数。
// 这是因为我们不会直接使用堆数据结构，而是使用它的逻辑来开发 heapSort 算法。

function buildMaxHeap(array, compareFn) {
    for (let i = Math.floor(array.length / 2 -1); i >= 0; i -= 1) {
        heapify(array, i, array.length, compareFn);
    }
    // console.log(array)   //输出首次创建的大根堆
    return array;
}
// 最大堆函数会重新组织数组的顺序。
// 归功于要进行的所有比较，我们只需要对后半部分数组执行 heapify（下移）函数
// （前半部分会被自动排好序，所以不需要对已经知道排好序的部分执行函数）。

function heapSort(array, compareFn = defaultCompare) {
    let heapSize = array.length;
    buildMaxHeap(array, compareFn); // 步骤 1 
    while (heapSize > 1) {
        swap(array, 0, --heapSize); // 步骤 2 
        heapify(array, 0, heapSize, compareFn); // 步骤 3 
    }
    return array;
}

// (1) 用数组创建一个最大堆用作源数据。
// (2) 在创建最大堆后，最大的值会被存储在堆的第一个位置。我们要将它替换为堆的最后一个值，将堆的大小减 1。
// (3) 最后，我们将堆的根节点下移并重复步骤 2 直到堆的大小为 1。