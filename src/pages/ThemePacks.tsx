import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Home, Palette, Sofa, Lightbulb, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getThemeRecommendations } from "@/lib/design-ai";

const themes = [
  { id: "Budget Friendly Home", name: "Budget Friendly Home", desc: "Affordable yet stylish design for cost-conscious families", colors: ["#F5E6D3", "#C4A882", "#8B7355", "#E8D5B7"], budget: "₹50K - ₹1.5L", tags: ["Affordable", "Practical"], icon: "💰" },
  { id: "South Indian Traditional", name: "South Indian Traditional", desc: "Rich wood tones, brass accents, kolam-inspired patterns", colors: ["#8B4513", "#DAA520", "#FAEBD7", "#556B2F"], budget: "₹1L - ₹3L", tags: ["Traditional", "Cultural"], icon: "🪔" },
  { id: "Modern Bachelor Room", name: "Modern Bachelor Room", desc: "Sleek minimal design with smart storage and tech-friendly", colors: ["#2D3142", "#4F5D75", "#BFC0C0", "#FFFFFF"], budget: "₹80K - ₹2L", tags: ["Minimal", "Modern"], icon: "🖥️" },
  { id: "Family-Friendly Design", name: "Family-Friendly Design", desc: "Safe, spacious, and child-friendly with warm colors", colors: ["#F2CC8F", "#81B29A", "#E07A5F", "#F4F1DE"], budget: "₹1.5L - ₹4L", tags: ["Family", "Safe"], icon: "👨‍👩‍👧‍👦" },
  { id: "Vastu-Based Layout", name: "Vastu-Based Layout", desc: "Aligned with Vastu Shastra for harmony and positive energy", colors: ["#FFD700", "#FF8C00", "#FFEFD5", "#8FBC8F"], budget: "₹1L - ₹3L", tags: ["Vastu", "Spiritual"], icon: "🕉️" },
  { id: "Premium Luxury", name: "Premium Luxury", desc: "High-end finishes, imported materials, designer furniture", colors: ["#1C1C1C", "#C5A47E", "#EDE8E2", "#4A3728"], budget: "₹5L - ₹15L", tags: ["Luxury", "Premium"], icon: "✨" },
];

