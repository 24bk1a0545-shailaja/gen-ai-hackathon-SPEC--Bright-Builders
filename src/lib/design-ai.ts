import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type RoomData = {
  roomType?: string;
  dimensions?: { length: string; width: string; height: string };
  hasPhoto?: boolean;
  features?: string;
};

export type AIResponse<T = any> = {
  result?: T;
  error?: string;
  rawResponse?: string;
};

async function callDesignAI(action: string, data: any): Promise<any> {
  const { data: fnData, error } = await supabase.functions.invoke("room-design-ai", {
    body: { action, data },
  });

  if (error) {
    console.error("AI function error:", error);
    toast.error("AI service error. Please try again.");
    throw error;
  }

  if (fnData?.error) {
    toast.error(fnData.error);
    throw new Error(fnData.error);
  }

  return fnData?.result;
}

export async function analyzeRoom(data: RoomData) {
  return callDesignAI("analyze-room", data);
}

export async function getThemeRecommendations(data: {
  theme: string;
  roomType?: string;
  dimensions?: { length: string; width: string };
  budget?: string;
}) {
  return callDesignAI("theme-recommendations", data);
}

export async function getColorSuggestions(data: {
  mood?: string;
  roomType?: string;
  roomSize?: string;
  lighting?: string;
}) {
  return callDesignAI("color-suggestions", data);
}

export async function optimizeBudget(data: {
  totalBudget?: number;
  roomSize?: number;
  roomType?: string;
  categories?: Record<string, number>;
}) {
  return callDesignAI("budget-optimize", data);
}
