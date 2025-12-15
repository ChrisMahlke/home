import fs from "fs";
import path from "path";

// Read the strings.json file
const stringsPath = path.join(process.cwd(), "src", "strings.json");
const strings = JSON.parse(fs.readFileSync(stringsPath, "utf8"));

// Generate manifest.json content
const manifest = {
  name: strings.manifest.name,
  short_name: strings.manifest.shortName,
  description: strings.manifest.description,
  start_url: strings.manifest.startUrl,
  display: strings.manifest.display,
  background_color: strings.manifest.backgroundColor,
  theme_color: strings.manifest.themeColor,
  icons: [
    {
      src: strings.icons.favicon,
      sizes: strings.icons.sizes,
      type: strings.icons.type,
    },
  ],
};

// Write the manifest.json file
const manifestPath = path.join(process.cwd(), "public", "manifest.json");
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log("✅ Manifest.json generated from strings.json");
