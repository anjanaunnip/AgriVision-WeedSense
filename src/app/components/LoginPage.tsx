import { useState, useEffect } from "react";
import { API_BASE_URL } from "../api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Logo } from "./Logo";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, ArrowLeft } from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
  onSignupClick: () => void;
}

export function LoginPage({ onLogin, onSignupClick }: LoginPageProps) {
  const [email, setEmail] = useState(
  localStorage.getItem("savedEmail") || ""
);
const [password, setPassword] = useState(
  localStorage.getItem("savedPassword") || ""
);
const [showPassword, setShowPassword] = useState(false);
const [rememberMe, setRememberMe] = useState(
  localStorage.getItem("savedEmail") ? true : false
);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
    if (!email.includes("@")) {
  alert("Please enter a valid email address");
  return;
}

if (password.length < 6) {
  alert("Password must be at least 6 characters");
  return;
}

  try {
    const response = await fetch(`${API_BASE_URL}/login/`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {

  // Save or remove credentials
  if (rememberMe) {
    localStorage.setItem("savedEmail", email);
    localStorage.setItem("savedPassword", password);
  } else {
    localStorage.removeItem("savedEmail");
    localStorage.removeItem("savedPassword");
  }

  onLogin();
}
 else {
      alert(data.error || "Login failed");
    }
  } catch (err) {
    alert("Server error. Is Django running?");
  }
};
useEffect(() => {
  const savedEmail = localStorage.getItem("savedEmail");
  const savedPassword = localStorage.getItem("savedPassword");

  if (savedEmail && savedPassword) {
    setEmail(savedEmail);
    setPassword(savedPassword);
    setRememberMe(true);
  }
}, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F7EE] via-white to-[#E8F7EE] flex items-center justify-center relative overflow-hidden">
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#14A14A] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFCC45] rounded-full blur-3xl"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">

          {/* ✅ Back Button to Landing Page */}
          <button
            onClick={() => (window.location.href = "/")}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#14A14A] font-semibold mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#14A14A] to-[#FFCC45] rounded-full blur-xl opacity-40 animate-pulse"></div>
                <div className="relative p-3 bg-gradient-to-br from-[#E8F7EE] to-white rounded-full shadow-lg">
                  <Logo className="w-16 h-16" />
                </div>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-600">
              Sign in to access AgriVision WeedSense
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 h-12 border-gray-300 focus:border-[#14A14A] focus:ring-[#14A14A]"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 pr-11 h-12 border-gray-300 focus:border-[#14A14A] focus:ring-[#14A14A]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
  type="checkbox"
  className="w-4 h-4"
  checked={rememberMe}
  onChange={(e) => setRememberMe(e.target.checked)}
/>


                <span className="text-sm text-gray-600">Remember me</span>
              </label>

              <a href="#" className="text-sm text-[#14A14A] font-semibold">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-[#14A14A] to-[#0B8A3D] text-white font-bold"
            >
              Sign In
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={onSignupClick}
                className="text-[#14A14A] font-bold hover:underline"
              >
                Sign up now
              </button>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-amber-50 rounded-lg border border-emerald-200">
            <div className="flex items-start gap-2">
              <Sparkles className="w-5 h-5 text-[#14A14A]" />
              <div>
                <p className="text-xs font-semibold">Demo Access</p>
                <p className="text-xs text-gray-600">
                  Use any email and password to explore the platform
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            By signing in, you agree to Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
