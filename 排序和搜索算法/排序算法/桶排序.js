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

function bucketSort(array, bucketSize = 5) { // {1} 
    if (array.length < 2) {
        return array;
    }
    const buckets = createBuckets(array, bucketSize); // {2} 
    return sortBuckets(buckets); // {3} 
}

// 对于桶排序算法，我们需要指定需要多少桶来排序各个元素（行{1}）。
// 默认情况下，我们会使用 5 个桶。桶排序在所有元素平分到各个桶中时的表现最好。
// 如果元素非常稀疏，则使用更多的桶会更好。
// 如果元素非常密集，则使用较少的桶会更好。
// 因此，我们允许 bucketSize 以参数形式传递。
// 我们将算法分为两个部分：第一个用于创建桶并将元素分布到不同的桶中（行{2}），
// 第二个包含对每个桶执行插入排序算法和将所有桶合并为排序后的结果数组（行{3}）。

function createBuckets(array, bucketSize) {
    let minValue = array[0];
    let maxValue = array[0];
    for (let i = 1; i < array.length; i++) { // {4} 
        if (array[i] < minValue) {
            minValue = array[i];
        } else if (array[i] > maxValue) {
            maxValue = array[i];
        }
    }
    const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1; // {5} 
    const buckets = [];
    for (let i = 0; i < bucketCount; i++) { // {6} 
        buckets[i] = [];
    }
    for (let i = 0; i < array.length; i++) { // {7} 
        const bucketIndex = Math.floor((array[i] - minValue) / bucketSize); // {8} 
        buckets[bucketIndex].push(array[i]);
    }
    return buckets;
}

// 桶排序的第一个重要步骤时计算每个桶中需要分布的元素个数（行{5}）。
// 要计算这个数，我们要使用一个公式，包含计算数组最大值和最小值的差值并与桶的大小进行除法计算。
// 这时，我们还需要迭代原数组并找到最大值和最小值（行{4}）。
// 我们可以使用计数排序中创建的findMaxValue 函数并另外创建一个 findMinValue 函数，但这意味着迭代两次相同的数组。
// 因此，要优化搜索过程，我们可以只迭代数组一次就找到两个值。
// 在计算了 bucketCount 后，我们需要初始化每个桶（行{6}）。
// buckets 数据结构是一个矩阵（多维数组）。
// buckets 中的每个位置包含了另一个数组。
// 最后一步是将元素分布到桶中。我们需要迭代数组中的每个元素（行{7}），
// 计算要将元素放到哪个桶中（行{8}），并将元素插入正确的桶中。
// 这个步骤完成了算法的第一个部分。

// 我们来看看桶排序算法的下一个部分，也就是将每个桶进行排序。
function sortBuckets(buckets) {
    const sortedArray = []; // {9} 
    for (let i = 0; i < buckets.length; i++) { // {10} 
        if (buckets[i] != null) {
            insertionSort(buckets[i]); // {11} 
            sortedArray.push(...buckets[i]); // {12}
        }
    }
    return sortedArray;
}
// 我们要创建一个用作结果数组的新数组（行{9}），这表示原数组不会被修改，我们会返回一个新的数组。
// 接下来，迭代每个可迭代的桶并应用插入排序（行{11}）——根据场景，我们还可以应用其他的排序算法，例如快速排序。
// 最后，我们将排好序的桶中的所有元素加入结果数组中（行{12}）。
// 注意到在行{12}中，我们使用了在第 2 章学到的 ES2015 中的解构运算符。
// 经典的做法是迭代 buckets[i]中的每个元素（buckets[i][j]）并将每个元素加入排序后的数组。

// 插入排序
function insertionSort(array, compareFn = defaultCompare) {
    for(let i = 1; i <array.length; i++){
        let j= i;
        temp = array[i]
        while(j>0&&compareFn(array[j-1],temp)==Compare.BIGGER_THAN){
            array[j]=array[j-1]
            j--
        }
        array[j]=temp
    }
    return array
}

let arr = [5,4,3,2,1,7,6]
console.log(bucketSort(arr))