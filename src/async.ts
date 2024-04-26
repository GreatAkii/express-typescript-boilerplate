console.log("Before");
const user = getUser(-11, (err: Error | null, resutl) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log(user);
});
console.log("After");

function getUser(
  id: number,
  callback: (err: Error | null, result: object | null) => void
) {
  setTimeout(() => {
    // Simulate an error
    if (id < 0) {
      callback(new Error("Invalid ID"), null);
      return;
    }
    callback(null, { id: id, gitHubUsername: "mosh" });
  }, 2000);
}
