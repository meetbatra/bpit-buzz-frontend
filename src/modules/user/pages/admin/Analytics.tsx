import { useEffect, useState } from "react";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
} from "recharts";
import { useAuth } from "../../store/user-store";
import { getAnalytics } from "../../api/user-api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type AnalyticsData = {
  totalEvents: number;
  totalRegistrations: number;
  attendanceRate: number;
  topEvents: {
    title: string;
    registrations: number;
  }[];
};

const Analytics = () => {
  const { token } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await getAnalytics(token);
        setAnalytics(res.data);
      } catch (err) {
        console.error("Failed to fetch analytics", err);
      }
    };
    fetchAnalytics();
  }, [token]);

  return (
    <div>
      <h1 className="text-4xl mb-5">Admin Analytics</h1>

      {analytics ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Events</CardTitle>
            </CardHeader>
            <CardContent className="mt-auto">
              <p className="text-2xl font-bold text-blue-600">{analytics.totalEvents}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Registrations</CardTitle>
            </CardHeader>
            <CardContent className="mt-auto">
              <p className="text-2xl font-bold text-green-600">{analytics.totalRegistrations}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Attendance Rate</CardTitle>
            </CardHeader>
            <CardContent className="mt-auto">
              <p className="text-2xl font-bold text-purple-600">{analytics.attendanceRate}</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      )}

      {analytics && analytics.topEvents && analytics.topEvents.length > 0 && (
        <>
          {(() => {
            const chartConfig = {
              registrations: {
                label: "Registrations",
                color: "var(--chart-1)",
              },
            } satisfies ChartConfig;

            const chartData = analytics?.topEvents.map((event) => ({
              title: event.title,
              registrations: event.registrations,
            }));
            return (
              <div className="mt-10">
                <h2 className="text-2xl mb-4">Top Events</h2>
                <div className="bg-white p-4 rounded-md shadow">
                  <ChartContainer className="min-h-[250px] w-full" config={chartConfig}>
                    <BarChart data={chartData} accessibilityLayer>
                      <CartesianGrid vertical={false} />
                      <XAxis dataKey="title" />
                      <Bar dataKey="registrations" fill="var(--chart-1)" radius={4} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </BarChart>
                  </ChartContainer>
                </div>
              </div>
            );
          })()}
        </>
      )}
    </div>
  );
};

export default Analytics;