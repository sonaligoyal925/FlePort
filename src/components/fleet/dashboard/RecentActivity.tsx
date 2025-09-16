import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, CheckCircle, AlertTriangle, Car, User, Route } from "lucide-react";

const recentActivities = [
  {
    id: 1,
    type: "trip_completed",
    title: "Trip completed by Rajesh Kumar",
    description: "Bandra to Andheri - ₹450 earned",
    timestamp: "5 minutes ago",
    status: "success",
    icon: CheckCircle,
    avatar: "RK",
  },
  {
    id: 2,
    type: "vehicle_maintenance",
    title: "Vehicle maintenance due",
    description: "MH01AB1234 - Service required",
    timestamp: "15 minutes ago",
    status: "warning",
    icon: AlertTriangle,
    avatar: "VM",
  },
  {
    id: 3,
    type: "driver_joined",
    title: "New driver onboarded",
    description: "Amit Sharma joined your fleet",
    timestamp: "1 hour ago",
    status: "info",
    icon: User,
    avatar: "AS",
  },
  {
    id: 4,
    type: "trip_started",
    title: "Trip started by Priya Patel",
    description: "Powai to Airport - Estimated ₹800",
    timestamp: "2 hours ago",
    status: "info",
    icon: Route,
    avatar: "PP",
  },
  {
    id: 5,
    type: "vehicle_added",
    title: "New vehicle registered",
    description: "MH02CD5678 - Maruti Swift added",
    timestamp: "3 hours ago",
    status: "success",
    icon: Car,
    avatar: "MH",
  },
];

const statusColors = {
  success: "bg-secondary/10 text-secondary border-secondary/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  info: "bg-accent/10 text-accent border-accent/20",
  error: "bg-destructive/10 text-destructive border-destructive/20",
};

export function RecentActivity() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="text-xs font-semibold">
                  {activity.avatar}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <activity.icon className="w-4 h-4 text-muted-foreground" />
                  <p className="font-medium text-sm text-foreground">{activity.title}</p>
                  <Badge variant="outline" className={statusColors[activity.status as keyof typeof statusColors]}>
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}