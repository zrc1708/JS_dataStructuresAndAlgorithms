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

function reverseCompare(compareFn) {
    return (a, b) => compareFn(b, a);
  }


// 交换函数
function swap(array, a, b) {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

class MinHeap {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn; // {1} 
        this.heap = []; // {2} 
    }

    getLeftIndex(index) {
        return 2 * index + 1;
    }
    getRightIndex(index) {
        return 2 * index + 2;
    }
    getParentIndex(index) {
        if (index === 0) {
            return undefined;
        }
        return Math.floor((index - 1) / 2);
    }

    insert(value) {
        if (value != null) {
            this.heap.push(value);
            this.siftUp(this.heap.length - 1); 
            return true;
        }
        return false;
    }

    siftUp(index) {
        let parent = this.getParentIndex(index); 
        while (index > 0 && this.compareFn(this.heap[parent], this.heap[index]) == Compare.BIGGER_THAN) { 
            swap(this.heap, parent, index); 
            index = parent;
            parent = this.getParentIndex(index);  
        }
    }

    extract() {
        if (this.isEmpty()) {
            return undefined; 
        }
        if (this.size() === 1) {
            return this.heap.shift();
        }
        const removedValue = this.heap.shift(); 
        this.siftDown(0); 
        return removedValue; 
    }
    
    siftDown(index) {
        let element = index;
        const left = this.getLeftIndex(index); 
        const right = this.getRightIndex(index); 
        const size = this.size();
        if (left < size && this.compareFn(this.heap[element], this.heap[left]) == Compare.BIGGER_THAN) { 
            element = left; 
        }
        if (right < size && this.compareFn(this.heap[element], this.heap[right]) == Compare.BIGGER_THAN) { 
            element = right; 
        }
        if (index !== element) { 
            swap(this.heap, index, element); 
            this.siftDown(element); 
        }
    }

    size() {
        return this.heap.length;
    }
    isEmpty() {
        return this.size() === 0;
    }
    findMinimum() {
        return this.isEmpty() ? undefined : this.heap[0]; 
    }
}

class MaxHeap extends MinHeap {
    constructor(compareFn = defaultCompare) {
      super(compareFn);
      this.compareFn = compareFn;
      this.compareFn = reverseCompare(compareFn);
    }
  }
  