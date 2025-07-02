import { Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const FloatingContactButtons = () => {
  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3 items-end">
      {/* Zalo */}
      <Link
        href="https://zalo.me/0932383966"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg rounded-full p-4 transition-transform hover:scale-110 animate-bounce-slow"
        title="Nhắn Zalo"
      >
        <MessageCircle className="w-6 h-6" />
      </Link>

      {/* Phone with number */}
      <Link
        href="tel:0932383966"
        className="flex items-center gap-2 bg-red-700 hover:bg-red-600 text-white shadow-lg rounded-full pl-4 pr-5 py-2 transition-transform hover:scale-105"
        title="Gọi điện"
      >
        <Phone className="w-6 h-6" />
        <span className="text-base font-semibold">0932.383.966</span>
      </Link>
    </div>
  );
};

export default FloatingContactButtons;