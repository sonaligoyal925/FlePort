import { DashboardKPIs } from "./DashboardKPIs";
import { RevenueChart } from "./RevenueChart";
import { QuickActions } from "./QuickActions";
import { RecentActivity } from "./RecentActivity";

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Fleet Manager!</h1>
        <p className="text-muted-foreground">Here's what's happening with your fleet today.</p>
      </div>

      {/* KPIs */}
      <DashboardKPIs />

      {/* Charts */}
      <RevenueChart />

      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}