const fs = require("fs");

const fileName = "1-json.json";

// read file
const dataBuffer = fs.readFileSync(fileName);
// convert buffer to string
const dataJSON = dataBuffer.toString();
// parse JSON string into object
const data = JSON.parse(dataJSON);

// manipulate data
data.name = "Mike Hoskins";
data.age = 40;

// turn object into JSON string
const newData = JSON.stringify(data);
// write string to file
fs.writeFileSync(fileName, newData);
