import { useQuery } from "@tanstack/react-query";
import { getRecommendations } from "../services/ai";

export function useAIRecommendations(enabled: boolean) {
    return useQuery({
        queryKey: ["ai-recommendations"],
        queryFn: getRecommendations,
        enabled,
    });
}