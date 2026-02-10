import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Home, Palette, Sofa, Lightbulb, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const themes = [
  {
    id: "budget",
    name: "Budget Friendly Home",
    desc: "Affordable yet stylish design for cost-conscious families",
    colors: ["#F5E6D3", "#C4A882", "#8B7355", "#E8D5B7"],
    budget: "₹50K - ₹1.5L",
    tags: ["Affordable", "Practical"],
    icon: "💰",
  },
  {
    id: "south-indian",
    name: "South Indian Traditional",
    desc: "Rich wood tones, brass accents, kolam-inspired patterns",
    colors: ["#8B4513", "#DAA520", "#FAEBD7", "#556B2F"],
    budget: "₹1L - ₹3L",
    tags: ["Traditional", "Cultural"],
    icon: "🪔",
  },
  {
    id: "modern-bachelor",
    name: "Modern Bachelor Room",
    desc: "Sleek minimal design with smart storage and tech-friendly",
    colors: ["#2D3142", "#4F5D75", "#BFC0C0", "#FFFFFF"],
    budget: "₹80K - ₹2L",
    tags: ["Minimal", "Modern"],
    icon: "🖥️",
  },
  {
    id: "family",
    name: "Family-Friendly Design",
    desc: "Safe, spacious, and child-friendly with warm colors",
    colors: ["#F2CC8F", "#81B29A", "#E07A5F", "#F4F1DE"],
    budget: "₹1.5L - ₹4L",
    tags: ["Family", "Safe"],
    icon: "👨‍👩‍👧‍👦",
  },
  {
    id: "vastu",
    name: "Vastu-Based Layout",
    desc: "Aligned with Vastu Shastra principles for harmony and positive energy",
    colors: ["#FFD700", "#FF8C00", "#FFEFD5", "#8FBC8F"],
    budget: "₹1L - ₹3L",
    tags: ["Vastu", "Spiritual"],
    icon: "🕉️",
  },
  {
    id: "luxury",
    name: "Premium Luxury",
    desc: "High-end finishes, imported materials, designer furniture",
    colors: ["#1C1C1C", "#C5A47E", "#EDE8E2", "#4A3728"],
    budget: "₹5L - ₹15L",
    tags: ["Luxury", "Premium"],
    icon: "✨",
  },
];

const ThemePacks = () => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const selected = themes.find(t => t.id === selectedTheme);

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
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">One-Click Design Themes</h1>
          <p className="text-muted-foreground">Choose a theme to instantly apply colors, furniture, decor, and layout suggestions</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {themes.map((theme, i) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <button
                onClick={() => setSelectedTheme(theme.id)}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 hover:-translate-y-1 ${
                  selectedTheme === theme.id
                    ? "border-primary shadow-warm bg-card"
                    : "border-border bg-card hover:border-primary/40"
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

        {/* Theme Details */}
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 bg-card rounded-2xl p-8 border border-border shadow-warm"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">{selected.icon}</span>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">{selected.name}</h2>
                <p className="text-muted-foreground">{selected.desc}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-6">
              {[
                { icon: Palette, label: "Colors", detail: `${selected.colors.length} curated colors` },
                { icon: Sofa, label: "Furniture", detail: "8-12 pieces suggested" },
                { icon: Lightbulb, label: "Lighting", detail: "Warm + Task lights" },
                { icon: Home, label: "Layout", detail: "Optimized placement" },
              ].map(item => (
                <div key={item.label} className="bg-background rounded-xl p-4 border border-border text-center">
                  <item.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button className="bg-gradient-hero text-primary-foreground border-0 shadow-warm">
                Apply Theme to My Room
              </Button>
              <Link to="/budget">
                <Button variant="outline" className="border-primary text-primary">
                  View Budget Breakdown
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ThemePacks;
