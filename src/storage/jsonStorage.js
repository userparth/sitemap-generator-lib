const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "data.json");

if (!fs.existsSync(filePath)) {
	fs.writeFileSync(filePath, "[]", "utf8"); // Create an empty JSON file
}

const loadData = () => JSON.parse(fs.readFileSync(filePath, "utf8"));

const saveData = (data) =>
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

module.exports = { loadData, saveData };
