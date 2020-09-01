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
console.log(insertionSort(arr))