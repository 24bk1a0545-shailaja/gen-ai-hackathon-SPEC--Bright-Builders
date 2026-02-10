import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calculator, IndianRupee, TrendingDown, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { optimizeBudget } from "@/lib/design-ai";

const roomTypes = ["Bedroom", "Living Room", "Kitchen", "Office", "1BHK Full", "2BHK Full"];

const BudgetEstimator = () => {
  const [budget, setBudget] = useState([150000]);
  const [roomSize, setRoomSize] = useState("120");
  const [selectedRoom, setSelectedRoom] = useState("Bedroom");
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  const getAIBudget = async () => {
    setLoading(true);
    setAiResult(null);
    try {
      const result = await optimizeBudget({
        totalBudget: budget[0],
        roomSize: Number(roomSize),
        roomType: selectedRoom,
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
              <Calculator className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">Budget Estimator</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-10 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">AI Budget Planner</h1>
          <p className="text-muted-foreground">Set your budget and AI will optimize spending with vendor suggestions</p>
        </div>

        {/* Budget Input */}
        <div className="bg-card rounded-2xl p-8 border border-border shadow-warm mb-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm text-muted-foreground">Total Budget (₹)</Label>
              <div className="flex items-center gap-2 mt-1">
                <IndianRupee className="w-5 h-5 text-primary" />
                <Input type="number" value={budget[0]} onChange={e => setBudget([Number(e.target.value)])} className="text-lg font-semibold" />
              </div>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Room Size (sq ft)</Label>
              <Input type="number" value={roomSize} onChange={e => setRoomSize(e.target.value)} className="mt-1 text-lg font-semibold" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>₹30,000</span>
              <span>₹10,00,000</span>
            </div>
            <Slider value={budget} onValueChange={setBudget} min={30000} max={1000000} step={5000} className="w-full" />
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

          <Button onClick={getAIBudget} disabled={loading} size="lg" className="w-full bg-gradient-hero text-primary-foreground border-0 shadow-warm">
            {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> AI is optimizing your budget...</> : <><Sparkles className="w-5 h-5 mr-2" /> Get AI Budget Plan</>}
          </Button>
        </div>

        {/* AI Results */}
        {aiResult && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Breakdown */}
            {aiResult.optimizedBudget?.length > 0 && (
              <div className="space-y-3">
                <h2 className="font-display text-xl font-bold text-foreground">AI-Optimized Breakdown</h2>
                {aiResult.optimizedBudget.map((item: any, i: number) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="bg-card rounded-xl p-4 border border-border"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{item.category}</span>
                      <span className="font-semibold text-foreground">{item.recommended}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 mb-2">
                      <div className="h-2 rounded-full bg-gradient-hero transition-all duration-500" style={{ width: item.percentage }} />
                    </div>
                    <p className="text-xs text-muted-foreground">{item.percentage} • {item.tips}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Total */}
            {aiResult.totalEstimated && (
              <div className="bg-card rounded-xl p-5 border-2 border-primary shadow-warm">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-bold text-foreground">Total Estimated</span>
                  <span className="font-display text-2xl font-bold text-gradient-hero">{aiResult.totalEstimated}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  For {roomSize} sq ft {selectedRoom}
                </p>
              </div>
            )}

            {/* Saving Tips */}
            {aiResult.savingTips?.length > 0 && (
              <div className="bg-secondary rounded-xl p-5 border border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">💡 Money-Saving Tips</h3>
                <ul className="space-y-2">
                  {aiResult.savingTips.map((tip: string, i: number) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 mt-0.5 text-primary shrink-0" /> {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cheaper Alternatives */}
            {aiResult.cheaperAlternatives?.length > 0 && (
              <div className="bg-card rounded-xl p-5 border border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-sage" /> Cheaper Alternatives
                </h3>
                <div className="space-y-3">
                  {aiResult.cheaperAlternatives.map((a: any, i: number) => (
                    <div key={i} className="bg-background rounded-lg p-3 border border-border">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground line-through">{a.original}</p>
                          <p className="text-sm font-medium text-foreground">→ {a.alternative}</p>
                        </div>
                        <span className="text-sm font-semibold text-sage">{a.savings}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vendor Suggestions */}
            {aiResult.vendorSuggestions?.length > 0 && (
              <div className="bg-card rounded-xl p-5 border border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">🏪 Where to Shop</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {aiResult.vendorSuggestions.map((v: any, i: number) => (
                    <div key={i} className="bg-background rounded-lg p-3 border border-border">
                      <p className="text-sm font-medium text-foreground">{v.name}</p>
                      <p className="text-xs text-muted-foreground">{v.specialty}</p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{v.type}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{v.priceRange}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 flex-wrap">
              <Link to="/themes"><Button className="bg-gradient-hero text-primary-foreground border-0">Explore Themes →</Button></Link>
              <Link to="/colors"><Button variant="outline" className="border-primary text-primary">Paint Simulator</Button></Link>
              <Button variant="outline" onClick={() => setAiResult(null)} className="border-border text-foreground">Recalculate</Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BudgetEstimator;
