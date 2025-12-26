import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public
  // In production, __dirname is dist/ (where index.js is located)
  // Static files are in dist/public/
  const staticPath = path.resolve(__dirname, "public");

  console.log(`Serving static files from: ${staticPath}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`__dirname: ${__dirname}`);

  // Check if static path exists
  if (!existsSync(staticPath)) {
    console.error(`ERROR: Static path does not exist: ${staticPath}`);
    process.exit(1);
  }

  const indexPath = path.join(staticPath, "index.html");
  if (!existsSync(indexPath)) {
    console.error(`ERROR: index.html does not exist at: ${indexPath}`);
    process.exit(1);
  }

  app.use(express.static(staticPath, {
    maxAge: "1y",
    etag: true,
  }));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error(`Error serving index.html:`, err);
        res.status(500).send("Internal Server Error");
      }
    });
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
