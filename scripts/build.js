import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");

// Configuration
const EXPORTS_DIR = path.join(rootDir, "exports");
const DIST_DIR = path.join(rootDir, "dist");
const ICONS_DIR = path.join(DIST_DIR, "icons");
const REACT_DIR = path.join(DIST_DIR, "react");
const REACT_NATIVE_DIR = path.join(DIST_DIR, "react-native");
const MANIFEST_PATH = path.join(DIST_DIR, "manifest.json");
const TYPES_PATH = path.join(DIST_DIR, "index.d.ts");

// Icon metadata - manually curated for better search
const ICON_METADATA = {
  account: { category: "account", tags: ["user", "profile", "person"] },
  appearance: { category: "system", tags: ["theme", "display", "settings"] },
  apple: { category: "social", tags: ["brand", "logo", "ios"] },
  at: { category: "account", tags: ["username", "handle", "email"] },
  google: { category: "social", tags: ["brand", "logo", "gmail"] },
  instagram: { category: "social", tags: ["brand", "logo", "photo"] },
  mail: { category: "account", tags: ["email", "message", "contact"] },
  notification: { category: "system", tags: ["alert", "bell", "message"] },
  permission: { category: "system", tags: ["lock", "security", "access"] },
  phone: { category: "account", tags: ["mobile", "call", "contact"] },
  rate: { category: "commerce", tags: ["star", "review", "rating"] },
  signout: { category: "account", tags: ["logout", "exit", "leave"] },
  support: { category: "system", tags: ["help", "question", "info"] },
};

console.log("🔨 Building UnIcon v1.0.0...\n");

// Clean dist directory
if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true });
  console.log("✓ Cleaned dist directory");
}

// Create directories
fs.mkdirSync(ICONS_DIR, { recursive: true });
fs.mkdirSync(REACT_DIR, { recursive: true });
fs.mkdirSync(REACT_NATIVE_DIR, { recursive: true });
console.log("✓ Created directory structure\n");

// Read all PNG files from exports
const files = fs.readdirSync(EXPORTS_DIR).filter((file) => file.endsWith(".png"));

if (files.length === 0) {
  console.error("❌ No PNG files found in exports/");
  process.exit(1);
}

console.log(`📦 Processing ${files.length} icons...\n`);

const manifest = {};
const iconNames = [];
const categories = new Set();
const stats = {
  total: 0,
  successful: 0,
  failed: 0,
  totalSize: 0,
  totalOriginalSize: 0,
};

// Process each icon
(async () => {
  for (const file of files) {
    const iconName = path.basename(file, ".png");
    const sourcePath = path.join(EXPORTS_DIR, file);
    const destPath = path.join(ICONS_DIR, file);

    try {
      stats.total++;

      // Get source image metadata
      const sourceStats = fs.statSync(sourcePath);
      stats.totalOriginalSize += sourceStats.size;
      const metadata = await sharp(sourcePath).metadata();

      // Optimize PNG without resizing - preserve original dimensions
      await sharp(sourcePath)
        .png({
          quality: 100,
          compressionLevel: 9,
          palette: true,
          effort: 10,
        })
        .toFile(destPath);

      // Get output file size
      const fileStats = fs.statSync(destPath);
      const fileSizeKB = (fileStats.size / 1024).toFixed(2);
      const originalSizeKB = (sourceStats.size / 1024).toFixed(2);
      const savings = (((sourceStats.size - fileStats.size) / sourceStats.size) * 100).toFixed(1);
      stats.totalSize += fileStats.size;

      // Get icon metadata
      const iconMeta = ICON_METADATA[iconName] || {
        category: "system",
        tags: [],
      };

      categories.add(iconMeta.category);

      // Add to manifest
      manifest[iconName] = {
        path: `icons/${file}`,
        format: "png",
        width: metadata.width,
        height: metadata.height,
        category: iconMeta.category,
        tags: iconMeta.tags,
      };

      iconNames.push(iconName);

      console.log(
        `  ✓ ${iconName.padEnd(20)} ${fileSizeKB.padStart(8)} KB (${originalSizeKB.padStart(8)} KB → ${savings}% saved)`
      );
      stats.successful++;
    } catch (error) {
      console.error(`  ❌ ${iconName.padEnd(20)} Failed: ${error.message}`);
      stats.failed++;
    }
  }

  // Sort icon names alphabetically
  iconNames.sort();

  // Generate manifest.json
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf-8");
  console.log(`\n✓ Generated manifest.json with ${Object.keys(manifest).length} icons`);

  // Generate TypeScript definitions
  generateTypeScriptDefinitions(iconNames, Array.from(categories));
  console.log("✓ Generated index.d.ts");

  // Generate React component
  generateReactComponent(iconNames);
  console.log("✓ Generated react/index.js");

  // Generate React Native component
  generateReactNativeComponent(iconNames);
  console.log("✓ Generated react-native/index.js");

  // Print summary
  const totalSizeMB = (stats.totalSize / (1024 * 1024)).toFixed(2);
  const totalOriginalSizeMB = (stats.totalOriginalSize / (1024 * 1024)).toFixed(2);
  const avgSizeKB = (stats.totalSize / stats.successful / 1024).toFixed(2);
  const totalSavings = (
    ((stats.totalOriginalSize - stats.totalSize) / stats.totalOriginalSize) *
    100
  ).toFixed(1);

  console.log("\n" + "=".repeat(70));
  console.log("📊 Build Summary");
  console.log("=".repeat(70));
  console.log(`Total icons:        ${stats.total}`);
  console.log(`Successful:         ${stats.successful}`);
  console.log(`Failed:             ${stats.failed}`);
  console.log(`Categories:         ${Array.from(categories).join(", ")}`);
  console.log(`Original size:      ${totalOriginalSizeMB} MB`);
  console.log(`Optimized size:     ${totalSizeMB} MB`);
  console.log(`Total savings:      ${totalSavings}%`);
  console.log(`Average size:       ${avgSizeKB} KB per icon`);
  console.log("=".repeat(70));

  console.log("\n✨ UnIcon v1.0.0 build complete!\n");
  console.log("📁 Package structure:");
  console.log("   dist/");
  console.log("   ├── icons/          # Original quality PNG assets");
  console.log("   ├── react/          # React/Next.js wrapper");
  console.log("   ├── react-native/   # React Native/Expo wrapper");
  console.log("   ├── manifest.json   # Icon metadata & search index");
  console.log("   └── index.d.ts      # TypeScript definitions");
  console.log("\n📦 Ready for:");
  console.log("   • React");
  console.log("   • Next.js");
  console.log("   • React Native");
  console.log("   • Expo");
  console.log("\n💡 Next steps:");
  console.log("   npm run pack:test   # Preview package contents");
  console.log("   npm publish         # Publish to npm\n");
})();

