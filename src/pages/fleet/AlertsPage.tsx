import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Bell, Search, Filter, Plus, AlertTriangle, CheckCircle, Clock, XCircle, Settings, FileText, Car, User, Calendar } from "lucide-react";
import { toast } from "sonner";

const mockAlerts = [
  {
    id: "AL001",
    type: "document_expiry",
    title: "License Expiring Soon",
    description: "John Smith's driving license expires in 7 days",
    priority: "high",
    status: "active",
    createdAt: "2024-01-08",
    dueDate: "2024-01-15",
    relatedEntity: "John Smith",
    entityType: "driver",
    category: "compliance"
  },
  {
    id: "AL002", 
    type: "vehicle_maintenance",
    title: "Vehicle Service Due",
    description: "KA-01-AB-1234 requires scheduled maintenance",
    priority: "medium",
    status: "active",
    createdAt: "2024-01-07",
    dueDate: "2024-01-20",
    relatedEntity: "KA-01-AB-1234",
    entityType: "vehicle",
    category: "maintenance"
  },
  {
    id: "AL003",
    type: "earnings_milestone",
    title: "Driver Milestone Achieved",
    description: "Raj Kumar completed 1000 successful trips",
    priority: "low",
    status: "acknowledged",
    createdAt: "2024-01-06",
    dueDate: null,
    relatedEntity: "Raj Kumar",
    entityType: "driver", 
    category: "achievement"
  },
  {
    id: "AL004",
    type: "insurance_expiry",
    title: "Insurance Renewal Required",
    description: "Vehicle insurance for KA-05-CD-5678 expires in 3 days",
    priority: "critical",
    status: "active",
    createdAt: "2024-01-05",
    dueDate: "2024-01-11",
    relatedEntity: "KA-05-CD-5678",
    entityType: "vehicle",
    category: "compliance"
  },
  {
    id: "AL005",
    type: "rating_drop",
    title: "Driver Rating Alert", 
    description: "Mike Johnson's rating dropped below 4.0",
    priority: "medium",
    status: "dismissed",
    createdAt: "2024-01-04",
    dueDate: null,
    relatedEntity: "Mike Johnson",
    entityType: "driver",
    category: "performance"
  }
];

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "critical":
      return <Badge variant="destructive" className="bg-red-500 text-white">Critical</Badge>;
    case "high":
      return <Badge variant="destructive" className="bg-orange-500 text-white">High</Badge>;
    case "medium":
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>;
    case "low":
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Low</Badge>;
    default:
      return <Badge variant="outline">{priority}</Badge>;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge variant="default" className="bg-blue-100 text-blue-800 border-blue-200">Active</Badge>;
    case "acknowledged":
      return <Badge variant="secondary" className="bg-gray-100 text-gray-800 border-gray-200">Acknowledged</Badge>;
    case "dismissed":
      return <Badge variant="outline" className="bg-gray-50 text-gray-600">Dismissed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getAlertIcon = (type: string) => {
  switch (type) {
    case "document_expiry":
    case "insurance_expiry":
      return <FileText className="w-4 h-4 text-orange-500" />;
    case "vehicle_maintenance":
      return <Car className="w-4 h-4 text-blue-500" />;
    case "earnings_milestone":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "rating_drop":
      return <User className="w-4 h-4 text-red-500" />;
    default:
      return <Bell className="w-4 h-4 text-muted-foreground" />;
  }
};

