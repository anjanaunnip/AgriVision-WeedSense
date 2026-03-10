import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { ImageUploadPage } from "./components/ImageUploadPage";
import { ProcessingPage } from "./components/ProcessingPage";
import { ResultsPage } from "./components/ResultsPage";
import { GISMapPage } from "./components/GISMapPage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

type PageType =
  | "landing"
  | "login"
  | "signup"
  | "upload"
  | "processing"
  | "results"
  | "gis";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("landing");
  const [fieldName, setFieldName] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  interface Zone {
  zone_id: number;
  x: number;
  y: number;
  instruction: string;
  contour: number[][];
}
const [overlayImage, setOverlayImage] = useState<string>("");
const [ndviImage, setNdviImage] = useState<string>("");
const [originalImage, setOriginalImage] = useState<string>("");
const [zones, setZones] = useState<Zone[]>([]);
const [modelAccuracy, setModelAccuracy] = useState(0);
const [reliabilityScore, setReliabilityScore] = useState(0);
const [recommendation, setRecommendation] = useState<{
  pesticide: string;
  dosage: string;
} | null>(null);
const [ndviImageUrl, setNdviImageUrl] = useState<string>("");
const [imageWidth, setImageWidth] = useState(0);
const [imageHeight, setImageHeight] = useState(0);



  /* ---------- NAVIGATION HANDLERS ---------- */

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      setCurrentPage("login");
    } else {
      setCurrentPage("upload");
    }
  };

  const handleLogin = () => {
    // ✅ user is authenticated ONLY after login
    setIsAuthenticated(true);
    setCurrentPage("upload");
  };

  const handleSignup = () => {
    // ✅ after signup → go to login page
    setCurrentPage("login");
  };

  const handleLoginClick = () => {
    setCurrentPage("login");
  };

  const handleSignupClick = () => {
    setCurrentPage("signup");
  };

  const handleNavigate = (page: string) => {
    if (page === "landing") {
      setCurrentPage("landing");
      setFieldName("");
    } else if (page === "upload" && isAuthenticated) {
      setCurrentPage("upload");
    } else if (page === "login") {
      setCurrentPage("login");
    } else if (page === "signup") {
      setCurrentPage("signup");
    }
  };

  // ---------- IMAGE UPLOAD FLOW ----------
const [weedPercentage, setWeedPercentage] = useState(0);
const [cropPercentage, setCropPercentage] = useState(0);
const [ndvi, setNdvi] = useState(0);
const [confidence, setConfidence] = useState(0);

const handleImageUpload = (
  overlayImageVal: string,
  fieldName: string,
  weed: number,
  crop: number,
  ndviVal: number,
  confidenceVal: number,
  modelAccuracyVal: number,
  reliabilityScoreVal: number,
  recommendationVal: {
    pesticide: string;
    dosage: string;
  },
  zonesData: Zone[],
  ndviImageVal: string,
  originalImageVal: string,
  imageWidthVal: number,
  imageHeightVal: number
) => {

  // Correct image assignments
  setOriginalImage(originalImageVal);
  setOverlayImage(overlayImageVal);
  setNdviImageUrl(ndviImageVal);

  // Remove this if unused:
  // setNdviImage(ndviImageVal);

  setFieldName(fieldName);
  setWeedPercentage(weed);
  setCropPercentage(crop);
  setNdvi(ndviVal);
  setConfidence(confidenceVal);
  setModelAccuracy(modelAccuracyVal);
  setReliabilityScore(reliabilityScoreVal);
  setRecommendation(recommendationVal);
  setZones(zonesData);

  setImageWidth(imageWidthVal);
  setImageHeight(imageHeightVal);

  setCurrentPage("processing");

  setTimeout(() => {
    setCurrentPage("results");
  }, 5000);
};

 const handleViewGIS = () => {
  setCurrentPage("gis");
};


  const handleBackToResults = () => {
    setCurrentPage("results");
  };
  /* ---------- PAGE RENDERING ---------- */

  // Landing Page
  if (currentPage === "landing") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header
          currentPage="landing"
          onNavigate={handleNavigate}
          onLoginClick={handleLoginClick}
          isAuthenticated={isAuthenticated}
        />
        <div className="flex-1">
          <LandingPage onGetStarted={handleGetStarted} />
        </div>
        <Footer />
      </div>
    );
  }

  // Login Page
  if (currentPage === "login") {
    return (
      <LoginPage
        onLogin={handleLogin}
        onSignupClick={handleSignupClick}
      />
    );
  }
const handleLogout = () => {
  setIsAuthenticated(false);
  setCurrentPage("landing");
};

  // Signup Page
  if (currentPage === "signup") {
    return (
      <SignupPage
        onSignup={handleSignup}
        onLoginClick={handleLoginClick}
      />
    );
  }

  // Processing Page
  if (currentPage === "processing") {
    return <ProcessingPage fieldName={fieldName} />;
  }

  // Upload / Results / GIS Pages
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F7EE] via-white to-[#E8F7EE] flex flex-col">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isAuthenticated={isAuthenticated}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentPage === "upload" && (
          <ImageUploadPage 
          onUpload={handleImageUpload}
          onLogout={handleLogout} />
        )}

        {currentPage === "results" && (
  <ResultsPage
    originalImage={originalImage}
    ndviImageUrl={ndviImageUrl}
    overlayImage={overlayImage}
    fieldName={fieldName}
    weedPercentage={weedPercentage}
    cropPercentage={cropPercentage}
    ndvi={ndvi}
    confidence={confidence}
    modelAccuracy={modelAccuracy}        // ✅ ADD
    reliabilityScore={reliabilityScore}
    recommendation={recommendation}   // ✅ ADD
    zones={zones}
    onViewGIS={handleViewGIS}
  
/>

)}



        {currentPage === "gis" && (

          <GISMapPage
            fieldName={fieldName}
            zones={zones}                 // ✅ ADD
            weedPercentage={weedPercentage} 
            originalImage={originalImage} // ✅ ADD
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            onBackToResults={handleBackToResults}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
