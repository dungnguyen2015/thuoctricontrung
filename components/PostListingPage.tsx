"use client";

import React from "react";

export type BlogPost = {
  title: string;
  description: string;
  image_url: string;
  created_at?: string;
  slug: string;
};

type Props = {
  posts: BlogPost[];
};

const PostListingPage: React.FC<Props> = ({ posts }) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Tin tức - Trung Điện Lạnh",
    "description": "Danh sách các bài viết chia sẻ dịch vụ điện lạnh và kinh nghiệm sử dụng tủ lạnh, máy lạnh, máy giặt,...",
    "mainEntity": posts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "author": {
        "@type": "Organization",
        "name": "Trung Điện Lạnh"
      },
      "datePublished": post.created_at,
      "image": post.image_url,
      "url": post.slug
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </>
  );
};

export default PostListingPage;