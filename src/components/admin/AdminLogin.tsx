import React, { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, User } from 'lucide-react';
import { toast } from 'sonner';

import logo from '@/assets/logo.jpg';
import coffeeBg from '@/assets/hero-coffee.jpg';

// Animated floating steam particles
const SteamParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <style>{`
      @keyframes steamUp {
        0% { transform: translateY(20vh) translateX(0) scale(1); opacity: 0; filter: blur(8px); }
        50% { opacity: 0.3; transform: translateY(-30vh) translateX(20px) scale(2); }
        100% { transform: translateY(-80vh) translateX(-20px) scale(3); opacity: 0; filter: blur(12px); }
      }
      .steam-particle {
        position: absolute;
        bottom: 0;
        background: radial-gradient(circle, rgba(255,245,230,0.15) 0%, rgba(255,255,255,0) 70%);
        border-radius: 50%;
        animation: steamUp linear infinite;
      }
    `}</style>
    {[...Array(12)].map((_, i) => (
      <div 
        key={i} 
        className="steam-particle"
        style={{
          left: `${5 + Math.random() * 90}%`,
          width: `${80 + Math.random() * 100}px`,
          height: `${80 + Math.random() * 100}px`,
          animationDuration: `${12 + Math.random() * 15}s`,
          animationDelay: `${-Math.random() * 20}s`,
        }}
      />
    ))}
  </div>
);

export function AdminLogin() {
  const { login, isLoading } = useAuth();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !password) {
      toast.error('Please enter both User ID and Password');
      return;
    }

    const success = await login(userId, password);
    if (!success) {
      toast.custom((t) => (
        <div className="w-[350px] bg-zinc-950/95 backdrop-blur-xl border border-red-900/50 p-5 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.15)] flex items-start gap-4 animate-in fade-in slide-in-from-top-4">
          <div className="w-10 h-10 rounded-full bg-red-950/50 border border-red-900/50 flex items-center justify-center text-red-500 shrink-0 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-lg text-red-200 tracking-wide">Access Denied</h3>
            <p className="text-sm text-red-400/90 font-medium">This is not your cup of Coffee</p>
          </div>
          <button 
            onClick={() => toast.dismiss(t)} 
            className="ml-auto text-zinc-500 hover:text-red-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      ), { duration: 4000 });
    } else {
      toast.success('Welcome to the Admin Panel');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative p-4 overflow-hidden">
      {/* Dynamic Coffee Background with Overlay */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-[20s] ease-linear hover:scale-105"
        style={{
          backgroundImage: `url(${coffeeBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/30 via-transparent to-transparent z-0 pointer-events-none" />

      {/* Floating Steam Animation */}
      <SteamParticles />

      <Card className="w-full max-w-md shadow-2xl border-zinc-800 bg-zinc-950/80 backdrop-blur-md text-zinc-100 z-10 animate-in fade-in slide-in-from-bottom-4 duration-700 relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-zinc-950/95 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-300">
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-amber-900/40 border-t-amber-500 animate-[spin_1.5s_linear_infinite]" />
              <div className="absolute inset-2 rounded-full overflow-hidden shadow-[0_0_20px_rgba(217,119,6,0.3)]">
                <img src={logo} alt="Loading" className="w-full h-full object-cover animate-pulse" />
              </div>
            </div>
            <h3 className="text-xl font-serif text-amber-50 tracking-wide animate-pulse">Verifying credentials...</h3>
            <p className="text-zinc-500 text-sm mt-2">Almost there</p>
          </div>
        )}
        <CardHeader className="space-y-3 text-center pb-6 relative">
          {/* Logo with pulsing glow animation */}
          <div className="relative w-28 h-28 mx-auto mb-2">
            <div className="absolute inset-0 rounded-full bg-amber-600/20 blur-xl animate-pulse" />
            <div className="relative w-full h-full overflow-hidden rounded-full border-2 border-amber-600/50 shadow-[0_0_25px_rgba(217,119,6,0.3)] transition-transform duration-500 hover:scale-105 hover:border-amber-500">
              <img src={logo} alt="Coorg Coffee Luxe Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <CardTitle className="text-3xl font-serif text-amber-50 tracking-wide">Admin Portal</CardTitle>
          <CardDescription className="text-zinc-400">
            Authenticate to manage the coffee estate
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="userId" className="text-zinc-300">User ID</Label>
              <div className="relative group">
                <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500 group-focus-within:text-amber-500 transition-colors" />
                <Input
                  id="userId"
                  placeholder="admin"
                  className="pl-9 bg-zinc-900/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-amber-600 focus-visible:border-amber-600"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-zinc-300">Password</Label>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500 group-focus-within:text-amber-500 transition-colors" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-9 bg-zinc-900/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-amber-600 focus-visible:border-amber-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2 pb-8">
            <Button 
              type="submit" 
              className="w-full bg-amber-600 hover:bg-amber-500 text-white transition-all duration-300 shadow-[0_0_15px_rgba(217,119,6,0.4)] hover:shadow-[0_0_25px_rgba(217,119,6,0.6)]" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Authenticating...
                </div>
              ) : (
                'Secure Sign In'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
