import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin, Clock, DollarSign, User, Car, Search, Filter, Download, RefreshCw } from "lucide-react";

const mockTrips = [
  {
    id: "TR001",
    driver: "John Smith",
    vehicle: "KA-01-AB-1234",
    pickup: "Whitefield, Bangalore",
    dropoff: "HSR Layout, Bangalore",
    distance: "12.5 km",
    duration: "28 min",
    fare: "₹185",
    commission: "₹37",
    status: "completed",
    startTime: "09:15 AM",
    endTime: "09:43 AM",
    date: "2024-01-08",
    rating: 4.8
  },
  {
    id: "TR002", 
    driver: "Raj Kumar",
    vehicle: "KA-05-CD-5678",
    pickup: "Koramangala, Bangalore",
    dropoff: "Electronic City, Bangalore",
    distance: "18.2 km",
    duration: "45 min",
    fare: "₹285",
    commission: "₹57",
    status: "ongoing",
    startTime: "10:30 AM",
    endTime: "-",
    date: "2024-01-08",
    rating: null
  },
  {
    id: "TR003",
    driver: "Mike Johnson",
    vehicle: "KA-02-EF-9012",
    pickup: "Indiranagar, Bangalore",
    dropoff: "Bellandur, Bangalore",
    distance: "8.7 km", 
    duration: "22 min",
    fare: "₹145",
    commission: "₹29",
    status: "cancelled",
    startTime: "11:15 AM",
    endTime: "-",
    date: "2024-01-08",
    rating: null
  },
  {
    id: "TR004",
    driver: "Sarah Wilson",
    vehicle: "KA-03-GH-3456",
    pickup: "Brigade Road, Bangalore",
    dropoff: "Airport Road, Bangalore",
    distance: "32.1 km",
    duration: "1h 15min",
    fare: "₹485",
    commission: "₹97",
    status: "completed",
    startTime: "08:00 AM",
    endTime: "09:15 AM", 
    date: "2024-01-08",
    rating: 4.9
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge variant="default" className="bg-emerald-100 text-emerald-800 border-emerald-200">Completed</Badge>;
    case "ongoing":
      return <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">Ongoing</Badge>;
    case "cancelled":
      return <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">Cancelled</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export function TripsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("today");

  const filteredTrips = mockTrips.filter(trip => {
    const matchesSearch = trip.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || trip.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const tripStats = {
    total: mockTrips.length,
    completed: mockTrips.filter(t => t.status === "completed").length,
    ongoing: mockTrips.filter(t => t.status === "ongoing").length,
    cancelled: mockTrips.filter(t => t.status === "cancelled").length,
    totalRevenue: mockTrips.filter(t => t.status === "completed").reduce((sum, t) => sum + parseInt(t.fare.replace("₹", "")), 0),
    totalCommission: mockTrips.filter(t => t.status === "completed").reduce((sum, t) => sum + parseInt(t.commission.replace("₹", "")), 0)
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Trip Management</h1>
        <p className="text-muted-foreground">Monitor and manage all fleet trips</p>
      </div>

      {/* Trip Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trips</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{tripStats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{tripStats.completed}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ongoing</CardTitle>
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{tripStats.ongoing}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{tripStats.cancelled}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">₹{tripStats.totalRevenue}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commission</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">₹{tripStats.totalCommission}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Trip History</CardTitle>
              <CardDescription>View and manage all trips</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search trips, drivers, or vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full md:w-[160px]">
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trip ID</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Distance</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Fare</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrips.map((trip) => (
                  <TableRow key={trip.id}>
                    <TableCell className="font-medium">{trip.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        {trip.driver}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-muted-foreground" />
                        {trip.vehicle}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="w-3 h-3 text-emerald-500" />
                          <span className="truncate max-w-[120px]">{trip.pickup}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3 text-red-500" />
                          <span className="truncate max-w-[120px]">{trip.dropoff}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{trip.distance}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        {trip.duration}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{trip.fare}</TableCell>
                    <TableCell className="font-medium text-primary">{trip.commission}</TableCell>
                    <TableCell>{getStatusBadge(trip.status)}</TableCell>
                    <TableCell>
                      {trip.rating ? (
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">{trip.rating}</span>
                          <span className="text-yellow-500">★</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
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