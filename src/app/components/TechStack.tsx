import { Brain, Image, BarChart3, TrendingUp, Code, Cpu } from "lucide-react";
import { motion } from "motion/react";

export function TechStack() {
  const technologies = [
    {
      name: "YOLO AI",
      category: "Machine Learning",
      description: "Advanced object detection for precise weed localization",
      icon: Brain,
      color: "from-purple-500 to-indigo-600"
    },
    {
      name: "OpenCV",
      category: "Image Processing",
      description: "Professional image preprocessing and analysis",
      icon: Image,
      color: "from-blue-500 to-cyan-600"
    },
    {
      name: "NumPy",
      category: "Computation",
      description: "High-performance numerical operations",
      icon: Cpu,
      color: "from-emerald-500 to-teal-600"
    },
    {
      name: "NDVI Analysis",
      category: "Vegetation Health",
      description: "Normalized Difference Vegetation Index calculation",
      icon: TrendingUp,
      color: "from-green-500 to-lime-600"
    },
    {
      name: "Matplotlib",
      category: "Visualization",
      description: "Advanced data visualization and graphing",
      icon: BarChart3,
      color: "from-amber-500 to-orange-600"
    },
    {
      name: "Pillow (PIL)",
      category: "Image Handling",
      description: "Robust image format conversion and processing",
      icon: Code,
      color: "from-rose-500 to-pink-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-gray-900 to-gray-800 rounded-full mb-4 shadow-xl">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <p className="text-white font-bold tracking-wide text-sm">POWERED BY</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cutting-Edge Technology Stack
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform leverages industry-leading technologies to deliver accurate, reliable, and fast weed detection results
          </p>
        </div>

        {/* Technology Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${tech.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}></div>

              {/* Card */}
              <div className="relative h-full bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Icon */}
                <div className="mb-4">
                  <div className={`inline-flex p-4 bg-gradient-to-br ${tech.color} rounded-xl shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}>
                    <tech.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Category badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full mb-3">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                    {tech.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {tech.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {tech.description}
                </p>

                {/* Decorative line */}
                <div className={`mt-4 h-1 w-16 bg-gradient-to-r ${tech.color} rounded-full group-hover:w-full transition-all duration-500`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 rounded-2xl border-2 border-emerald-200/50 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-gray-700">
                Production-Ready
              </span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-gray-700">
                Scalable Architecture
              </span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-gray-700">
                97%+ Accuracy
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
