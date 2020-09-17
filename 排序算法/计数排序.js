// 它是用来排序整数的优秀算法（它是一个整数排序算法），时间复杂度为 O(n+k)，其中 k 是临时计数数组的大小；
// 但是，它确实需要更多的内存来存放临时数组。

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

function countingSort(array) {
    if (array.length < 2) { // {1} 
        return array;
    }
    const maxValue = findMaxValue(array); // {2} 
    const counts = new Array(maxValue + 1); // {3} 
    array.forEach(element => {
        if (!counts[element]) { // {4} 
            counts[element] = 0;
        }
        counts[element]++; // {5} 
    });
    let sortedIndex = 0;
    counts.forEach((count, i) => {
        while (count > 0) { // {6} 
            array[sortedIndex++] = i; // {7} 
            count--; // {8} 
        }
    });
    return array;
}

// 如果待排序的数组为空或只有一个元素（行{1}），则不需要运行排序算法。
// 对于计数排序算法，我们需要创建计数数组，从索引 0 开始直到最大值索引 value + 1（行{3}）。
// 因此，我们还需要找到数组中的最大值（行{2}）。
// 要找到数组中的最大值，我们只需要迭代并找到值最大的一项即可。

function findMaxValue(array) {
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
        }
    }
    return max;
}
// 然后，我们迭代数组中的每个位置并在 counts 数组中增加元素计数值（行{5}）。
// 为了确保递增操作成功，如果 counts 数组中用来计数某个元素的位置一开始没有用 0 初始化的话，
// 我们将其赋值为 0（行{4}）。

let arr = [5,4,3,2,1,7,6]
console.log(countingSort(arr))