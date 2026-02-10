import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, data } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let systemPrompt = "";
    let userPrompt = "";

    switch (action) {
      case "analyze-room": {
        const { roomType, dimensions, hasPhoto, features } = data;
        systemPrompt = `You are GruhaBuddy, an expert Indian interior design AI assistant. You specialize in designing homes optimized for Indian families, small spaces, Vastu compliance, and budget constraints. Always respond in valid JSON format.`;
        userPrompt = `Analyze this room and provide comprehensive design recommendations:
Room Type: ${roomType}
Dimensions: ${dimensions?.length || 12}ft × ${dimensions?.width || 10}ft × ${dimensions?.height || 9}ft
Has Photo: ${hasPhoto || false}
Additional Features: ${features || "standard room"}

Respond with this exact JSON structure:
{
  "roomAnalysis": {
    "area": "number in sq ft",
    "roomType": "detected type",
    "naturalLight": "Good/Moderate/Low",
    "ventilation": "Good/Moderate/Low",
    "windowsEstimate": "number",
    "doorsEstimate": "number",
    "vastuCompliance": "percentage string"
  },
  "colorRecommendations": [
    {"name": "color name", "hex": "#hexcode", "usage": "wall/accent/ceiling", "reason": "why this color"}
  ],
  "furnitureRecommendations": [
    {"item": "name", "placement": "where to place", "reason": "why", "estimatedCost": "₹ amount"}
  ],
  "spaceOptimization": ["tip1", "tip2", "tip3"],
  "vastuTips": ["tip1", "tip2"],
  "estimatedBudget": {
    "paint": "₹ range",
    "furniture": "₹ range",
    "flooring": "₹ range",
    "lighting": "₹ range",
    "decor": "₹ range",
    "total": "₹ range"
  },
  "designScore": "number out of 100",
  "lightingSuggestions": [
    {"type": "light type", "location": "where", "reason": "why"}
  ]
}`;
        break;
      }

      case "theme-recommendations": {
        const { theme, roomType: rt, dimensions: dims, budget } = data;
        systemPrompt = `You are GruhaBuddy, an expert Indian interior design AI. Generate detailed theme-specific design recommendations. Always respond in valid JSON.`;
        userPrompt = `Generate a complete design plan for the "${theme}" theme:
Room Type: ${rt || "Living Room"}
Dimensions: ${dims?.length || 12}ft × ${dims?.width || 10}ft
Budget: ${budget || "₹1-3 Lakhs"}

Respond with this JSON structure:
{
  "themeName": "${theme}",
  "description": "2-3 sentence theme description",
  "colorPalette": [{"name": "name", "hex": "#hex", "usage": "where to use"}],
  "furniture": [{"item": "name", "style": "style description", "estimatedCost": "₹X", "whereToBuy": "vendor suggestion"}],
  "decor": [{"item": "name", "description": "brief desc", "estimatedCost": "₹X"}],
  "lighting": [{"type": "type", "location": "where", "mood": "warm/cool/neutral"}],
  "flooring": {"type": "recommendation", "reason": "why", "estimatedCost": "₹X"},
  "totalBudget": "₹ range",
  "vastuNotes": ["note1", "note2"],
  "spaceOptimization": ["tip1", "tip2"],
  "designScore": "number out of 100"
}`;
        break;
      }

      case "color-suggestions": {
        const { mood, roomType: crt, roomSize, lighting } = data;
        systemPrompt = `You are GruhaBuddy, an expert color consultant for Indian homes. Suggest colors based on room context, mood, and Vastu principles. Always respond in valid JSON.`;
        userPrompt = `Suggest a color scheme for:
Mood: ${mood || "Calm"}
Room Type: ${crt || "Bedroom"}
Room Size: ${roomSize || "120 sq ft"}
Lighting: ${lighting || "Natural + Artificial"}

Respond with this JSON:
{
  "wallColors": [{"name": "name", "hex": "#hex", "finish": "matte/glossy/textured", "reason": "why"}],
  "accentColors": [{"name": "name", "hex": "#hex", "usage": "where to use"}],
  "ceilingColor": {"name": "name", "hex": "#hex", "reason": "why"},
  "colorHarmony": "description of how colors work together",
  "vastuColorTips": ["tip1", "tip2"],
  "paintBrands": [{"brand": "Asian Paints/Berger/etc", "shadeName": "shade", "estimatedCost": "₹X per litre"}],
  "moodEffect": "how the colors affect mood"
}`;
        break;
      }

      case "budget-optimize": {
        const { totalBudget, roomSize: bs, roomType: brt, categories } = data;
        systemPrompt = `You are GruhaBuddy, a budget optimization expert for Indian home interiors. Provide realistic INR estimates based on actual Indian market prices. Always respond in valid JSON.`;
        userPrompt = `Optimize this interior design budget:
Total Budget: ₹${totalBudget || 150000}
Room Size: ${bs || 120} sq ft
Room Type: ${brt || "Bedroom"}
Categories: ${JSON.stringify(categories || {})}

Respond with this JSON:
{
  "optimizedBudget": [
    {"category": "Paint & Finish", "recommended": "₹X", "percentage": "X%", "tips": "saving tip"},
    {"category": "Flooring", "recommended": "₹X", "percentage": "X%", "tips": "saving tip"},
    {"category": "Furniture", "recommended": "₹X", "percentage": "X%", "tips": "saving tip"},
    {"category": "Lighting", "recommended": "₹X", "percentage": "X%", "tips": "saving tip"},
    {"category": "Decor", "recommended": "₹X", "percentage": "X%", "tips": "saving tip"},
    {"category": "Curtains & Textiles", "recommended": "₹X", "percentage": "X%", "tips": "saving tip"}
  ],
  "totalEstimated": "₹X",
  "savingTips": ["tip1", "tip2", "tip3"],
  "vendorSuggestions": [
    {"name": "vendor/store", "type": "online/offline", "specialty": "what they sell", "priceRange": "budget/mid/premium"}
  ],
  "cheaperAlternatives": [
    {"original": "expensive item", "alternative": "cheaper option", "savings": "₹X saved"}
  ]
}`;
        break;
      }

      default:
        return new Response(JSON.stringify({ error: "Unknown action" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits in workspace settings." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service temporarily unavailable" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content || "";

    // Try to parse JSON from the response
    let parsed;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      const jsonStr = jsonMatch ? jsonMatch[1].trim() : content.trim();
      parsed = JSON.parse(jsonStr);
    } catch {
      parsed = { rawResponse: content };
    }

    return new Response(JSON.stringify({ result: parsed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Room design error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
