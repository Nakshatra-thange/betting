import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: 'Home', href: '/' },

    { name: 'Contact', href: '/contact' }
    
  ];

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: '𝕏' },
    { name: 'Instagram', href: '#', icon: '📷' },
    { name: 'LinkedIn', href: '#', icon: '💼' },
    { name: 'Discord', href: '#', icon: '💬' }
  ];

  return (
    <footer 
    className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div id='foot'
      className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3Cpath d='M20 20h20v20H20z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-2xl font-black text-white">AI</span>
              </div>
              <div>
                <h3 className="text-2xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  AI Betting Pro
                </h3>
                <p className="text-sm text-gray-400 font-medium">Smart predictions, smarter wins</p>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Revolutionizing sports betting with cutting-edge AI technology. 
              Make informed decisions and maximize your winning potential.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-lg">Stay Updated</h4>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Quick Links</h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-lg font-medium hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & Contact */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Connect</h4>
            
            {/* Social Media Icons */}
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-12 h-12 bg-gray-800/50 rounded-xl flex items-center justify-center text-2xl hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-110 hover:rotate-3 backdrop-blur-sm border border-gray-700 hover:border-transparent"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-3">
                <span className="text-lg">📧</span>
                <span>support@aibettingpro.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-lg">📱</span>
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-400 text-sm">
            © {currentYear} AI Betting Pro. All rights reserved.
          </div>
          
          {/* Legal Links */}
          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors duration-300">
              Cookie Policy
            </Link>
          </div>
          
          {/* Status Indicator */}
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-gray-400">All systems operational</span>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"></div>
    </footer>
  );
};

export default Footer;