const ThemePacks = () => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  const selected = themes.find(t => t.id === selectedTheme);

  const applyTheme = async () => {
    if (!selectedTheme) return;
    setLoading(true);
    setAiResult(null);
    try {
      const result = await getThemeRecommendations({
        theme: selectedTheme,
        roomType: "Living Room",
        budget: selected?.budget,
      });
      setAiResult(result);
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
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">AI Theme Packs</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-10 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">One-Click AI Design Themes</h1>
          <p className="text-muted-foreground">Choose a theme and AI will generate a complete design plan with colors, furniture, decor & budget</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {themes.map((theme, i) => (
            <motion.div key={theme.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <button
                onClick={() => { setSelectedTheme(theme.id); setAiResult(null); }}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 hover:-translate-y-1 ${
                  selectedTheme === theme.id ? "border-primary shadow-warm bg-card" : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{theme.icon}</span>
                  {selectedTheme === theme.id && <Check className="w-5 h-5 text-primary" />}
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">{theme.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{theme.desc}</p>
                <div className="flex gap-1.5 mb-3">
                  {theme.colors.map(c => (
                    <div key={c} className="w-7 h-7 rounded-full border border-border" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {theme.tags.map(t => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{t}</span>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-primary">{theme.budget}</span>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Apply Theme Button */}
        {selected && !aiResult && (
          <div className="mt-8 text-center">
            <Button onClick={applyTheme} disabled={loading} size="lg" className="bg-gradient-hero text-primary-foreground border-0 shadow-warm px-10">
              {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> AI is designing your {selected.name}...</> : <><Sparkles className="w-5 h-5 mr-2" /> Generate {selected.name} Design</>}
            </Button>
          </div>
        )}

        {/* AI Generated Theme */}
        {aiResult && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10 space-y-6">
            <div className="bg-card rounded-2xl p-8 border-2 border-primary shadow-warm">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{selected?.icon}</span>
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground">{aiResult.themeName || selected?.name}</h2>
                  <p className="text-muted-foreground">{aiResult.description}</p>
                </div>
              </div>
              {aiResult.designScore && (
                <p className="text-sm text-primary font-semibold mt-2">Design Score: {aiResult.designScore}/100</p>
              )}
            </div>

            {/* Color Palette */}
            {aiResult.colorPalette?.length > 0 && (
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-display text-lg font-semibold mb-4 text-foreground flex items-center gap-2"><Palette className="w-5 h-5 text-primary" /> Color Palette</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {aiResult.colorPalette.map((c: any, i: number) => (
                    <div key={i} className="flex items-center gap-3 bg-background rounded-lg p-3 border border-border">
                      <div className="w-12 h-12 rounded-lg border border-border shrink-0" style={{ backgroundColor: c.hex }} />
                      <div>
                        <p className="text-sm font-medium text-foreground">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.usage}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Furniture */}
            {aiResult.furniture?.length > 0 && (
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-display text-lg font-semibold mb-4 text-foreground flex items-center gap-2"><Sofa className="w-5 h-5 text-primary" /> Furniture</h3>
                <div className="space-y-3">
                  {aiResult.furniture.map((f: any, i: number) => (
                    <div key={i} className="bg-background rounded-lg p-4 border border-border">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-foreground">{f.item}</p>
                          <p className="text-sm text-muted-foreground">{f.style}</p>
                          {f.whereToBuy && <p className="text-xs text-primary mt-1">📍 {f.whereToBuy}</p>}
                        </div>
                        <span className="text-sm font-semibold text-primary shrink-0">{f.estimatedCost}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Decor */}
            {aiResult.decor?.length > 0 && (
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-display text-lg font-semibold mb-4 text-foreground">🖼️ Decor Items</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {aiResult.decor.map((d: any, i: number) => (
                    <div key={i} className="bg-background rounded-lg p-3 border border-border">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-foreground">{d.item}</p>
                        <span className="text-xs font-semibold text-primary">{d.estimatedCost}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{d.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lighting */}
            {aiResult.lighting?.length > 0 && (
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-display text-lg font-semibold mb-4 text-foreground flex items-center gap-2"><Lightbulb className="w-5 h-5 text-primary" /> Lighting</h3>
                <div className="space-y-2">
                  {aiResult.lighting.map((l: any, i: number) => (
                    <div key={i} className="bg-background rounded-lg p-3 border border-border flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-foreground">{l.type}</p>
                        <p className="text-xs text-muted-foreground">{l.location} • {l.mood}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Budget & Vastu */}
            <div className="grid md:grid-cols-2 gap-6">
              {aiResult.totalBudget && (
                <div className="bg-card rounded-xl p-6 border-2 border-primary">
                  <h3 className="font-display text-lg font-semibold mb-2 text-foreground">💰 Total Budget</h3>
                  <p className="text-2xl font-bold text-gradient-hero">{aiResult.totalBudget}</p>
                  {aiResult.flooring && (
                    <div className="mt-3 text-sm">
                      <p className="text-foreground font-medium">Flooring: {aiResult.flooring.type}</p>
                      <p className="text-muted-foreground">{aiResult.flooring.reason}</p>
                      <p className="text-primary font-semibold">{aiResult.flooring.estimatedCost}</p>
                    </div>
                  )}
                </div>
              )}
              {aiResult.vastuNotes?.length > 0 && (
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-display text-lg font-semibold mb-3 text-foreground">🕉️ Vastu Notes</h3>
                  <ul className="space-y-2">
                    {aiResult.vastuNotes.map((n: string, i: number) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2"><span className="text-accent">•</span>{n}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex gap-3 flex-wrap">
              <Link to="/colors"><Button className="bg-gradient-hero text-primary-foreground border-0">Customize Colors →</Button></Link>
              <Link to="/budget"><Button variant="outline" className="border-primary text-primary">Detailed Budget →</Button></Link>
              <Button variant="outline" onClick={() => { setAiResult(null); setSelectedTheme(null); }} className="border-border text-foreground">Try Another Theme</Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ThemePacks;