function generateTypeScriptDefinitions(iconNames, categories) {
  const iconNamesType = iconNames.map((name) => `  | "${name}"`).join("\n");
  const categoriesType = categories.map((cat) => `  | "${cat}"`).join("\n");

  const dts = `/**
 * UnIcon v1.0.0 - TypeScript Definitions
 * Copyright © Unifesto Private Limited
 * 
 * Cross-platform icon library for React, Next.js, Expo and React Native
 */

/**
 * Available icon names in the UnIcon library
 */
export type IconName =
${iconNamesType};

/**
 * Icon categories for organization and search
 */
export type IconCategory =
${categoriesType};

/**
 * Icon manifest entry with metadata
 */
export interface IconManifest {
  /** Relative path to the icon file */
  path: string;
  /** Icon format */
  format: "png";
  /** Icon width in pixels */
  width: number;
  /** Icon height in pixels */
  height: number;
  /** Icon category */
  category: IconCategory;
  /** Search tags for the icon */
  tags: string[];
}

/**
 * Complete icon manifest
 */
export type Manifest = Record<IconName, IconManifest>;

/**
 * Get the full manifest of all icons
 */
export declare const manifest: Manifest;

/**
 * Search icons by query string
 * 
 * @param query - Search term (matches name, category, or tags)
 * @returns Array of matching icon names
 * 
 * @example
 * searchIcons("account") // ["account", "at", "mail", ...]
 * searchIcons("social") // ["apple", "google", "instagram"]
 */
export declare function searchIcons(query: string): IconName[];

/**
 * Get icons by category
 * 
 * @param category - Icon category
 * @returns Array of icon names in the category
 * 
 * @example
 * getIconsByCategory("account") // ["account", "at", "mail", ...]
 */
export declare function getIconsByCategory(category: IconCategory): IconName[];

/**
 * Get all available categories
 * 
 * @returns Array of all icon categories
 */
export declare function getCategories(): IconCategory[];

/**
 * Props for UnIcon component
 */
export interface UnIconProps {
  /** Name of the icon to display */
  name: IconName;
  /** Size of the icon in pixels (default: 24) */
  size?: number;
  /** CSS class name (React/Next.js only) */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties | object;
  /** Alt text for accessibility */
  alt?: string;
}

/**
 * Universal icon component for React/Next.js
 */
export declare const UnIcon: React.FC<UnIconProps>;

/**
 * Props for UnIcon component (React Native)
 */
export interface UnIconPropsNative {
  /** Name of the icon to display */
  name: IconName;
  /** Size of the icon in pixels (default: 24) */
  size?: number;
  /** React Native image style */
  style?: object;
  /** Image resize mode (default: "contain") */
  resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
}

/**
 * Universal icon component for React Native/Expo
 */
export declare const UnIconNative: React.FC<UnIconPropsNative>;

export default manifest;
`;

  fs.writeFileSync(TYPES_PATH, dts, "utf-8");
}

