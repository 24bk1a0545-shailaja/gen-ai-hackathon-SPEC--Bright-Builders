import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Paintbrush, Droplets, Sun, Moon, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getColorSuggestions } from "@/lib/design-ai";

const moods = [
  { name: "Calm", icon: Moon },
  { name: "Energetic", icon: Sun },
  { name: "Luxury", icon: Sparkles },
];

const finishes = ["Matte", "Glossy", "Textured", "Satin"];
const roomTypes = ["Bedroom", "Living Room", "Kitchen", "Office", "Bathroom"];

const defaultWallColors = [
  { name: "Terracotta Dream", hex: "#C35831" },
  { name: "Warm Cream", hex: "#F5E6D3" },
  { name: "Sage Leaf", hex: "#8FAE8B" },
  { name: "Golden Sand", hex: "#D4A853" },
  { name: "Clay Rose", hex: "#C9827A" },
  { name: "Ocean Deep", hex: "#2D5F7C" },
  { name: "Ivory White", hex: "#FEFCF3" },
  { name: "Charcoal", hex: "#3A3A3A" },
  { name: "Marigold", hex: "#E8A317" },
  { name: "Dusty Blue", hex: "#7C9EB2" },
  { name: "Plum Wine", hex: "#6B3557" },
  { name: "Moss Green", hex: "#556B2F" },
];

