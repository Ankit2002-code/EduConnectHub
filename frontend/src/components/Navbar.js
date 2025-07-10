import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Users, MessageSquare, LogOut, Menu, X, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SchoolJPG from '../assets/school.jpg';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
  { to: '/contacts', label: 'Contacts', icon: <Users className="w-5 h-5" /> },
  { to: '/sendsms', label: 'Send SMS', icon: <MessageSquare className="w-5 h-5" /> },
];

const Navbar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Ultra Transparent Navbar with Animated Borders */}
      <nav className="fixed top-4 left-4 right-4 z-50 backdrop-blur-md bg-white/30 rounded-2xl shadow-2xl border border-white/40 overflow-hidden">
        {/* Animated Rainbow Border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500 via-purple-500 via-pink-500 via-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-violet-500 opacity-60 animate-rainbow-border" 
             style={{
               backgroundSize: '300% 300%',
               animation: 'rainbow-border 8s linear infinite'
             }} />
        
        {/* Inner background with subtle overlay */}
        <div className="absolute inset-[2px] bg-gradient-to-r from-white/40 via-white/30 to-white/40 rounded-2xl backdrop-blur-sm" />
        
        {/* Thin animated overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" 
             style={{
               backgroundSize: '200% 100%',
               animation: 'shimmer 3s ease-in-out infinite'
             }} />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute top-2 left-8 w-2 h-2 bg-violet-400/40 rounded-full animate-float-particle" />
          <div className="absolute top-6 right-12 w-1.5 h-1.5 bg-pink-400/40 rounded-full animate-float-particle-delay" />
          <div className="absolute bottom-3 left-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-float-particle-slow" />
        </div>

        <div className="relative px-6 py-3 flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-500 animate-pulse-slow" />
              <img 
                src={SchoolJPG} 
                alt="School Logo" 
                className="relative w-10 h-10 rounded-full shadow-lg border-2 border-white/60 bg-white/50 p-1 group-hover:scale-110 transition-transform duration-500 backdrop-blur-sm" 
              />
              <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black bg-gradient-to-r from-violet-700 via-purple-700 to-pink-700 bg-clip-text text-transparent tracking-tight select-none drop-shadow-sm">
                School SMS
              </span>
              <span className="text-xs text-gray-600/80 font-medium -mt-0.5">Communication Hub</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative flex items-center px-5 py-2.5 rounded-xl font-semibold transition-all duration-500 group overflow-hidden ${
                  location.pathname === link.to 
                    ? 'text-white shadow-lg' 
                    : 'text-gray-700 hover:text-white hover:shadow-lg'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Animated border for nav items */}
                <div className={`absolute inset-0 rounded-xl transition-all duration-500 ${
                  location.pathname === link.to
                    ? 'bg-gradient-to-r from-violet-500/80 via-purple-500/80 to-pink-500/80 opacity-100'
                    : 'bg-gradient-to-r from-violet-500/60 via-purple-500/60 to-pink-500/60 opacity-0 group-hover:opacity-100'
                }`} />
                
                {/* Thin animated border */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 p-[1px] opacity-40 group-hover:opacity-80 transition-opacity duration-500">
                  <div className="w-full h-full rounded-xl bg-white/10 backdrop-blur-sm" />
                </div>
                
                {/* Content */}
                <span className="relative z-10 flex items-center">
                  <span className="transform group-hover:scale-110 transition-transform duration-500">
                    {link.icon}
                  </span>
                  <span className="ml-2.5 font-bold tracking-wide">{link.label}</span>
                </span>
                
                {/* Floating particles for active link */}
                {location.pathname === link.to && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1.5 left-1.5 w-1 h-1 bg-white/80 rounded-full animate-ping" />
                    <div className="absolute top-2 right-2 w-1 h-1 bg-white/80 rounded-full animate-ping animation-delay-300" />
                    <div className="absolute bottom-1.5 left-1/2 w-1 h-1 bg-white/80 rounded-full animate-ping animation-delay-600" />
                  </div>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden relative p-2.5 rounded-xl bg-gradient-to-r from-violet-500/20 to-purple-500/20 hover:from-violet-500/40 hover:to-purple-500/40 transition-all duration-500 border border-white/40 hover:border-white/70 group backdrop-blur-sm"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <div className="relative">
              {mobileOpen ? (
                <X className="w-5 h-5 text-gray-700 group-hover:text-violet-600 transition-colors duration-500" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700 group-hover:text-violet-600 transition-colors duration-500" />
              )}
            </div>
          </button>

          {/* Logout Button (Desktop) */}
          <button
            onClick={handleLogout}
            className="hidden md:flex items-center space-x-2.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/40 hover:to-pink-500/40 text-red-600 hover:text-red-700 font-bold shadow-lg hover:shadow-xl transition-all duration-500 border border-red-200/50 hover:border-red-300/80 group overflow-hidden backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            <LogOut className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform duration-500" />
            <span className="relative z-10 tracking-wide">Logout</span>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/10 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute top-20 right-4 left-4 bg-white/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden animate-slide-down">
            {/* Animated border for mobile menu */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 via-purple-500/30 to-pink-500/30 rounded-2xl animate-pulse-slow" />
            <div className="absolute inset-[1px] bg-white/30 backdrop-blur-sm rounded-2xl" />
            
            <div className="relative p-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center px-5 py-3.5 m-1 rounded-xl font-semibold transition-all duration-500 group ${
                    location.pathname === link.to 
                      ? 'text-white bg-gradient-to-r from-violet-500/70 via-purple-500/70 to-pink-500/70 shadow-lg' 
                      : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-violet-500/60 hover:via-purple-500/60 hover:to-pink-500/60'
                  }`}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <span className="transform group-hover:scale-110 transition-transform duration-500">
                    {link.icon}
                  </span>
                  <span className="ml-3.5 font-bold tracking-wide">{link.label}</span>
                </Link>
              ))}
              
              <div className="h-px bg-gradient-to-r from-transparent via-gray-400/50 to-transparent my-2" />
              
              <button
                onClick={() => { setMobileOpen(false); handleLogout(); }}
                className="w-full flex items-center px-5 py-3.5 m-1 rounded-xl text-red-600 hover:text-white font-bold hover:bg-gradient-to-r hover:from-red-500/60 hover:to-pink-500/60 transition-all duration-500 group"
              >
                <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform duration-500" />
                <span className="ml-3.5 tracking-wide">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-24" />

      <style jsx>{`
        @keyframes rainbow-border {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
          50% { transform: translateY(-8px) translateX(4px); opacity: 0.8; }
        }
        
        @keyframes float-particle-delay {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-6px) translateX(-3px); opacity: 0.7; }
        }
        
        @keyframes float-particle-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.5; }
          50% { transform: translateY(-4px) translateX(2px); opacity: 0.9; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        
        @keyframes slide-down {
          0% { transform: translateY(-20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        .animate-rainbow-border {
          animation: rainbow-border 8s linear infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .animate-float-particle {
          animation: float-particle 4s ease-in-out infinite;
        }
        
        .animate-float-particle-delay {
          animation: float-particle-delay 5s ease-in-out infinite;
        }
        
        .animate-float-particle-slow {
          animation: float-particle-slow 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-slide-down {
          animation: slide-down 0.4s ease-out;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .animation-delay-600 {
          animation-delay: 600ms;
        }
      `}</style>
    </>
  );
};

export default Navbar;