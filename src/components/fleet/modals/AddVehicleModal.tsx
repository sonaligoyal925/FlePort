import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Upload, Car, FileText, Shield, Wrench } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddVehicleModalProps {
  children: React.ReactNode;
}

export function AddVehicleModal({ children }: AddVehicleModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    registrationNo: "",
    make: "",
    model: "",
    year: "",
    color: "",
    fuelType: "",
    vehicleType: "",
    seatingCapacity: "",
    engineNumber: "",
    chassisNumber: "",
    insuranceNumber: "",
    insuranceExpiry: "",
    fitnessExpiry: "",
    permitExpiry: "",
    assignedDriver: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding vehicle:", formData);
    toast({
      title: "Vehicle Registered Successfully",
      description: `Vehicle ${formData.registrationNo} has been added to your fleet.`,
    });
    setOpen(false);
    setFormData({
      registrationNo: "",
      make: "",
      model: "",
      year: "",
      color: "",
      fuelType: "",
      vehicleType: "",
      seatingCapacity: "",
      engineNumber: "",
      chassisNumber: "",
      insuranceNumber: "",
      insuranceExpiry: "",
      fitnessExpiry: "",
      permitExpiry: "",
      assignedDriver: "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Car className="w-5 h-5 text-primary" />
            Register New Vehicle
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Vehicle Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Car className="w-4 h-4" />
                Vehicle Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="registrationNo">Registration Number *</Label>
                <Input
                  id="registrationNo"
                  placeholder="MH01AB1234"
                  value={formData.registrationNo}
                  onChange={(e) => handleInputChange("registrationNo", e.target.value.toUpperCase())}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="make">Make *</Label>
                <Select onValueChange={(value) => handleInputChange("make", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle make" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maruti">Maruti Suzuki</SelectItem>
                    <SelectItem value="hyundai">Hyundai</SelectItem>
                    <SelectItem value="honda">Honda</SelectItem>
                    <SelectItem value="tata">Tata</SelectItem>
                    <SelectItem value="mahindra">Mahindra</SelectItem>
                    <SelectItem value="toyota">Toyota</SelectItem>
                    <SelectItem value="ford">Ford</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model *</Label>
                <Input
                  id="model"
                  placeholder="Swift, i20, City, etc."
                  value={formData.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Manufacturing Year *</Label>
                <Input
                  id="year"
                  type="number"
                  min="2000"
                  max="2024"
                  placeholder="2023"
                  value={formData.year}
                  onChange={(e) => handleInputChange("year", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  placeholder="White, Red, Blue, etc."
                  value={formData.color}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelType">Fuel Type *</Label>
                <Select onValueChange={(value) => handleInputChange("fuelType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="cng">CNG</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicleType">Vehicle Type *</Label>
                <Select onValueChange={(value) => handleInputChange("vehicleType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hatchback">Hatchback</SelectItem>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="mpv">MPV</SelectItem>
                    <SelectItem value="pickup">Pickup Truck</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seatingCapacity">Seating Capacity</Label>
                <Input
                  id="seatingCapacity"
                  type="number"
                  min="2"
                  max="15"
                  placeholder="4"
                  value={formData.seatingCapacity}
                  onChange={(e) => handleInputChange("seatingCapacity", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Technical Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Wrench className="w-4 h-4" />
                Technical Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="engineNumber">Engine Number</Label>
                <Input
                  id="engineNumber"
                  placeholder="Enter engine number"
                  value={formData.engineNumber}
                  onChange={(e) => handleInputChange("engineNumber", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chassisNumber">Chassis Number</Label>
                <Input
                  id="chassisNumber"
                  placeholder="Enter chassis number"
                  value={formData.chassisNumber}
                  onChange={(e) => handleInputChange("chassisNumber", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Legal Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="w-4 h-4" />
                Legal Documents & Validity
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="insuranceNumber">Insurance Policy Number</Label>
                <Input
                  id="insuranceNumber"
                  placeholder="Insurance policy number"
                  value={formData.insuranceNumber}
                  onChange={(e) => handleInputChange("insuranceNumber", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="insuranceExpiry">Insurance Expiry Date</Label>
                <Input
                  id="insuranceExpiry"
                  type="date"
                  value={formData.insuranceExpiry}
                  onChange={(e) => handleInputChange("insuranceExpiry", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fitnessExpiry">Fitness Certificate Expiry</Label>
                <Input
                  id="fitnessExpiry"
                  type="date"
                  value={formData.fitnessExpiry}
                  onChange={(e) => handleInputChange("fitnessExpiry", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="permitExpiry">Permit Expiry Date</Label>
                <Input
                  id="permitExpiry"
                  type="date"
                  value={formData.permitExpiry}
                  onChange={(e) => handleInputChange("permitExpiry", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Assignment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="w-4 h-4" />
                Driver Assignment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="assignedDriver">Assign Driver</Label>
                <Select onValueChange={(value) => handleInputChange("assignedDriver", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a driver to assign" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rajesh">Rajesh Kumar</SelectItem>
                    <SelectItem value="priya">Priya Patel</SelectItem>
                    <SelectItem value="amit">Amit Sharma</SelectItem>
                    <SelectItem value="sunita">Sunita Singh</SelectItem>
                    <SelectItem value="unassigned">Keep Unassigned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Document Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Upload className="w-4 h-4" />
                Document Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>RC (Registration Certificate)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                  <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Upload RC</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Insurance Document</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                  <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Upload Insurance</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Fitness Certificate</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                  <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Upload Fitness</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary-hover">
              <Plus className="w-4 h-4 mr-2" />
              Register Vehicle
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}