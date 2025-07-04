import '@/styles/globals.css';
import { Metadata } from 'next';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import BreadcrumbSchema from '@/components/BreadcrumbSchema'
import FloatingContactButtons from '@/components/FloatingContactButtons';

export const metadata: Metadata = {
  title: 'Thuốc Trị Côn Trùng',
  description: 'Dịch vụ điện lạnh uy tín tại TPHCM',
  icons: {
    icon: '/images/favicon.ico', // favicon ở thư mục public
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <LocalBusinessSchema
          name="Thuốc Trị Côn Trùng"
          description="Dịch vụ cung cấp các sản phẩm thuốc diệt côn trùng chất lượng cao"
          url="https://thuoctricontrung.com"
          logo="https://thuoctricontrung.com/images/logo.png"
          image="https://thuoctricontrung.com/images/banner.webp"
          telephone="+84932383966"
          email="thuoctricontrung@gmail.com"
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
         <BreadcrumbSchema />
      </head>
      <body className="bg-white text-black">
        {children}
        <FloatingContactButtons />
      </body>
    </html>
  );
}