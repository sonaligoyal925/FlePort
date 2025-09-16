import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AddDriverModal } from "@/components/fleet/modals/AddDriverModal";
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Phone, 
  Star, 
  MapPin,
  Truck,
  Clock,
  DollarSign,
  Filter 
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock driver data
const driversData = [
  {
    id: 1,
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    rating: 4.8,
    status: "active",
    vehicle: "MH01AB1234",
    totalTrips: 1247,
    earnings: 45000,
    location: "Bandra, Mumbai",
    joinDate: "2023-01-15",
    avatar: "RK"
  },
  {
    id: 2,
    name: "Priya Patel",
    phone: "+91 87654 32109",
    rating: 4.9,
    status: "active",
    vehicle: "MH02CD5678",
    totalTrips: 892,
    earnings: 38500,
    location: "Andheri, Mumbai",
    joinDate: "2023-03-20",
    avatar: "PP"
  },
  {
    id: 3,
    name: "Amit Sharma",
    phone: "+91 76543 21098",
    rating: 4.6,
    status: "inactive",
    vehicle: "MH03EF9012",
    totalTrips: 654,
    earnings: 28000,
    location: "Powai, Mumbai",
    joinDate: "2023-05-10",
    avatar: "AS"
  },
  {
    id: 4,
    name: "Sunita Singh",
    phone: "+91 65432 10987",
    rating: 4.7,
    status: "active",
    vehicle: "MH04GH3456",
    totalTrips: 1089,
    earnings: 42000,
    location: "Thane, Mumbai",
    joinDate: "2023-02-28",
    avatar: "SS"
  },
];

const statusColors = {
  active: "bg-secondary/10 text-secondary border-secondary/20",
  inactive: "bg-muted text-muted-foreground border-muted",
  suspended: "bg-destructive/10 text-destructive border-destructive/20",
};

export function DriversPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredDrivers = driversData.filter((driver) => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || driver.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Driver Management</h1>
          <p className="text-muted-foreground">Manage your fleet drivers and their performance</p>
        </div>
        <AddDriverModal>
          <Button className="bg-primary hover:bg-primary-hover">
            <Plus className="w-4 h-4 mr-2" />
            Add New Driver
          </Button>
        </AddDriverModal>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Drivers</p>
                <p className="text-2xl font-bold text-foreground">234</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Truck className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Now</p>
                <p className="text-2xl font-bold text-foreground">187</p>
              </div>
              <div className="p-3 bg-secondary/10 rounded-full">
                <Clock className="w-5 h-5 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold text-foreground">4.7</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-full">
                <Star className="w-5 h-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold text-foreground">₹4.2L</p>
              </div>
              <div className="p-3 bg-accent/10 rounded-full">
                <DollarSign className="w-5 h-5 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search drivers by name or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button 
                variant={statusFilter === "active" ? "default" : "outline"}
                onClick={() => setStatusFilter("active")}
              >
                Active
              </Button>
              <Button 
                variant={statusFilter === "inactive" ? "default" : "outline"}
                onClick={() => setStatusFilter("inactive")}
              >
                Inactive
              </Button>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Drivers Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Drivers List ({filteredDrivers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Driver</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Trips</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="font-semibold">
                          {driver.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{driver.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {driver.location}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm">{driver.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="px-2 py-1 bg-muted rounded text-sm">
                      {driver.vehicle}
                    </code>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{driver.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {driver.totalTrips.toLocaleString()}
                  </TableCell>
                  <TableCell className="font-medium">
                    ₹{driver.earnings.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[driver.status as keyof typeof statusColors]}>
                      {driver.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}