const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async Task is Completed");
    resolve();
  }, 1000);
});

promise1.then(() => {
  console.log("Promise Consumed");
});

new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async 2 Task is Completed");
    resolve();
  }, 1000);
}).then(() => {
  console.log("Promise 2 is Consumed");
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ username: "Sahil", email: "1234@1234.com" });
  }, 1000);
});

promise3.then((user) => {
  console.log(user);
});

const promise4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    let error = false;
    if (!error) {
      resolve({ username: "Sahil", email: "1234@1234.com" });
    } else {
      reject("ERROR: Something went wrong");
    }
  }, 1000);
});

promise4
  .then((user) => {
    console.log(user);
    return user.username;
  })
  .then((username) => username)
  .catch((error) => console.log(error));
