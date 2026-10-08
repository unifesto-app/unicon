# @unifesto/unicon

Cross-platform icon library for React, Next.js, Expo, and React Native.

## Installation

```bash
npm install @unifesto/unicon
```

## React / Next.js

```tsx
import { UnIcon } from "@unifesto/unicon/react";

export default function App() {
  return (
    <UnIcon
      name="at"
      size={24}
    />
  );
}
```

## React Native / Expo

```tsx
import { UnIcon } from "@unifesto/unicon/react-native";

export default function App() {
  return (
    <UnIcon
      name="at"
      size={24}
    />
  );
}
```

## Direct Asset Usage

### Next.js

```tsx
import Image from "next/image";
import atIcon from "@unifesto/unicon/icons/at.png";

export default function App() {
  return (
    <Image
      src={atIcon}
      alt="At"
      width={24}
      height={24}
    />
  );
}
```

### React Native

```tsx
import { Image } from "react-native";

export default function App() {
  return (
    <Image
      source={require("@unifesto/unicon/icons/at.png")}
      style={{
        width: 24,
        height: 24,
      }}
    />
  );
}
```

## Glyphs (tintable SVG icons)

Single-colour icons that take a `color` and a `weight`. The API matches Phosphor, so `import { Ticket } from "phosphor-react-native"` becomes `import { Ticket } from "@unifesto/unicon/react-native"`.

```tsx
import { UnGlyph, Ticket } from "@unifesto/unicon/react-native"; // or /react

<UnGlyph name="ticket" weight="fill" size={24} color="#fff" />
<Ticket weight="duotone" size={24} color={accent} />
```

Weights: `regular`, `light`, `bold`, `fill`, `duotone`. A weight a glyph doesn't have renders as `regular`. React Native needs `react-native-svg`.

### Adding or redrawing a glyph

1. Draw on a **256×256** frame. Before exporting: Outline Stroke, then Flatten. No hard-coded fill colours.
2. Export SVGs to `glyphs/<weight>/<name>.svg` (kebab-case, e.g. `glyphs/fill/calendar-blank.svg`). `regular` is required; other weights are optional.
3. `npm run build`. It fails with a clear message if an SVG has strokes, non-path elements, a wrong viewBox or a fill colour.

To start from a Phosphor shape: `npm run import:phosphor -- CalendarBlank`. It never overwrites a redrawn file.

## TypeScript

```ts
import type { IconName } from "@unifesto/unicon";

const icon: IconName = "at";
```

## Available Icons

* account
* appearance
* apple
* at
* google
* instagram
* mail
* notification
* permission
* phone
* rate
* signout
* support

## License

Copyright © Unifesto Private Limited.

All rights reserved.

This package and its contents, including all icons, graphics, assets, source files, and associated materials, are the intellectual property of Unifesto Private Limited.

No part of this package may be copied, modified, redistributed, sold, sublicensed, or used in commercial products without prior written permission from Unifesto Private Limited.