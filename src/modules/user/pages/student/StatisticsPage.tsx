import { useEffect, useState } from "react";
import { getStatistics } from "../../api/user-api";
import { useAuth } from "../../store/user-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
} from "recharts";

const StatisticsPage = () => {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<any>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const res = await getStatistics(user?._id, token);
        setStatistics(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch statistics", err);
      }
    };
    if (user?._id && token) {
      fetchStatistics();
    }
  }, [user?._id, token]);

  const colorMapping: Record<string, string> = {
    Attended: "#16a34a",
    Missed: "#dc2626",
  };

  const attendanceData = statistics?.attendanceOverview || [];

  const ratingsData = statistics?.userRatings || [];

  const attendanceChartConfig = {
    value: {
      label: "Count",
    },
  } satisfies ChartConfig;

  const ratingsChartConfig = {
    value: {
      label: "Count",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;


  return (
    <div className="container mx-auto">
      <h1 className="text-4xl mb-5">My Statistics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {loading ? (
          <>
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
          </>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Total Registered</CardTitle>
              </CardHeader>
              <CardContent className="mt-auto">
                <span className="text-2xl font-bold text-blue-600">
                  {statistics?.totalRegistered ?? "--"}
                </span>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Attended</CardTitle>
              </CardHeader>
              <CardContent className="mt-auto">
                <span className="text-2xl font-bold text-green-600">
                  {statistics?.totalAttended ?? "--"}
                </span>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Missed</CardTitle>
              </CardHeader>
              <CardContent className="mt-auto">
                <span className="text-2xl font-bold text-purple-600">
                  {statistics?.totalMissed ?? "--"}
                </span>
              </CardContent>
            </Card>
          </>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-64" />
            ) : (
              <ChartContainer config={attendanceChartConfig} className="min-h-[250px] w-full">
                <PieChart>
                  <Pie
                    data={attendanceData}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={100}
                  >
                    {attendanceData.map((entry: { label: string | number; }, idx: number) => (
                      <Cell key={`cell-${idx}`} fill={colorMapping[entry.label] || "#8884d8"} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>My Ratings</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-64" />
            ) : (
              <ChartContainer config={ratingsChartConfig} className="min-h-[250px] w-full">
                <BarChart data={ratingsData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="rating" tick={{ fontSize: 12 }} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="#facc15">
                    {ratingsData.map((_entry: any, idx: number) => (
                      <Cell key={`bar-${idx}`} fill="#facc15" />
                    ))}
                  </Bar>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatisticsPage;