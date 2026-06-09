import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '@/lib/auth';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import logo from '@/assets/logo.jpg';
import coffeeBg from '@/assets/hero-coffee.jpg';

export const Route = createFileRoute('/admin')({
  component: AdminPage,
});

function AdminPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative bg-zinc-950 overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${coffeeBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-6 animate-in fade-in duration-500">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-4 border-amber-900/40 border-t-amber-500 animate-spin" />
            <div className="absolute inset-2 rounded-full overflow-hidden shadow-[0_0_20px_rgba(217,119,6,0.3)]">
              <img src={logo} alt="Loading" className="w-full h-full object-cover animate-pulse" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-serif text-amber-50 tracking-wide animate-pulse">Brewing your experience...</h2>
            <p className="text-zinc-500 text-sm">Please wait while we prepare the portal</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}
