function binarySearch(array, key) {
  let leftIndex = 0;
  let rightIndex = array.length - 1;
  while (leftIndex <= rightIndex) {
    let midIndex = leftIndex + (rightIndex - leftIndex) / 2;
    if (array[midIndex] > key) rightIndex = midIndex;
    else if (array[midIndex] < key) leftIndex = midIndex;
    else return midIndex;
  }
  return -1;
}

console.log(binarySearch([1, 2, 4, 3, 8], 3));