function generateReactComponent(iconNames) {
  const reactComponent = `/**
 * UnIcon v1.0.0 - React/Next.js Component
 * Copyright © Unifesto Private Limited
 */

import React from "react";
import manifest from "../manifest.json";

/**
 * Search icons by query string
 * Matches against icon name, category, and tags
 */
export function searchIcons(query) {
  if (!query || typeof query !== "string") return [];
  
  const lowerQuery = query.toLowerCase().trim();
  const results = [];
  
  for (const [name, data] of Object.entries(manifest)) {
    // Match name
    if (name.toLowerCase().includes(lowerQuery)) {
      results.push(name);
      continue;
    }
    
    // Match category
    if (data.category && data.category.toLowerCase().includes(lowerQuery)) {
      results.push(name);
      continue;
    }
    
    // Match tags
    if (data.tags && data.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) {
      results.push(name);
    }
  }
  
  return results.sort();
}

/**
 * Get icons by category
 */
export function getIconsByCategory(category) {
  if (!category) return [];
  
  return Object.entries(manifest)
    .filter(([_, data]) => data.category === category)
    .map(([name]) => name)
    .sort();
}

/**
 * Get all available categories
 */
export function getCategories() {
  const categories = new Set();
  Object.values(manifest).forEach(data => {
    if (data.category) categories.add(data.category);
  });
  return Array.from(categories).sort();
}

/**
 * UnIcon - Universal Icon Component for React/Next.js
 * 
 * @example
 * import { UnIcon } from "@unifesto/unicon/react";
 * 
 * <UnIcon name="at" size={24} />
 * <UnIcon name="notification" size={32} className="text-blue-500" />
 */
export function UnIcon({ name, size = 24, className = "", style = {}, alt }) {
  const iconData = manifest[name];

  if (!iconData) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(\`UnIcon: Icon "\${name}" not found in manifest\`);
    }
    return null;
  }

  // Use relative path from the package
  const iconPath = \`/@unifesto/unicon/dist/\${iconData.path}\`;

  return (
    <img
      src={iconPath}
      alt={alt || \`\${name} icon\`}
      width={size}
      height={size}
      className={className}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        display: "inline-block",
        verticalAlign: "middle",
        ...style,
      }}
      loading="lazy"
    />
  );
}

// Export manifest and utilities
export { default as manifest } from "../manifest.json";
export const iconNames = ${JSON.stringify(iconNames, null, 2)};

export default UnIcon;
`;

  fs.writeFileSync(path.join(REACT_DIR, "index.js"), reactComponent, "utf-8");
}

function generateReactNativeComponent(iconNames) {
  const iconRequires = iconNames
    .map((name) => `  "${name}": require("../icons/${name}.png")`)
    .join(",\n");

  const reactNativeComponent = `/**
 * UnIcon v1.0.0 - React Native/Expo Component
 * Copyright © Unifesto Private Limited
 */

import React from "react";
import { Image } from "react-native";
import manifest from "../manifest.json";

// Pre-require all icons for Metro bundler
const iconMap = {
${iconRequires}
};

/**
 * Search icons by query string
 * Matches against icon name, category, and tags
 */
export function searchIcons(query) {
  if (!query || typeof query !== "string") return [];
  
  const lowerQuery = query.toLowerCase().trim();
  const results = [];
  
  for (const [name, data] of Object.entries(manifest)) {
    // Match name
    if (name.toLowerCase().includes(lowerQuery)) {
      results.push(name);
      continue;
    }
    
    // Match category
    if (data.category && data.category.toLowerCase().includes(lowerQuery)) {
      results.push(name);
      continue;
    }
    
    // Match tags
    if (data.tags && data.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) {
      results.push(name);
    }
  }
  
  return results.sort();
}

/**
 * Get icons by category
 */
export function getIconsByCategory(category) {
  if (!category) return [];
  
  return Object.entries(manifest)
    .filter(([_, data]) => data.category === category)
    .map(([name]) => name)
    .sort();
}

/**
 * Get all available categories
 */
export function getCategories() {
  const categories = new Set();
  Object.values(manifest).forEach(data => {
    if (data.category) categories.add(data.category);
  });
  return Array.from(categories).sort();
}

/**
 * UnIcon - Universal Icon Component for React Native/Expo
 * 
 * @example
 * import { UnIcon } from "@unifesto/unicon/react-native";
 * 
 * <UnIcon name="at" size={24} />
 * <UnIcon name="notification" size={32} style={{ tintColor: "#3491ff" }} />
 */
export function UnIcon({ name, size = 24, style = {}, resizeMode = "contain" }) {
  const iconData = manifest[name];

  if (!iconData) {
    if (__DEV__) {
      console.warn(\`UnIcon: Icon "\${name}" not found in manifest\`);
    }
    return null;
  }

  const iconSource = iconMap[name];
  
  if (!iconSource) {
    if (__DEV__) {
      console.warn(\`UnIcon: Icon source for "\${name}" not found\`);
    }
    return null;
  }

  return (
    <Image
      source={iconSource}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
      resizeMode={resizeMode}
      accessibilityLabel={\`\${name} icon\`}
      accessibilityRole="image"
    />
  );
}

// Export manifest and utilities
export { default as manifest } from "../manifest.json";
export const iconNames = ${JSON.stringify(iconNames, null, 2)};

export default UnIcon;
`;

  fs.writeFileSync(
    path.join(REACT_NATIVE_DIR, "index.js"),
    reactNativeComponent,
    "utf-8"
  );
}
