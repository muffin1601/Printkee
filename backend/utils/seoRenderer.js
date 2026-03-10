const fs = require("fs");
const path = require("path");

function renderSEO({ title, description, canonical, seoContent }) {

  const indexPath = path.join(__dirname, "../../frontend/dist/index.html");

  let html = fs.readFileSync(indexPath, "utf8");

  html = html
    .split("__TITLE__").join(title)
    .split("__DESCRIPTION__").join(description)
    .split("__CANONICAL__").join(canonical)
    .split("__SEO_CONTENT__").join(seoContent || "");

  return html;
}

module.exports = renderSEO;