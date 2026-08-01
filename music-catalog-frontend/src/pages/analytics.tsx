import { useState } from "react";
import { AIInsightsCard } from "../components/analytics/AIInsightsCard";
import { AnalyticsCharts } from "../components/analytics/AnalyticsCharts";
import { AnalyticsEmptyState } from "../components/analytics/AnalyticsEmptyState";
import { AnalyticsErrorState } from "../components/analytics/AnalyticsErrorState";
import { AnalyticsHeader } from "../components/analytics/AnalyticsHeader";
import { AnalyticsLoadingSkeleton } from "../components/analytics/AnalyticsLoadingSkeleton";
import { AnalyticsSummaryCards } from "../components/analytics/AnalyticsSummaryCards";
import { AppSidebar } from "../components/layout/AppSidebar";
import { LibraryMobileHeader } from "../components/library/LibraryMobileHeader";
import { useAnalytics } from "../hooks/useAnalytics";
import { AIRecommendationDialog } from "../components/ai/AIRecommendationDialog";

export default function Analytics() {
  const { data, loading, error, isEmpty, refreshAnalytics } = useAnalytics();

  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <AppSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="lg:pl-64">
        <div className="mx-auto min-h-screen max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <LibraryMobileHeader onMenuClick={() => setIsSidebarOpen(true)} />

          <section className="mt-8 lg:mt-0">
            {loading ? (
              <AnalyticsLoadingSkeleton />
            ) : error ? (
              <>
                <AnalyticsHeader onRefresh={refreshAnalytics} loading={loading} />
                <AnalyticsErrorState message={error} onRetry={refreshAnalytics} />
              </>
            ) : isEmpty || !data ? (
              <>
                <AnalyticsHeader onRefresh={refreshAnalytics} loading={loading} />
                <AnalyticsEmptyState />
              </>
            ) : (
              <>
                <AnalyticsHeader onRefresh={refreshAnalytics} loading={loading} />
                <AnalyticsSummaryCards summary={data} />
                <AIInsightsCard analytics={data} onGenerate={() => setAiDialogOpen(true)} />
                <AnalyticsCharts data={data} />

              </>
            )}
          </section>
        </div>

        <AIRecommendationDialog
          open={aiDialogOpen}
          onClose={() => setAiDialogOpen(false)}
        />
      </main>
    </div>
  );
}
