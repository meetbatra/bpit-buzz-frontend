import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, CartesianGrid } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

type FeedbackData = {
  star: string;
  count: number;
};

type FeedbackChartProps = {
  ratingCounts: number[];
};

const FeedbackChart = ({ ratingCounts }: FeedbackChartProps) => {
  const chartData: FeedbackData[] = ratingCounts.map((count, idx) => ({
    star: `${idx + 1} Star`,
    count,
  }));

  const chartConfig = {
    count: {
      label: "Count",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <Card className='max-w-[30rem] mb-3'>
      <CardHeader>
        <CardTitle>Feedback Ratings</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[20rem] w-full">
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="star" tick={{ fontSize: 12 }} interval={0} angle={-25} textAnchor="end" />
            <Bar dataKey="count" fill="var(--color-count)" radius={4} />
            <ChartTooltip content={<ChartTooltipContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default FeedbackChart;