import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Download,
  Share2,
  Leaf,
  Droplets,
  Sun,
} from "lucide-react";




interface Zone {
  zone_id: number;
  x: number;
  y: number;
  instruction: string;
}


interface ResultsPageProps {
  ndviImageUrl: string;
  originalImage: string;
  overlayImage: string;
  fieldName: string;
  weedPercentage: number;
  cropPercentage: number;
  ndvi: number;
  confidence: number;
  modelAccuracy: number;
  reliabilityScore: number;

  recommendation: {
    pesticide: string;
    dosage: string;
  } | null;

  zones: Zone[];
  onViewGIS: (zones: Zone[]) => void;
}


export function ResultsPage({
  ndviImageUrl,
  originalImage,
  overlayImage,
  fieldName,
  weedPercentage,
  cropPercentage,
  ndvi,
  confidence,
  modelAccuracy,
  reliabilityScore,
  recommendation,
  zones,                // ✅ ADD THIS
  onViewGIS,
}: ResultsPageProps) {

  // =============================
// Mask Transparency State
// =============================
const [opacity, setOpacity] = useState(0.6);

// =============================
// Animated Reveal State
// =============================


const [reveal, setReveal] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    setReveal(true);
  }, 500);

  return () => clearTimeout(timer);
}, []);


// -------------------------
// OVERALL FIELD HEALTH LOGIC
// -------------------------
let healthStatus = "";
let statusColor = "";

