import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Camera, Ruler, Home, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const roomTypes = ["Bedroom", "Living Room", "Kitchen", "Office", "Bathroom", "Dining Room"];

const RoomScanner = () => {
  const [mode, setMode] = useState<"upload" | "manual">("upload");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [dimensions, setDimensions] = useState({ length: "", width: "", height: "" });
  const [scanned, setScanned] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setScanned(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = () => {
    setScanned(true);
    setSelectedRoom("Living Room");
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center gap-4 py-4 px-6">
          <Link to="/">
            <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <Camera className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">AI Room Scanner</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-10 max-w-4xl">
        {/* Mode Toggle */}
        <div className="flex gap-3 mb-8">
          <Button
            variant={mode === "upload" ? "default" : "outline"}
            onClick={() => setMode("upload")}
            className={mode === "upload" ? "bg-gradient-hero text-primary-foreground border-0" : "border-primary text-primary"}
          >
            <Upload className="w-4 h-4 mr-2" /> Upload Photo
          </Button>
          <Button
            variant={mode === "manual" ? "default" : "outline"}
            onClick={() => setMode("manual")}
            className={mode === "manual" ? "bg-gradient-hero text-primary-foreground border-0" : "border-primary text-primary"}
          >
            <Ruler className="w-4 h-4 mr-2" /> Enter Dimensions
          </Button>
        </div>

        {mode === "upload" ? (
          <div className="space-y-6">
            <div
              className="border-2 border-dashed border-border rounded-2xl p-12 text-center cursor-pointer hover:border-primary transition-colors bg-card"
              onClick={() => document.getElementById("room-upload")?.click()}
            >
              {uploadedImage ? (
                <img src={uploadedImage} alt="Uploaded room" className="w-full max-h-96 object-contain rounded-xl mx-auto" />
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center">
                    <Camera className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-lg font-medium text-foreground">Click to upload room photo</p>
                  <p className="text-sm text-muted-foreground">JPG, PNG up to 10MB</p>
                </div>
              )}
              <input id="room-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>

            {uploadedImage && !scanned && (
              <Button onClick={handleScan} size="lg" className="w-full bg-gradient-hero text-primary-foreground border-0 shadow-warm">
                <Home className="w-5 h-5 mr-2" /> Scan Room with AI
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6 bg-card rounded-2xl p-8 border border-border">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">Length (ft)</Label>
                <Input placeholder="12" value={dimensions.length} onChange={e => setDimensions(d => ({ ...d, length: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Width (ft)</Label>
                <Input placeholder="10" value={dimensions.width} onChange={e => setDimensions(d => ({ ...d, width: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Height (ft)</Label>
                <Input placeholder="9" value={dimensions.height} onChange={e => setDimensions(d => ({ ...d, height: e.target.value }))} className="mt-1" />
              </div>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">Room Type</Label>
              <div className="flex flex-wrap gap-2">
                {roomTypes.map(r => (
                  <Button
                    key={r}
                    size="sm"
                    variant={selectedRoom === r ? "default" : "outline"}
                    onClick={() => setSelectedRoom(r)}
                    className={selectedRoom === r ? "bg-gradient-hero text-primary-foreground border-0" : "border-border text-foreground"}
                  >
                    {r}
                  </Button>
                ))}
              </div>
            </div>
            <Button
              onClick={() => setScanned(true)}
              size="lg"
              className="w-full bg-gradient-hero text-primary-foreground border-0 shadow-warm"
              disabled={!dimensions.length || !dimensions.width || !selectedRoom}
            >
              Generate Room Analysis
            </Button>
          </div>
        )}

        {/* Scan Results */}
        {scanned && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-6">
            <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-sage" /> Room Analysis Complete
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "Room Type", value: selectedRoom || "Living Room" },
                { label: "Area", value: mode === "manual" ? `${Number(dimensions.length) * Number(dimensions.width)} sq ft` : "~144 sq ft" },
                { label: "Windows Detected", value: mode === "upload" ? "2" : "—" },
                { label: "Doors Detected", value: mode === "upload" ? "1" : "—" },
                { label: "Natural Light", value: "Good" },
                { label: "Ventilation", value: "Moderate" },
              ].map(item => (
                <div key={item.label} className="bg-card rounded-xl p-4 border border-border">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-lg font-semibold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Link to="/colors">
                <Button className="bg-gradient-hero text-primary-foreground border-0">Choose Colors →</Button>
              </Link>
              <Link to="/themes">
                <Button variant="outline" className="border-primary text-primary">Apply Theme Pack →</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RoomScanner;
