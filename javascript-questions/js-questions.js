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

// function checkNumber(arr) {
//   const check = arr.some((item) => item > 18);
//   return check;
// }

// console.log(checkNumber([5, 10, 15, 20]));

// Given [2, 4, 6, 8, 10], check if all numbers are less than 15.

// function checkNumber(arr) {
//   const check = arr.every((item) => item < 15);
//   return check;
// }

// console.log(checkNumber([2, 4, 6, 8, 10]));

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

// function index(arr) {
//   return arr[2];
// }

// console.log(index([10, 20, 30, 40, 50]));

// Given [100, 200, 300], add the number 400 to the end.

// function addNumber(arr) {
//   return [...arr, 400];
// }

// console.log(addNumber([100, 200, 300]));

// Given [2, 4, 6], add the number 0 to the beginning.

// function addNumber(arr) {
//   return [0, ...arr];
// }

// console.log(addNumber([2, 4, 6]));

// Given [5, 10, 15, 20, 25], create a new array with elements from index 1 to 3.

// function newArray(arr) {
//   const res = arr.slice(1, 4);
//   return res;
// }

// console.log(newArray([5, 10, 15, 20, 25]));

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

{
  /*----------------------------------------------------------------------------------------- */
}

// Filtering & Searching (21-40)

// Given [12, 5, 8, 130, 44], return all numbers greater than 10.

// function greaterThan10(arr) {
//   const res = arr.filter((n) => n > 10);
//   return res;
// }

// console.log(greaterThan10([12, 5, 8, 130, 44]));

// Given ['apple', 'apricot', 'banana', 'avocado'], return words starting with 'a'.

// function stastrWithA(arr) {
//   const res = arr.filter((item) => item.startsWith("a"));
//   return res;
// }

// console.log(stastrWithA(["apple", "apricot", "banana", "avocado"]));

// Given [1, 2, 3, 4, 5, 6, 7, 8, 9], return only odd numbers.

// function oddNumbers(arr) {
//   const res = arr.filter((n) => n % 2);
//   return res;
// }

// console.log(oddNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9]));

// Given [-3, -1, 0, 2, 5], return only positive numbers.

// function positiveNumbers(arr) {
//   const res = arr.filter((n) => n > 0);
//   return res;
// }

// console.log(positiveNumbers([-3, -1, 0, 2, 5]));

// Given ['', 'hello', null, 'world', undefined, 'test'], remove all falsy values.

// function removeFalsyValue(arr) {
//   const res = arr.filter(Boolean);
//   return res;
// }

// console.log(removeFalsyValue(["", "hello", null, "world", undefined, "test"]));

// Given [10, 25, 30, 15, 40], return numbers between 15 and 35.

// function returnNumbers(arr) {
//   const res = arr.filter((n) => n > 15 && n < 35);
//   return res;
// }

// console.log(returnNumbers([10, 25, 30, 15, 40]));

// Given [{name: 'John', active: true}, {name: 'Jane', active: false}], return only active users.

// function activeUsers(arr) {
//   const res = arr.filter((user) => user.active);
//   return res;
// }

// console.log(
//   activeUsers([
//     { name: "John", active: true },
//     { name: "Jane", active: false },
//   ])
// );

// Given ['short', 'a', 'longer word', 'tiny'], return words longer than 4 characters.

// function longerThan4Char(arr) {
//   const res = arr.filter((n) => n.length > 4);
//   return res;
// }

// console.log(longerThan4Char(["short", "a", "longer word", "tiny"]));

// Given [3, 7, 2, 9, 15, 4], return the first number divisible by 3.

// function firstNumberDivBy3(arr) {
//   const res = arr.filter((n) => n % 3 === 0);
//   return res;
// }

// console.log(firstNumberDivBy3([3, 7, 2, 9, 15, 4]));

// Given [5, 10, 15, 20, 25], find the last number less than 20.

// function findLastNum(arr) {
//   //   const res = arr.findLast((n) => n < 20);
//   const res = arr
//     .slice()
//     .reverse()
//     .find((n) => n < 20);
//   return res;
// }
// console.log(findLastNum([5, 10, 15, 20, 25]));

// Given [{id: 1, completed: true}, {id: 2, completed: false}], find the task with id 2.

// function findTask(arr) {
//   const res = arr.find((n) => n.id === 2);
//   return res;
// }

