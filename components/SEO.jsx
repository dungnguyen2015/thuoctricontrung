import Head from 'next/head';
import LocalBusinessSchema from './LocalBusinessSchema';

const SEO = ({
  title = 'Trung Điện Lạnh - Dịch vụ điện lạnh uy tín tại TPHCM',
  description = 'Thu mua tủ lạnh, máy giặt, máy lạnh cũ giá cao, đến tận nơi.',
  keywords = 'Thu mua tủ lạnh, máy giặt, máy lạnh cũ giá cao, đến tận nơi.',
  url = 'https://trungdienlanh.vn',
  image = '/images/default.jpg',
}) => {
  return (
    <head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="icon" href="/favicon.ico" />
      <LocalBusinessSchema
          name="Trung Điện Lạnh"
          description="Dịch vụ sửa chữa, thu mua, lắp đặt điện lạnh uy tín tại TP.HCM"
          url="https://trungdienlanh.com"
          logo="https://trungdienlanh.com/logo.png"
          image="https://trungdienlanh.com/banner.jpg"
          telephone="+84932383966"
          email="trungdienlanh@gmail.com"
          address={{
            streetAddress: '64 Quang Trung, Tăng Nhơn Phú B, Tp Thủ Đức',
            addressLocality: 'Phường Tăng Nhơn Phú B',
            addressRegion: 'TP. Hồ Chí Minh',
            postalCode: '700000',
            addressCountry: 'VN',
          }}
          openingHours={[
            'Mo-Fr 08:00-18:00',
            'Sa 08:00-17:00',
            'Su 08:00-12:00',
          ]}
          geo={{
            latitude: 10.7769,
            longitude: 106.7009,
          }}
        />
    </head>
  )
}

export default SEO