if (cropPercentage >= 75) {
  healthStatus = "Excellent";
  statusColor = "text-emerald-600";
} else if (cropPercentage >= 60) {
  healthStatus = "Good";
  statusColor = "text-green-600";
} else if (cropPercentage >= 40) {
  healthStatus = "Moderate";
  statusColor = "text-amber-600";
} else {
  healthStatus = "Poor";
  statusColor = "text-red-600";
}

  const recommendedAction =
    weedPercentage > 30
      ? "Apply herbicide immediately"
      : "Monitor weed patches regularly";

  // -------------------------
  // DOWNLOAD REPORT (Backend)
  // -------------------------
  const handleDownloadReport = async () => {
    try {
    const payload = {
  weed_percentage: weedPercentage,
  crop_percentage: cropPercentage,
  model_accuracy: modelAccuracy,
  ndvi: ndvi,
  health_status: reliabilityScore > 50 ? "Healthy" : "Unhealthy",
  recommendation: recommendation,
  original_image: originalImage,     // must be URL, not "Z"
  ndvi_image: ndviImageUrl,
  overlay_image: overlayImage
};

    const response = await fetch("http://127.0.0.1:8000/download-report/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      alert("Failed to generate report.");
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "AgriVision_Report.pdf";
    link.click();

  } catch (err) {
    alert("Failed to generate report.");
  }
};
  // -------------------------
  // SHARE RESULTS
  // -------------------------
  const handleShareResults = async () => {
    const shareText = `
🌱 AgriVision WeedSense Results

Field: ${fieldName}
Crop Coverage: ${cropPercentage}%
Weed Coverage: ${weedPercentage}%
NDVI: ${ndvi}
Model Confidence: ${confidence}%

Recommended Action:
${recommendedAction}
`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Weed Detection Results",
          text: shareText,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert("Results copied to clipboard.");
      }
    } catch {
      alert("Unable to share results.");
    }
  };

  return (
    <div className="space-y-5">
      
      {/* PAGE HEADER */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full mb-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <p className="text-emerald-700 font-semibold text-xs tracking-wide">
            ANALYSIS COMPLETE
          </p>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Weed Detection Results
        </h1>

        <p className="text-sm text-gray-600">{fieldName} - Detailed Analysis Report</p>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* Crop Coverage */}
        <Card className="p-4 border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <Leaf className="w-6 h-6 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              CROP
            </span>
          </div>
          <p className="text-3xl font-bold text-emerald-600">{cropPercentage}%</p>
          <p className="text-xs text-gray-600 font-medium">Healthy Crop Coverage</p>
        </Card>

        {/* Weed Coverage */}
        <Card className="p-4 border-2 border-red-200 bg-gradient-to-br from-red-50 to-white shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
              WEED
            </span>
          </div>
          <p className="text-3xl font-bold text-red-600">{weedPercentage}%</p>
          <p className="text-xs text-gray-600 font-medium">Weed Infestation Detected</p>
        </Card>

        {/* NDVI */}
        <Card className="p-4 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <Droplets className="w-6 h-6 text-blue-600" />
            <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
              NDVI
            </span>
          </div>
          <p className="text-3xl font-bold text-blue-600">{ndvi}</p>
          <p className="text-xs text-gray-600 font-medium">Vegetation Health Index</p>
        </Card>

        {/* STATUS */}
        <Card className="p-4 border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <Sun className="w-6 h-6 text-amber-600" />
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
              STATUS
            </span>
          </div>
          <p className={`text-xl font-bold ${statusColor}`}>{healthStatus}</p>
          <p className="text-xs text-gray-600 font-medium">Overall Field Health</p>
        </Card>
      </div>

      {/* IMAGE GRID */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

  {/* ORIGINAL IMAGE */}
  <Card className="overflow-hidden border-2 border-gray-200 shadow-xl">
    <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-3">
      <h3 className="text-base font-bold text-white">Original Image</h3>
      <p className="text-xs text-gray-300">Uploaded field photo</p>
    </div>
    <div className="p-3">
      <img
        src={originalImage}
        alt="Original field"
        className="w-full h-48 object-cover rounded-lg shadow-lg"
      />
    </div>
  </Card>

  {/* REAL NDVI IMAGE */}
  <Card className="overflow-hidden border-2 border-blue-200 shadow-xl">
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
      <h3 className="text-base font-bold text-white">NDVI Analysis</h3>
      <p className="text-xs text-blue-100">Vegetation health map</p>
    </div>

    <div className="p-3">
      <img
        src={ndviImageUrl}
        alt="NDVI map"
        className="w-full h-48 object-cover rounded-lg shadow-lg"
      />
      {/* NDVI LEGEND */}
<div className="mt-3 flex items-center justify-between text-xs font-semibold">
  <span className="text-red-600">Low</span>
  <div className="flex-1 mx-2 h-2 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 rounded-full"></div>
  <span className="text-green-600">High</span>
</div>
    </div>
  </Card>

  {/* REAL YOLO WEED MASK */}
  {/* REAL YOLO WEED MASK */}
<Card className="overflow-hidden border-2 border-red-200 shadow-xl">

  {/* 🔴 HEADER ADDED HERE */}
  <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-3">
    <h3 className="text-base font-bold text-white">
      Weed Detection Mask
    </h3>
    <p className="text-xs text-red-100">
      AI detected weed regions
    </p>
  </div>

  {/* IMAGE SECTION */}
  <div className="p-3">
    <div className="relative w-full h-48 rounded-lg shadow-lg overflow-hidden">

      {/* Base Image */}
      <img
        src={originalImage}
        className="w-full h-full object-cover"
      />

      {/* Animated Overlay Reveal */}
      <img
        src={overlayImage}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out"
        style={{
          opacity: opacity,
          transform: reveal ? "scale(1)" : "scale(1.05)",
          filter: reveal ? "blur(0px)" : "blur(4px)"
        }}
      />

      <div className="absolute top-2 right-2 bg-white/90 rounded-lg px-2 py-1 shadow">
        <p className="text-xs font-bold text-red-600">
          {weedPercentage}% Weeds
        </p>
      </div>

    </div>

    {/* Transparency Slider */}
    <div className="mt-3">
      <label className="text-xs font-semibold text-gray-600">
        Mask Transparency
      </label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={opacity}
        onChange={(e) => setOpacity(Number(e.target.value))}
        className="w-full"
      />
    </div>

  </div>
</Card>


</div>

      {/* CLASSIFICATION + RECOMMENDATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* CONFIDENCE CARD */}
        <Card className="p-5 border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white shadow-xl">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-3 bg-emerald-500 rounded-xl shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Classification Result</h3>
              <p className="text-xs text-gray-600">AI model confidence summary</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-emerald-100 space-y-8">

  {/* ============================= */}
  {/* Reliability Score */}
  {/* ============================= */}
  <div>

    {/* Number Row */}
    <div className="flex items-end justify-between mb-2">
      <h4 className="text-sm font-semibold text-gray-600">
        Average Detection Confidence
      </h4>

      <div className="flex items-end gap-1">
        <span className="text-3xl font-bold text-emerald-600">
          {reliabilityScore ?? 0}
        </span>
        <span className="text-lg font-semibold text-gray-500">
          %
        </span>
      </div>
    </div>

    {/* Progress Bar */}
    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-700"
        style={{ width: `${Math.min(100, Math.max(0, reliabilityScore))}%` }}

      ></div>
    </div>

  </div>


  {/* ============================= */}
  {/* Model Accuracy */}
  {/* ============================= */}
  <div>

    {/* Number Row */}
    <div className="flex items-end justify-between mb-2">
      <h4 className="text-sm font-semibold text-gray-600">
        Model Confidence
      </h4>

      <div className="flex items-end gap-1">
        <span className="text-3xl font-bold text-blue-600">
          {modelAccuracy ?? 0}
        </span>
        <span className="text-lg font-semibold text-gray-500">
          %
        </span>
      </div>
    </div>

    {/* Progress Bar */}
    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-700"
        style={{ width: `${Math.min(100, Math.max(0, modelAccuracy))}%` }}

      ></div>
    </div>

  </div>

</div>


        </Card>

        {/* RECOMMENDATION */}
        <Card className="p-5 border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white shadow-xl">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-3 bg-amber-500 rounded-xl shadow-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">Recommendations</h3>
              <p className="text-xs text-gray-600">Suggested actions</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-amber-500">
            <h4 className="font-bold text-gray-900 text-sm mb-1.5">Primary Action</h4>
            <div className="text-gray-700 text-xs">
  {recommendation ? (
    <div>
      <div className="text-gray-700 text-sm">
        <strong>
          Pesticide Recommended:{" "}
          <span style={{ color: "red" }}>
            {recommendation.pesticide}
          </span>
        </strong>
      </div>

      <div className="text-gray-600 text-xs">
        Dosage: {recommendation.dosage}
      </div>
    </div>
  ) : (
    <div className="text-gray-500 text-sm">
      No recommendation available.
    </div>
  )}
</div>
          </div>
        </Card>
      </div>

      {/* BOTTOM BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        
        <Button
          onClick={() => onViewGIS(zones)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-lg shadow-xl"
        >
          <MapPin className="w-5 h-5 mr-2" />
          View GIS Map
        </Button>

        <Button
          onClick={handleDownloadReport}
          variant="outline"
          className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-bold py-4 px-8 rounded-lg shadow-xl"
        >
          <Download className="w-5 h-5 mr-2" />
          Download Report
        </Button>

        <Button
          onClick={handleShareResults}
          variant="outline"
          className="border-2 border-amber-600 text-amber-700 hover:bg-amber-50 font-bold py-4 px-8 rounded-lg shadow-xl"
        >
          <Share2 className="w-5 h-5 mr-2" />
          Share Results
        </Button>
      </div>

    </div>
  );
}
