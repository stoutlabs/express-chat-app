const moment = require("moment");

let myDate = moment();
console.log(myDate.format("MMM Do, YYYY"));

myDate.add(1, "years");
console.log(myDate.format("MMM Do, YYYY"));

console.log(myDate.format("h:mma"));
