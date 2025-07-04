'use client';

import React from 'react';

interface PostSchemaProps {
  question?: string;
  answer?: string;
}

const FAQSchema: React.FC<PostSchemaProps> = ({
  question,
  answer = 'thu mua, sửa chữa'
}) => {
  const schema = {
    '@context': 'https://schema.org',
    "@type": "FAQPage",
    "mainEntity": [{
    "@type": "Question",
    "name": `Dịch vụ ${question} có nhanh không?`,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": `Thuốc Trị Côn Trùng hỗ trợ ${answer} trong ngày, đến tận nơi, thanh toán ngay.`
    }
    }]
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
};

export default FAQSchema;