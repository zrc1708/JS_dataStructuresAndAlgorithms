// 顺序或线性搜索是最基本的搜索算法。
// 它的机制是，将每一个数据结构中的元素和我们要找的元素做比较。
// 顺序搜索是最低效的一种搜索算法。

function defaultEquals(a, b) {
    return a === b;
}

const DOES_NOT_EXIST = -1;

function sequentialSearch(array, value, equalsFn = defaultEquals) {
    for (let i = 0; i < array.length; i++) {
        if (equalsFn(value, array[i])) {
            return i;
        }
    }
    return DOES_NOT_EXIST;
}