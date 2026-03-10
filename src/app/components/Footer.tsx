import { Logo } from "./Logo";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0B8A3D] via-[#FFCC45] to-[#14A14A]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
          {/* Company Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-gradient-to-br from-[#14A14A] to-[#0B8A3D] rounded-full shadow-lg">
                <Logo className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold">AgriVision WeedSense</h3>
                <p className="text-xs text-gray-400">Multi-Crop Intelligence</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              AI-powered precision agriculture platform for intelligent multi-crop weed detection and crop health monitoring.
            </p>
            <div className="pt-2">
              <p className="text-xs font-bold text-[#FFCC45] mb-2">FOLLOW US</p>
              <div className="flex gap-2">
                <button className="w-8 h-8 bg-white/10 hover:bg-[#14A14A] rounded-lg flex items-center justify-center transition-all hover:scale-110">
                  <Facebook className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 bg-white/10 hover:bg-[#14A14A] rounded-lg flex items-center justify-center transition-all hover:scale-110">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 bg-white/10 hover:bg-[#14A14A] rounded-lg flex items-center justify-center transition-all hover:scale-110">
                  <Linkedin className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 bg-white/10 hover:bg-[#14A14A] rounded-lg flex items-center justify-center transition-all hover:scale-110">
                  <Instagram className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold mb-3 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-xs text-gray-400 hover:text-[#FFCC45] transition-colors">Home</a>
              </li>
              <li>
                <a href="#" className="text-xs text-gray-400 hover:text-[#FFCC45] transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-xs text-gray-400 hover:text-[#FFCC45] transition-colors">Features</a>
              </li>
              <li>
                <a href="#" className="text-xs text-gray-400 hover:text-[#FFCC45] transition-colors">Help Center</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold mb-3 text-white">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FFCC45] mt-0.5" />
                <p className="text-xs text-gray-400">weedsenseagrivision@gmail.com</p>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FFCC45] mt-0.5" />
                <p className="text-xs text-gray-400">+91 9497326517</p>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FFCC45] mt-0.5" />
                <p className="text-xs text-gray-400">Thrissur, Kerala, India</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-xs text-gray-400">
              © 2024 AgriVision WeedSense. All rights reserved.
            </p>
            <div className="flex gap-3 text-xs text-gray-400">
              <a href="#" className="hover:text-[#FFCC45] transition-colors">Privacy Policy</a>
              <span className="text-gray-600">•</span>
              <a href="#" className="hover:text-[#FFCC45] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-[#14A14A] to-[#0B8A3D] hover:from-[#FFCC45] hover:to-[#FFB700] text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}