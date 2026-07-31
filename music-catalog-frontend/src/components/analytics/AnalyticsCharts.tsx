import {
    Bar,
    BarChart,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import type { AnalyticsResponse } from "../../hooks/useAnalytics";

interface AnalyticsChartsProps {
    data: AnalyticsResponse;
}

const DONUT_COLORS = [
    "#2563EB", // Primary Blue
    "#3B82F6",
    "#60A5FA",
    "#93C5FD",
    "#6366F1", // Indigo
    "#8B5CF6", // Purple
    "#EC4899", // Pink
    "#F59E0B", // Amber
    "#10B981", // Emerald
];

const ALL_MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export function AnalyticsCharts({ data }: AnalyticsChartsProps) {
    // Format rating distribution for Bar Chart (ensure ratings 1..5 are represented cleanly)
    const formattedRatingData = [1, 2, 3, 4, 5].map((stars) => {
        const found = data.ratingDistribution?.find((r) => r.rating === stars);
        return {
            name: `${stars} ★`,
            count: found ? found.count : 0,
        };
    });

    // Format monthly data so all 12 months (Jan..Dec) show on the Line Chart
    const formattedMonthlyData = ALL_MONTHS.map((month) => {
        const found = data.albumsPerMonth?.find(
            (m) =>
                m.month.slice(0, 3).toLowerCase() === month.toLowerCase() ||
                m.month.toLowerCase() === month.toLowerCase()
        );
        return {
            month,
            count: found ? found.count : 0,
        };
    });

    return (
        <div className="mt-8 space-y-6">
            {/* Row 1: Donut Chart + Rating Bar Chart */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Donut Chart - Genre Distribution */}
                <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Genre Distribution</h3>
                        <p className="text-xs text-slate-500 mt-1">Breakdown of albums by genre</p>
                    </div>
                    <div className="mt-4 h-72 w-full">
                        {data.genreDistribution && data.genreDistribution.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data.genreDistribution}
                                        dataKey="count"
                                        nameKey="genre"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={95}
                                        paddingAngle={4}
                                    >
                                        {data.genreDistribution.map((entry, index) => (
                                            <Cell
                                                key={`cell-${entry.genre}-${index}`}
                                                fill={DONUT_COLORS[index % DONUT_COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#0F172A",
                                            border: "none",
                                            borderRadius: "12px",
                                            color: "#FFFFFF",
                                            fontSize: "12px",
                                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                        }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-full items-center justify-center text-sm text-slate-400">
                                No genre data available
                            </div>
                        )}
                    </div>
                </div>

                {/* Bar Chart - Rating Distribution */}
                <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Rating Distribution</h3>
                        <p className="text-xs text-slate-500 mt-1">Albums grouped by star rating</p>
                    </div>
                    <div className="mt-4 h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={formattedRatingData}>
                                <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={{ stroke: "#CBD5E1" }} axisLine={{ stroke: "#CBD5E1" }} />
                                <YAxis stroke="#64748B" fontSize={12} allowDecimals={false} tickLine={{ stroke: "#CBD5E1" }} axisLine={{ stroke: "#CBD5E1" }} />
                                <Tooltip
                                    cursor={{ fill: "rgba(37, 99, 235, 0.05)" }}
                                    contentStyle={{
                                        backgroundColor: "#0F172A",
                                        border: "none",
                                        borderRadius: "12px",
                                        color: "#FFFFFF",
                                        fontSize: "12px",
                                    }}
                                />
                                <Bar dataKey="count" fill="#2563EB" radius={[6, 6, 0, 0]} name="Albums" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Row 2: Line Chart (Albums Added Per Month) + Vertical Bar (Releases by Year) */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Line Chart - Albums Added Per Month */}
                <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Albums Added Per Month</h3>
                        <p className="text-xs text-slate-500 mt-1">Growth of your collection over time</p>
                    </div>
                    <div className="mt-4 h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={formattedMonthlyData}>
                                <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={{ stroke: "#CBD5E1" }} axisLine={{ stroke: "#CBD5E1" }} />
                                <YAxis stroke="#64748B" fontSize={12} allowDecimals={false} tickLine={{ stroke: "#CBD5E1" }} axisLine={{ stroke: "#CBD5E1" }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#0F172A",
                                        border: "none",
                                        borderRadius: "12px",
                                        color: "#FFFFFF",
                                        fontSize: "12px",
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#2563EB"
                                    strokeWidth={3}
                                    dot={{ fill: "#2563EB", r: 4 }}
                                    activeDot={{ r: 6 }}
                                    name="Albums Added"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Vertical Bar Chart - Releases by Year */}
                <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Releases by Year</h3>
                        <p className="text-xs text-slate-500 mt-1">Album release years in your collection</p>
                    </div>
                    <div className="mt-4 h-72 w-full">
                        {data.releasesByYear && data.releasesByYear.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data.releasesByYear}>
                                    <XAxis dataKey="year" stroke="#64748B" fontSize={12} tickLine={{ stroke: "#CBD5E1" }} axisLine={{ stroke: "#CBD5E1" }} />
                                    <YAxis stroke="#64748B" fontSize={12} allowDecimals={false} tickLine={{ stroke: "#CBD5E1" }} axisLine={{ stroke: "#CBD5E1" }} />
                                    <Tooltip
                                        cursor={{ fill: "rgba(99, 102, 241, 0.05)" }}
                                        contentStyle={{
                                            backgroundColor: "#0F172A",
                                            border: "none",
                                            borderRadius: "12px",
                                            color: "#FFFFFF",
                                            fontSize: "12px",
                                        }}
                                    />
                                    <Bar dataKey="count" fill="#6366F1" radius={[6, 6, 0, 0]} name="Releases" />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-full items-center justify-center text-sm text-slate-400">
                                No release year data
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Row 3: Horizontal Bar Chart - Top Artists */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div>
                    <h3 className="text-lg font-bold text-slate-900">Top Artists</h3>
                    <p className="text-xs text-slate-500 mt-1">Most represented artists in your library</p>
                </div>
                <div className="mt-4 h-80 w-full">
                    {data.topArtists && data.topArtists.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={data.topArtists} margin={{ left: 20, right: 20 }}>
                                <XAxis type="number" stroke="#64748B" fontSize={12} allowDecimals={false} tickLine={{ stroke: "#CBD5E1" }} axisLine={{ stroke: "#CBD5E1" }} />
                                <YAxis dataKey="artist" type="category" stroke="#64748B" fontSize={12} width={130} tickLine={{ stroke: "#CBD5E1" }} axisLine={{ stroke: "#CBD5E1" }} />
                                <Tooltip
                                    cursor={{ fill: "rgba(37, 99, 235, 0.05)" }}
                                    contentStyle={{
                                        backgroundColor: "#0F172A",
                                        border: "none",
                                        borderRadius: "12px",
                                        color: "#FFFFFF",
                                        fontSize: "12px",
                                    }}
                                />
                                <Bar dataKey="count" fill="#3B82F6" radius={[0, 6, 6, 0]} name="Albums Saved" />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-slate-400">
                            No top artists data
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
