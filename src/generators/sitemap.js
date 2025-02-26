const fs = require("fs").promises;
const path = require("path");
const { fetchData } = require("../storage/jsonStorage"); // Example backend
const config = require("../config");

async function generateSitemap() {
	const data = await fetchData();
	const entries = data.map(
		({ url, lastmod }) =>
			`  <url>\n    <loc>${config.baseUrl}${url}</loc>\n    ${
				lastmod ? `<lastmod>${lastmod}</lastmod>` : ""
			}\n  </url>`
	);
	const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join(
		"\n"
	)}\n</urlset>`;
	await fs.writeFile(path.resolve(__dirname, "../../sitemap.xml"), xmlContent);
	console.log("Sitemap generated successfully!");
}

module.exports = { generateSitemap };