// console.log(
//   findTask([
//     { id: 1, completed: true },
//     { id: 2, completed: false },
//   ])
// );

// Given ['cat', 'dog', 'bird', 'fish'], check if 'dog' exists.

// function dogExists(arr) {
//   //   const res = arr.some((item) => item === "dog");
//   const res = arr.includes("dog");
//   return res;
// }

// console.log(dogExists(["cat", "dog", "bird", "fish"]));

// Given [2, 4, 6, 8, 10], return numbers not equal to 6.

// function numberNotEqual(arr) {
//   const res = arr.filter((item) => item !== 6);
//   return res;
// }

// console.log(numberNotEqual([2, 4, 6, 8, 10]));

// Given ['JavaScript', 'Python', 'Java', 'C++'], return languages containing 'Java'.

// function languagesContainingJava(arr) {
//   const res = arr.filter((item) => item.includes("Java"));
//   return res;
// }

// console.log(languagesContainingJava(["JavaScript", "Python", "Java", "C++"]));

// Given [1, 2, 3, 4, 5, 6], return numbers that are NOT divisible by 2.

// function notDivisibleBy2(arr) {
//   const res = arr.filter((item) => item % 2 !== 0);
//   return res;
// }

// console.log(notDivisibleBy2([1, 2, 3, 4, 5, 6]));

// Given [{age: 25}, {age: 17}, {age: 30}], return objects where age is 18 or more.

// function ageMoreThan18(arr) {
//   const res = arr.filter((item) => item.age >= 18);
//   return res;
// }

// console.log(ageMoreThan18([{ age: 25 }, { age: 17 }, { age: 30 }]));

// Given [10, 20, 30, 40], find the index of 30.

// function indexOf30(arr) {
//   const res = arr.indexOf(30);
//   return res;
// }

// console.log(indexOf30([10, 20, 30, 40]));

// Given ['test', 'hello', 'test', 'world'], find the last index of 'test'.

// function lastIndexOfTest(arr) {
//   const res = arr.lastIndexOf("test");
//   return res;
// }

// console.log(lastIndexOfTest(["test", "hello", "test", "world"]));

// Given [1, 3, 5, 7, 9], check if the number 4 exists.

// function check4Exists(arr) {
//   //   const res = arr.some((item) => item === 4);
//   const res = arr.includes(4);
//   return res;
// }

// console.log(check4Exists([1, 3, 5, 7, 9]));

// Given [{price: 100}, {price: 50}, {price: 150}], return items with price under 100.

// function priceUnder100(arr) {
//   const res = arr.filter((item) => item.price < 100);
//   return res;
// }

// console.log(priceUnder100([{ price: 100 }, { price: 50 }, { price: 150 }]));

{
  /* ---------------------------------------------------------------- */
}
// Transformations (41-60)

// Given [1, 2, 3, 4, 5], multiply each number by 10.

// function multiplyNumberBy10(arr) {
//   const res = arr.map((item) => item * 10);
//   return res;
// }

// console.log(multiplyNumberBy10([1, 2, 3, 4, 5]));

// Given ['hello', 'world'], return the length of each string.

// function lengthofString(arr) {
//   const res = arr.map((item) => item.length);
//   return res;
// }

// console.log(lengthofString(["hello", "world"]));

// Given [1, 2, 3], return each number as a string.

// function conertToString(arr) {
//   const res = arr.map(String);
//   return res;
// }

// console.log(conertToString([1, 2, 3]));

// Given ['1', '2', '3'], convert each string to a number.

// function convertToNumber(arr) {
//   const res = arr.map(Number);
//   return res;
// }

// console.log(convertToNumber(["1", "2", "3"]));

// Given [{name: 'John'}, {name: 'Jane'}], extract just the names into an array.

// function extractNameToArray(arr) {
//   const res = arr.map((item) => item.name);
//   return res;
// }

// console.log(extractNameToArray([{ name: "John" }, { name: "Jane" }]));

// Given [1, 2, 3, 4, 5], return each number squared.

// function numberSquared(arr) {
//   const res = arr.map((item) => item * item);
//   return res;
// }

// console.log(numberSquared([1, 2, 3, 4, 5]));

// Given ['apple', 'banana'], add ' fruit' to the end of each word.

// function addFruit(arr) {
//   const res = arr.map((item) => item + "fruit");
//   return res;
// }

// console.log(addFruit(["apple", "banana"]));

// Given [10, 20, 30], divide each number by 10.

