import Image from "next/image";

export function UnIcon({
  name,
  size = 24,
}) {
  return (
    <Image
      src={`/icons/${name}.png`}
      width={size}
      height={size}
      alt={name}
    />
  );
}