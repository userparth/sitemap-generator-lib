const { generateSitemap } = require("./generators/sitemap");

generateSitemap().then(() => console.log("Sitemap generated successfully!"));
