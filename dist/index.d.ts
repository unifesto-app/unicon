/**
 * UnIcon v1.0.0 - TypeScript Definitions
 * Copyright © Unifesto Private Limited
 * 
 * Cross-platform icon library for React, Next.js, Expo and React Native
 */

/**
 * Available icon names in the UnIcon library
 */
export type IconName =
  | "account"
  | "appearance"
  | "apple"
  | "at"
  | "calendar"
  | "camera"
  | "file-text"
  | "github"
  | "globe"
  | "google"
  | "instagram"
  | "linkedin"
  | "mail"
  | "megaphone"
  | "notification"
  | "permission"
  | "person"
  | "phone"
  | "photo"
  | "profile"
  | "rate"
  | "signout"
  | "support"
  | "tag"
  | "unifesto"
  | "verified-blue"
  | "verified-green"
  | "x";

/**
 * Icon categories for organization and search
 */
export type IconCategory =
  | "account"
  | "system"
  | "social"
  | "commerce";

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
