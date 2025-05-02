import '../styles/globals.css';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import BreadcrumbSchema from '@/components/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'Trung Điện Lạnh',
  description: 'Dịch vụ điện lạnh uy tín tại TPHCM',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
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
         <BreadcrumbSchema />
      </head>
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
