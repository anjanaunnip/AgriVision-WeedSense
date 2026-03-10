import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, MapPin, Layers, Maximize2, ZoomIn, ZoomOut, Info } from "lucide-react";
import { useState } from "react";
import html2canvas from "html2canvas";

interface Zone {
  zone_id: number;
  x: number;
  y: number;
  instruction: string;
  contour: number[][];
}

interface GISMapPageProps {
  fieldName: string;
  zones: Zone[];
  weedPercentage: number;
  originalImage: string;
  imageWidth: number;
  imageHeight: number;
  onBackToResults: () => void;
}

export function GISMapPage({
  fieldName,
  zones,
  weedPercentage,
  originalImage,
  imageWidth,
  imageHeight,
  onBackToResults,
}: GISMapPageProps) {
  const [displayWidth, setDisplayWidth] = useState(0);
  const [displayHeight, setDisplayHeight] = useState(0);
  const [zoom, setZoom] = useState(1);

  let densityLevel: "low" | "medium" | "high" = "low";
  if (weedPercentage > 65) densityLevel = "high";
  else if (weedPercentage >= 25) densityLevel = "medium";

  const handleExportPDF = async () => {
    const mapElement = document.getElementById("gisMapContainerWrapper");
    if (!mapElement) return alert("Map container not found");

    const canvas = await html2canvas(mapElement, {
      useCORS: true,
      backgroundColor: "#ffffff",
      scale: 2,
      scrollX: 0,
      scrollY: 0,
      foreignObjectRendering: false,
    });

    const mapImage = canvas.toDataURL("image/jpeg", 0.9);

    const response = await fetch("http://127.0.0.1:8000/download-gis-report/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fieldName,
        weedPercentage,
        zones,
        mapImage,
      }),
    });

    if (!response.ok) {
      console.log(await response.text());
      return alert("PDF generation failed");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "GIS_Report.pdf";
    link.click();
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            onClick={onBackToResults}
            variant="outline"
            className="mb-4 border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-semibold"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Results
          </Button>

          <div className="inline-flex items-center gap-2 px-5 py-2 bg-blue-50 border border-blue-200 rounded-full mb-4">
            <MapPin className="w-4 h-4 text-blue-600" />
            <div className="text-blue-700 font-semibold text-sm tracking-wide">GIS VISUALIZATION</div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Spatial Weed Distribution
          </h1>
          <p className="text-lg text-gray-600">{fieldName} - Geographic Information System Analysis</p>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* MAP SECTION */}
        <div className="lg:col-span-3">
          <Card className="overflow-hidden border-2 border-gray-200 shadow-2xl">

            {/* CONTROLS */}
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Interactive Field Map</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => setZoom(z => Math.min(z + 0.2, 3))} className="p-2 bg-white/20 hover:bg-white/30 rounded-lg">
                  <ZoomIn className="w-5 h-5 text-white" />
                </button>
                <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} className="p-2 bg-white/20 hover:bg-white/30 rounded-lg">
                  <ZoomOut className="w-5 h-5 text-white" />
                </button>
                <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg">
                  <Layers className="w-5 h-5 text-white" />
                </button>
                <button onClick={() => setZoom(1)} className="p-2 bg-white/20 hover:bg-white/30 rounded-lg">
                  <Maximize2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* MAP */}
            <div className="relative bg-gray-100">

              {/* SANDBOX MAP WRAPPER */}
              <div
                id="gisMapContainerWrapper"
                style={{
                  position: "relative",
                  width: "800px",
                  height: "500px",
                  backgroundColor: "white",
                  color: "black",
                  overflow: "hidden",
                  isolation: "isolate",
                }}
              >

                {/* BASE IMAGE */}
                <div
                  className="absolute inset-0 flex justify-center items-center"
                  style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}
                >
                  <img
                    src={originalImage}
                    alt="Field"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onLoad={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setDisplayWidth(rect.width);
                      setDisplayHeight(rect.height);
                    }}
                  />
                </div>

                {/* SVG OVERLAY */}
                <svg
                  width={displayWidth}
                  height={displayHeight}
                  style={{
                    position: "absolute",
                    left: `calc(50% - ${displayWidth / 2}px)`,
                    top: `calc(50% - ${displayHeight / 2}px)`,
                    pointerEvents: "none",
                  }}
                >
                  {zones.map((zone) => {
                    if (!zone.contour) return null;

                    const scaleX = displayWidth / imageWidth;
                    const scaleY = displayHeight / imageHeight;

                    const points = zone.contour
                      .map(([x, y]) => `${x * scaleX},${y * scaleY}`)
                      .join(" ");

                    return (
                      <polygon
                        key={zone.zone_id}
                        points={points}
                        fill="rgba(255,0,0,0.25)"
                        stroke="red"
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>

                {/* ZONE MARKERS */}
                {zones.map((zone) => {
                  const scaleX = displayWidth / imageWidth;
                  const scaleY = displayHeight / imageHeight;

                  return (
                    <div
                      key={zone.zone_id}
                      style={{
                        position: "absolute",
                        left: `calc(50% - ${displayWidth / 2}px + ${zone.x * scaleX}px)`,
                        top: `calc(50% - ${displayHeight / 2}px + ${zone.y * scaleY}px)`,
                        width: "40px",
                        height: "40px",
                        background: "red",
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                        fontWeight: "bold",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {zone.zone_id}
                    </div>
                  );
                })}
              </div>

              {/* LEGEND */}
              <div className="absolute bottom-4 right-4 bg-white/95 p-4 rounded-xl shadow-xl border border-gray-300">
                <p className="text-xs font-bold text-gray-700 mb-3 tracking-wide">WEED DENSITY LEVEL</p>

                <div className="space-y-2 text-xs font-semibold">
                  <div className={`flex items-center gap-3 ${densityLevel === "high" && "text-red-600 font-bold"}`}>
                    <div style={{ width: "32px", height: "16px", background: "red", borderRadius: "4px" }}></div>
                    High (&gt;65%)
                  </div>

                  <div className={`flex items-center gap-3 ${densityLevel === "medium" && "text-orange-600 font-bold"}`}>
                    <div style={{ width: "32px", height: "16px", background: "orange", borderRadius: "4px" }}></div>
                    Medium (25–65%)
                  </div>

                  <div className={`flex items-center gap-3 ${densityLevel === "low" && "text-yellow-600 font-bold"}`}>
                    <div style={{ width: "32px", height: "16px", background: "yellow", borderRadius: "4px" }}></div>
                    Low (&lt;25%)
                  </div>
                </div>
              </div>

            </div>
          </Card>
        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-6">
          <Card className="p-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">Field Summary</h3>
            </div>

            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-xs text-gray-500 font-semibold">Total Area</p>
                <p className="text-2xl font-bold text-gray-900">2.5 ha</p>
              </div>

              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-xs text-gray-500 font-semibold">Affected Zones</p>
                <p className="text-2xl font-bold text-red-600">{zones.length} zones</p>
              </div>

              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-xs text-gray-500 font-semibold">Requires Treatment</p>
                <p className="text-2xl font-bold text-orange-600">0.6 ha</p>
              </div>
            </div>
          </Card>

          {zones.map((zone) => (
            <Card key={zone.zone_id} className="p-3 shadow-sm border-l-4 border-red-500">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-bold text-gray-900">Zone {zone.zone_id}</p>
                <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">
                  Weed Cluster
                </span>
              </div>

              <p className="text-xs text-gray-600">X: {zone.x.toFixed(0)}, Y: {zone.y.toFixed(0)}</p>
              <p className="text-xs text-blue-600 mt-2 font-medium">{zone.instruction}</p>
            </Card>
          ))}

          <Button
            onClick={handleExportPDF}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold py-4 shadow-xl rounded-xl"
          >
            Export GIS Data (PDF)
          </Button>
        </div>
      </div>

      {/* INFO */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500 rounded-xl">
            <Info className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">GIS Visualization Features</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              This interactive map shows weed distribution…
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}