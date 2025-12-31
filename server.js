import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// ------------------------
// Fix __dirname for ESModules
// ------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ------------------------
// App setup
// ------------------------
const app = express();

// Trust Railway / proxy headers
app.set("trust proxy", true);

// ------------------------
// Static files
// ------------------------
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// ------------------------
// Root route
// ------------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "login.html"));
});

// ------------------------
// Health check (optional but recommended)
// ------------------------
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// ------------------------
// Catch-all for direct refresh on pages
// ------------------------
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "login.html"));
});

// ------------------------
// Start server
// ------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Quizio running on port ${PORT}`);
});
