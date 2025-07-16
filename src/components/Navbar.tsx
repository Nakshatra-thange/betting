'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { LogOut } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  let lastScrollY = 0;

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Predictions', href: '#pred' },
    { name: 'How It Works', href: '#hiw' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#foot' },
    { name: 'Signup', href: '/signup' }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    const res = await fetch('/api/auth/logout', { method: 'POST' });

    if (res.ok) {
      toast.success('Logged out!');
      router.push('/login');
    } else {
      toast.error('Logout failed');
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
        scrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-100'
          : 'bg-white/95 backdrop-blur-sm'
      } ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Predictor
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-50 ${
                  pathname === link.href
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* ✅ Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-semibold ml-4"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>

          {/* Join Now + Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link
              href="/join"
              className="hidden sm:inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              Join Now
            </Link>

            {/* Hamburger */}
            <button
              onClick={toggleMenu}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full bg-gray-600 transform transition-all duration-300 ${
                    isOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-gray-600 transition-all duration-300 ${
                    isOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-gray-600 transform transition-all duration-300 ${
                    isOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 bg-white/95 backdrop-blur-sm border-t border-gray-100">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                pathname === link.href
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* ✅ Mobile Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 hover:text-red-700 px-4 py-3 font-semibold"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
