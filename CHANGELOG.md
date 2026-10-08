# Changelog

All notable changes to UnIcon will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2026-10-08

### Added
- 47 glyphs used by the Unifesto websites (217 total).

### Changed
- One module per glyph (`dist/glyphs/<name>.js`, `dist/<platform>/icons/<name>.js`), so tree-shaking bundlers like Next.js ship only the glyphs a page imports. `UnGlyph` (lookup by name) lives in its own module and pulls in every glyph only where it's used.
- `Icon` type is now `React.FC<IconProps>`, matching Phosphor.

## [2.0.0] - 2026-10-08

### Removed (breaking)
- The PNG icon system: `UnIcon`, the 35 PNG icons, `manifest.json`, `searchIcons`, `getIconsByCategory`, `getCategories`, `iconNames` and the `./manifest` / `./icons/*` exports. Use glyphs instead.

### Added
- Glyphs `circle-half`, `github-logo`, `google-logo`, `hammer`, `x-logo` (170 total).

## [1.1.0] - 2026-10-08

### Added
- **Glyphs**: 165 single-colour, tintable SVG icons (`UnGlyph` + Phosphor-compatible named components like `Ticket`, `TicketIcon`), weights regular/light/bold/fill/duotone. Shapes start from Phosphor Icons (MIT) and get redrawn over time.
- `glyphs/<weight>/<name>.svg` source folder, validated on build (256 viewBox, paths only, no strokes or hard-coded fills).
- `npm run import:phosphor -- <Name...>` to pull a starting shape from Phosphor.
- Optional peer dependency `react-native-svg` (needed for glyphs on React Native).

## [1.0.0] - 2024-06-02

### 🎉 Initial Release

Production-ready v1.0.0 of UnIcon - Cross-platform icon library for React, Next.js, Expo and React Native.

### ✨ Added

#### Core Features
- **13 Professional Icons** - High-quality PNG assets at 1024×1024 resolution
- **Cross-platform Support** - React, Next.js, Expo, and React Native
- **TypeScript Definitions** - Full type safety with autocomplete
- **Tree-shakeable** - Import only what you need
- **Zero Dependencies** - No runtime dependencies

#### Components
- `UnIcon` component for React/Next.js
- `UnIcon` component for React Native/Expo
- Direct icon imports for optimal bundle size

#### Search & Discovery
- `searchIcons(query)` - Search by name, category, or tags
- `getIconsByCategory(category)` - Filter icons by category
- `getCategories()` - Get all available categories

#### Categories
- **account** - User profile, authentication (account, at, mail, phone, signout)
- **system** - Settings, notifications (appearance, notification, permission, support)
- **social** - Brand logos (apple, google, instagram)
- **commerce** - Shopping, ratings (rate)

#### Optimization
- 92.3% file size reduction through PNG optimization
- Original resolution preserved (no quality loss)
- Package size: 1.6 MB compressed
- Average icon size: 124 KB

#### Documentation
- Comprehensive README with examples
- TypeScript API documentation
- Usage guides for all platforms
- Best practices and optimization tips

### 📦 Package Details

- **Total icons**: 13
- **Package size**: 1.6 MB
- **File format**: PNG with transparency
- **Resolution**: 1024×1024 (original quality)
- **TypeScript**: Full support with `.d.ts` files

### 🎯 Supported Platforms

- React 16.8.0+
- Next.js (all versions)
- React Native (all versions)
- Expo (all SDK versions)
- Node.js 16.0.0+

### 📚 Icons Included

1. account
2. appearance
3. apple
4. at
5. google
6. instagram
7. mail
8. notification
9. permission
10. phone
11. rate
12. signout
13. support

---

**Copyright © Unifesto Private Limited**