// function divideNumber10(arr) {
//   const res = arr.map((item) => item / 10);
//   return res;
// }

// console.log(divideNumber10([10, 20, 30]));

// Given [{firstName: 'John', lastName: 'Doe'}], create full names as 'John Doe'.

// function fullNames(arr) {
//   const res = arr.map((item) => `${item.firstName} ${item.lastName}`);
//   return res;
// }

// console.log(fullNames([{ firstName: "John", lastName: "Doe" }]));

// Given [true, false, true], convert to 1s and 0s.

// function convertTrueAndFalse(arr) {
//   const res = arr.map((item) => (item ? 1 : 0));
//   return res;
// }

// console.log(convertTrueAndFalse([true, false, true]));

// Given [1, 2, 3], create objects with a 'value' property for each number.

// function objectsValue(arr) {
//   const res = arr.map((item) => ({ value: item }));
//   return res;
// }

// console.log(objectsValue([1, 2, 3]));

// Given ['a', 'b', 'c'], return each letter with its index like 'a-0'.

// function valueToIndex(arr) {
//   const res = arr.map((value, index) => `${value}-${index}`);
//   return res;
// }

// console.log(valueToIndex(["a", "b", "c"]));

// Given [5, 10, 15], return the difference between each number and 100.

// function differenceNumber(arr) {
//   const res = arr.map((item) => 100 - item);
//   return res;
// }

// console.log(differenceNumber([5, 10, 15]));

// Given [{x: 1, y: 2}, {x: 3, y: 4}], return array of only x values.

// function xValues(arr) {
//   const res = arr.map((item) => item.x);
//   return res;
// }
// console.log(
//   xValues([
//     { x: 1, y: 2 },
//     { x: 3, y: 4 },
//   ])
// );

// Given [2, 4, 6], return each number raised to the power of 3.

// function powerOf3(arr) {
//   const res = arr.map((item) => item ** 3);
//   return res;
// }

// console.log(powerOf3([2, 4, 6]));

// Given ['John', 'Jane', 'Bob'], create email addresses like 'john@example.com'.

// function emailAddress(arr) {
//   const res = arr.map((item) => `${item.toLowerCase()}@example.com`);
//   return res;
// }

// console.log(emailAddress(["John", "Jane", "Bob"]));

// Given [100, 200, 300], return each number with 10% added.

// function percent10Added(arr) {
//   const res = arr.map((item) => item * 1.1);
//   return res;
// }

// console.log(percent10Added([100, 200, 300]));

// Given ['red', 'blue', 'green'], create objects with color and length properties.

// function objectsWithColor(arr) {
//   const res = arr.map((item) => ({ color: item, length: item.length }));
//   return res;
// }

// console.log(objectsWithColor(["red", "blue", "green"]));

// Given [1, 2, 3, 4, 5], return only even numbers squared.

// function evenNumberSquared(arr) {
//   const res = arr.filter((item) => item % 2 === 0).map((item) => item ** 2);
//   return res;
// }

// console.log(evenNumberSquared([1, 2, 3, 4, 5]));

// Given [10, 20, 30, 40, 50], return numbers greater than 25, then double them.

// function greaterThan25(arr) {
//   const res = arr.filter((item) => item > 25).map((item) => item * 2);
//   return res;
// }

// console.log(greaterThan25([10, 20, 30, 40, 50]));

{
  /* ----------------------------------------------------------------- */
}
// Aggregations (61-80)

// Given [5, 10, 15, 20], calculate the product of all numbers.

// function productOfNumbers(arr) {
//   const res = arr.reduce((prod, i) => prod * i, 1);
//   return res;
// }

// console.log(productOfNumbers([5, 10, 15, 20]));

// Given ['Hello', ' ', 'World', '!'], concatenate into one string.

// function concatTo1Str(arr) {
//   const res = arr.join("");
//   return res;
// }

// console.log(concatTo1Str(["Hello", " ", "World", "!"]));

// Given [1, 2, 3, 4, 5], calculate the average.

// function calcAverage(arr) {
//   const res = arr.reduce((a, b) => a + b, 0) / arr.length;
//   return res;
// }

// console.log(calcAverage([1, 2, 3, 4, 5]));

// Given [[1, 2], [3, 4], [5, 6]], count the total number of elements.

// function totalElements(arr) {
//   const res = arr.flat(1).length;
//   return res;
// }

