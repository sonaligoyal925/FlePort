import { useState } from "react";
import { Bell, FileText, AlertTriangle, Users, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Notification {
  id: string;
  type: "document_expiry" | "trip_alert" | "payout_request" | "driver_status";
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: "high" | "medium" | "low";
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "document_expiry",
    title: "Document Expiry Alert",
    message: "Driver John Doe's license expires in 3 days",
    time: "2 hours ago",
    read: false,
    priority: "high"
  },
  {
    id: "2",
    type: "trip_alert",
    title: "Trip Completed",
    message: "Trip #TR-2024-001 completed successfully",
    time: "4 hours ago",
    read: false,
    priority: "medium"
  },
  {
    id: "3",
    type: "payout_request",
    title: "Payout Request",
    message: "Weekly payout of ₹25,000 is ready for approval",
    time: "1 day ago",
    read: true,
    priority: "medium"
  },
  {
    id: "4",
    type: "driver_status",
    title: "Driver Offline",
    message: "Driver Mike Smith went offline unexpectedly",
    time: "2 days ago",
    read: true,
    priority: "low"
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "document_expiry":
      return <FileText className="w-4 h-4 text-warning" />;
    case "trip_alert":
      return <Car className="w-4 h-4 text-primary" />;
    case "payout_request":
      return <AlertTriangle className="w-4 h-4 text-accent" />;
    case "driver_status":
      return <Users className="w-4 h-4 text-muted-foreground" />;
    default:
      return <Bell className="w-4 h-4" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-destructive";
    case "medium":
      return "bg-warning";
    case "low":
      return "bg-muted";
    default:
      return "bg-muted";
  }
};

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                className="text-xs"
              >
                Mark all as read
              </Button>
            )}
          </div>
        </div>
        <Separator />
        <ScrollArea className="h-80">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No notifications
            </div>
          ) : (
            <div className="p-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                    !notification.read ? "bg-muted/30" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm truncate">
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`} />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        <Separator />
        <div className="p-2">
          <Button variant="ghost" className="w-full justify-start text-sm">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}