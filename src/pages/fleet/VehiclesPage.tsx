import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AddVehicleModal } from "@/components/fleet/modals/AddVehicleModal";
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Car, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Fuel,
  Calendar,
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

// Mock vehicle data
const vehiclesData = [
  {
    id: 1,
    registrationNo: "MH01AB1234",
    model: "Maruti Swift",
    type: "Hatchback",
    year: 2022,
    driver: "Rajesh Kumar",
    status: "active",
    fuelType: "Petrol",
    mileage: 45632,
    lastService: "2024-01-15",
    nextService: "2024-04-15",
    insurance: "2024-12-30",
    fitness: "2025-06-15",
    permit: "2024-08-20"
  },
  {
    id: 2,
    registrationNo: "MH02CD5678",
    model: "Hyundai i20",
    type: "Hatchback",
    year: 2021,
    driver: "Priya Patel",
    status: "active",
    fuelType: "Diesel",
    mileage: 67890,
    lastService: "2024-02-10",
    nextService: "2024-05-10",
    insurance: "2024-11-15",
    fitness: "2025-03-20",
    permit: "2024-09-10"
  },
  {
    id: 3,
    registrationNo: "MH03EF9012",
    model: "Honda City",
    type: "Sedan",
    year: 2020,
    driver: "Amit Sharma",
    status: "maintenance",
    fuelType: "Petrol",
    mileage: 89234,
    lastService: "2023-12-20",
    nextService: "2024-03-20",
    insurance: "2024-10-05",
    fitness: "2024-12-10",
    permit: "2024-07-15"
  },
  {
    id: 4,
    registrationNo: "MH04GH3456",
    model: "Tata Nexon",
    type: "SUV",
    year: 2023,
    driver: "Sunita Singh",
    status: "active",
    fuelType: "Electric",
    mileage: 23456,
    lastService: "2024-01-30",
    nextService: "2024-04-30",
    insurance: "2025-01-20",
    fitness: "2026-01-15",
    permit: "2024-11-25"
  },
];

const statusColors = {
  active: "bg-secondary/10 text-secondary border-secondary/20",
  maintenance: "bg-warning/10 text-warning border-warning/20",
  inactive: "bg-muted text-muted-foreground border-muted",
  expired: "bg-destructive/10 text-destructive border-destructive/20",
};

const isExpiringSoon = (date: string) => {
  const expiryDate = new Date(date);
  const today = new Date();
  const diffTime = expiryDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 30;
};

export function VehiclesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredVehicles = vehiclesData.filter((vehicle) => {
    const matchesSearch = vehicle.registrationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || vehicle.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vehicle Management</h1>
          <p className="text-muted-foreground">Monitor your fleet vehicles and their maintenance</p>
        </div>
        <AddVehicleModal>
          <Button className="bg-primary hover:bg-primary-hover">
            <Plus className="w-4 h-4 mr-2" />
            Register Vehicle
          </Button>
        </AddVehicleModal>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Vehicles</p>
                <p className="text-2xl font-bold text-foreground">186</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Car className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-foreground">156</p>
              </div>
              <div className="p-3 bg-secondary/10 rounded-full">
                <CheckCircle className="w-5 h-5 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Maintenance</p>
                <p className="text-2xl font-bold text-foreground">18</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-full">
                <Clock className="w-5 h-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Expiring Soon</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <div className="p-3 bg-destructive/10 rounded-full">
                <AlertTriangle className="w-5 h-5 text-destructive" />
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
                placeholder="Search vehicles by registration, model, or driver..."
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
                variant={statusFilter === "maintenance" ? "default" : "outline"}
                onClick={() => setStatusFilter("maintenance")}
              >
                Maintenance
              </Button>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicles Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Vehicles List ({filteredVehicles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Mileage</TableHead>
                <TableHead>Insurance</TableHead>
                <TableHead>Fitness</TableHead>
                <TableHead>Service Due</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{vehicle.registrationNo}</p>
                      <p className="text-sm text-muted-foreground">
                        {vehicle.model} • {vehicle.year}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Fuel className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{vehicle.fuelType}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{vehicle.driver}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[vehicle.status as keyof typeof statusColors]}>
                      {vehicle.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{vehicle.mileage.toLocaleString()} km</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <span className={`text-sm ${isExpiringSoon(vehicle.insurance) ? 'text-destructive font-medium' : ''}`}>
                        {vehicle.insurance}
                      </span>
                      {isExpiringSoon(vehicle.insurance) && (
                        <AlertTriangle className="w-3 h-3 text-destructive" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <span className={`text-sm ${isExpiringSoon(vehicle.fitness) ? 'text-destructive font-medium' : ''}`}>
                        {vehicle.fitness}
                      </span>
                      {isExpiringSoon(vehicle.fitness) && (
                        <AlertTriangle className="w-3 h-3 text-destructive" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className={`text-sm ${isExpiringSoon(vehicle.nextService) ? 'text-warning font-medium' : ''}`}>
                        {vehicle.nextService}
                      </span>
                    </div>
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