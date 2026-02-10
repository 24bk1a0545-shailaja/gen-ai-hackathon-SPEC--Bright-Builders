import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Paintbrush, Droplets, Sun, Moon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const moods = [
  { name: "Calm", icon: Moon, colors: ["#E8D5B7", "#C4A882", "#8B7355", "#F5E6D3"] },
  { name: "Energetic", icon: Sun, colors: ["#E07A5F", "#F2CC8F", "#81B29A", "#F4F1DE"] },
  { name: "Luxury", icon: Sparkles, colors: ["#2D3142", "#C5A47E", "#EDE8E2", "#4F5D75"] },
];

const finishes = ["Matte", "Glossy", "Textured", "Satin"];

const wallColors = [
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
  const [selectedWall, setSelectedWall] = useState(wallColors[0]);
  const [selectedAccent, setSelectedAccent] = useState(wallColors[3]);
  const [selectedFinish, setSelectedFinish] = useState("Matte");

  const moodData = moods.find(m => m.name === selectedMood)!;

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
            {/* Mood */}
            <div>
              <h3 className="font-display text-lg font-semibold mb-3 text-foreground">Mood</h3>
              <div className="flex gap-2">
                {moods.map(m => (
                  <Button
                    key={m.name}
                    size="sm"
                    variant={selectedMood === m.name ? "default" : "outline"}
                    onClick={() => setSelectedMood(m.name)}
                    className={selectedMood === m.name ? "bg-gradient-hero text-primary-foreground border-0" : "border-border text-foreground"}
                  >
                    <m.icon className="w-4 h-4 mr-1" /> {m.name}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2 mt-3">
                {moodData.colors.map(c => (
                  <div key={c} className="w-10 h-10 rounded-lg border border-border cursor-pointer hover:scale-110 transition-transform" style={{ backgroundColor: c }} onClick={() => setSelectedWall({ name: "", hex: c })} />
                ))}
              </div>
            </div>

            {/* Wall Color */}
            <div>
              <h3 className="font-display text-lg font-semibold mb-3 text-foreground">Wall Color</h3>
              <div className="grid grid-cols-6 gap-2">
                {wallColors.map(c => (
                  <button
                    key={c.hex}
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
                {wallColors.map(c => (
                  <button
                    key={c.hex}
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
                  <Button
                    key={f}
                    size="sm"
                    variant={selectedFinish === f ? "default" : "outline"}
                    onClick={() => setSelectedFinish(f)}
                    className={selectedFinish === f ? "bg-gradient-hero text-primary-foreground border-0" : "border-border text-foreground"}
                  >
                    <Droplets className="w-3 h-3 mr-1" /> {f}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-3">
            <motion.div
              key={selectedWall.hex + selectedAccent.hex}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl overflow-hidden border border-border shadow-warm"
            >
              <div className="relative h-[400px]" style={{ backgroundColor: selectedWall.hex }}>
                {/* Simulated room elements */}
                <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-amber-900/30 to-transparent" />
                {/* Accent wall */}
                <div className="absolute right-0 top-0 w-1/3 h-full" style={{ backgroundColor: selectedAccent.hex, opacity: 0.85 }} />
                {/* Door */}
                <div className="absolute bottom-0 left-[15%] w-16 h-36 rounded-t-lg border-2 border-foreground/20 bg-amber-800/60" />
                {/* Window */}
                <div className="absolute top-12 left-[50%] w-24 h-20 rounded border-2 border-foreground/20 bg-blue-200/40" />
                {/* Floor */}
                <div className="absolute bottom-0 w-full h-16 bg-amber-900/40" />
                {/* Info overlay */}
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

            <div className="mt-4 flex gap-3">
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
