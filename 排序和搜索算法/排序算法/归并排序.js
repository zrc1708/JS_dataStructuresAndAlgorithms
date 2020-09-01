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

// 负责将一个大数组分为多个小数组并调用用来排序的辅助函数
function mergeSort(array, compareFn = defaultCompare) {
    if (array.length > 1) {
        const {length} = array;
        const middle = Math.floor(length / 2);
        const left = mergeSort(array.slice(0, middle), compareFn);
        const right = mergeSort(array.slice(middle, length), compareFn);
        array = merge(left, right, compareFn);
    }
    return array;
}

// 它负责合并和排序小数组来产生大数组
function merge(left, right, compareFn) {
    let i = 0;  
    let j = 0;
    const result = [];
    while (i < left.length && j < right.length) {  
        result.push(compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++]); 
    }
    return result.concat(i < left.length ? left.slice(i) : right.slice(j)); 
}

let arr = [5,4,3,2,1,7,6]
console.log(mergeSort(arr))