import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Camera, Ruler, Home, ArrowLeft, CheckCircle, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { analyzeRoom } from "@/lib/design-ai";

const roomTypes = ["Bedroom", "Living Room", "Kitchen", "Office", "Bathroom", "Dining Room"];

const RoomScanner = () => {
  const [mode, setMode] = useState<"upload" | "manual">("upload");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [dimensions, setDimensions] = useState({ length: "", width: "", height: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async () => {
    setLoading(true);
    setResult(null);
    try {
      const data = await analyzeRoom({
        roomType: selectedRoom || "Living Room",
        dimensions: mode === "manual" ? dimensions : { length: "12", width: "10", height: "9" },
        hasPhoto: mode === "upload",
        features: selectedRoom ? `${selectedRoom} with standard features` : "standard room",
      });
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const analysis = result?.roomAnalysis;

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center gap-4 py-4 px-6">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <Camera className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">AI Room Scanner</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-10 max-w-4xl">
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

            {uploadedImage && (
              <div className="space-y-3">
                <Label className="text-sm text-muted-foreground block">Room Type (helps AI accuracy)</Label>
                <div className="flex flex-wrap gap-2">
                  {roomTypes.map(r => (
                    <Button
                      key={r} size="sm"
                      variant={selectedRoom === r ? "default" : "outline"}
                      onClick={() => setSelectedRoom(r)}
                      className={selectedRoom === r ? "bg-gradient-hero text-primary-foreground border-0" : "border-border text-foreground"}
                    >{r}</Button>
                  ))}
                </div>
              </div>
            )}

            {uploadedImage && !result && (
              <Button onClick={handleScan} size="lg" disabled={loading} className="w-full bg-gradient-hero text-primary-foreground border-0 shadow-warm">
                {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing with AI...</> : <><Sparkles className="w-5 h-5 mr-2" /> Scan Room with AI</>}
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
                  <Button key={r} size="sm"
                    variant={selectedRoom === r ? "default" : "outline"}
                    onClick={() => setSelectedRoom(r)}
                    className={selectedRoom === r ? "bg-gradient-hero text-primary-foreground border-0" : "border-border text-foreground"}
                  >{r}</Button>
                ))}
              </div>
            </div>
            <Button
              onClick={handleScan} size="lg"
              className="w-full bg-gradient-hero text-primary-foreground border-0 shadow-warm"
              disabled={loading || !dimensions.length || !dimensions.width || !selectedRoom}
            >
              {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> AI is analyzing...</> : "Generate AI Room Analysis"}
            </Button>
          </div>
        )}

        {/* AI Results */}
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-6">
            <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-sage" /> AI Room Analysis Complete
            </h2>

            {/* Room Metadata */}
            {analysis && (
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { label: "Room Type", value: analysis.roomType },
                  { label: "Area", value: analysis.area ? `${analysis.area} sq ft` : `${Number(dimensions.length || 12) * Number(dimensions.width || 10)} sq ft` },
                  { label: "Natural Light", value: analysis.naturalLight },
                  { label: "Ventilation", value: analysis.ventilation },
                  { label: "Windows (est.)", value: analysis.windowsEstimate },
                  { label: "Vastu Score", value: analysis.vastuCompliance },
                ].map(item => (
                  <div key={item.label} className="bg-card rounded-xl p-4 border border-border">
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-lg font-semibold text-foreground">{String(item.value || "—")}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Design Score */}
            {result.designScore && (
              <div className="bg-card rounded-xl p-6 border-2 border-primary shadow-warm text-center">
                <p className="text-sm text-muted-foreground mb-1">AI Design Score</p>
                <p className="text-4xl font-display font-bold text-gradient-hero">{result.designScore}/100</p>
              </div>
            )}

            {/* Color Recommendations */}
            {result.colorRecommendations?.length > 0 && (
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-display text-lg font-semibold mb-4 text-foreground">🎨 Recommended Colors</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {result.colorRecommendations.map((c: any, i: number) => (
                    <div key={i} className="flex items-center gap-3 bg-background rounded-lg p-3 border border-border">
                      <div className="w-10 h-10 rounded-lg border border-border shrink-0" style={{ backgroundColor: c.hex }} />
                      <div>
                        <p className="text-sm font-medium text-foreground">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.usage} — {c.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Furniture */}
            {result.furnitureRecommendations?.length > 0 && (
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-display text-lg font-semibold mb-4 text-foreground">🛋️ Furniture Recommendations</h3>
                <div className="space-y-3">
                  {result.furnitureRecommendations.map((f: any, i: number) => (
                    <div key={i} className="bg-background rounded-lg p-4 border border-border">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-foreground">{f.item}</p>
                          <p className="text-sm text-muted-foreground">{f.placement}</p>
                          <p className="text-xs text-muted-foreground mt-1">{f.reason}</p>
                        </div>
                        <span className="text-sm font-semibold text-primary shrink-0">{f.estimatedCost}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Space Optimization */}
            {result.spaceOptimization?.length > 0 && (
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-display text-lg font-semibold mb-3 text-foreground">📐 Space Optimization</h3>
                <ul className="space-y-2">
                  {result.spaceOptimization.map((tip: string, i: number) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span> {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Vastu Tips */}
            {result.vastuTips?.length > 0 && (
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-display text-lg font-semibold mb-3 text-foreground">🕉️ Vastu Suggestions</h3>
                <ul className="space-y-2">
                  {result.vastuTips.map((tip: string, i: number) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-0.5">•</span> {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Budget */}
            {result.estimatedBudget && (
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-display text-lg font-semibold mb-3 text-foreground">💰 Budget Estimate</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(result.estimatedBudget).map(([key, val]) => (
                    <div key={key} className={`bg-background rounded-lg p-3 border ${key === "total" ? "border-primary col-span-2 md:col-span-3" : "border-border"}`}>
                      <p className="text-xs text-muted-foreground capitalize">{key}</p>
                      <p className={`font-semibold ${key === "total" ? "text-lg text-gradient-hero" : "text-foreground"}`}>{String(val)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lighting */}
            {result.lightingSuggestions?.length > 0 && (
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-display text-lg font-semibold mb-3 text-foreground">💡 Lighting Suggestions</h3>
                <div className="space-y-2">
                  {result.lightingSuggestions.map((l: any, i: number) => (
                    <div key={i} className="bg-background rounded-lg p-3 border border-border">
                      <p className="text-sm font-medium text-foreground">{l.type} — {l.location}</p>
                      <p className="text-xs text-muted-foreground">{l.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 flex-wrap">
              <Link to="/colors"><Button className="bg-gradient-hero text-primary-foreground border-0">Paint Simulator →</Button></Link>
              <Link to="/themes"><Button variant="outline" className="border-primary text-primary">Apply Theme Pack →</Button></Link>
              <Link to="/budget"><Button variant="outline" className="border-primary text-primary">Detailed Budget →</Button></Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RoomScanner;
