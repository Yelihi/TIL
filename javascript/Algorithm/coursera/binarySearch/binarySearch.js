function binarySearch(array, key) {
  let leftIndex = 0;
  let rightIndex = array.length - 1;
  while (leftIndex <= rightIndex) {
    let midIndex = leftIndex + (rightIndex - leftIndex) / 2;
    if (array[midIndex] > key) rightIndex = midIndex;
    else if (array[midIndex] < midIndex) leftIndex = midIndex;
    else return midIndex;
  }
  return -1;
}

console.log(binarySearch([1, 2, 3, 4, 5], 3));
