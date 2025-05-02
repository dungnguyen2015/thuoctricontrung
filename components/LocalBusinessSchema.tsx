'use client';

import React from 'react';

interface LocalBusinessSchemaProps {
  name: string;
  description: string;
  url: string;
  logo?: string;
  image?: string;
  telephone: string;
  email?: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  openingHours?: string[];
  geo?: {
    latitude: number;
    longitude: number;
  };
}

const LocalBusinessSchema: React.FC<LocalBusinessSchemaProps> = ({
  name,
  description,
  url,
  logo,
  image,
  telephone,
  email,
  address,
  openingHours,
  geo,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    description,
    url,
    ...(logo && { logo }),
    ...(image && { image }),
    telephone,
    ...(email && { email }),
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    ...(openingHours && { openingHours }),
    ...(geo && {
      geo: {
        '@type': 'GeoCoordinates',
        ...geo,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default LocalBusinessSchema;