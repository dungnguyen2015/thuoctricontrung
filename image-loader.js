// image-loader.js
export default function imageLoader({ src, width, quality }) {
  const params = new URLSearchParams({
    w: width.toString(),
    q: (quality || 75).toString(),
    format: 'webp',
    optimize: 'high'
  });

  if (src.startsWith('http://') || src.startsWith('https://')) {
    return `${src}?${params}`;
  }
  
  return `${process.env.NEXT_PUBLIC_BASE_URL}/${src}?${params}`;
}