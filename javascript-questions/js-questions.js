// Basic Operations (1-20)

// Given [3, 7, 2, 9, 1], return the largest number.

// function maxNumber(arr) {
//   const maxi = Math.max(...arr);
//   return maxi;
// }

// console.log(maxNumber([3, 7, 2, 9, 1]));

// Given [10, 5, 8, 3, 6], return the smallest number.

// function minNumber(arr) {
//   const mini = Math.min(...arr);
//   return mini;
// }

// console.log(minNumber([10, 5, 8, 3, 6]));

// Given ['hello', 'world', 'javascript'], join them into a single string with spaces.

// function singleString(arr) {
//   const arrJoin = arr.join(" ");
//   return arrJoin;
// }

// console.log(singleString(["hello", "world", "javascript"]));

// Given [1, 2, 3, 4, 5], reverse the array.

// function reverseArray(arr) {
//   const rev = arr.reverse();
//   return rev;
// }

// console.log(reverseArray([1, 2, 3, 4, 5]));

// Given [1, 2, 3] and [4, 5, 6], combine them into one array.

// function combineArray(arr1, arr2) {
//   const comb = [...arr1, ...arr2];
//   return comb;
// }

// console.log(combineArray([1, 2, 3], [4, 5, 6]));

// Given ['apple', 'banana', 'cherry'], check if 'banana' exists in the array.

// function checkExists(arr) {
//   const check = arr.some((p) => p === "banana");
//   const check = arr.includes("banana");
//   return check;
// }

// console.log(checkExists(["apple", "banana", "cherry"]));

// Given [1, 2, 3, 4, 5], get the first 3 elements.

// function firstThree(arr) {
//   const number = arr.slice(0, 3);
//   return number;
// }

// console.log(firstThree([1, 2, 3, 4, 5]));

// Given [1, 2, 3, 4, 5], get the last 2 elements.

// function lastThree(arr) {
//   const number = arr.slice(-2);
//   return number;
// }

// console.log(lastThree([1, 2, 3, 4, 5]));

// Given [1, 2, 3, 4, 5], remove the first element and return the new array.

// function removeElement(arr) {
//   const ele = arr.slice(1);
//   return ele;
// }

// console.log(removeElement([1, 2, 3, 4, 5]));

// Given [1, 2, 3, 4, 5], remove the last element and return the new array.

// function removeLastElement(arr) {
//   const ele = arr.slice(0, -1);
//   return ele;
// }

// console.log(removeLastElement([1, 2, 3, 4, 5]));

// Given [5, 10, 15, 20], check if any number is greater than 18.
// Given [2, 4, 6, 8, 10], check if all numbers are less than 15.
// Given [1, 2, 3, 4, 5], return true if the array contains the number 3.

// function checkElement(arr) {
//   const check = arr.some((item) => item === 3);
//   return check;
// }

// console.log(checkElement([1, 2, 3, 4, 5]));

// Given ['red', 'blue', 'green'], find the index of 'blue'.

// function checkIndex(arr) {
//   const check = arr.indexOf("blue");
//   return check;
// }

// console.log(checkIndex(["red", "blue", "green"]));

// Given [10, 20, 30, 40, 50], return the element at index 2.
// Given [100, 200, 300], add the number 400 to the end.
// Given [2, 4, 6], add the number 0 to the beginning.
// Given [5, 10, 15, 20, 25], create a new array with elements from index 1 to 3.
// Given [1, 2, 3, 4, 5], return the array in reverse order without modifying the original.
// const arr = [1, 2, 3, 4, 5];

// function reverse(arr) {
//   const rev = arr.slice().reverse();
//   return rev;
// }

// console.log(reverse(arr));
// console.log(arr);

// Given ['a', 'b', 'c'], convert to uppercase letters.

// function upper(arr) {
//   const up = arr.map((x) => x.toUpperCase());
//   return up;
// }

// console.log(upper(["a", "b", "c"]));

// Filtering & Searching (21-40)

// Given [12, 5, 8, 130, 44], return all numbers greater than 10.
// Given ['apple', 'apricot', 'banana', 'avocado'], return words starting with 'a'.
// Given [1, 2, 3, 4, 5, 6, 7, 8, 9], return only odd numbers.
// Given [-3, -1, 0, 2, 5], return only positive numbers.
// Given ['', 'hello', null, 'world', undefined, 'test'], remove all falsy values.
// Given [10, 25, 30, 15, 40], return numbers between 15 and 35.
// Given [{name: 'John', active: true}, {name: 'Jane', active: false}], return only active users.
// Given ['short', 'a', 'longer word', 'tiny'], return words longer than 4 characters.
// Given [3, 7, 2, 9, 15, 4], return the first number divisible by 3.
// Given [5, 10, 15, 20, 25], find the last number less than 20.
// Given [{id: 1, completed: true}, {id: 2, completed: false}], find the task with id 2.
// Given ['cat', 'dog', 'bird', 'fish'], check if 'dog' exists.
// Given [2, 4, 6, 8, 10], return numbers not equal to 6.
// Given ['JavaScript', 'Python', 'Java', 'C++'], return languages containing 'Java'.
// Given [1, 2, 3, 4, 5, 6], return numbers that are NOT divisible by 2.
// Given [{age: 25}, {age: 17}, {age: 30}], return objects where age is 18 or more.
// Given [10, 20, 30, 40], find the index of 30.
// Given ['test', 'hello', 'test', 'world'], find the last index of 'test'.
// Given [1, 3, 5, 7, 9], check if the number 4 exists.
// Given [{price: 100}, {price: 50}, {price: 150}], return items with price under 100.

