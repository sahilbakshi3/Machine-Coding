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

const movements = [200, 450, -400, 3000, ]