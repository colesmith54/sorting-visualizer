const algoSortCode = {
    'bubble': `function bubbleSort(arr) {

    // Calculate length first rather than
    // recalulating for each iteration
    const len = arr.length;

    for (let i = 0; i < len; i++) {

        for (var j = 0; j < len - i - 1; j++) {

            // Compare each block with its adjacent block
            if (arr[j] > arr[j + 1]) {

                //Swap the two elements
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    return arr;
}`,
    'selection': `function selectionSort(arr) {

    const len = arr.length;

    for(let i = 0; i < len; i++) {

        // Assume the minimum is the first element
        let min = i;

        for (let j = i + 1; j < len; j++) {

            // Check for new minimum value
            if (arr[j] < arr[min]) {
                min = j;
            }
        }

        // Swap min element into position
        if (i !== min) {
            let temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    }

    return arr;
}`,

'insertion': `function insertionSort(arr) {

    const len = arr.length;

    // Loop through every element
    for(let i = 1; i < len; i++) {

        let j = i;

        // Swap adjacent elements until the correct 
        // position is found for the current item
        while (j > 0 && arr[j - 1] > arr[j]) {
            let temp = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = temp;
            j--;
        }
    }

    return arr;
}`,

'minMax': `function minMaxSort(arr) {

    const len = arr.length;

    for(let i = 0; i < Math.floor(len/2); i++) {

        let min = i, max = i;

        for(let j = i + 1; j < len - i; j++) {

            if(arr[j] < arr[min]) {
                min = j;
            }
            if(arr[j] > arr[max]) {
                max = j;
            }
        }

        // Swap min and max into place
        if(min != i) {
            let temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
        // If max was moved when min was moved, update its index
        if(max === i) {
            max = min;
        }
        if(max != len - i - 1) {
            let temp = arr[len - i - 1];
            arr[len - i - 1] = arr[max];
            arr[max] = temp;
        }
    }

    return arr;
}`,
'cocktail': `function cocktailSort(arr) {

    const len = arr.length;

    let swapped = true;

    while(swapped) {

        swapped = false;

        // Forward pass
        for(let i = 0; i < len; i++) {
            if(arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }

        if(!swapped) {
            break;
        }

        swapped = false;

        // Backward pass
        for(let i = len - 1; i >= 0; i--) {
            if(arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
    }

    return arr;
}`,
'heap': `function heapSort(arr) {

    const len = arr.length;

    // Function to heapify a subtree rooted at node i
    function heapify(i, size) {
        let max = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < size && arr[left] > arr[max]) {
            max = left;
        }

        if (right < size && arr[right] > arr[max]) {
            max = right;
        }

        if (max != i) {
            let temp = arr[i];
            arr[i] = arr[max];
            arr[max] = temp;

            // Recursively heapify the affected subtree
            heapify(max, size);
        }
    }

    // Build the max heap (rearrange the array)
    for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
        heapify(i, len);
    }

    // Extract elements from heap one by one
    for (let i = len - 1; i >= 0; i--) {
        // Move current root to the end
        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        // Call heapify on the reduced heap
        heapify(0, i);
    }

    return arr;
}`,
'quick': `function quickSort(arr) {
    function partition(start, end) {
        let pivotValue = arr[end];
        let pivotIndex = start;

        for (let i = start; i < end; i++) {
            if (arr[i] < pivotValue) {
                // Swap elements at indices i and pivotIndex
                let temp = arr[i];
                arr[i] = arr[pivotIndex];
                arr[pivotIndex] = temp;
                pivotIndex++;
            }
        }

        // Swap pivot element with element on pivot index
        let temp = arr[end];
        arr[end] = arr[pivotIndex];
        arr[pivotIndex] = temp;

        return pivotIndex;
    }

    function quickSortHelper(start, end) {
        if (start < end) {
            let pivotIndex = partition(start, end);

            // Recursively call the helper for elements on
            // the left of pivot and on the right of pivot
            quickSortHelper(start, pivotIndex - 1);
            quickSortHelper(pivotIndex + 1, end);
        }
    }

    quickSortHelper(0, arr.length - 1);
    return arr;
}
// Always using the end element can produce consistently
// bad pivots when the array is already almost sorted.
// See optimized code for use of the median element as a pivot.`,
'merge': `function mergeSort(arr) {

    // The function for merging two sorted arrays
    function merge(leftArr, rightArr) {
        let sorted = [];
        while (leftArr.length && rightArr.length) {
            if (leftArr[0] <= rightArr[0]) {
                sorted.push(leftArr.shift());
            } else {
                sorted.push(rightArr.shift());
            }
        }
        return sorted.concat(leftArr.slice().concat(rightArr.slice()));
    }

    // The function for sorting arrays by splitting them, sorting each half,
    // and then merging them together
    function mergeSortHelper(arr) {
        if (arr.length <= 1) {
            return arr;
        }
        let middle = Math.floor(arr.length / 2);
        let leftArr = arr.slice(0, middle);
        let rightArr = arr.slice(middle);
        return merge(mergeSortHelper(leftArr), mergeSortHelper(rightArr));
    }

    return mergeSortHelper(arr);
}
// See optimized code for
// memory usage improvement`,
'bogo': `function bogoSort(arr) {

    // Helper function to shuffle an array
    function shuffle(array) {
        let counter = array.length;

        while (counter > 0) {
            let index = Math.floor(Math.random() * counter);

            counter--;

            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
    };

    // Function to check if array is sorted
    function isSorted(array) {
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] > array[i + 1]) {
                return false;
            }
        }

        return true;
    };

    // Keep shuffling the array until it is sorted
    while (!isSorted(arr)) {
        shuffle(arr);
    }

    return arr;
}
// This is a randomized bogosort because it does not
// keep track of which permutations it has already tried

// See optimized implementation for deterministic verison`,
'tim': `function timSort(arr) {
    // Increase or decrease depending on size of the data,
    // but typically you want a power of 2.
    const RUN = 32;

    // Function to find minimum of two numbers
    function min(a, b) {
        return (a < b) ? a : b;
    }

    // Perform insertion sort
    function insertionSort(arr, left, right) {
        for(let i = left + 1; i <= right; i++) {
            let temp = arr[i];
            let j = i - 1;
            while(arr[j] > temp && j >= left) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = temp;
        }
    }

    // Merge function to merge the sorted runs
    function merge(arr, l, m, r) {
        let len1 = m - l + 1;
        let len2 = r - m;
        let left = new Array(len1);
        let right = new Array(len2);
        for(let x = 0; x < len1; x++) {
            left[x] = arr[l + x];
        }
        for(let x = 0; x < len2; x++) {
            right[x] = arr[m + 1 + x];
        }

        let i = 0;
        let j = 0;
        let k = l;

        while(i < len1 && j < len2) {
            if(left[i] <= right[j]) {
                arr[k] = left[i];
                i++;
            } else {
                arr[k] = right[j];
                j++;
            }
            k++;
        }

        while(i < len1) {
            arr[k] = left[i];
            k++;
            i++;
        }

        while(j < len2) {
            arr[k] = right[j];
            k++;
            j++;
        }
    }

    // Main function to implement Timsort
    const len = arr.length;
    for(let i = 0; i < len; i += RUN) {
        insertionSort(arr, i, min((i + 31), (len - 1)));
    }

    for(let size = RUN; size < len; size = 2 * size) {
        for(let left = 0; left < len; left += 2 * size) {
            let mid = left + size - 1;
            let right = min((left + 2 * size - 1), (len - 1));
            merge(arr, left, mid, right);
        }
    }

    return arr;
}`
}

