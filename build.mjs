// build.js
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Handle __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC = "src/backend";
const OUT = "out/backend";
const WEBVIEW_SRC = "src/frontend";
const WEBVIEW_OUT = "out/frontend";

function log(...args) {
  console.log("[build]", ...args);
}

log("compiling typescript");

try {
  deleteFolderRecursive(OUT);
} catch (err) {
  console.log(`Error : Typescript compilation failed ${err}`);
  process.exit(1);
}

function deleteFolderRecursive(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    log("Deleted", dirPath);
  }
}

function copyNonTs(src, out) {
  fs.mkdirSync(out, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(out, entry.name);

    if (entry.isDirectory()) {
      copyNonTs(srcPath, destPath);
    } else if (!entry.name.endsWith(".ts")) {
      fs.copyFileSync(srcPath, destPath);
      log("Copied", path.relative(__dirname, destPath));
    }
  }
}

function compile(tsconfigPath) {
  execSync(`npx tsc -p ${tsconfigPath}`, { stdio: "inherit" });
}

log("Copying non-TypeScript files...");

compile("tsconfig.json");
compile("tsconfig.webview.json");

copyNonTs(SRC, OUT);
copyNonTs(WEBVIEW_SRC, WEBVIEW_OUT);
log("✅ Build complete.");
