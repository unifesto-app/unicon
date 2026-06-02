# UnIcon

Cross-platform icon library built with Apple Icon Composer.

UnIcon provides a collection of beautiful, high-quality icons for:

* Next.js
* React
* Expo
* React Native

## Installation

```bash
npm install @unifesto/unicon
```

## Usage

### React / Next.js

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

### Expo / React Native

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

## Available Icons

* at
* ticket
* event
* venue
* organizer

More icons are added regularly.

## Development

Build icons:

```bash
npm run build
```

Publish package:

```bash
npm publish --access public
```

## License

All rights reserved.

Copyright © Unifesto Private Limited.

This package and its contents, including all icons, graphics, assets, source files, and associated materials, are the intellectual property of Unifesto Private Limited.

No part of this package may be copied, modified, redistributed, sold, sublicensed, or used in commercial products without prior written permission from Unifesto Private Limited.

For licensing inquiries, contact Unifesto Private Limited.
