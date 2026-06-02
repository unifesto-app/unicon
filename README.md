# @unifesto/unicon

> Professional cross-platform icon library for React, Next.js, Expo and React Native

[![npm version](https://img.shields.io/npm/v/@unifesto/unicon.svg)](https://www.npmjs.com/package/@unifesto/unicon)
[![License](https://img.shields.io/badge/license-Private-red.svg)](LICENSE)

## ✨ Features

- 🎨 **Original Quality** - Preserves source resolution (1024×1024)
- 🌐 **Universal** - React, Next.js, Expo, and React Native support
- 📦 **Tree-shakeable** - Import only what you need
- 🔍 **Searchable** - Built-in search by name, category, or tags
- 📱 **Responsive** - Scales to any size without quality loss
- 🎯 **Type-safe** - Full TypeScript support with autocomplete
- ⚡ **Optimized** - PNG compression (92%+ savings) without quality loss
- 🔧 **Zero config** - Works out of the box

## 📦 Installation

```bash
npm install @unifesto/unicon
# or
yarn add @unifesto/unicon
# or
pnpm add @unifesto/unicon
```

## 🚀 Quick Start

### React / Next.js

```jsx
import { UnIcon } from "@unifesto/unicon/react";

function App() {
  return (
    <div>
      <UnIcon name="at" size={32} />
      <UnIcon name="notification" size={24} className="text-blue-500" />
    </div>
  );
}
```

### React Native / Expo

```jsx
import { UnIcon } from "@unifesto/unicon/react-native";
import { View } from "react-native";

function App() {
  return (
    <View>
      <UnIcon name="at" size={32} />
      <UnIcon name="notification" size={24} style={{ tintColor: "#3491ff" }} />
    </View>
  );
}
```

## 📖 Complete Usage Guide

### Direct Icon Import (Best for Bundle Size)

For optimal bundle size, import icons directly:

#### React / Next.js

```jsx
// Import as URL
import atIcon from "@unifesto/unicon/icons/at.png";

function MyComponent() {
  return <img src={atIcon} alt="At" width={32} height={32} />;
}

// With Next.js Image
import Image from "next/image";
import atIcon from "@unifesto/unicon/icons/at.png";

function MyComponent() {
  return <Image src={atIcon} alt="At" width={32} height={32} />;
}
```

#### React Native / Expo

```jsx
import { Image } from "react-native";

function MyComponent() {
  return (
    <Image
      source={require("@unifesto/unicon/icons/at.png")}
      style={{ width: 32, height: 32 }}
      resizeMode="contain"
    />
  );
}
```

### Using the Component (Convenient but Larger Bundle)

#### React / Next.js

```jsx
import { UnIcon } from "@unifesto/unicon/react";

// Basic usage
<UnIcon name="at" size={24} />

// With custom styling
<UnIcon 
  name="notification" 
  size={32}
  className="text-blue-500 hover:text-blue-600"
  style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
  alt="Notification icon"
/>

// Responsive sizes
<UnIcon name="account" size={16} /> // Small
<UnIcon name="account" size={32} /> // Medium
<UnIcon name="account" size={64} /> // Large
<UnIcon name="account" size={128} /> // Extra large - still crisp!
```

#### React Native / Expo

```jsx
import { UnIcon } from "@unifesto/unicon/react-native";

// Basic usage
<UnIcon name="at" size={24} />

// With custom styling
<UnIcon 
  name="notification" 
  size={32}
  style={{
    tintColor: "#3491ff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
  }}
  resizeMode="contain"
/>
```

### Search API

```javascript
import { 
  searchIcons, 
  getIconsByCategory, 
  getCategories 
} from "@unifesto/unicon/react";

// Search by query (matches name, category, tags)
const results = searchIcons("account");
// Returns: ["account", "at", "mail", "phone", "signout"]

const socialIcons = searchIcons("social");
// Returns: ["apple", "google", "instagram"]

// Get icons by category
const accountIcons = getIconsByCategory("account");
// Returns: ["account", "at", "mail", "phone", "signout"]

// Get all categories
const categories = getCategories();
// Returns: ["account", "commerce", "social", "system"]
```

### Using Manifest

```typescript
import manifest from "@unifesto/unicon";

// Access icon metadata
console.log(manifest.at);
// {
//   "path": "icons/at.png",
//   "format": "png",
//   "width": 1024,
//   "height": 1024,
//   "category": "account",
//   "tags": ["username", "handle", "email"]
// }

// Get all icon names
const iconNames = Object.keys(manifest);

// Filter by category
const socialIcons = Object.entries(manifest)
  .filter(([_, data]) => data.category === "social")
  .map(([name]) => name);
```

## 📋 Available Icons

| Icon | Category | Tags |
|------|----------|------|
| `account` | account | user, profile, person |
| `appearance` | system | theme, display, settings |
| `apple` | social | brand, logo, ios |
| `at` | account | username, handle, email |
| `google` | social | brand, logo, gmail |
| `instagram` | social | brand, logo, photo |
| `mail` | account | email, message, contact |
| `notification` | system | alert, bell, message |
| `permission` | system | lock, security, access |
| `phone` | account | mobile, call, contact |
| `rate` | commerce | star, review, rating |
| `signout` | account | logout, exit, leave |
| `support` | system | help, question, info |

## 🎯 TypeScript Support

Full TypeScript support with autocomplete:

```typescript
import { UnIcon, IconName, searchIcons } from "@unifesto/unicon/react";

// Type-safe icon names
const iconName: IconName = "at"; // ✓ Valid
const invalid: IconName = "invalid"; // ✗ TypeScript error

// Component with type checking
<UnIcon name="at" size={24} /> // ✓ Valid
<UnIcon name="invalid" /> // ✗ TypeScript error

// Type-safe search
const results: IconName[] = searchIcons("account");
```

## 🏗️ Package Structure

```
@unifesto/unicon/
├── dist/
│   ├── icons/              # Original quality PNG assets (1024×1024)
│   │   ├── at.png
│   │   ├── account.png
│   │   └── ...
│   ├── react/              # React/Next.js wrapper
│   │   └── index.js
│   ├── react-native/       # React Native/Expo wrapper
│   │   └── index.js
│   ├── manifest.json       # Icon metadata & search index
│   └── index.d.ts          # TypeScript definitions
├── package.json
├── README.md
└── LICENSE
```

## 📏 Technical Details

- **Source Format**: PNG with transparency
- **Resolution**: Original (1024×1024)
- **Compression**: Level 9 with palette optimization
- **Quality**: 100% (lossless)
- **Optimization**: 92%+ file size reduction
- **Bundle Impact**: ~1.6MB for all 13 icons
- **Per Icon**: ~120KB optimized

## 🎨 Categories

Icons are organized into the following categories:

- **account** - User profile, authentication, account management
- **commerce** - Shopping, payments, ratings
- **social** - Brand logos, social platforms
- **system** - Settings, notifications, system controls

## 🎯 API Reference

### React / Next.js API

```typescript
interface UnIconProps {
  name: IconName;              // Icon name (with autocomplete)
  size?: number;               // Size in pixels (default: 24)
  className?: string;          // CSS class name
  style?: CSSProperties;       // Inline styles
  alt?: string;                // Alt text for accessibility
}

function UnIcon(props: UnIconProps): JSX.Element;

function searchIcons(query: string): IconName[];
function getIconsByCategory(category: IconCategory): IconName[];
function getCategories(): IconCategory[];
```

### React Native / Expo API

```typescript
interface UnIconProps {
  name: IconName;              // Icon name (with autocomplete)
  size?: number;               // Size in pixels (default: 24)
  style?: ImageStyle;          // React Native image style
  resizeMode?: ResizeMode;     // Image resize mode (default: "contain")
}

function UnIcon(props: UnIconProps): JSX.Element;

function searchIcons(query: string): IconName[];
function getIconsByCategory(category: IconCategory): IconName[];
function getCategories(): IconCategory[];
```

## 🔥 Best Practices

### 1. Direct Imports for Smaller Bundles

```jsx
// ✓ Best - Only bundles the icons you use
import atIcon from "@unifesto/unicon/icons/at.png";
import mailIcon from "@unifesto/unicon/icons/mail.png";

// ✗ Good but includes component overhead
import { UnIcon } from "@unifesto/unicon/react";
```

### 2. Use Appropriate Sizes

```jsx
// Icons scale perfectly at any size
<UnIcon name="at" size={16} />  // UI elements
<UnIcon name="at" size={24} />  // Standard
<UnIcon name="at" size={32} />  // Headers
<UnIcon name="at" size={64} />  // Hero sections
<UnIcon name="at" size={128} /> // Large displays
```

### 3. Leverage Search for Dynamic UIs

```javascript
// Build dynamic icon pickers
const accountIcons = getIconsByCategory("account");

// Create search functionality
const handleSearch = (query) => {
  const results = searchIcons(query);
  setFilteredIcons(results);
};
```

## 📦 What's Included

The published npm package contains:
- ✅ `dist/` - All optimized assets and components
- ✅ `README.md` - Documentation
- ✅ `LICENSE` - License information
- ✅ `package.json` - Package metadata

Excluded from package:
- ❌ `source/` - Source design files
- ❌ `exports/` - Unoptimized exports
- ❌ `scripts/` - Build scripts
- ❌ `node_modules/` - Dependencies
- ❌ `.git/` - Git history

## 🚀 Publishing

```bash
# Build the package
npm run build

# Test package contents
npm run pack:test

# Publish to npm (requires authentication)
npm publish
```

## 🔄 Versioning

This package follows [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for new icons or features
- **PATCH** version for bug fixes and optimizations

## 📝 License

**UNLICENSED** - Copyright © Unifesto Private Limited

This is proprietary software for internal use only.

## 🤝 Contributing

This is a private package for Unifesto projects. For internal contributions:

1. Add icons to `exports/` directory
2. Update `ICON_METADATA` in `scripts/build.js`
3. Run `npm run build`
4. Update version in `package.json`
5. Commit and publish

## 📮 Support

For issues, questions, or feature requests:
- Internal: Contact the Unifesto development team
- Email: dev@unifesto.com

---

**Made with ❤️ by Unifesto Private Limited**

