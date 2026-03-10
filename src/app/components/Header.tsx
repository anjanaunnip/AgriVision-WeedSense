import { Button } from "./ui/button";
import { Logo } from "./Logo";
import { Upload, Menu, X, LogIn, Sparkles } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLoginClick?: () => void;
  isAuthenticated?: boolean;
}

export function Header({ currentPage, onNavigate, onLoginClick, isAuthenticated = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const handleUploadClick = () => {
    if (!isAuthenticated && onLoginClick) {
      onLoginClick();
    } else if (isAuthenticated) {
      handleNavClick("upload");
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleNavClick("landing")}
              className="flex items-center gap-4 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#14A14A] to-[#FFCC45] rounded-2xl blur-lg opacity-40"></div>
                <div className="relative p-2 bg-gradient-to-br from-emerald-50 to-amber-50 rounded-2xl shadow-md border">
                  <Logo className="w-12 h-12" />
                </div>
              </div>

              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-[#0B8A3D] to-[#14A14A] bg-clip-text text-transparent">
                  AgriVision WeedSense
                </h1>
                <p className="text-xs text-gray-600 font-semibold">
                  Multi-Crop Intelligence
                </p>
              </div>
            </button>
          </div>

          {/* Upload */}
          <nav className="hidden md:flex items-center gap-3">
            <Button
              onClick={handleUploadClick}
              className="bg-gradient-to-r from-[#14A14A] to-[#0B8A3D] text-white font-bold text-sm px-6 py-2.5 rounded-xl"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
          </nav>

          {/* Sign In + Register */}
          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated && onLoginClick && (
              <>
                {/* Sign In (unchanged) */}
                <Button 
                  onClick={onLoginClick}
                  variant="outline"
                  className="border-2 border-gray-300 text-gray-700 font-bold text-sm px-6 py-2.5 rounded-xl"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>

                {/* ✅ FIXED Register Now */}
                <Button 
                  onClick={() => onNavigate("signup")}
                  className="bg-gradient-to-r from-[#FFCC45] to-[#FFB700] text-[#0B8A3D] font-bold text-sm px-6 py-2.5 rounded-xl shadow-lg"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Register Now
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-2">

            <button
              onClick={handleUploadClick}
              className="w-full px-4 py-3 rounded-xl bg-green-600 text-white font-bold"
            >
              Upload Image
            </button>

            {!isAuthenticated && onLoginClick && (
              <>
                {/* Sign In */}
                <button
                  onClick={onLoginClick}
                  className="w-full px-4 py-3 rounded-xl border font-bold"
                >
                  Sign In
                </button>

                {/* ✅ FIXED Register Now */}
                <button
                  onClick={() => {
                    onNavigate("signup");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-yellow-400 text-green-900 font-bold"
                >
                  Register Now
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