const optimizedAlgoSortCode = {
    'bubble': `function optimizedBubbleSort(arr){
    
    const len = arr.length;
    
    // Stops sorting once no swaps are made
    // for one whole iteration of the array
    do {

        // Using 'var' instead of 'let' to
        // avoid error in while condition
        var swapped = false;

        for (let i = 0; i < len - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true
            }
        }
    } while (swapped)
    return arr;
} 
// See "Cocktail Sort" for more optimization`,
'selection': `// see "Minmax Sort"
// see "Heap Sort"`,

'insertion': `function optimizedInsertionSort(arr) {

    const len = arr.length;

    for (let i = 1; i < len; i++) {

        // Store the current value so it can be placed correctly
        let current = arr[i];

        // Instead of swapping every time, find the
        // correct location and then perform the swap
        let j = i - 1;
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }

        // Place the current item in the correct spot
        arr[j + 1] = current;
    }
    return arr;
}`,
'minMax': `// See "Heap Sort"`,
'cocktail': `function optimizedCocktailSort(arr) {

    const len = arr.length;

    // Optimized by remembering which elements are
    // already sorted, as to not pass over them again
    let start = 0;
    let end = len - 1;
    let swapped = true;

    while(swapped) {

        swapped = false;

        // Forward pass
        for(let i = start; i < end; i++) {
            if(arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }

        if(!swapped) {
            break;
        }

        swapped = false;
        end--;

        // Backward pass
        for(let i = end - 1; i >= start; i--) {
            if(arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }

        start++;
    }

    return arr;
}`,
'heap': `// Only minor optimizations with context`,
'quick': `function optimizedQuickSort(arr) {
    function medianOfThree(a, b, c) {
        if ((arr[a] - arr[b]) * (arr[c] - arr[a]) >= 0) {
            return a;
        } else if ((arr[b] - arr[a]) * (arr[c] - arr[b]) >= 0) {
            return b;
        } else {
            return c;
        }
    }

    function partition(start, end) {
        let mid = Math.floor((start + end) / 2);
        let pivotIndex = medianOfThree(start, mid, end);
        let pivotValue = arr[pivotIndex];

        // Move the pivot to the end
        [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
        pivotIndex = start;

        for (let i = start; i < end; i++) {
            if (arr[i] < pivotValue) {
                [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
                pivotIndex++;
            }
        }

        // Move pivot to its final place
        [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
        return pivotIndex;
    }

    function quickSortHelper(start, end) {
        if (start >= end) {
            return;
        }

        let pivotIndex = partition(start, end);

        quickSortHelper(start, pivotIndex - 1);
        quickSortHelper(pivotIndex + 1, end);
    }

    quickSortHelper(0, arr.length - 1);
    return arr;
}`,
'merge': `function optimizedMergeSort(arr) {
    // Temporary array used for merging subarrays
    let temp = Array(arr.length);

    // The function for merging two sorted subarrays
    function merge(leftStart, mid, rightEnd) {
        let leftEnd = mid;
        let rightStart = mid + 1;
        let left = leftStart;
        let right = rightStart;

        // Index for writing to the temporary array
        for (let i = leftStart; i <= rightEnd; i++) {
            // If left run head exists and is <= existing right run head
            if (left <= leftEnd && (right > rightEnd || arr[left] <= arr[right])) {
                temp[i] = arr[left];
                left++;
            } else {
                temp[i] = arr[right];
                right++;
            }
        }

        // Copy the sorted subarray from the temporary array back to the original array
        for (let i = leftStart; i <= rightEnd; i++) {
            arr[i] = temp[i];
        }
    }

    // The function for sorting arrays by splitting them, sorting each half,
    // and then merging them together
    function mergeSortHelper(leftStart, rightEnd) {
        if (leftStart < rightEnd) {
            let mid = Math.floor((leftStart + rightEnd) / 2);
            mergeSortHelper(leftStart, mid);
            mergeSortHelper(mid + 1, rightEnd);
            merge(leftStart, mid, rightEnd);
        }
    }

    mergeSortHelper(0, arr.length - 1);
    return arr;
}`,
'bogo': `function optimizedBogoSort(arr) {

    // Function to check if array is sorted
    function isSorted(array) {
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] > array[i + 1]) {
                return false;
            }
        }
        return true;
    };

    // Uses generator function to not calcuate all
    // permutations at once, but only up until one is sorted
    function* permute(array, l = 0, r = array.length - 1) {
        if (l === r) {
            yield array.slice();
        } else {
            for (let i = l; i <= r; i++) {
                // swap
                [array[l], array[i]] = [array[i], array[l]];

                yield* permute(array, l + 1, r);

                // backtrack
                [array[l], array[i]] = [array[i], array[l]];
            }
        }
    }

    // Go through all permutations of the array until we find a sorted one
    for (let perm of permute(arr)) {
        if (isSorted(perm)) {
            return perm;
        }
    }

    // If we haven't returned inside the loop, something went wrong.
    throw new Error("Could not sort array");
}`,
'tim': `
// Timsort is already one of the most optimized sorting algorithms.
// Can be improved by adjusting the value of RUN for the data.`
}