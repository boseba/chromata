import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const THEMES_DIR = path.resolve(__dirname, "../src/themes");
const DIST_DIR = path.resolve(__dirname, "../dist");

async function generateCSS() {
  try {
    // Find all .ts theme files
    const themeFiles = fs
      .readdirSync(THEMES_DIR)
      .filter((f) => f.endsWith(".ts"));

    // For each theme generate file
    for (const file of themeFiles) {
      const themeName = file.replace(/\.ts$/, "");
      const themePath = path.join(THEMES_DIR, file);

      try {
        // Dynamic import using file URL
        const themeModule = await import(pathToFileURL(themePath).href);
        const theme = themeModule.default;

        if (!theme || typeof theme !== "object") {
          console.warn(
            `Warning: Theme ${themeName} doesn't have a valid default export`
          );
          continue;
        }

        let css = theme.toString();

        // Write the CSS file
        fs.mkdirSync(DIST_DIR, { recursive: true });
        const outFile = path.join(DIST_DIR, `chromata-${themeName}.css`);

        fs.writeFileSync(outFile, css, "utf-8");

        console.log(`Generated: ${outFile}`);
      } catch (error) {
        console.error(`Error processing theme ${themeName}:`, error);
      }
    }
  } catch (error) {
    console.error("Error generating CSS:", error);
    process.exit(1);
  }
}

generateCSS();
