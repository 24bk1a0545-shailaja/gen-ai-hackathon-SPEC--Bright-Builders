import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Move, RotateCw, Maximize, AlertTriangle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type FurnitureItem = {
  id: string;
  name: string;
  emoji: string;
  width: number;
  height: number;
  x: number;
  y: number;
  rotation: number;
};

const furnitureCatalog = [
  { name: "Bed (Queen)", emoji: "🛏️", width: 80, height: 60 },
  { name: "Wardrobe", emoji: "🗄️", width: 60, height: 30 },
  { name: "Study Desk", emoji: "🖥️", width: 50, height: 30 },
  { name: "Sofa (3-Seat)", emoji: "🛋️", width: 80, height: 35 },
  { name: "Dining Table", emoji: "🪑", width: 60, height: 40 },
  { name: "Bookshelf", emoji: "📚", width: 40, height: 20 },
  { name: "Side Table", emoji: "🪴", width: 25, height: 25 },
  { name: "TV Unit", emoji: "📺", width: 60, height: 20 },
];

const RoomDesigner = () => {
  const { t } = useI18n();
  const [placed, setPlaced] = useState<FurnitureItem[]>([
    { id: "1", name: "Bed (Queen)", emoji: "🛏️", width: 80, height: 60, x: 20, y: 20, rotation: 0 },
    { id: "2", name: "Wardrobe", emoji: "🗄️", width: 60, height: 30, x: 250, y: 10, rotation: 0 },
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const addItem = (cat: typeof furnitureCatalog[0]) => {
    setPlaced(prev => [...prev, {
      id: Date.now().toString(),
      ...cat,
      x: 100 + Math.random() * 100,
      y: 100 + Math.random() * 100,
      rotation: 0,
    }]);
  };

  const removeSelected = () => {
    if (selectedId) {
      setPlaced(prev => prev.filter(p => p.id !== selectedId));
      setSelectedId(null);
    }
  };

  const rotateSelected = () => {
    if (selectedId) {
      setPlaced(prev => prev.map(p => p.id === selectedId ? { ...p, rotation: (p.rotation + 90) % 360 } : p));
    }
  };

  const roomW = 400;
  const roomH = 300;

  const warnings: string[] = [];
  for (let i = 0; i < placed.length; i++) {
    for (let j = i + 1; j < placed.length; j++) {
      const a = placed[i], b = placed[j];
      if (a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y) {
        warnings.push(`${a.name} overlaps with ${b.name}`);
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center gap-4">
            <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
                <Maximize className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold">{t("designer.title")}</span>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
      </nav>

      <div className="container mx-auto px-6 py-10 max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-foreground">{t("designer.addFurniture")}</h3>
            <div className="grid grid-cols-2 gap-2">
              {furnitureCatalog.map(cat => (
                <button
                  key={cat.name}
                  onClick={() => addItem(cat)}
                  className="bg-card rounded-xl p-3 border border-border hover:border-primary hover:shadow-warm transition-all text-left"
                >
                  <span className="text-2xl block mb-1">{cat.emoji}</span>
                  <span className="text-xs font-medium text-foreground">{cat.name}</span>
                </button>
              ))}
            </div>

            {selectedId && (
              <div className="bg-card rounded-xl p-4 border border-border space-y-2">
                <p className="text-sm font-medium text-foreground">{t("designer.selected")}: {placed.find(p => p.id === selectedId)?.name}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={rotateSelected} className="border-border text-foreground">
                    <RotateCw className="w-4 h-4 mr-1" /> {t("designer.rotate")}
                  </Button>
                  <Button size="sm" variant="outline" onClick={removeSelected} className="border-destructive text-destructive">
                    {t("designer.remove")}
                  </Button>
                </div>
              </div>
            )}

            {warnings.length > 0 && (
              <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/30 space-y-1">
                {warnings.map((w, i) => (
                  <p key={i} className="text-xs text-destructive flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> {w}
                  </p>
                ))}
              </div>
            )}

            {warnings.length === 0 && placed.length > 0 && (
              <div className="bg-sage-light/30 rounded-xl p-4 border border-sage/30">
                <p className="text-xs text-sage flex items-center gap-1">
                  <Check className="w-3 h-3" /> {t("designer.noOverlap")}
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl border border-border shadow-warm p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-foreground flex items-center gap-1">
                  <Move className="w-4 h-4" /> {t("designer.dragToArrange")} (12ft × 10ft)
                </p>
              </div>
              <div
                className="relative bg-secondary rounded-xl border-2 border-dashed border-border overflow-hidden"
                style={{ width: roomW, height: roomH }}
              >
                <div className="absolute bottom-0 left-4 w-8 h-2 bg-amber-700 rounded-t" />
                <p className="absolute bottom-1 left-5 text-[8px] text-muted-foreground">Door</p>
                <div className="absolute top-0 right-12 w-16 h-2 bg-blue-300" />
                <p className="absolute top-1 right-14 text-[8px] text-muted-foreground">Window</p>

                {placed.map(item => (
                  <motion.div
                    key={item.id}
                    drag
                    dragMomentum={false}
                    dragConstraints={{
                      left: 0, top: 0,
                      right: roomW - item.width,
                      bottom: roomH - item.height,
                    }}
                    onDragStart={() => { setSelectedId(item.id); setDragging(true); }}
                    onDragEnd={(_, info) => {
                      setDragging(false);
                      setPlaced(prev => prev.map(p =>
                        p.id === item.id
                          ? { ...p, x: Math.max(0, Math.min(p.x + info.offset.x, roomW - p.width)), y: Math.max(0, Math.min(p.y + info.offset.y, roomH - p.height)) }
                          : p
                      ));
                    }}
                    onClick={() => setSelectedId(item.id)}
                    className={`absolute cursor-grab active:cursor-grabbing flex items-center justify-center rounded-lg border-2 transition-colors ${
                      selectedId === item.id ? "border-primary bg-primary/10" : "border-border bg-card/80"
                    }`}
                    style={{
                      width: item.width,
                      height: item.height,
                      left: item.x,
                      top: item.y,
                      transform: `rotate(${item.rotation}deg)`,
                    }}
                  >
                    <div className="text-center">
                      <span className="text-lg">{item.emoji}</span>
                      <p className="text-[8px] text-foreground leading-tight">{item.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <Link to="/budget"><Button className="bg-gradient-hero text-primary-foreground border-0">{t("designer.viewBudget")}</Button></Link>
              <Link to="/colors"><Button variant="outline" className="border-primary text-primary">{t("designer.pickColors")}</Button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDesigner;
