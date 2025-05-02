'use client';

import React from 'react';

interface PostSchemaProps {
  title: string;
  description: string;
  author?: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
}

const PostSchema: React.FC<PostSchemaProps> = ({
  title,
  description,
  author = 'Admin',
  publishedAt,
  updatedAt,
  image,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image,
        height: 800,
        width: 1200,
      },
    }),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
};

export default PostSchema;