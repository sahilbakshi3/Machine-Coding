// function f(a, b) {
//   console.log(a, b);
// }

// f(1, 2);

// function f(a) {
//   return function (b) {
//     return `${a} ${b}`;
//   };
// }

// console.log(f(3)(4));

function sum(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log(sum(2)(6)(1));
