import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Loader2, Image, Scan, BarChart3, CheckCircle2 } from "lucide-react";

interface ProcessingPageProps {
  fieldName: string;
}

export function ProcessingPage({ fieldName }: ProcessingPageProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Preprocessing Image",
      description: "Normalizing and enhancing image quality",
      icon: Image,
      color: "emerald",
    },
    {
      id: 2,
      title: "Calculating NDVI",
      description: "Computing vegetation health indices",
      icon: BarChart3,
      color: "amber",
    },
    {
      id: 3,
      title: "Detecting Weeds",
      description: "AI model analyzing weed patterns",
      icon: Scan,
      color: "blue",
    },
    {
      id: 4,
      title: "Generating Results",
      description: "Creating visualization and reports",
      icon: CheckCircle2,
      color: "purple",
    },
  ];

  useEffect(() => {
    // Simulate processing stages
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1250); // Each step takes 1.25 seconds

    return () => clearInterval(interval);
  }, []);

  const getColorClasses = (color: string, isActive: boolean) => {
    const colors = {
      emerald: {
        bg: isActive ? "from-emerald-500 to-emerald-600" : "from-gray-400 to-gray-500",
        text: isActive ? "text-emerald-600" : "text-gray-500",
        border: isActive ? "border-emerald-500" : "border-gray-300",
        glow: "shadow-emerald-500/50",
      },
      amber: {
        bg: isActive ? "from-amber-500 to-orange-500" : "from-gray-400 to-gray-500",
        text: isActive ? "text-amber-600" : "text-gray-500",
        border: isActive ? "border-amber-500" : "border-gray-300",
        glow: "shadow-amber-500/50",
      },
      blue: {
        bg: isActive ? "from-blue-500 to-indigo-500" : "from-gray-400 to-gray-500",
        text: isActive ? "text-blue-600" : "text-gray-500",
        border: isActive ? "border-blue-500" : "border-gray-300",
        glow: "shadow-blue-500/50",
      },
      purple: {
        bg: isActive ? "from-purple-500 to-purple-600" : "from-gray-400 to-gray-500",
        text: isActive ? "text-purple-600" : "text-gray-500",
        border: isActive ? "border-purple-500" : "border-gray-300",
        glow: "shadow-purple-500/50",
      },
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B8A3D] via-[#14A14A] to-[#0B8A3D] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300/30 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-green-300/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-yellow-400/30 rounded-full animate-bounce"></div>
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-white/20 rounded-full animate-ping"></div>
      </div>

      <div className="max-w-3xl w-full relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative p-3 bg-white/20 backdrop-blur-md rounded-full shadow-2xl border-2 border-white/40">
                <Logo className="w-12 h-12" />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-2xl">
            Processing Analysis
          </h1>
          <p className="text-base text-white/90 font-medium drop-shadow-lg">
            Analyzing {fieldName || "your paddy field"}
          </p>
        </div>

        {/* Processing Steps */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border-2 border-white/30 shadow-2xl">
          <div className="space-y-4">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              const Icon = step.icon;
              const colorClasses = getColorClasses(step.color, isActive || isCompleted);

              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                    isActive
                      ? "bg-white shadow-xl scale-105"
                      : isCompleted
                      ? "bg-white/50"
                      : "bg-white/20"
                  }`}
                >
                  {/* Step Icon */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${colorClasses.bg} rounded-xl flex items-center justify-center shadow-lg ${
                        isActive ? colorClasses.glow + " animate-pulse" : ""
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      ) : isActive ? (
                        <Icon className="w-6 h-6 text-white animate-pulse" />
                      ) : (
                        <Icon className="w-6 h-6 text-white opacity-50" />
                      )}
                    </div>
                    
                    {/* Step Number Badge */}
                    <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                      isActive || isCompleted
                        ? "bg-white " + colorClasses.border + " " + colorClasses.text
                        : "bg-gray-200 border-gray-300 text-gray-500"
                    }`}>
                      {step.id}
                    </div>
                  </div>

                  {/* Step Info */}
                  <div className="flex-1">
                    <h3 className={`text-base font-bold mb-0.5 ${
                      isActive || isCompleted ? "text-gray-900" : "text-gray-500"
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-xs ${
                      isActive || isCompleted ? "text-gray-600" : "text-gray-400"
                    }`}>
                      {step.description}
                    </p>
                  </div>

                  {/* Loading Spinner */}
                  {isActive && (
                    <div className="flex-shrink-0">
                      <Loader2 className={`w-6 h-6 ${colorClasses.text} animate-spin`} />
                    </div>
                  )}

                  {/* Checkmark */}
                  {isCompleted && (
                    <div className="flex-shrink-0">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${colorClasses.bg} flex items-center justify-center`}>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-white/90 font-bold mb-1.5">
              <span>Overall Progress</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-purple-400 rounded-full transition-all duration-500 shadow-lg"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-full">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
            <p className="text-white text-xs font-semibold">
              AI models are analyzing your field image...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}