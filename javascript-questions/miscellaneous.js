// const obj = {
//   a: 1,
//   b: 2,
// };

// const tostr = obj.a.toString();
// console.log(typeof tostr);
// console.log(tostr);

// const shallowCopy = [...arr];

// // const deepCopy = structuredClone(arr);
// const deepCopy = JSON.parse(JSON.stringify(arr));
// console.log(deepCopy);

// console.log(shallowCopy);

// const obj1 = {
//   name: "sahil",
//   number: 8827069714,
// };
// const obj2 = {
//   name: "abc",
//   number: 1234,
// };

// // const res = JSON.parse(JSON.stringify(obj1));

// // console.log(res);

// const res = { ...obj1, ...obj2 };

// console.log(res);

// const arr = [1, 2, 3, 4, 5];
// // const initial = 0;
// const res = arr.reduce((acc, curr) => acc + curr);

// console.log(res);

// function abc(){
//     console.log(abc.xyz);
// }

// abc();
// abc.xyz = 400;
// abc.xyz = 200;

// abc();

// const numbers = [1, 2, 3, 4];
// numbers[100] = 500;

// console.log(numbers.length);

// console.log(typeof typeof 100);

// function abc(a = 10, b = 20) {
//   return a + b;
// }

// console.log(abc(100, 200)); // 300
// console.log(abc(500)); // 520
// console.log(abc()); // 30

// let arr = [1, 2, 3, 4];

// const res = arr.map((item) => item === 2);
// console.log(res);

// console.log(1);

// setTimeout(() => {
//   console.log(2);
// }, 3000);

// setTimeout(() => {
//   console.log(3);
// }, 0);

// console.log(4);

// function x(){
//     setTimeout(() => {
//         console.log(i)
//     }, 1000);
//     var i = 1;
// }

// x();

// const data = [
//   {
//     name: "Menu 1",
//     link: "http://google.com",
//     subItems: [
//       {
//         name: "Menu 2",
//         link: "http://google.com",
//       },
//     ],
//   },
//   {
//     name: "Menu 3",
//     link: "http://google.com",
//     subItems: [
//       {
//         name: "Menu 4",
//         link: "http://google.com",
//         subItems: [
//           { name: "Menu 5", link: "http://google.com" },
//           { name: "Menu 6", link: "http://google.com" },
//         ],
//       },
//     ],
//   },
// ];

// function flatMenu(items, res = []){
//     for(const item of items){
//         res.push(item.name);

//         if(item.subItems && item.subItems.length > 0){
//             flatMenu(item.subItems, res);
//         }
//     }
//     return res;
// }

// console.log(flatMenu(data));

// var x = 100;

// {
//   var x = 500;
// }

// let a = x;

// {
//   let a = 1000;
// }

// console.log(a);

// function computeAmount() {
//   let total = 0;

//   const api = {
//     lacs(n) {
//       total += n * 100000;
//       return api;
//     },
//     crore(n) {
//       total += n * 10000000;
//       return api;
//     },
//     thousand(n) {
//       total += n * 1000;
//       return api;
//     },

//     value() {
//       return total;
//     },
//   };

//   return api;
// }

// console.log(
//   computeAmount().lacs(15).crore(5).lacs(20).thousand(45).crore(7).value()
// );

// const arr = [
//   { id: 1, name: "name1", rollNo: 23, age: 12 },
//   { id: 2, name: "name2", rollNo: 22, age: 14 },
//   { id: 3, name: "name3", rollNo: 25, age: 15 },
//   { id: 4, name: "name4", rollNo: 26, age: 17 },
//   { id: 5, name: "name5", rollNo: 27, age: 18 }, // biggest age
// ];

// const eldestAge = (arr) => {
//   const person = arr.find((p) => p.name === "name4");
//   console.log(person.name);
// };

// eldestAge(arr);

// const eldestAge = (arr) => {
//   return arr.reduce((eldest, curr) => {
//     return curr.age > eldest.age ? curr : eldest;
//   });
// };

// const eldestUser = eldestAge(arr);
// console.log(eldestUser);

// const concat = (arr) => {
//   return arr.map((user) => user.name).join(" ");
// };

// console.log(concat(arr));

var x = 20;

function foo() {
  console.log(x);
  var x = 10;
}

foo();
