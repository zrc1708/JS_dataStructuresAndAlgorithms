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

// 首先声明 index（行{1}），该变量能帮助我们将子数组分离为较小值数组和较大值数组。
// 这样就能再次递归地调用 quick 函数了。partition 函数返回值将赋值给 index（行{3}）。
// 如果数组的长度比 1 大（因为只有一个元素的数组必然是已排序了的——行{2}），
// 我们将对给定子数组执行 partition 操作（第一次调用是针对整个数组）以得到 index（行{3}）。
// 如果子数组存在较小值的元素（行{4}），则对该数组重复这个过程（行{5}）。
// 同理，对存在较大值的子数组也是如此，如果有子数组存在较大值（行{6}），我们也将重复快速排序过程（行{7}）

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

// 在本实现中，我们选择中间值作为主元（行{8}）。
// 我们初始化两个指针：left（低——行{9}），初始化为数组第一个元素；right（高——行{10}），初始化为数组最后一个元素。
// 只要 left 和 right 指针没有相互交错（行{11}），就执行划分操作。
// 首先，移动 left 指针直到找到一个比主元大的元素（行{12}）。对 right 指针，我们做同样的事情，
// 移动 right指针直到我们找到一个比主元小的元素（行{13}）。
// 当左指针指向的元素比主元大且右指针指向的元素比主元小，并且此时左指针索引没有右指
// 针索引大时（行{14}），意思是左项比右项大（值比较），我们交换它们（行{15}），然后移动两个指针，并重复此过程（从行{11}再次开始）。
// 在划分操作结束后，返回左指针的索引，用来在行{3}处创建子数组。

let arr = [5,4,3,2,1,7,6]
console.log(quickSort(arr))