// console.log(
//   totalElements([
//     [1, 2],
//     [3, 4],
//     [5, 6],
//   ])
// );

// Given [{quantity: 2}, {quantity: 3}, {quantity: 5}], sum all quantities.

// function sumAllQuantities(arr) {
//   const res = arr.reduce((sum, index) => sum + index.quantity, 0);
//   return res;
// }

// console.log(
//   sumAllQuantities([{ quantity: 2 }, { quantity: 3 }, { quantity: 5 }])
// );

// Given ['a', 'b', 'c', 'd', 'e'], create a single string without separators.

// function singleStringWithoutSeparators(arr) {
//   const res = arr.join("");
//   return res;
// }

// console.log(singleStringWithoutSeparators(["a", "b", "c", "d", "e"]));

// Given [true, false, true, true, false], count how many are true.

// function countTrue(arr) {
//   const res = arr.filter(Boolean).length;
//   return res;
// }

// console.log(countTrue([true, false, true, true, false]));

// Given [10, 5, 8, 20, 3], find the difference between max and min.

// function diffBwMaxMin(arr) {
//   const res = Math.max(...arr) - Math.min(...arr);
//   return res;
// }

// console.log(diffBwMaxMin([10, 5, 8, 20, 3]));

// Given [{price: 10, qty: 2}, {price: 5, qty: 3}], calculate total cost.

// function calcTotalCost(arr) {
//   const res = arr.reduce((sum, index) => sum + index.price * index.qty, 0);
//   return res;
// }

// console.log(
//   calcTotalCost([
//     { price: 10, qty: 2 },
//     { price: 5, qty: 3 },
//   ])
// );

// Given [1, 2, 3, 4, 5], create an object with sum, min, and max properties.

// function objectWithMinMaxSum(arr) {
//   const res = arr.reduce(
//     (a, i) => ({
//       sum: a.sum + i,
//       min: Math.min(a.min, i),
//       max: Math.max(a.max, i),
//     }),
//     { sum: 0, min: Infinity, max: -Infinity }
//   );

//   return res;
// }

// console.log(objectWithMinMaxSum([1, 2, 3, 4, 5]));

// Given ['apple', 'banana', 'cherry'], find the longest word.

// function findLongestWord(arr) {
//   const res = arr.reduce((a, b) => (a.length > b.length ? a : b));
//   return res;
// }

// console.log(findLongestWord(["apple", "banana", "cherry"]));

// Given ['a', 'bb', 'ccc'], calculate the total length of all strings.

// function totalLength(arr) {
//   //   const res = arr.join("").length;

//   const res = arr.reduce((sum, str) => sum + str.length, 0);
//   return res;
// }

// console.log(totalLength(["a", "bb", "ccc"]));

// Given [2, 4, 6, 8], check if the sum is greater than 15.

// function sumGreaterThan15(arr) {
//   const res = arr.reduce((sum, i) => sum + i, 0) > 15;
//   return res;
// }

// console.log(sumGreaterThan15([2, 4, 6, 8]));

// Given [{score: 80}, {score: 90}, {score: 70}], calculate average score.

// function avgScore(arr) {
//   const res = arr.reduce((sum, i) => sum + i.score, 0) / arr.length;
//   return res;
// }

// console.log(avgScore([{ score: 80 }, { score: 90 }, { score: 70 }]));

// Given [5, 5, 5, 5], multiply all numbers together.

// function multiplyAllNumbers(arr) {
//   const res = arr.reduce((prod, i) => prod * i, 1);
//   return res;
// }

// console.log(multiplyAllNumbers([5, 5, 5, 5]));

// Given [[1, 2], [3], [4, 5, 6]], flatten and sum all numbers.

// function flatAllNumbers(arr) {
//   const res = arr.flat().reduce((sum, i) => sum + i, 0);
//   return res;
// }

// console.log(flatAllNumbers([[1, 2], [3], [4, 5, 6]]));

// Given ['red', 'green', 'blue', 'yellow'], find the shortest word.

// function shortestWord(arr) {
//   const res = arr.reduce((a, b) => (a.length < b.length ? a : b));
//   return res;
// }

// console.log(shortestWord(["red", "green", "blue", "yellow"]));

// Given [10, 20, 30, 40, 50], calculate the median value.

// function medianValue(arr) {
//   const res = [...arr].sort((a, b) => a - b)[Math.floor(arr.length / 2)];
//   return res;
// }

