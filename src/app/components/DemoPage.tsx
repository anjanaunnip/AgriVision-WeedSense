import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { X, Upload, Scan, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "./Logo";

interface DemoPageProps {
  onClose: () => void;
}

export function DemoPage({ onClose }: DemoPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const steps = [
    {
      title: "Step 1: Upload Your Field Image",
      description: "Start by uploading a drone or satellite image of your crop field. Our platform supports multiple formats including JPG, PNG, and TIFF.",
      icon: Upload,
      color: "from-emerald-500 to-teal-600",
      animation: "upload"
    },
    {
      title: "Step 2: AI Processing & Analysis",
      description: "Our advanced YOLO-based AI model analyzes your image in real-time, detecting weeds with 97%+ accuracy and calculating NDVI vegetation health indices.",
      icon: Scan,
      color: "from-amber-500 to-orange-600",
      animation: "scan"
    },
    {
      title: "Step 3: View Comprehensive Results",
      description: "Get detailed reports with weed segmentation masks, heat maps, analytics, and actionable recommendations for targeted herbicide application.",
      icon: CheckCircle,
      color: "from-blue-500 to-indigo-600",
      animation: "results"
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  const handleStepClick = (index: number) => {
    setIsPlaying(false);
    setCurrentStep(index);
  };

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-5xl bg-gradient-to-br from-white via-emerald-50/30 to-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B8A3D] via-[#14A14A] to-[#0B8A3D] px-8 py-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Logo className="w-12 h-12" />
            <h2 className="text-3xl font-bold text-white">How It Works</h2>
          </div>
          <p className="text-white/90 text-sm">See AgriVision WeedSense in action</p>
        </div>

        {/* Content Area */}
        <div className="p-8 md:p-12">
          {/* Step Indicators */}
          <div className="flex justify-center gap-4 mb-8">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => handleStepClick(index)}
                className={`relative px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                  currentStep === index
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{index + 1}</span>
                  <span className="hidden md:inline">{step.title.split(":")[0]}</span>
                </span>
                {currentStep === index && (
                  <motion.div
                    layoutId="activeStep"
                    className="absolute inset-0 border-2 border-white rounded-xl"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Animation Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              {/* Left: Visual Animation */}
              <div className="relative h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-inner overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Upload Animation */}
                  {steps[currentStep].animation === "upload" && (
                    <div className="text-center">
                      <motion.div
                        animate={{
                          y: [0, -20, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className={`inline-flex p-8 bg-gradient-to-br ${steps[currentStep].color} rounded-3xl shadow-2xl`}
                      >
                        <Upload className="w-20 h-20 text-white" />
                      </motion.div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "80%" }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mt-8 mx-auto h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                      />
                      <p className="mt-4 text-sm font-bold text-gray-600">Uploading field image...</p>
                    </div>
                  )}

                  {/* Scan Animation */}
                  {steps[currentStep].animation === "scan" && (
                    <div className="relative w-64 h-64">
                      <motion.div
                        animate={{
                          rotate: 360
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="absolute inset-0"
                      >
                        <div className={`w-full h-full border-8 border-transparent border-t-amber-500 border-r-orange-500 rounded-full`} />
                      </motion.div>
                      <div className={`absolute inset-8 bg-gradient-to-br ${steps[currentStep].color} rounded-full flex items-center justify-center shadow-2xl`}>
                        <Scan className="w-16 h-16 text-white" />
                      </div>
                      <motion.div
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity
                        }}
                        className="absolute inset-0 border-4 border-amber-400 rounded-full"
                      />
                      <p className="absolute -bottom-8 left-0 right-0 text-center text-sm font-bold text-gray-600">
                        Analyzing with AI...
                      </p>
                    </div>
                  )}

                  {/* Results Animation */}
                  {steps[currentStep].animation === "results" && (
                    <div className="text-center space-y-4 w-full px-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className={`inline-flex p-6 bg-gradient-to-br ${steps[currentStep].color} rounded-2xl shadow-2xl`}
                      >
                        <CheckCircle className="w-16 h-16 text-white" />
                      </motion.div>
                      <div className="space-y-3">
                        {["Weed Detection Complete", "NDVI Analysis Ready", "Heat Map Generated"].map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.3 }}
                            className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-md"
                          >
                            <Sparkles className="w-5 h-5 text-emerald-500" />
                            <span className="text-sm font-semibold text-gray-700">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Description */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full border border-emerald-200">
                  <CurrentIcon className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-bold text-emerald-700">
                    Step {currentStep + 1} of {steps.length}
                  </span>
                </div>

                <h3 className="text-3xl font-bold text-gray-900">
                  {steps[currentStep].title.split(":")[1]}
                </h3>

                <p className="text-lg text-gray-600 leading-relaxed">
                  {steps[currentStep].description}
                </p>

                <div className="flex gap-3 pt-4">
                  {currentStep < steps.length - 1 ? (
                    <Button
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentStep(currentStep + 1);
                      }}
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      Next Step
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={onClose}
                      className="bg-gradient-to-r from-[#FFCC45] to-[#FFB700] hover:from-[#FFD966] hover:to-[#FFCC45] text-[#0B8A3D] font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Get Started Now
                    </Button>
                  )}
                  
                  <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    variant="outline"
                    className="border-2 border-gray-300 hover:border-emerald-500 font-bold px-6 py-3 rounded-xl"
                  >
                    {isPlaying ? "Pause" : "Auto Play"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-12">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => handleStepClick(index)}
                className={`h-2 rounded-full transition-all ${
                  currentStep === index ? "w-8 bg-emerald-500" : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
