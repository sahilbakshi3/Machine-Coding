const sampleData = [1, 2, [3, 4, [5, 6, [7, 8, 9, [10]]]]];

// inbuilt function in js for flattening
console.log(sampleData.flat());
console.log(sampleData.flat(3));

// if all are numbers in an array
// we can use the toString method and then the split method which can covert it into an array.
console.log(sampleData.toString().split(",").map(Number));

function flatten(arr, level = 100) {
  const res = [];

  arr.forEach((element) => {
    if (Array.isArray(element) && level > 0) {
      // method to call on array
      res.push(...flatten(element, level - 1));
    } else {
      res.push(element);
    }
  });

  return res;
}

console.log(flatten(sampleData, 2));
