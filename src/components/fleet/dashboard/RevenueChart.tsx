import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 45000, trips: 1200 },
  { month: "Feb", revenue: 52000, trips: 1400 },
  { month: "Mar", revenue: 48000, trips: 1300 },
  { month: "Apr", revenue: 61000, trips: 1600 },
  { month: "May", revenue: 55000, trips: 1450 },
  { month: "Jun", revenue: 67000, trips: 1800 },
  { month: "Jul", revenue: 72000, trips: 1950 },
  { month: "Aug", revenue: 69000, trips: 1850 },
  { month: "Sep", revenue: 78000, trips: 2100 },
  { month: "Oct", revenue: 85000, trips: 2300 },
  { month: "Nov", revenue: 82000, trips: 2200 },
  { month: "Dec", revenue: 91000, trips: 2450 },
];

const weeklyData = [
  { day: "Mon", trips: 180 },
  { day: "Tue", trips: 220 },
  { day: "Wed", trips: 195 },
  { day: "Thu", trips: 240 },
  { day: "Fri", trips: 280 },
  { day: "Sat", trips: 320 },
  { day: "Sun", trips: 190 },
];

export function RevenueChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Revenue Trend */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Monthly Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `₹${value/1000}k`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#revenueGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Weekly Trips */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Weekly Trip Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value) => [`${value}`, "Trips"]}
              />
              <Line
                type="monotone"
                dataKey="trips"
                stroke="hsl(var(--secondary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--secondary))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--secondary))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}