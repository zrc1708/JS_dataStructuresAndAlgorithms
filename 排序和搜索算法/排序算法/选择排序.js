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

function selectionSort(array, compareFn = defaultCompare){
    for(let i = 0; i<array.length-1; i++){
        let min = i
        for(let j = i+1; j<array.length; j++){
            if(compareFn(array[j],array[min])==Compare.LESS_THAN){
                min = j  
            }
        }
        swap(array,i,min)
    }
    return array
}

let arr = [5,4,3,2,1,7,6]
console.log(selectionSort(arr))