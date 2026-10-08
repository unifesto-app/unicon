# @unifesto/unicon

Unifesto's icon set: single-colour, tintable SVG glyphs for React, Next.js, Expo and React Native.

```bash
npm install @unifesto/unicon
# React Native / Expo also needs: react-native-svg
```

Single-colour icons that take a `color` and a `weight`. The API matches Phosphor, so `import { Ticket } from "phosphor-react-native"` becomes `import { Ticket } from "@unifesto/unicon/react-native"`.

```tsx
import { UnGlyph, Ticket } from "@unifesto/unicon/react-native"; // or /react

<UnGlyph name="ticket" weight="fill" size={24} color="#fff" />
<Ticket weight="duotone" size={24} color={accent} />
```

On the web, prefer named components (`<Ticket />`): each is its own module, so a page ships only the glyphs it imports. `UnGlyph` looks glyphs up by name and therefore bundles all of them. Components have no hooks, so they work in React Server Components.

Weights: `regular`, `light`, `bold`, `fill`, `duotone`. A weight a glyph doesn't have renders as `regular`. React Native needs `react-native-svg`.

## Adding or redrawing a glyph

1. Draw on a **256×256** frame. Before exporting: Outline Stroke, then Flatten. No hard-coded fill colours.
2. Export SVGs to `glyphs/<weight>/<name>.svg` (kebab-case, e.g. `glyphs/fill/calendar-blank.svg`). `regular` is required; other weights are optional.
3. `npm run build`. It fails with a clear message if an SVG has strokes, non-path elements, a wrong viewBox or a fill colour.

To start from a Phosphor shape: `npm run import:phosphor -- CalendarBlank`. It never overwrites a redrawn file.

## License

Copyright © Unifesto Private Limited.

All rights reserved.

This package and its contents, including all icons, graphics, assets, source files, and associated materials, are the intellectual property of Unifesto Private Limited.

No part of this package may be copied, modified, redistributed, sold, sublicensed, or used in commercial products without prior written permission from Unifesto Private Limited.

Glyph shapes are derived from [Phosphor Icons](https://phosphoricons.com) (MIT). See `LICENSE` for the notice.
