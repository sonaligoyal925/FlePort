import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, CarFront, FileText, DollarSign, Bell, Settings } from "lucide-react";
import { AddDriverModal } from "@/components/fleet/modals/AddDriverModal";
import { AddVehicleModal } from "@/components/fleet/modals/AddVehicleModal";

const quickActions = [
  {
    title: "Add New Driver",
    description: "Onboard a new driver to your fleet",
    icon: UserPlus,
    color: "text-primary",
    bgColor: "bg-primary/10",
    action: "add-driver",
  },
  {
    title: "Register Vehicle",
    description: "Add a new vehicle to your fleet",
    icon: CarFront,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    action: "add-vehicle",
  },
  {
    title: "Generate Report",
    description: "Create custom fleet reports",
    icon: FileText,
    color: "text-accent",
    bgColor: "bg-accent/10",
    action: "generate-report",
  },
  {
    title: "Process Payouts",
    description: "Review and approve driver payouts",
    icon: DollarSign,
    color: "text-warning",
    bgColor: "bg-warning/10",
    action: "process-payouts",
  },
];

export function QuickActions() {
  const handleAction = (action: string) => {
    // Handle quick actions that don't have modals
    console.log(`Performing action: ${action}`);
  };

  const renderActionButton = (action: any, index: number) => {
    const buttonContent = (
      <div className="flex items-center gap-4 w-full">
        <div className={`p-2 rounded-lg ${action.bgColor}`}>
          <action.icon className={`w-4 h-4 ${action.color}`} />
        </div>
        <div className="text-left flex-1">
          <p className="font-medium text-sm">{action.title}</p>
          <p className="text-xs text-muted-foreground">{action.description}</p>
        </div>
      </div>
    );

    if (action.action === "add-driver") {
      return (
        <AddDriverModal key={index}>
          <Button
            variant="ghost"
            className="w-full justify-start h-auto p-4 hover:bg-muted/50"
          >
            {buttonContent}
          </Button>
        </AddDriverModal>
      );
    }

    if (action.action === "add-vehicle") {
      return (
        <AddVehicleModal key={index}>
          <Button
            variant="ghost"
            className="w-full justify-start h-auto p-4 hover:bg-muted/50"
          >
            {buttonContent}
          </Button>
        </AddVehicleModal>
      );
    }

    return (
      <Button
        key={index}
        variant="ghost"
        className="w-full justify-start h-auto p-4 hover:bg-muted/50"
        onClick={() => handleAction(action.action)}
      >
        {buttonContent}
      </Button>
    );
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {quickActions.map((action, index) => renderActionButton(action, index))}
      </CardContent>
    </Card>
  );
}