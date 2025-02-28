const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");

class SitemapGenerator {
	constructor(config) {
		this.config = config;
		this.storage = config.storage || "json"; // Default to JSON storage
		this.baseUrl = config.baseUrl || "https://example.com";
		this.sitemapPath = config.sitemapPath || "./sitemaps";
		this.ensureDirectoryExists(this.sitemapPath);

		if (this.storage === "database") {
			this.initDatabase();
		}
	}

	ensureDirectoryExists(dir) {
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}
	}

	async fetchData() {
		if (this.storage === "json") {
			return this.fetchFromJSON();
		} else if (this.storage === "csv") {
			return this.fetchFromCSV();
		} else if (this.storage === "database") {
			return this.fetchFromDatabase();
		} else {
			throw new Error("Unsupported storage backend");
		}
	}

	async fetchFromJSON() {
		const filePath = path.resolve(this.config.dataFile || "data.json");
		if (!fs.existsSync(filePath)) {
			fs.writeFileSync(filePath, JSON.stringify([]));
		}
		return JSON.parse(fs.readFileSync(filePath, "utf8"));
	}

	async fetchFromCSV() {
		const filePath = path.resolve(this.config.dataFile || "data.csv");
		if (!fs.existsSync(filePath)) {
			fs.writeFileSync(filePath, "url,lastmod,changefreq,priority\n");
		}
		const content = fs.readFileSync(filePath, "utf8");
		return content
			.split("\n")
			.slice(1)
			.map((line) => {
				const [url, lastmod, changefreq, priority] = line.split(",");
				return { url, lastmod, changefreq, priority };
			});
	}

	async initDatabase() {
		this.sequelize = new Sequelize(
			this.config.db.database,
			this.config.db.username,
			this.config.db.password,
			{
				host: this.config.db.host,
				dialect: this.config.db.dialect,
				logging: false,
			}
		);
	}

	async fetchFromDatabase() {
		if (!this.sequelize) {
			throw new Error("Database connection is not initialized");
		}
		const [results] = await this.sequelize.query(this.config.db.query);
		return results.map((row) => ({
			url: row.url,
			lastmod: row.lastmod,
			changefreq: row.changefreq,
			priority: row.priority,
		}));
	}

	async generateSitemap() {
		const data = await this.fetchData();
		const entries = data.map(
			({ url, lastmod, changefreq, priority }) =>
				`  <url>\n    <loc>${this.baseUrl}${url}</loc>\n    <lastmod>${
					lastmod || new Date().toISOString()
				}</lastmod>\n    <changefreq>${
					changefreq || "monthly"
				}</changefreq>\n    <priority>${priority || "0.5"}</priority>\n  </url>`
		);

		const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join(
			"\n"
		)}\n</urlset>`;

		const filePath = path.join(this.sitemapPath, "sitemap.xml");
		fs.writeFileSync(filePath, sitemapContent);
		console.log(`Sitemap generated at: ${filePath}`);
	}
}

module.exports = SitemapGenerator;