// console.log(medianValue([10, 20, 30, 40, 50]));

// Given [{count: 5}, {count: 10}, {count: 15}], find the maximum count.

// function maxCount(arr) {
//   const res = arr.reduce((a, b) => Math.max(a, b.count), -Infinity);
//   return res;
// }

// console.log(maxCount([{ count: 5 }, { count: 10 }, { count: 15 }]));

// Given [1, -2, 3, -4, 5], sum only the positive numbers.

// function sumOfPositiveNumbers(arr) {
//   const res = arr.filter((item) => item > 0).reduce((sum, i) => sum + i, 0);
//   return res;
// }

// console.log(sumOfPositiveNumbers([1, -2, 3, -4, 5]));

{
  /*------------------------------------------------------------------- */
}

// Complex Operations (81-100)

// Given [3, 1, 4, 1, 5, 9, 2, 6], sort in descending order.

// function sortDesc(arr) {
//   const res = arr.sort((a, b) => b - a);
//   return res;
// }

// console.log(sortDesc([3, 1, 4, 1, 5, 9, 2, 6]));

// Given [{name: 'John', age: 30}, {name: 'Jane', age: 25}], sort by age.

// function sortByAge(arr) {
//   const res = [...arr].sort((a, b) => a.age - b.age);
//   return res;
// }

// console.log(
//   sortByAge([
//     { name: "John", age: 30 },
//     { name: "Jane", age: 25 },
//   ])
// );

// Given ['banana', 'apple', 'cherry'], sort alphabetically.

// function sortAlpha(arr) {
//   const res = [...arr].sort();
//   return res;
// }

// console.log(sortAlpha(["banana", "apple", "cherry"]));

// Given [1, 2, 3, 2, 4, 3, 5], count occurrences of each number.

// function countOccurences(arr) {
//   const res = arr.reduce((a, i) => {
//     a[i] = (a[i] || 0) + 1;
//     return a;
//   }, {});
//   return res;
// }

// console.log(countOccurences([1, 2, 3, 2, 4, 3, 5]));

// Given [1, 2, 3, 4, 5, 6, 7, 8], split into chunks of 3.

// function splitChunks(arr) {
//   const res = arr.reduce(
//     (a, _, i) => (i % 3 ? a : [...a, arr.slice(i, i + 3)]),
//     []
//   );
//   return res;
// }

// console.log(splitChunks([1, 2, 3, 4, 5, 6, 7, 8]));

// Given ['a1', 'b2', 'a3', 'b4'], group by first letter.

// function groupByFirstLetter(arr) {
//   const res = arr.reduce((a, x) => {
//     const k = x[0];
//     (a[k] ??= []).push(x);
//     return a;
//   }, {});
//   return res;
// }

// console.log(groupByFirstLetter(["a1", "b2", "a3", "b4"]));

// Given [1, 2, 2, 3, 3, 3, 4], return only elements that appear more than once.

// function elementMoreThanOnce(arr) {
//   const res = arr.filter((item) => arr.indexOf(item) !== arr.lastIndexOf(item));
//   return res;
// }

// console.log(elementMoreThanOnce([1, 2, 2, 3, 3, 3, 4]));

// Given [10, 20, 30, 40, 50], return every other element.

// function everyOtherElement(arr) {
//   const res = arr.filter((_, item) => item % 2 === 0);
//   return res;
// }

// console.log(everyOtherElement([10, 20, 30, 40, 50]));

// Given two arrays [1, 2, 3] and [2, 3, 4], find elements only in the first array.

// function elementsInFirstArr(arr1, arr2) {
//   const res = arr1.filter((item) => !arr2.includes(item));
//   return res;
// }

// console.log(elementsInFirstArr([1, 2, 3], [2, 3, 4]));

// Given [5, 2, 8, 1, 9], return the second largest number.

// function secondLargestNumber(arr) {
//   const res = arr.sort((a, b) => b - a)[1];
//   return res;
// }

// console.log(secondLargestNumber([5, 2, 8, 1, 9]));

// Given ['the', 'quick', 'brown', 'fox'], find the word with most vowels.

// function vowelCount(word) {
//   return word
//     .toLowerCase()
//     .split("")
//     .filter((ch) => "aeiou".includes(ch)).length;
// }

// function mostVowels(arr) {
//   // return arr.reduce((maxWord, curr) =>
//   //   vowelCount(curr) > vowelCount(maxWord) ? curr : maxWord
//   // );

