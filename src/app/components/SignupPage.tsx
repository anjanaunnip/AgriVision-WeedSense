import { useState } from "react";
import { API_BASE_URL } from "../api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Logo } from "./Logo";
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, CheckCircle,ArrowLeft } from "lucide-react";

interface SignupPageProps {
  onSignup: () => void;
  onLoginClick: () => void;
}

export function SignupPage({ onSignup, onLoginClick }: SignupPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.name.trim()) {
  alert("Full name is required");
  return;
}

if (!formData.email.includes("@")) {
  alert("Invalid email format");
  return;
}

if (formData.password.length < 6) {
  alert("Password must be at least 6 characters");
  return;
}

if (formData.password !== formData.confirmPassword) {
  alert("Passwords do not match");
  return;
}


  try {
    const response = await fetch(`${API_BASE_URL}/signup/`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Signup successful 🎉");
      onLoginClick(); // go to login page
    } else {
      alert(data.error || "Signup failed");
    }
  } catch (error) {
    console.error(error);
    alert("Server error. Is Django running?");
  }
};


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F7EE] via-white to-[#E8F7EE] flex items-center justify-center relative overflow-hidden py-12">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#14A14A] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#FFCC45] rounded-full blur-3xl"></div>
      </div>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <button
  onClick={() => (window.location.href = "/")}
  className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#14A14A] mb-4"
>
  <ArrowLeft className="w-4 h-4" />
  Back
</button>

          {/* Logo and Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#14A14A] to-[#FFCC45] rounded-full blur-xl opacity-40 animate-pulse"></div>
                <div className="relative p-3 bg-gradient-to-br from-[#E8F7EE] to-white rounded-full shadow-lg">
                  <Logo className="w-16 h-16" />
                </div>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-sm text-gray-600">
              Join AgriVision WeedSense today
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="pl-11 h-12 border-gray-300 focus:border-[#14A14A] focus:ring-[#14A14A]"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
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
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-11 pr-11 h-12 border-gray-300 focus:border-[#14A14A] focus:ring-[#14A14A]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="pl-11 pr-11 h-12 border-gray-300 focus:border-[#14A14A] focus:ring-[#14A14A]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 mt-1 rounded border-gray-300 text-[#14A14A] focus:ring-[#14A14A]"
                required
              />
              <label className="text-xs text-gray-600 leading-relaxed">
                I agree to the{" "}
                <a href="#" className="text-[#14A14A] hover:underline font-semibold">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#14A14A] hover:underline font-semibold">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Signup Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-[#14A14A] to-[#0B8A3D] hover:from-[#0B8A3D] hover:to-[#14A14A] text-white font-bold text-base shadow-lg hover:shadow-xl transition-all hover:scale-105 mt-2"
            >
              Create Account
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

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={onLoginClick}
                className="text-[#14A14A] hover:text-[#0B8A3D] font-bold hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>

          {/* Features List */}
          <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-amber-50 rounded-lg border border-emerald-200">
            <p className="text-xs font-semibold text-gray-700 mb-2">What you'll get:</p>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle className="w-3.5 h-3.5 text-[#14A14A]" />
                AI-powered multi-crop weed detection
              </li>
              <li className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle className="w-3.5 h-3.5 text-[#14A14A]" />
                Real-time crop health monitoring
              </li>
              <li className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle className="w-3.5 h-3.5 text-[#14A14A]" />
                Interactive GIS mapping & analytics
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
