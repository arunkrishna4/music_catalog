import { useCallback, useEffect, useState } from "react";
import { getAnalytics, type AnalyticsResponse, type GenreStat, type RatingStat, type ArtistStat, type MonthlyStat, type ReleaseYearStat } from "../services/analytics";
import { useAuth } from "../contexts/AuthContext";

export type { GenreStat, RatingStat, ArtistStat, MonthlyStat, ReleaseYearStat, AnalyticsResponse };

export function useAnalytics() {
    const { user, loading: authLoading } = useAuth();
    const [data, setData] = useState<AnalyticsResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAnalytics = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const analyticsData = await getAnalytics();
            if (analyticsData) {
                setData(analyticsData);
            } else {
                setData(null);
            }
        } catch (err: any) {
            console.error("Failed to fetch analytics:", err);
            setError(err?.response?.data?.message || err?.message || "Failed to load analytics data.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (authLoading) return;
        if (!user) return;

        fetchAnalytics();
    }, [user, authLoading, fetchAnalytics]);

    const isEmpty = !loading && !error && (!data || data.totalAlbums === 0);

    return {
        data,
        loading,
        error,
        isEmpty,
        refreshAnalytics: fetchAnalytics,
    };
}
