function firstRepeatingChar(str) {
  const seen = new Set();

  for (let ch of str) {
    if (seen.has(ch)) {
      return ch;
    }
    seen.add(ch);
  }
  return null;

  //   const count = {};

  //   for (let ch of str) {
  //     if (count[ch]) {
  //       return ch;
  //     }
  //     count[ch] = true;
  //   }
  //   return null;
}

const res = firstRepeatingChar("abca");
console.log(res);

// T.C - O(n)
// S.C - O(n)
