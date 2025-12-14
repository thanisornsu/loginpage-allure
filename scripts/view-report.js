/**
 * Script to view downloaded Allure report from artifacts
 * Usage: node scripts/view-report.js [path-to-allure-report]
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const reportPath =
  process.argv[2] || path.join(__dirname, "..", "allure-report");

if (!fs.existsSync(reportPath)) {
  console.error("❌ Allure report not found at:", reportPath);
  console.log("\n📝 Usage:");
  console.log("   node scripts/view-report.js [path-to-allure-report]");
  console.log("\n💡 Example:");
  console.log("   node scripts/view-report.js ./allure-report");
  process.exit(1);
}

const indexHtml = path.join(reportPath, "index.html");
if (!fs.existsSync(indexHtml)) {
  console.error("❌ index.html not found in:", reportPath);
  console.log("   Make sure you extracted the downloaded artifact correctly");
  process.exit(1);
}

const port = 8000;
const server = http.createServer((req, res) => {
  let filePath = path.join(
    reportPath,
    req.url === "/" ? "index.html" : req.url
  );

  // Security: prevent directory traversal
  filePath = path.normalize(filePath);
  if (!filePath.startsWith(path.normalize(reportPath))) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("File not found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentTypes = {
      ".html": "text/html",
      ".js": "application/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".svg": "image/svg+xml",
    };

    res.writeHead(200, {
      "Content-Type": contentTypes[ext] || "application/octet-stream",
    });
    res.end(data);
  });
});

server.listen(port, () => {
  const url = `http://localhost:${port}`;
  console.log("✅ Allure Report Server Started!");
  console.log(`\n🌐 Open in browser: ${url}`);
  console.log(`\n📁 Report path: ${reportPath}`);
  console.log("\n⏹️  Press Ctrl+C to stop the server\n");

  // Auto-open browser (optional)
  const platform = process.platform;
  let command;
  if (platform === "win32") {
    command = `start ${url}`;
  } else if (platform === "darwin") {
    command = `open ${url}`;
  } else {
    command = `xdg-open ${url}`;
  }

  exec(command, (error) => {
    if (error) {
      console.log("💡 Please open the URL manually in your browser");
    }
  });
});
