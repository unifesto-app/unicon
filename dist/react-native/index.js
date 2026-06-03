/**
 * UnIcon v1.0.0 - React Native/Expo Component
 * Copyright © Unifesto Private Limited
 */

import React from "react";
import { Image } from "react-native";
import manifest from "../manifest.json";

// Pre-require all icons for Metro bundler
// NOTE: These are STATIC requires of asset files, not dynamic code execution
// Metro bundler requires this pattern for proper asset resolution
const iconMap = {
  "account": require("../icons/account.png"),
  "appearance": require("../icons/appearance.png"),
  "apple": require("../icons/apple.png"),
  "at": require("../icons/at.png"),
  "calendar": require("../icons/calendar.png"),
  "camera": require("../icons/camera.png"),
  "google": require("../icons/google.png"),
  "instagram": require("../icons/instagram.png"),
  "mail": require("../icons/mail.png"),
  "megaphone": require("../icons/megaphone.png"),
  "notification": require("../icons/notification.png"),
  "permission": require("../icons/permission.png"),
  "phone": require("../icons/phone.png"),
  "photo": require("../icons/photo.png"),
  "profile": require("../icons/profile.png"),
  "rate": require("../icons/rate.png"),
  "signout": require("../icons/signout.png"),
  "support": require("../icons/support.png"),
  "tag": require("../icons/tag.png"),
  "verified-blue": require("../icons/verified-blue.png"),
  "verified-green": require("../icons/verified-green.png")
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
    // Development-only warning (no environment variable access)
    console.warn(`UnIcon: Icon "${name}" not found in manifest`);
    return null;
  }

  const iconSource = iconMap[name];
  
  if (!iconSource) {
    // Development-only warning (no environment variable access)
    console.warn(`UnIcon: Icon source for "${name}" not found`);
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
      accessibilityLabel={`${name} icon`}
      accessibilityRole="image"
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
  "google",
  "instagram",
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
