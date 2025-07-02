import parse from 'html-react-parser';
import he from 'he';

interface ArticleContentProps {
  htmlContent: string;
}

export default function ArticleContent({ htmlContent }: ArticleContentProps) {
  const decodedHTML = he.decode(htmlContent);
  let imageCount = 0;

  const transform = (node: any) => {
  if (node.type === 'tag' && node.name === 'img') {
    const attribs = node.attribs || {};
    imageCount++;

    attribs.loading = imageCount === 1 ? 'eager' : 'lazy';
    attribs.decoding = 'async';

    if (!attribs.width) attribs.width = '600';
    if (!attribs.height) attribs.height = '400';

    // Xử lý class -> className
    attribs.className = attribs.class
      ? `${attribs.class} article-img`
      : 'article-img';
    delete attribs.class;

    // Xử lý style nếu tồn tại
    if (attribs.style) {
      delete attribs.style; // hoặc bạn có thể parse CSS nếu cần
    }

    return <img {...attribs} />;
  }

  return undefined;
};

  return <div>{parse(decodedHTML, { replace: transform })}</div>;
}