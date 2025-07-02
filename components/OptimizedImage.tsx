import Image, { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'blurDataURL' | 'placeholder'> {
  blurDataURL?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority,
  className,
  style,
  blurDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+yHgAFWAJc08sE7wAAAABJRU5ErkJggg==",
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width??500}
      height={height ?? 300}
      placeholder="blur"
      blurDataURL={blurDataURL}
      className={className}
      style={style}
      loading="lazy"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
      {...props}
    />
  );
}
