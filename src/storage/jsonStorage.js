const fs = require("fs").promises;
const path = require("path");

async function fetchData() {
	const filePath = path.resolve(__dirname, "../../data.json");
	const content = await fs.readFile(filePath, "utf8");
	return JSON.parse(content);
}

module.exports = { fetchData };
