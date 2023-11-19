/**
 * @param {Array<number>} arr The input integer array to be searched.
 * @param {number} target The target integer to search within the array.
 * @return {number} The index of target element in the array, or -1 if not found.
 */
export default function binarySearch(arr, target) {
  // Initialize the left and right indices of the array
  let left = 0;
  let right = arr.length - 1;

  // Keep searching until the left and right indices meet.
  while (left <= right) {
    // Calculate the mid index to retrieve the mid element later.
    const mid = Math.floor((left + right) / 2);

    if (target < arr[mid]) {
      // If the target element is less than the middle element,
      // search the left half of the array.
      // Adjust the right index so the next loop iteration
      // searches the left side.
      right = mid - 1;
    } else if (target > arr[mid]) {
      // If the target element is greater than the middle element,
      // search the right half of the array.
      // Adjust the left index so the next loop iteration
      // searches the left side.
      left = mid + 1;
    } else {
      // If the target element is equal to the middle element,
      // return the index of the middle element.
      return mid;
    }
  }

  // If the element is not found, return -1.
  return -1;
}

// 재귀방식

/**
 * @param {Array<number>} arr The input integer array to be searched.
 * @param {number} target Target integer to search within the array
 * @return {number} Index of target element in the array, or -1 if not found
 */
export default function binarySearch(arr, target) {
  return binarySearchImpl(arr, target, 0, arr.length - 1);
}

function binarySearchImpl(arr, target, left, right) {
  // Return immediately if the range to search is empty,
  // since the target element hasn't been found / won't be found.
  if (left > right) {
    return -1;
  }

  // Calculate the mid index to retrieve the mid element later.
  const mid = Math.floor((left + right) / 2);

  if (target < arr[mid]) {
    // If the target element is less than the middle element,
    // search the left half of the array and adjust the input
    // array passed into the recursive call accordingly.
    return binarySearchImpl(arr, target, left, mid - 1);
  }

  if (target > arr[mid]) {
    // If the target element is greater than the middle element,
    // search the right half of the array and adjust the input
    // array passed into the recursive call accordingly.
    return binarySearchImpl(arr, target, mid + 1, right);
  }

  // If the target element is equal to the middle element,
  // return the index of the middle element
  return mid;
}