"use strict";
console.log("Before");
const user = getUser(-11, (err, resutl) => {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log(user);
});
console.log("After");
function getUser(id, callback) {
    setTimeout(() => {
        // Simulate an error
        if (id < 0) {
            callback(new Error("Invalid ID"), null);
            return;
        }
        callback(null, { id: id, gitHubUsername: "mosh" });
    }, 2000);
}
