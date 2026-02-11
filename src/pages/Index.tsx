import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Paintbrush, Sofa, Lightbulb, Calculator, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-room.jpg";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";

const featureKeys = [
  { icon: Home, titleKey: "features.aiRoomScanner", descKey: "features.aiRoomScannerDesc", link: "/scanner" },
  { icon: Paintbrush, titleKey: "features.paintSimulator", descKey: "features.paintSimulatorDesc", link: "/colors" },
  { icon: Sofa, titleKey: "features.smartFurniture", descKey: "features.smartFurnitureDesc", link: "/designer" },
  { icon: Lightbulb, titleKey: "features.lightingDesigner", descKey: "features.lightingDesignerDesc", link: "/designer" },
  { icon: Calculator, titleKey: "features.budgetEstimator", descKey: "features.budgetEstimatorDesc", link: "/budget" },
  { icon: Sparkles, titleKey: "features.aiThemePacks", descKey: "features.aiThemePacksDesc", link: "/themes" },
] as const;

const Index = () => {
  const { t, language } = useI18n();

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
            <Link to="/scanner" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t("nav.roomScanner")}</Link>
            <Link to="/themes" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t("nav.themes")}</Link>
            <Link to="/designer" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t("nav.designer")}</Link>
            <Link to="/budget" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t("nav.budget")}</Link>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button className="bg-gradient-hero text-primary-foreground hover:opacity-90 transition-opacity border-0">
              {t("nav.getStarted")}
            </Button>
          </div>
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
                {t("hero.badge")}
              </span>
              <h1 className="font-display text-5xl lg:text-6xl font-bold leading-tight mb-6">
                {t("hero.title1")} <br />
                <span className="text-gradient-hero">{t("hero.titleHighlight")}</span>
                <br />{t("hero.title2")}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                {t("hero.desc")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/scanner">
                  <Button size="lg" className="bg-gradient-hero text-primary-foreground hover:opacity-90 transition-opacity border-0 shadow-warm text-base px-8">
                    {t("hero.scanRoom")}
                  </Button>
                </Link>
                <Link to="/themes">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base px-8">
                    {t("hero.exploreThemes")}
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-10 text-sm text-muted-foreground">
                <span>🇮🇳 English • हिन्दी • తెలుగు</span>
                <span>{t("hero.vastuSupport")}</span>
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
                <p className="text-sm font-medium text-foreground">{t("hero.designScore")}</p>
                <p className="text-2xl font-bold text-gradient-hero">92/100</p>
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 -right-2 bg-card rounded-xl p-4 shadow-gold border border-border"
              >
                <p className="text-sm font-medium text-foreground">{t("hero.estBudget")}</p>
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
              {t("features.title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("features.desc")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureKeys.map((f, i) => (
              <motion.div
                key={f.titleKey}
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
                    <h3 className="font-display text-xl font-semibold mb-2 text-foreground">{t(f.titleKey)}</h3>
                    <p className="text-muted-foreground text-sm">{t(f.descKey)}</p>
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
              {t("cta.title")}
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              {t("cta.desc")}
            </p>
            <Link to="/scanner">
              <Button size="lg" className="bg-card text-foreground hover:bg-card/90 text-base px-10 shadow-warm">
                {t("cta.startDesigning")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>{t("footer.copyright")}</p>
          <p className="mt-1">English • हिन्दी • తెలుగు</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