export function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false);
  const [newAlert, setNewAlert] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "general",
    dueDate: ""
  });

  const [alertSettings, setAlertSettings] = useState({
    documentExpiry: true,
    vehicleMaintenance: true,
    performanceAlerts: true,
    earningsMilestones: false,
    systemNotifications: true
  });

  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.relatedEntity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === "all" || alert.priority === priorityFilter;
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const alertStats = {
    total: mockAlerts.length,
    active: mockAlerts.filter(a => a.status === "active").length,
    critical: mockAlerts.filter(a => a.priority === "critical").length,
    high: mockAlerts.filter(a => a.priority === "high").length,
    acknowledged: mockAlerts.filter(a => a.status === "acknowledged").length
  };

  const handleCreateAlert = () => {
    toast.success("Alert created successfully");
    setIsCreateAlertOpen(false);
    setNewAlert({ title: "", description: "", priority: "medium", category: "general", dueDate: "" });
  };

  const handleAlertAction = (alertId: string, action: string) => {
    toast.success(`Alert ${alertId} ${action} successfully`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Alert Management</h1>
        <p className="text-muted-foreground">Monitor and manage fleet alerts and notifications</p>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{alertStats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{alertStats.active}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{alertStats.critical}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{alertStats.high}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acknowledged</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{alertStats.acknowledged}</div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Alert Settings
          </CardTitle>
          <CardDescription>Configure your notification preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Document Expiry</Label>
                <p className="text-xs text-muted-foreground">Alerts for expiring documents</p>
              </div>
              <Switch
                checked={alertSettings.documentExpiry}
                onCheckedChange={(checked) => setAlertSettings({...alertSettings, documentExpiry: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Vehicle Maintenance</Label>
                <p className="text-xs text-muted-foreground">Service and maintenance alerts</p>
              </div>
              <Switch
                checked={alertSettings.vehicleMaintenance}
                onCheckedChange={(checked) => setAlertSettings({...alertSettings, vehicleMaintenance: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Performance Alerts</Label>
                <p className="text-xs text-muted-foreground">Driver performance notifications</p>
              </div>
              <Switch
                checked={alertSettings.performanceAlerts}
                onCheckedChange={(checked) => setAlertSettings({...alertSettings, performanceAlerts: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Earnings Milestones</Label>
                <p className="text-xs text-muted-foreground">Achievement notifications</p>
              </div>
              <Switch
                checked={alertSettings.earningsMilestones}
                onCheckedChange={(checked) => setAlertSettings({...alertSettings, earningsMilestones: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">System Notifications</Label>
                <p className="text-xs text-muted-foreground">System and app updates</p>
              </div>
              <Switch
                checked={alertSettings.systemNotifications}
                onCheckedChange={(checked) => setAlertSettings({...alertSettings, systemNotifications: checked})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Alert History</CardTitle>
              <CardDescription>View and manage all alerts</CardDescription>
            </div>
            <div className="flex gap-2">
              <Dialog open={isCreateAlertOpen} onOpenChange={setIsCreateAlertOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Alert
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create Custom Alert</DialogTitle>
                    <DialogDescription>
                      Create a custom alert for your fleet
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Alert Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter alert title"
                        value={newAlert.title}
                        onChange={(e) => setNewAlert({...newAlert, title: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Enter alert description"
                        value={newAlert.description}
                        onChange={(e) => setNewAlert({...newAlert, description: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select value={newAlert.priority} onValueChange={(value) => setNewAlert({...newAlert, priority: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="dueDate">Due Date (Optional)</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={newAlert.dueDate}
                        onChange={(e) => setNewAlert({...newAlert, dueDate: e.target.value})}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateAlertOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateAlert}>Create Alert</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-[160px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="acknowledged">Acknowledged</SelectItem>
                <SelectItem value="dismissed">Dismissed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alert</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Related To</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell>
                      <div className="flex items-start gap-3">
                        {getAlertIcon(alert.type)}
                        <div>
                          <div className="font-medium">{alert.title}</div>
                          <div className="text-sm text-muted-foreground">{alert.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getPriorityBadge(alert.priority)}</TableCell>
                    <TableCell>{getStatusBadge(alert.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {alert.entityType === "driver" ? (
                          <User className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Car className="w-4 h-4 text-muted-foreground" />
                        )}
                        {alert.relatedEntity}
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">{alert.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {alert.createdAt}
                      </div>
                    </TableCell>
                    <TableCell>
                      {alert.dueDate ? (
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          {alert.dueDate}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {alert.status === "active" && (
                          <>
                            <Button size="sm" variant="outline" onClick={() => handleAlertAction(alert.id, "acknowledged")}>
                              Acknowledge
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleAlertAction(alert.id, "dismissed")}>
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        {alert.status === "acknowledged" && (
                          <Button size="sm" variant="outline" disabled>
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}