const ColorSimulator = () => {
  const [selectedMood, setSelectedMood] = useState("Calm");
  const [selectedRoom, setSelectedRoom] = useState("Bedroom");
  const [selectedWall, setSelectedWall] = useState(defaultWallColors[0]);
  const [selectedAccent, setSelectedAccent] = useState(defaultWallColors[3]);
  const [selectedFinish, setSelectedFinish] = useState("Matte");
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  const getAISuggestions = async () => {
    setLoading(true);
    try {
      const result = await getColorSuggestions({
        mood: selectedMood,
        roomType: selectedRoom,
        roomSize: "120 sq ft",
        lighting: "Natural + Artificial",
      });
      setAiResult(result);

      // Apply first AI color if available
      if (result?.wallColors?.[0]?.hex) {
        setSelectedWall({ name: result.wallColors[0].name, hex: result.wallColors[0].hex });
      }
      if (result?.accentColors?.[0]?.hex) {
        setSelectedAccent({ name: result.accentColors[0].name, hex: result.accentColors[0].hex });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center gap-4 py-4 px-6">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <Paintbrush className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">Paint Simulator</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-10 max-w-5xl">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Room Type */}
            <div>
              <h3 className="font-display text-lg font-semibold mb-3 text-foreground">Room Type</h3>
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

            {/* Mood */}
            <div>
              <h3 className="font-display text-lg font-semibold mb-3 text-foreground">Mood</h3>
              <div className="flex gap-2">
                {moods.map(m => (
                  <Button key={m.name} size="sm"
                    variant={selectedMood === m.name ? "default" : "outline"}
                    onClick={() => setSelectedMood(m.name)}
                    className={selectedMood === m.name ? "bg-gradient-hero text-primary-foreground border-0" : "border-border text-foreground"}
                  ><m.icon className="w-4 h-4 mr-1" /> {m.name}</Button>
                ))}
              </div>
            </div>

            {/* AI Suggest Button */}
            <Button onClick={getAISuggestions} disabled={loading} className="w-full bg-gradient-hero text-primary-foreground border-0 shadow-warm">
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Getting AI Colors...</> : <><Sparkles className="w-4 h-4 mr-2" /> Get AI Color Suggestions</>}
            </Button>

            {/* Wall Color */}
            <div>
              <h3 className="font-display text-lg font-semibold mb-3 text-foreground">Wall Color</h3>
              <div className="grid grid-cols-6 gap-2">
                {(aiResult?.wallColors || defaultWallColors).map((c: any, i: number) => (
                  <button
                    key={c.hex + i}
                    onClick={() => setSelectedWall(c)}
                    className={`w-full aspect-square rounded-lg border-2 transition-all hover:scale-110 ${selectedWall.hex === c.hex ? "border-foreground scale-110" : "border-transparent"}`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Accent Color */}
            <div>
              <h3 className="font-display text-lg font-semibold mb-3 text-foreground">Accent Color</h3>
              <div className="grid grid-cols-6 gap-2">
                {(aiResult?.accentColors || defaultWallColors).map((c: any, i: number) => (
                  <button
                    key={c.hex + i}
                    onClick={() => setSelectedAccent(c)}
                    className={`w-full aspect-square rounded-lg border-2 transition-all hover:scale-110 ${selectedAccent.hex === c.hex ? "border-foreground scale-110" : "border-transparent"}`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Finish */}
            <div>
              <h3 className="font-display text-lg font-semibold mb-3 text-foreground">Finish</h3>
              <div className="flex flex-wrap gap-2">
                {finishes.map(f => (
                  <Button key={f} size="sm"
                    variant={selectedFinish === f ? "default" : "outline"}
                    onClick={() => setSelectedFinish(f)}
                    className={selectedFinish === f ? "bg-gradient-hero text-primary-foreground border-0" : "border-border text-foreground"}
                  ><Droplets className="w-3 h-3 mr-1" /> {f}</Button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview & AI Results */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div
              key={selectedWall.hex + selectedAccent.hex}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl overflow-hidden border border-border shadow-warm"
            >
              <div className="relative h-[400px]" style={{ backgroundColor: selectedWall.hex }}>
                <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute right-0 top-0 w-1/3 h-full" style={{ backgroundColor: selectedAccent.hex, opacity: 0.85 }} />
                <div className="absolute bottom-0 left-[15%] w-16 h-36 rounded-t-lg border-2 border-foreground/20 bg-amber-800/60" />
                <div className="absolute top-12 left-[50%] w-24 h-20 rounded border-2 border-foreground/20 bg-blue-200/40" />
                <div className="absolute bottom-0 w-full h-16 bg-amber-900/40" />
                <div className="absolute top-4 left-4 bg-card/90 backdrop-blur rounded-lg p-3 border border-border">
                  <p className="text-xs text-muted-foreground">Wall</p>
                  <p className="text-sm font-semibold text-foreground">{selectedWall.name || "Custom"}</p>
                  <p className="text-xs text-muted-foreground mt-1">Finish: {selectedFinish}</p>
                </div>
                <div className="absolute top-4 right-4 bg-card/90 backdrop-blur rounded-lg p-3 border border-border">
                  <p className="text-xs text-muted-foreground">Accent</p>
                  <p className="text-sm font-semibold text-foreground">{selectedAccent.name || "Custom"}</p>
                </div>
              </div>
            </motion.div>

            {/* AI Analysis Results */}
            {aiResult && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {aiResult.colorHarmony && (
                  <div className="bg-card rounded-xl p-4 border border-border">
                    <h4 className="font-display text-sm font-semibold text-foreground mb-1">🎨 Color Harmony</h4>
                    <p className="text-sm text-muted-foreground">{aiResult.colorHarmony}</p>
                  </div>
                )}
                {aiResult.moodEffect && (
                  <div className="bg-card rounded-xl p-4 border border-border">
                    <h4 className="font-display text-sm font-semibold text-foreground mb-1">✨ Mood Effect</h4>
                    <p className="text-sm text-muted-foreground">{aiResult.moodEffect}</p>
                  </div>
                )}
                {aiResult.vastuColorTips?.length > 0 && (
                  <div className="bg-card rounded-xl p-4 border border-border">
                    <h4 className="font-display text-sm font-semibold text-foreground mb-2">🕉️ Vastu Color Tips</h4>
                    <ul className="space-y-1">
                      {aiResult.vastuColorTips.map((t: string, i: number) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2"><span className="text-primary">•</span>{t}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {aiResult.paintBrands?.length > 0 && (
                  <div className="bg-card rounded-xl p-4 border border-border">
                    <h4 className="font-display text-sm font-semibold text-foreground mb-2">🏪 Paint Brand Suggestions</h4>
                    <div className="space-y-2">
                      {aiResult.paintBrands.map((b: any, i: number) => (
                        <div key={i} className="flex justify-between items-center bg-background rounded-lg p-2 border border-border">
                          <div>
                            <p className="text-sm font-medium text-foreground">{b.brand}</p>
                            <p className="text-xs text-muted-foreground">{b.shadeName}</p>
                          </div>
                          <span className="text-xs font-semibold text-primary">{b.estimatedCost}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            <div className="flex gap-3">
              <Link to="/budget" className="flex-1">
                <Button className="w-full bg-gradient-hero text-primary-foreground border-0">Estimate Budget →</Button>
              </Link>
              <Link to="/themes" className="flex-1">
                <Button variant="outline" className="w-full border-primary text-primary">Browse Themes</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorSimulator;
