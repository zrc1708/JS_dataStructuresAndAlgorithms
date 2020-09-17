// 内插搜索是改良版的二分搜索。
// 二分搜索总是检查 mid 位置上的值，而内插搜索可能会根据要搜索的值检查数组中的不同地方。

// 这个算法要求被搜索的数据结构已排序。以下是该算法遵循的步骤：
// (1) 使用 position 公式选中一个值；
// (2) 如果这个值是待搜索值，那么算法执行完毕（值找到了）；
// (3) 如果待搜索值比选中值要小，则返回步骤 1 并在选中值左边的子数组中寻找（较小）；
// (4) 如果待搜索值比选中值要大，则返回步骤 1 并在选种值右边的子数组中寻找（较大）。

function lesserOrEquals(a, b, compareFn) {
    const comp = compareFn(a, b);
    return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
}

function biggerOrEquals(a, b, compareFn) {
    const comp = compareFn(a, b);
    return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS;
}

export function defaultEquals(a, b) {
    return a === b;
}

export function defaultDiff(a, b) {
    return Number(a) - Number(b);
}

function interpolationSearch(array, value,
    compareFn = defaultCompare,
    equalsFn = defaultEquals,
    diffFn = defaultDiff
) {
    const {length} = array;
    let low = 0;
    let high = length - 1;
    let position = -1;
    let delta = -1;
    while (
        low <= high &&
        biggerOrEquals(value, array[low], compareFn) &&
        lesserOrEquals(value, array[high], compareFn)
    ) {
        delta = diffFn(value, array[low]) / diffFn(array[high], array[low]); // {1} 
        position = low + Math.floor((high - low) * delta); // {2} 
        if (equalsFn(array[position], value)) { // {3} 
            return position;
        }
        if (compareFn(array[position], value) === Compare.LESS_THAN) { // {4} 
            low = position + 1;
        } else {
            high = position - 1;
        }
    }
    return DOES_NOT_EXIST;
}

// 首先要做的是计算要比较值的位置 position（行{2}）。
// 公式的做法是，如果查找的值更接近 array[high]则查找 position 位置旁更大的值，
// 如果查找的值更接近 array[low]则查找position 位置旁更小的值。
// 这个算法在数组中的值都是均匀分布时性能最好（delta 会非常小）（行{1}）。
// 如果待搜索值找到了，则返回它的索引值（行{3}）。
// 如果待搜索值小于当前位置的值，我们使用左边或右边的子数组重复这段逻辑（行{4}）。