import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Paintbrush, Sofa, Lightbulb, Calculator, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-room.jpg";

const features = [
  { icon: Home, title: "AI Room Scanner", desc: "Upload a photo or enter dimensions to analyze your room instantly", link: "/scanner" },
  { icon: Paintbrush, title: "Paint Simulator", desc: "Visualize colors on your walls with real-time simulation", link: "/colors" },
  { icon: Sofa, title: "Smart Furniture", desc: "Optimal furniture placement with space optimization", link: "/designer" },
  { icon: Lightbulb, title: "Lighting Designer", desc: "Smart lighting suggestions for every mood and room", link: "/designer" },
  { icon: Calculator, title: "Budget Estimator", desc: "Get cost breakdowns and find budget-friendly alternatives", link: "/budget" },
  { icon: Sparkles, title: "AI Theme Packs", desc: "One-click themes: Traditional Indian, Modern, Vastu-based", link: "/themes" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-hero flex items-center justify-center">
              <Home className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">GruhaBuddy</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/scanner" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Room Scanner</Link>
            <Link to="/themes" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Themes</Link>
            <Link to="/designer" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Designer</Link>
            <Link to="/budget" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Budget</Link>
          </div>
          <Button className="bg-gradient-hero text-primary-foreground hover:opacity-90 transition-opacity border-0">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
                🏠 AI-Powered Interior Design for Indian Homes
              </span>
              <h1 className="font-display text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Design Your <br />
                <span className="text-gradient-hero">Dream Home</span>
                <br />with AI
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Scan your room, pick themes, simulate colors, and get budget estimates — 
                all optimized for Indian homes, small spaces, and Vastu compliance.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/scanner">
                  <Button size="lg" className="bg-gradient-hero text-primary-foreground hover:opacity-90 transition-opacity border-0 shadow-warm text-base px-8">
                    Scan Your Room
                  </Button>
                </Link>
                <Link to="/themes">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base px-8">
                    Explore Themes
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-10 text-sm text-muted-foreground">
                <span>🇮🇳 English • हिन्दी • తెలుగు</span>
                <span>🕉️ Vastu Support</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-warm">
                <img src={heroImage} alt="Beautiful Indian living room interior" className="w-full h-[420px] object-cover" />
              </div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 bg-card rounded-xl p-4 shadow-gold border border-border"
              >
                <p className="text-sm font-medium text-foreground">Design Score</p>
                <p className="text-2xl font-bold text-gradient-hero">92/100</p>
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 -right-2 bg-card rounded-xl p-4 shadow-gold border border-border"
              >
                <p className="text-sm font-medium text-foreground">Est. Budget</p>
                <p className="text-2xl font-bold text-sage">₹1.8L</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4 text-foreground">
              Everything You Need to Design Your Home
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From room scanning to budget planning, GruhaBuddy handles it all with AI intelligence tailored for Indian homes.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={f.link}>
                  <div className="group p-6 rounded-xl bg-card border border-border hover:shadow-warm transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                    <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <f.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-2 text-foreground">{f.title}</h3>
                    <p className="text-muted-foreground text-sm">{f.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-hero rounded-2xl p-12 text-center">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Start with a room scan or explore our curated AI theme packs designed for Indian homes.
            </p>
            <Link to="/scanner">
              <Button size="lg" className="bg-card text-foreground hover:bg-card/90 text-base px-10 shadow-warm">
                Start Designing Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2026 GruhaBuddy — AI Interior Design for Indian Homes</p>
          <p className="mt-1">English • हिन्दी • తెలుగు</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
