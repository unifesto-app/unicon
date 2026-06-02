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