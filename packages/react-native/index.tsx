import { Image } from "react-native";

export function UnIcon({
  source,
  size = 24,
}) {
  return (
    <Image
      source={source}
      style={{
        width: size,
        height: size,
      }}
    />
  );
}