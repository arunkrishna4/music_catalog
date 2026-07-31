import { api } from "./api";
import type { AIResponse } from "../data/ai";

export async function getRecommendations() {
    const response = await api.post("/ai/recommendations");

    return response.data.data as AIResponse;
}