// Transformations (41-60)

// Given [1, 2, 3, 4, 5], multiply each number by 10.
// Given ['hello', 'world'], return the length of each string.
// Given [1, 2, 3], return each number as a string.
// Given ['1', '2', '3'], convert each string to a number.
// Given [{name: 'John'}, {name: 'Jane'}], extract just the names into an array.
// Given [1, 2, 3, 4, 5], return each number squared.
// Given ['apple', 'banana'], add ' fruit' to the end of each word.
// Given [10, 20, 30], divide each number by 10.
// Given [{firstName: 'John', lastName: 'Doe'}], create full names as 'John Doe'.
// Given [true, false, true], convert to 1s and 0s.
// Given [1, 2, 3], create objects with a 'value' property for each number.
// Given ['a', 'b', 'c'], return each letter with its index like 'a-0'.
// Given [5, 10, 15], return the difference between each number and 100.
// Given [{x: 1, y: 2}, {x: 3, y: 4}], return array of only x values.
// Given [2, 4, 6], return each number raised to the power of 3.
// Given ['John', 'Jane', 'Bob'], create email addresses like 'john@example.com'.
// Given [100, 200, 300], return each number with 10% added.
// Given ['red', 'blue', 'green'], create objects with color and length properties.
// Given [1, 2, 3, 4, 5], return only even numbers squared.
// Given [10, 20, 30, 40, 50], return numbers greater than 25, then double them.

// Aggregations (61-80)

// Given [5, 10, 15, 20], calculate the product of all numbers.
// Given ['Hello', ' ', 'World', '!'], concatenate into one string.
// Given [1, 2, 3, 4, 5], calculate the average.
// Given [[1, 2], [3, 4], [5, 6]], count the total number of elements.
// Given [{quantity: 2}, {quantity: 3}, {quantity: 5}], sum all quantities.
// Given ['a', 'b', 'c', 'd', 'e'], create a single string without separators.
// Given [true, false, true, true, false], count how many are true.
// Given [10, 5, 8, 20, 3], find the difference between max and min.
// Given [{price: 10, qty: 2}, {price: 5, qty: 3}], calculate total cost.
// Given [1, 2, 3, 4, 5], create an object with sum, min, and max properties.
// Given ['apple', 'banana', 'cherry'], find the longest word.
// Given ['a', 'bb', 'ccc'], calculate the total length of all strings.
// Given [2, 4, 6, 8], check if the sum is greater than 15.
// Given [{score: 80}, {score: 90}, {score: 70}], calculate average score.
// Given [5, 5, 5, 5], multiply all numbers together.
// Given [[1, 2], [3], [4, 5, 6]], flatten and sum all numbers.
// Given ['red', 'green', 'blue', 'yellow'], find the shortest word.
// Given [10, 20, 30, 40, 50], calculate the median value.
// Given [{count: 5}, {count: 10}, {count: 15}], find the maximum count.
// Given [1, -2, 3, -4, 5], sum only the positive numbers.

// Complex Operations (81-100)

// Given [3, 1, 4, 1, 5, 9, 2, 6], sort in descending order.
// Given [{name: 'John', age: 30}, {name: 'Jane', age: 25}], sort by age.
// Given ['banana', 'apple', 'cherry'], sort alphabetically.
// Given [1, 2, 3, 2, 4, 3, 5], count occurrences of each number.
// Given [1, 2, 3, 4, 5, 6, 7, 8], split into chunks of 3.
// Given ['a1', 'b2', 'a3', 'b4'], group by first letter.
// Given [1, 2, 2, 3, 3, 3, 4], return only elements that appear more than once.
// Given [10, 20, 30, 40, 50], return every other element.
// Given two arrays [1, 2, 3] and [2, 3, 4], find elements only in the first array.
// Given [5, 2, 8, 1, 9], return the second largest number.
// Given ['the', 'quick', 'brown', 'fox'], find the word with most vowels.
// Given [1, 2, 3, 4, 5], create all possible pairs.
// Given [{name: 'John', dept: 'IT'}, {name: 'Jane', dept: 'HR'}], group by department.
// Given [10, 20, 30, 40], calculate running totals [10, 30, 60, 100].
// Given ['apple', 'banana', 'apricot'], create an object with first letter as key and array of words as value.
// Given [1, 2, 3, 4, 5, 6], rotate the array right by 2 positions.
// Given [[1, 2, 3], [4, 5], [6]], find the sub-array with the largest sum.
// Given [3, 7, 3, 3, 7, 9, 9], find the number that appears most frequently.
// Given ['racecar', 'hello', 'level'], return only palindromes.
// Given [{id: 1, parentId: null}, {id: 2, parentId: 1}], organize into a tree structure.
