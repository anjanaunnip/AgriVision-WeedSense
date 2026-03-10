import { useState, useRef } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Upload, Image as ImageIcon, FileImage, CheckCircle2, AlertCircle } from "lucide-react";

interface Zone {
  zone_id: number;
  x: number;
  y: number;
  instruction: string;
  contour: number[][];
}

interface ImageUploadPageProps {
  onUpload: (
    overlayImage: string,
    fieldName: string,
    weed: number,
    crop: number,
    ndvi_value: number,
    confidence: number,
    model_accuracy: number,
    reliability_score: number,
    recommendation: {
      pesticide: string;
      dosage: string;
    },
    zones: Zone[],
    ndviImage: string,
    originalImage: string,
    imageWidth: number,
    imageHeight: number
  ) => void;

  onLogout: () => void;
}




export function ImageUploadPage({ onUpload, onLogout }: ImageUploadPageProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fieldName, setFieldName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/tiff'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPG, PNG, or TIFF)');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

 const handleSubmit = async () => {
  if (!selectedFile) {
    alert("Please select an image");
    return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile);
  formData.append("field_name", fieldName);

  try {
      const response = await fetch("http://127.0.0.1:8000/upload-image/", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Upload failed");
      return;
    }

    // 🟢 Pass the REAL ML results to App.tsx
    // FIXED — USING BACKEND original_image

onUpload(
  "http://127.0.0.1:8000" + data.overlay_image,
  fieldName,
  data.weed_percentage,
  data.crop_percentage,
  data.ndvi,
  data.confidence,
  data.model_accuracy,
  data.reliability_score,
  data.recommendation,
  data.zones || [],
  "http://127.0.0.1:8000" + data.ndvi_image,
  "http://127.0.0.1:8000" + data.original_image,   // ✅ FIXED
  data.image_width,
  data.image_height
);



  } catch (error) {
    alert("Server error during image upload");
  }
};


  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setFieldName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Logout Button */}
<div className="flex justify-end">
  <Button
    variant="ghost"
    onClick={onLogout}
    className="text-black-600 hover:text-green-700 hover:bg-green-300 font-semibold"
  >
    Logout
  </Button>
</div>

      {/* Page Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full mb-3">
          <Upload className="w-3.5 h-3.5 text-emerald-600" />
          <p className="text-emerald-700 font-semibold text-xs tracking-wide">UPLOAD IMAGE</p>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Upload Field Image
        </h1>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
          Upload satellite imagery or drone photos of your paddy field for AI-powered weed detection analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card className="p-6 border-2 border-gray-200 shadow-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileImage className="w-5 h-5 text-emerald-600" />
            Select Image File
          </h2>

          {/* Drag and Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-3 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-300 hover:border-emerald-400 hover:bg-gray-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/tiff"
              onChange={handleFileInputChange}
              className="hidden"
            />
            
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                <Upload className="w-10 h-10 text-white" />
              </div>
              
              <div>
                <p className="text-base font-bold text-gray-900 mb-1">
                  Drop your image here or click to browse
                </p>
                <p className="text-xs text-gray-600">
                  Supports: JPG, PNG, TIFF (GeoTIFF)
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Maximum file size: 10MB
                </p>
              </div>
            </div>
          </div>

          {/* Selected File Info */}
          {selectedFile && (
            <div className="mt-4 p-3 bg-emerald-50 border-2 border-emerald-200 rounded-lg">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2 flex-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-sm">{selectedFile.name}</p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleClear}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
                >
                  Remove
                </Button>
              </div>
            </div>
          )}

          {/* Field Name Input */}
          <div className="mt-4">
            <label className="block text-xs font-bold text-gray-900 mb-1.5">
              Field Name (Optional)
            </label>
            <Input
              type="text"
              placeholder="e.g., North Paddy Field A"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              className="w-full border-2 border-gray-200 focus:border-emerald-500 rounded-lg text-sm"
            />
            <p className="text-xs text-gray-500 mt-1.5">
              Give your field a name for easy identification
            </p>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!selectedFile}
            className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-5 text-base shadow-xl disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
          >
            <Upload className="w-4 h-4 mr-2" />
            Start Weed Detection Analysis
          </Button>
        </Card>

        {/* Preview & Information Section */}
        <div className="space-y-4">
          {/* Image Preview */}
          <Card className="p-6 border-2 border-gray-200 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-amber-600" />
              Image Preview
            </h2>
            
            {previewUrl ? (
              <div className="relative group">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg shadow-lg border-2 border-gray-200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="font-bold text-xs">Ready for Analysis</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 font-medium text-sm">No image selected</p>
                </div>
              </div>
            )}
          </Card>

          {/* Information Card */}
          <Card className="p-5 border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white shadow-xl">
            <div className="flex items-start gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  Image Requirements
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Aerial or drone images</strong> of paddy fields</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Clear visibility</strong> of crop and weed areas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Good lighting</strong> conditions preferred</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>RGB or multispectral</strong> satellite imagery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>GeoTIFF format</strong> for GPS coordinates</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Stats Card */}
          <Card className="p-4 border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-white shadow-xl">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-emerald-600">97%+</p>
                <p className="text-xs text-gray-600 mt-0.5 font-medium">Detection Accuracy</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-amber-600">&lt; 30s</p>
                <p className="text-xs text-gray-600 mt-0.5 font-medium">Processing Time</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-blue-600">NDVI</p>
                <p className="text-xs text-gray-600 mt-0.5 font-medium">Health Analysis</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-purple-600">GIS</p>
                <p className="text-xs text-gray-600 mt-0.5 font-medium">Spatial Mapping</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}