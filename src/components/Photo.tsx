export function Photo({
  sizes,
  className,
}: {
  sizes: { url?: string; src?: string; width: number }[];
  className?: string;
}) {
  return (
    <img
      srcSet={sizes.map((s) => `${s.url ?? s.src} ${s.width}w`).join(",")}
      className={className}
      alt=""
    />
  );
}
