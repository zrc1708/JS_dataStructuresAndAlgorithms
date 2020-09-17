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
    [array[a], array[b]] = [array[b], array[a]]
}

function quickSort(array, compareFn = defaultCompare) {
    return quick(array, 0, array.length - 1, compareFn);
};

function quick(array, left, right, compareFn) {
    let index; // {1} 
    if (array.length > 1) { // {2} 
        index = partition(array, left, right, compareFn); // {3} 
        if (left < index - 1) { // {4} 
            quick(array, left, index - 1, compareFn); // {5} 
        }
        if (index < right) { // {6} 
            quick(array, index, right, compareFn); // {7} 
        }
    }
    return array;
};

function partition(array, left, right, compareFn) {
    const pivot = array[Math.floor((right + left) / 2)]; // {8} 
    let i = left; // {9} 
    let j = right; // {10} 
    while (i <= j) { // {11} 
        while (compareFn(array[i], pivot) === Compare.LESS_THAN) { // {12} 
            i++;
        }
        while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) { // {13} 
            j--;
        }
        if (i <= j) { // {14} 
            swap(array, i, j); // {15} 
            i++;
            j--;
        }
    }
    return i; // {16} 
}

// 这个算法要求被搜索的数据结构已排序。
// (1) 选择数组的中间值。
// (2) 如果选中值是待搜索值，那么算法执行完毕（值找到了）。
// (3) 如果待搜索值比选中值要小，则返回步骤 1 并在选中值左边的子数组中寻找（较小）。
// (4) 如果待搜索值比选中值要大，则返回步骤 1 并在选种值右边的子数组中寻找（较大）。

function lesserOrEquals(a, b, compareFn) { 
    const comp = compareFn(a, b); 
    return comp === Compare.LESS_THAN || comp === Compare.EQUALS; 
}

function binarySearch(array, value, compareFn = defaultCompare) {
    const sortedArray = quickSort(array); 
    let low = 0; 
    let high = sortedArray.length - 1; 
    while (lesserOrEquals(low, high, compareFn)) { 
            const mid = Math.floor((low + high) / 2); 
            const element = sortedArray[mid]; 
            if (compareFn(element, value) === Compare.LESS_THAN) { 
                low = mid + 1; 
            } else if (compareFn(element, value) === Compare.BIGGER_THAN) { 
                high = mid - 1; 
            } else {
                return mid; 
            }
        }
    return DOES_NOT_EXIST; 
}