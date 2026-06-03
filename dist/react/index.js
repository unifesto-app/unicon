/**
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
    // Development-only warning (no environment variable access)
    console.warn(`UnIcon: Icon "${name}" not found in manifest`);
    return null;
  }

  // Use relative path from the package
  const iconPath = `/@unifesto/unicon/dist/${iconData.path}`;

  return (
    <img
      src={iconPath}
      alt={alt || `${name} icon`}
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
export const iconNames = [
  "account",
  "appearance",
  "apple",
  "at",
  "calendar",
  "camera",
  "file-text",
  "github",
  "globe",
  "google",
  "instagram",
  "linkedin",
  "mail",
  "megaphone",
  "notification",
  "permission",
  "phone",
  "photo",
  "profile",
  "rate",
  "signout",
  "support",
  "tag",
  "verified-blue",
  "verified-green"
];

export default UnIcon;
