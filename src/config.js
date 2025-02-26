module.exports = {
	baseUrl: "https://example.com", // User-configurable base URL
	storage: "json", // Options: "database", "json", "csv"
	entityConfig: {
		home: { priority: "1.0", changefreq: "monthly" },
		blog: { priority: "0.6", changefreq: "monthly" },
		// Users can extend or modify this
	},
};
