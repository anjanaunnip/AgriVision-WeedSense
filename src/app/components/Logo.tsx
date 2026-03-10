import logoImage from "../../assets/logo.png.jpeg";
export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <img 
      src={logoImage} 
      alt="AgriVision WeedSense Logo" 
      className={className}
    />
  );
}