//   const res = arr.reduce((a, b) =>
//     [...b].filter((ch) => "aeiou".includes(ch)).length >
//     [...a].filter((ch) => "aeiou".includes(ch)).length
//       ? b
//       : a
//   );
//   return res;
// }

// console.log(mostVowels(["the", "quick", "brown", "fox"]));

// Given [1, 2, 3, 4, 5], create all possible pairs.

// function allPairs(arr) {
//   // const res = [];

//   // for (let i = 0; i < arr.length; i++) {
//   //   for (j = i + 1; j < arr.length; j++) {
//   //     res.push([arr[i], arr[j]]);
//   //   }
//   // }
//   // return res;

//   const res = arr.flatMap((value, index) =>
//     arr.slice(index + 1).map((next) => [value, next])
//   );
//   return res;
// }

// console.log(allPairs([1, 2, 3, 4, 5]));

// Given [10, 20, 30, 40], calculate running totals [10, 30, 60, 100].

// function runningTotals(arr) {
//   let sum = 0;

//   const res = arr.map((item) => {
//     sum += item;
//     return sum;
//   });
//   return res;
// }

// console.log(runningTotals([10, 20, 30, 40]));

// Given [1, 2, 3, 4, 5, 6], rotate the array right by 2 positions.

// function rotateElementsRight(arr, k) {
//   const n = arr.length;

//   const r = k % n;

//   return [...arr.slice(-r), ...arr.slice(0, n - r)];
// }

// console.log(rotateElementsRight([1, 2, 3, 4, 5, 6], 2));

// Given [1, 2, 3, 4, 5, 6], rotate the array left by 2 positions.

// function rotateElementsLeft(arr, k) {
//   const n = arr.length;

//   const r = k % n;

//   return [...arr.slice(r), ...arr.slice(0, r)];
// }

// console.log(rotateElementsLeft([1, 2, 3, 4, 5, 6], 2));

// Given [[1, 2, 3], [4, 5], [6]], find the sub-array with the largest sum.

// function largestSumInSubarray(arr) {
//   // const res = arr.reduce((maxArr, currArr) => {
//   //   const currSum = currArr.reduce((a, b) => a + b, 0);
//   //   const maxSum = maxArr.reduce((a, b) => a + b, 0);

//   //   return currSum > maxSum ? currArr : maxArr;
//   // });

//   // return res;

//   let maxSum = -Infinity;
//   let res = [];

//   for (const sub of arr) {
//     const sum = sub.reduce((a, b) => a + b, 0);
//     if (sum > maxSum) {
//       maxSum = sum;
//       res = sub;
//     }
//   }
//   return res;
// }

// console.log(largestSumInSubarray([[1, 2, 3], [4, 5], [6]]));

// Given [3, 7, 3, 3, 7, 9, 9], find the number that appears most frequently.

// function appearsMost(arr) {
//   const map = new Map();
//   for (let num of arr) {
//     map.set(num, (map.get(num) || 0) + 1);
//   }

//   let max = 0,
//     ans;

//   for (let [key, value] of map) {
//     if (value > max) {
//       max = value;
//       ans = key;
//     }
//   }
//   return ans;
// }
// console.log(appearsMost([3, 7, 3, 3, 7, 9, 9]));

// Given ['racecar', 'hello', 'level'], return only palindromes.

// function isValid(word) {
//   let i = 0;
//   let j = word.length - 1;

//   while (i < j) {
//     if (word[i] !== word[j]) {
//       return false;
//     } else {
//       i++;
//       j--;
//     }
//   }
//   return true;
// }

// function palindromes(arr) {
//   const res = arr.filter(isValid);
//   return res;
// }

// console.log(palindromes(["racecar", "hello", "level"]));

// const str = "india is my country";

// const res = str
//   .split(" ")
//   .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//   .join(" ");

// console.log(res);

// let i = 1;

// const id = setInterval(() => {
//   console.log(i);
//   i++;

//   if (i > 10) {
//     clearInterval(id);
//   }
// }, 1000);

// for (let i = 1; i <= 10; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, i * 1000);
// }

const emojis = ["🎄", "🎅🏼", "🎁", "⭐"];

/* 1 */ emojis.push("🦌");
/* 2 */ emojis.splice(0, 2);
/* 3 */ emojis = [...emojis, "🥂"];
/* 4 */ emojis.length = 0;

console.log(emojis);
