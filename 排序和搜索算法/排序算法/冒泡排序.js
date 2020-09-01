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

function bubbleSort(array, compareFn = defaultCompare) {
    const {length} = array
    for (let i = array.length; i > 0; i--) {
        for (let j = 0; j < i-1; j++){
            if(compareFn(arr[j],arr[j+1])==Compare.BIGGER_THAN){
                swap(array,j,j+1)
            }
        }
    }
    return array
}

let arr = [5,4,3,2,1,7,6]
console.log(bubbleSort(arr))