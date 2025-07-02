import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';


export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="bg-gray-100 w-5/6">
        <AdminHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
} 