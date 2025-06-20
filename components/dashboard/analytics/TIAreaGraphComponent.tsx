// components/dashboard/analytics/TotalInvoicesAreaChartComponent.tsx
"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartComponentProps {
  chartData: {
    date: string;
    total: number;
  }[];
  percentageChange: number; // New prop for percentage change
}

export function TIAreaChartComponent({ chartData, percentageChange }: ChartComponentProps) {
  const chartConfig = {
    total: {
      label: "Total Invoices Issued",
      color: "var(--chart-1)",
    },
  };

  return (
    <div className="mt-7">
      
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="total"
              type="natural"
              fill="rgba(75, 192, 192, 0.4)"
              stroke="rgba(75, 192, 192, 1)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Revenue pumped up by {percentageChange.toFixed(2)}% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Last 90 Days
            </div>
          </div>
        </div>
      </CardFooter>
    </div>
  );
}