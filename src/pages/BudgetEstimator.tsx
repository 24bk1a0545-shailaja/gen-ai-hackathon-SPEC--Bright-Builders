import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calculator, IndianRupee, TrendingDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";

const categories = [
  { name: "Paint & Wall Finish", min: 5000, max: 40000, icon: "🎨" },
  { name: "Flooring", min: 10000, max: 80000, icon: "🪵" },
  { name: "Furniture", min: 20000, max: 200000, icon: "🛋️" },
  { name: "Lighting", min: 3000, max: 25000, icon: "💡" },
  { name: "Decor & Accessories", min: 2000, max: 30000, icon: "🖼️" },
  { name: "Curtains & Textiles", min: 2000, max: 20000, icon: "🪟" },
];

const BudgetEstimator = () => {
  const [budget, setBudget] = useState([150000]);
  const [roomSize, setRoomSize] = useState("120");
  const totalMax = categories.reduce((s, c) => s + c.max, 0);
  const totalMin = categories.reduce((s, c) => s + c.min, 0);
  const budgetVal = budget[0];
  const ratio = Math.max(0, Math.min(1, (budgetVal - totalMin) / (totalMax - totalMin)));

  const allocations = categories.map(c => ({
    ...c,
    amount: Math.round(c.min + (c.max - c.min) * ratio),
  }));

  const totalAllocated = allocations.reduce((s, a) => s + a.amount, 0);
  const overBudget = totalAllocated > budgetVal;

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
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Smart Budget Planner</h1>
          <p className="text-muted-foreground">Set your budget and get optimized cost breakdown for your room</p>
        </div>

        {/* Budget Input */}
        <div className="bg-card rounded-2xl p-8 border border-border shadow-warm mb-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label className="text-sm text-muted-foreground">Total Budget (₹)</Label>
              <div className="flex items-center gap-2 mt-1">
                <IndianRupee className="w-5 h-5 text-primary" />
                <Input
                  type="number"
                  value={budgetVal}
                  onChange={e => setBudget([Number(e.target.value)])}
                  className="text-lg font-semibold"
                />
              </div>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Room Size (sq ft)</Label>
              <Input type="number" value={roomSize} onChange={e => setRoomSize(e.target.value)} className="mt-1 text-lg font-semibold" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>₹{totalMin.toLocaleString("en-IN")}</span>
              <span>₹{totalMax.toLocaleString("en-IN")}</span>
            </div>
            <Slider
              value={budget}
              onValueChange={setBudget}
              min={totalMin}
              max={totalMax}
              step={5000}
              className="w-full"
            />
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-foreground">Cost Breakdown</h2>
            {overBudget && (
              <span className="text-sm text-destructive font-medium flex items-center gap-1">
                <TrendingDown className="w-4 h-4" /> Over budget by ₹{(totalAllocated - budgetVal).toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {allocations.map((item, i) => {
            const pct = Math.round((item.amount / budgetVal) * 100);
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl p-4 border border-border"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-medium text-foreground">{item.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">₹{item.amount.toLocaleString("en-IN")}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-hero transition-all duration-500"
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{pct}% of total budget</p>
              </motion.div>
            );
          })}

          <div className="bg-card rounded-xl p-5 border-2 border-primary shadow-warm">
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-bold text-foreground">Total Estimated</span>
              <span className={`font-display text-2xl font-bold ${overBudget ? "text-destructive" : "text-sage"}`}>
                ₹{totalAllocated.toLocaleString("en-IN")}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              For a {roomSize} sq ft room • ₹{Math.round(totalAllocated / Number(roomSize)).toLocaleString("en-IN")}/sq ft
            </p>
          </div>

          {overBudget && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-secondary rounded-xl p-5 border border-border"
            >
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">💡 Budget-Saving Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 mt-0.5 text-primary shrink-0" /> Use laminate flooring instead of marble — saves up to ₹30K</li>
                <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 mt-0.5 text-primary shrink-0" /> DIY wall art and plants — saves ₹5K-10K on decor</li>
                <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 mt-0.5 text-primary shrink-0" /> Consider LED strip lights over designer fixtures — saves ₹8K</li>
                <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 mt-0.5 text-primary shrink-0" /> Buy furniture from local carpenters instead of branded stores</li>
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetEstimator;
