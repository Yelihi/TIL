// 교집합

function intersectSets(setA, setB) {
  let intersect = new Set();
  for (let elem of setA) {
    if (setB.has(elem)) {
      intersect.add(elem);
    }
  }

  return intersect;
}

console.log(intersectSets(new Set([1, 1, 2, 2, 3]), new Set([1, 2, 2, 4, 5])));

// 상위 집합 확인

function isSuperSet(setA, superSet) {
  for (let elem of setA) {
    if (!superSet.has(elem)) {
      return false;
    }
  }

  return true;
}

// 합집합

function unionSet(setA, setB) {
  let unionSet = new Set(setB);
  for (let elem of setA) {
    unionSet.add(elem);
  }
  return unionSet;
}

// 차집합

function differenceSet(setA, setB) {
  let differSet = new Set(setA);
  for (let elem of setB) {
    differSet.delete(elem);
  }

  return differSet;
}
