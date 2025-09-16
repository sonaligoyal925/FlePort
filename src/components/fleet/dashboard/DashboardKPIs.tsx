import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Car, Route, DollarSign, TrendingUp, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const kpiData = [
  {
    title: "Active Drivers",
    value: "234",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Total Vehicles",
    value: "186",
    change: "+3.2%",
    trend: "up", 
    icon: Car,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    title: "Today's Trips",
    value: "1,247",
    change: "+8.1%",
    trend: "up",
    icon: Route,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Total Revenue",
    value: "₹2,34,567",
    change: "+15.3%",
    trend: "up",
    icon: DollarSign,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
];

const statusData = [
  {
    title: "Completed Trips",
    value: "1,124",
    icon: CheckCircle,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    title: "Ongoing Trips",
    value: "123",
    icon: Clock,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Pending Issues",
    value: "8",
    icon: AlertTriangle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
];

export function DashboardKPIs() {
  return (
    <div className="space-y-6">
      {/* Main KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 text-secondary mr-1" />
                <span className="text-xs text-secondary font-medium">{kpi.change}</span>
                <span className="text-xs text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statusData.map((status, index) => (
          <Card key={index} className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{status.title}</p>
                  <p className="text-3xl font-bold mt-2 text-foreground">{status.value}</p>
                </div>
                <div className={`p-3 rounded-full ${status.bgColor}`}>
                  <status.icon className={`w-6 h-6 ${status.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}