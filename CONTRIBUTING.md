# Contributing to UnIcon

Thank you for your interest in contributing to UnIcon! This is an internal package for Unifesto Private Limited.

## 🎨 Adding New Icons

### 1. Design the Icon

Icons should be designed using **Apple Icon Composer** or equivalent tools:

- **Resolution**: 1024×1024 pixels minimum
- **Format**: PNG with transparency
- **Color**: Full color or monochrome
- **Background**: Transparent
- **File size**: Optimize but maintain quality

### 2. Export the Icon

1. Export as PNG from Icon Composer
2. Save to the `exports/` directory
3. Use lowercase, hyphen-separated naming: `icon-name.png`
4. Example: `notification.png`, `user-profile.png`

### 3. Add Metadata

Update `scripts/build.js` to add icon metadata:

```javascript
const ICON_METADATA = {
  // ... existing icons
  "your-icon-name": {
    category: "account", // account, system, social, commerce
    tags: ["tag1", "tag2", "tag3"] // Searchable tags
  },
};
```

**Categories:**
- `account` - User profile, authentication, account management
- `system` - Settings, notifications, system controls
- `social` - Brand logos, social platforms
- `commerce` - Shopping, payments, ratings

**Tags:** Choose 3-5 descriptive keywords that users might search for.

### 4. Build and Test

```bash
# Clean previous build
npm run clean

# Build the package
npm run build

# Verify the output
npm run pack:test
```

### 5. Update Documentation

Update `README.md`:
- Add the new icon to the "Available Icons" table
- Include category and tags
- Update icon count in features section

Update `CHANGELOG.md`:
- Add entry under "Unreleased" or new version
- List the new icon with category

### 6. Commit Changes

```bash
git add exports/your-icon-name.png scripts/build.js README.md CHANGELOG.md
git commit -m "feat: add your-icon-name icon"
```

## 🔄 Version Bumping

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (x.0.0) - Breaking API changes
- **MINOR** (0.x.0) - New icons or features (backward compatible)
- **PATCH** (0.0.x) - Bug fixes and optimizations

```bash
# Bump version (this runs build automatically)
npm version minor -m "Release v%s"

# Push tags
git push && git push --tags
```

## 📋 Icon Guidelines

### Design Principles

1. **Consistency** - Match the style of existing icons
2. **Simplicity** - Clear and recognizable at all sizes
3. **Scalability** - Must work from 16px to 128px+
4. **Accessibility** - High contrast, clear shapes

### Technical Requirements

- ✅ PNG format with transparency
- ✅ 1024×1024 pixels (or higher)
- ✅ Optimized file size (< 2MB source)
- ✅ Clean edges (anti-aliased)
- ✅ Centered in canvas
- ❌ No text (unless it's a logo)
- ❌ No gradients (they don't scale well)

### Naming Conventions

- Use lowercase
- Use hyphens for multi-word names
- Be descriptive but concise
- Examples: `account`, `notification`, `sign-out`

## 🧪 Testing

Before submitting:

1. **Build Test**
   ```bash
   npm run build
   ```

2. **Package Test**
   ```bash
   npm run pack:test
   ```

3. **Visual Test**
   - Test at multiple sizes (16px, 24px, 32px, 64px)
   - Test on both light and dark backgrounds
   - Verify in React and React Native

4. **Search Test**
   ```javascript
   import { searchIcons } from "@unifesto/unicon/react";
   console.log(searchIcons("your-tag"));
   ```

## 📝 Pull Request Process

1. Create a feature branch: `git checkout -b feat/add-icon-name`
2. Make your changes following guidelines above
3. Build and test locally
4. Update documentation
5. Commit with conventional commits format
6. Push and create PR
7. Request review from team members

### Commit Message Format

```
<type>(<scope>): <subject>

<body>
```

**Types:**
- `feat` - New icon or feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Testing changes
- `chore` - Build process or tooling

**Examples:**
```
feat(icons): add user-settings icon
fix(build): correct icon metadata generation
docs(readme): update usage examples
```

## 🚀 Publishing

Only maintainers can publish:

```bash
# Ensure you're on main branch
git checkout main
git pull

# Run full build
npm run rebuild

# Publish to npm
npm publish
```

## 🐛 Reporting Issues

For internal issues:
1. Check existing issues first
2. Provide clear description
3. Include reproduction steps
4. Share screenshots if visual
5. Mention affected platforms

## 📮 Questions?

Contact the Unifesto development team:
- Internal Slack: #unicon-dev
- Email: dev@unifesto.com

---

**Copyright © Unifesto Private Limited**
