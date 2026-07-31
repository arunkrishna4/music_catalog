export interface Recommendation {
    album: string;
    artist: string;
    reason: string;
}

export interface AIResponse {
    summary: string;
    recommendations: Recommendation[];
}