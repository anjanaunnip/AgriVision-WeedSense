import { Button } from "./ui/button";
import { Logo } from "./Logo";
import { Scan, BarChart3, MapPin, CheckCircle, Sparkles, TrendingUp, Shield, Zap, Upload, Wheat, Leaf, Sprout, Play } from "lucide-react";
import { TechStack } from "./TechStack";
import { useState } from "react";
import { DemoPage } from "./DemoPage";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [showDemo, setShowDemo] = useState(false);

  const scrollToUpload = () => {
    onGetStarted();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="relative">
      {/* Demo Modal */}
      {showDemo && <DemoPage onClose={() => setShowDemo(false)} />}

      {/* Hero Section - Redesigned with Reduced Height & Modern Style */}
      <section className="relative py-8 md:py-12 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-200/40 to-teal-200/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-amber-200/40 to-yellow-200/40 rounded-full blur-3xl"></div>
          
          {/* Dotted pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'radial-gradient(circle, #14A14A 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            {/* Left Column - Content */}
            <div className="text-left space-y-4 md:space-y-5">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-xs font-bold tracking-wider">AI-POWERED MULTI-CROP PLATFORM</span>
              </div>
              
              {/* Main Heading */}
              <div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-[#0B8A3D] via-[#14A14A] to-[#0B8A3D] bg-clip-text text-transparent">
                    AgriVision
                  </span>
                  <br />
                  <span className="text-gray-900">WeedSense</span>
                </h1>
                
                {/* Tagline */}
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-[#FFCC45] to-[#FFB700] rounded-2xl shadow-xl mb-3">
                  <Sparkles className="w-4 h-4 text-[#0B8A3D]" />
                  <p className="text-base md:text-lg font-bold text-[#0B8A3D]">
                    See Smarter. Grow Better.
                  </p>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-xl">
                Transform your agriculture with AI-powered multi-crop weed detection. 
                Monitor wheat, corn, rice, and more with precision satellite and drone imagery analysis.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={scrollToUpload}
                  className="bg-gradient-to-r from-[#14A14A] to-[#0B8A3D] hover:from-[#0B8A3D] hover:to-[#14A14A] text-white font-bold text-sm md:text-base px-6 md:px-8 py-5 md:py-6 shadow-xl hover:shadow-2xl transition-all rounded-2xl hover:scale-105"
                >
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Start Free Analysis
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowDemo(true)}
                  className="bg-white border-2 border-gray-300 hover:border-emerald-500 text-gray-900 hover:text-emerald-700 font-bold text-sm md:text-base px-6 md:px-8 py-5 md:py-6 shadow-lg hover:shadow-xl transition-all rounded-2xl hover:scale-105"
                >
                  <Play className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 md:p-4 border border-gray-200 shadow-md">
                  <div className="text-xl md:text-2xl font-bold text-emerald-600">97%+</div>
                  <div className="text-xs text-gray-600 font-semibold">Accuracy</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 md:p-4 border border-gray-200 shadow-md">
                  <div className="text-xl md:text-2xl font-bold text-amber-600">10+</div>
                  <div className="text-xs text-gray-600 font-semibold">Crops</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 md:p-4 border border-gray-200 shadow-md">
                  <div className="text-xl md:text-2xl font-bold text-blue-600">24/7</div>
                  <div className="text-xs text-gray-600 font-semibold">Monitor</div>
                </div>
              </div>
            </div>

            {/* Right Column - Logo & Visual */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Glow effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-yellow-300 rounded-full blur-2xl opacity-20"></div>
                
                {/* Logo Container */}
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 lg:p-12 shadow-2xl border-2 border-white">
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 border-t-4 border-l-4 border-emerald-500 rounded-tl-3xl"></div>
                  <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 border-t-4 border-r-4 border-amber-500 rounded-tr-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 md:w-16 md:h-16 border-b-4 border-l-4 border-amber-500 rounded-bl-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 md:w-16 md:h-16 border-b-4 border-r-4 border-emerald-500 rounded-br-3xl"></div>
                  
                  {/* Logo */}
                  <Logo className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 relative z-10" />
                  
                  {/* Floating badges */}
                  <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg text-xs font-bold">
                    AI Powered
                  </div>
                  <div className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg text-xs font-bold">
                    Multi-Crop
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Crops Section - NEW */}
      <section className="py-16 bg-gradient-to-br from-white via-[#E8F7EE] to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-4 shadow-lg">
              <Leaf className="w-4 h-4 text-white" />
              <p className="text-white font-bold text-sm tracking-wide">MULTI-CROP SUPPORT</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Monitor Any Crop Type
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our AI platform supports comprehensive weed detection across all major agricultural crops
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Rice", icon: Wheat, color: "from-emerald-500 to-teal-600" },
              { name: "Wheat", icon: Wheat, color: "from-amber-500 to-orange-600" },
              { name: "Corn", icon: Sprout, color: "from-yellow-500 to-amber-600" },
              { name: "Soybeans", icon: Leaf, color: "from-green-500 to-emerald-600" },
              { name: "Cotton", icon: Sparkles, color: "from-blue-500 to-cyan-600" },
              { name: "Vegetables", icon: Leaf, color: "from-lime-500 to-green-600" }
            ].map((crop, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-[#14A14A] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`inline-flex p-3 bg-gradient-to-br ${crop.color} rounded-lg shadow-lg mb-3 group-hover:scale-110 transition-transform`}>
                  <crop.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-bold text-gray-900">{crop.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-50 border border-emerald-200 rounded-full mb-5 shadow-md">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <p className="text-emerald-700 font-semibold text-sm tracking-wide">POWERFUL FEATURES</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Advanced Multi-Crop Intelligence
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cutting-edge AI technology for precision agriculture across all crop types
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-10 blur-lg transition-all duration-300"></div>
              
              <div className="relative h-full bg-white border-2 border-gray-100 rounded-2xl p-8 transition-all duration-300 group-hover:border-emerald-200 group-hover:shadow-xl">
                <div className="mb-6">
                  <div className="inline-flex p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg group-hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-105">
                    <Scan className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-0.5 w-10 bg-emerald-500 rounded-full"></div>
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">AI Technology</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    AI-Powered Detection
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-5">
                    Advanced machine learning algorithms identify weeds across all crop types with 
                    <span className="font-semibold text-emerald-600"> 97%+ accuracy</span>, providing precise segmentation and classification.
                  </p>
                  
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-lg border border-emerald-100">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    <span className="text-xs font-bold text-emerald-700">97% Accuracy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-10 blur-lg transition-all duration-300"></div>
              
              <div className="relative h-full bg-white border-2 border-gray-100 rounded-2xl p-8 transition-all duration-300 group-hover:border-amber-200 group-hover:shadow-xl">
                <div className="mb-6">
                  <div className="inline-flex p-4 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg group-hover:shadow-amber-500/50 transition-all duration-300 group-hover:scale-105">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-0.5 w-10 bg-amber-500 rounded-full"></div>
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Smart Analytics</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Real-Time Analytics
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-5">
                    Comprehensive dashboards with 
                    <span className="font-semibold text-amber-600"> NDVI analysis</span>, heat maps, and trend tracking for optimal multi-crop management and yield optimization.
                  </p>
                  
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-lg border border-amber-100">
                    <TrendingUp className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold text-amber-700">Live Monitoring</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-10 blur-lg transition-all duration-300"></div>
              
              <div className="relative h-full bg-white border-2 border-gray-100 rounded-2xl p-8 transition-all duration-300 group-hover:border-blue-200 group-hover:shadow-xl">
                <div className="mb-6">
                  <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-105">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-0.5 w-10 bg-blue-500 rounded-full"></div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">GIS Mapping</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Precision Field Mapping
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-5">
                    Interactive field mapping with 
                    <span className="font-semibold text-blue-600"> GPS coordinates</span>, weed density heat maps, and zone-specific treatment recommendations.
                  </p>
                  
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-100">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-blue-700">GPS Enabled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-gray-900 to-gray-800 rounded-full mb-4 shadow-xl">
              <Zap className="w-4 h-4 text-amber-400" />
              <p className="text-white font-bold tracking-wide text-sm">SIMPLE PROCESS</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple, fast, and accurate multi-crop weed detection in three easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="relative group text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl blur-2xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <span className="text-4xl font-bold text-white">1</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Upload Field Image</h3>
                <p className="text-gray-600 leading-relaxed">
                  Upload drone or satellite images of your crop fields through our simple interface
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl blur-2xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <span className="text-4xl font-bold text-white">2</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white group-hover:scale-110 transition-transform">
                    <Scan className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">AI Analysis</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our AI models process NDVI, detect weeds across all crops, and analyze health in seconds
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl blur-2xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 via-indigo-500 to-indigo-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <span className="text-4xl font-bold text-white">3</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Get Results</h3>
                <p className="text-gray-600 leading-relaxed">
                  View detailed reports, GIS maps, and actionable recommendations instantly
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-white to-[#E8F7EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-5 py-2 bg-gradient-to-r from-[#14A14A] to-[#0B8A3D] rounded-full mb-4 shadow-lg">
                <p className="text-white font-bold text-sm">KEY BENEFITS</p>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Precision Multi-Crop Management
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="p-3 bg-gradient-to-br from-[#14A14A] to-[#0B8A3D] rounded-lg shadow-md">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Reduce Chemical Costs</h4>
                    <p className="text-gray-600">Save up to 40% on herbicide expenses with AI-powered targeted application across all crop types</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="p-3 bg-gradient-to-br from-[#14A14A] to-[#0B8A3D] rounded-lg shadow-md">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Increase Crop Yield</h4>
                    <p className="text-gray-600">Early weed detection leads to 25-30% higher productivity across all agricultural crops</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="p-3 bg-gradient-to-br from-[#14A14A] to-[#0B8A3D] rounded-lg shadow-md">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Sustainable Farming</h4>
                    <p className="text-gray-600">Minimize environmental impact with precision herbicide application and soil protection</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#14A14A] to-[#FFCC45] rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <img
                src="https://images.unsplash.com/photo-1666987570506-f8c3e05b6c58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwY3JvcCUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc2OTc2MDAzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Diverse agricultural crops"
                className="rounded-xl shadow-2xl w-full h-[400px] object-cover relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <TechStack />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0B8A3D] via-[#14A14A] to-[#0B8A3D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1621452353638-888c49e1d340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMGZpZWxkJTIwYWVyaWFsfGVufDF8fHx8MTc2OTc2MDAzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Wheat field"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers using AI-powered multi-crop weed detection to increase yields and reduce costs
          </p>
          <Button 
            onClick={scrollToUpload}
            className="bg-gradient-to-r from-[#FFCC45] to-[#FFB700] hover:from-[#FFD966] hover:to-[#FFCC45] text-[#0B8A3D] font-bold text-xl px-12 py-7 shadow-2xl hover:scale-110 transition-all rounded-xl"
          >
            <Sparkles className="w-6 h-6 mr-2" />
            Start Free Analysis Today
          </Button>
        </div>
      </section>
    </div>
  );
}