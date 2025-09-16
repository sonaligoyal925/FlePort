import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building, User, Bell, Shield, Palette, Globe, Database, Key, Save, Upload, CreditCard, MapPin, Phone, Mail } from "lucide-react";
import { toast } from "sonner";

export function SettingsPage() {
  const [fleetProfile, setFleetProfile] = useState({
    companyName: "GAGO Fleet Solutions",
    ownerName: "John Doe",
    email: "john@gagofleet.com",
    phone: "+91 9876543210",
    address: "123 Business Park, Whitefield, Bangalore - 560066",
    gstNumber: "29ABCDE1234F1Z5",
    panNumber: "ABCDE1234F",
    bankAccount: "1234567890",
    bankName: "HDFC Bank",
    ifscCode: "HDFC0001234"
  });

  const [commissionSettings, setCommissionSettings] = useState({
    defaultCommission: "20",
    peakHourCommission: "25",
    weekendCommission: "22",
    longDistanceCommission: "18",
    minimumFare: "50",
    cancellationFee: "25"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    monthlyStatements: false,
    documentExpiryAlerts: true,
    paymentAlerts: true,
    maintenanceReminders: true
  });

  const [systemSettings, setSystemSettings] = useState({
    autoApproveDrivers: false,
    autoApproveVehicles: false,
    enableGPS: true,
    enableRatings: true,
    requirePhotos: true,
    timezone: "Asia/Kolkata",
    currency: "INR",
    language: "en"
  });

  const [apiSettings, setApiSettings] = useState({
    googleMapsApiKey: "****************************",
    twilioApiKey: "****************************",
    razorpayApiKey: "****************************",
    webhookUrl: "https://api.gagofleet.com/webhooks"
  });

  const handleSaveProfile = () => {
    toast.success("Fleet profile updated successfully");
  };

  const handleSaveCommission = () => {
    toast.success("Commission settings updated successfully");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences updated successfully");
  };

  const handleSaveSystem = () => {
    toast.success("System settings updated successfully");
  };

  const handleSaveApi = () => {
    toast.success("API settings updated successfully");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Fleet Settings</h1>
        <p className="text-muted-foreground">Manage your fleet configuration and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full lg:w-auto grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="commission" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            <span className="hidden sm:inline">Commission</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">System</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Key className="w-4 h-4" />
            <span className="hidden sm:inline">API</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
        </TabsList>

        {/* Fleet Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Fleet Profile
              </CardTitle>
              <CardDescription>
                Manage your fleet company information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-lg">GF</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Recommended: 200x200px, PNG or JPG
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={fleetProfile.companyName}
                    onChange={(e) => setFleetProfile({...fleetProfile, companyName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner Name</Label>
                  <Input
                    id="ownerName"
                    value={fleetProfile.ownerName}
                    onChange={(e) => setFleetProfile({...fleetProfile, ownerName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      value={fleetProfile.email}
                      onChange={(e) => setFleetProfile({...fleetProfile, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      className="pl-10"
                      value={fleetProfile.phone}
                      onChange={(e) => setFleetProfile({...fleetProfile, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="address"
                    className="pl-10 min-h-[80px]"
                    value={fleetProfile.address}
                    onChange={(e) => setFleetProfile({...fleetProfile, address: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="gstNumber">GST Number</Label>
                  <Input
                    id="gstNumber"
                    value={fleetProfile.gstNumber}
                    onChange={(e) => setFleetProfile({...fleetProfile, gstNumber: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="panNumber">PAN Number</Label>
                  <Input
                    id="panNumber"
                    value={fleetProfile.panNumber}
                    onChange={(e) => setFleetProfile({...fleetProfile, panNumber: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankAccount">Bank Account</Label>
                  <Input
                    id="bankAccount"
                    value={fleetProfile.bankAccount}
                    onChange={(e) => setFleetProfile({...fleetProfile, bankAccount: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveProfile} className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Commission Settings Tab */}
        <TabsContent value="commission" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Commission Structure
              </CardTitle>
              <CardDescription>
                Configure commission rates and pricing rules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultCommission">Default Commission (%)</Label>
                  <Input
                    id="defaultCommission"
                    type="number"
                    value={commissionSettings.defaultCommission}
                    onChange={(e) => setCommissionSettings({...commissionSettings, defaultCommission: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="peakHourCommission">Peak Hour Commission (%)</Label>
                  <Input
                    id="peakHourCommission"
                    type="number"
                    value={commissionSettings.peakHourCommission}
                    onChange={(e) => setCommissionSettings({...commissionSettings, peakHourCommission: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weekendCommission">Weekend Commission (%)</Label>
                  <Input
                    id="weekendCommission"
                    type="number"
                    value={commissionSettings.weekendCommission}
                    onChange={(e) => setCommissionSettings({...commissionSettings, weekendCommission: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longDistanceCommission">Long Distance Commission (%)</Label>
                  <Input
                    id="longDistanceCommission"
                    type="number"
                    value={commissionSettings.longDistanceCommission}
                    onChange={(e) => setCommissionSettings({...commissionSettings, longDistanceCommission: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minimumFare">Minimum Fare (₹)</Label>
                  <Input
                    id="minimumFare"
                    type="number"
                    value={commissionSettings.minimumFare}
                    onChange={(e) => setCommissionSettings({...commissionSettings, minimumFare: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cancellationFee">Cancellation Fee (₹)</Label>
                  <Input
                    id="cancellationFee"
                    type="number"
                    value={commissionSettings.cancellationFee}
                    onChange={(e) => setCommissionSettings({...commissionSettings, cancellationFee: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveCommission} className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Save Commission Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Communication Channels</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">Email Notifications</Label>
                        <p className="text-xs text-muted-foreground">Receive alerts via email</p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">SMS Notifications</Label>
                        <p className="text-xs text-muted-foreground">Receive alerts via SMS</p>
                      </div>
                      <Switch
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsNotifications: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">Push Notifications</Label>
                        <p className="text-xs text-muted-foreground">Browser notifications</p>
                      </div>
                      <Switch
                        checked={notificationSettings.pushNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, pushNotifications: checked})}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Alert Types</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">Document Expiry Alerts</Label>
                        <p className="text-xs text-muted-foreground">Driver and vehicle documents</p>
                      </div>
                      <Switch
                        checked={notificationSettings.documentExpiryAlerts}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, documentExpiryAlerts: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">Payment Alerts</Label>
                        <p className="text-xs text-muted-foreground">Payout and earnings updates</p>
                      </div>
                      <Switch
                        checked={notificationSettings.paymentAlerts}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, paymentAlerts: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">Maintenance Reminders</Label>
                        <p className="text-xs text-muted-foreground">Vehicle service schedules</p>
                      </div>
                      <Switch
                        checked={notificationSettings.maintenanceReminders}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, maintenanceReminders: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">Weekly Reports</Label>
                        <p className="text-xs text-muted-foreground">Performance summaries</p>
                      </div>
                      <Switch
                        checked={notificationSettings.weeklyReports}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, weeklyReports: checked})}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveNotifications} className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Save Notification Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings Tab */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                System Configuration
              </CardTitle>
              <CardDescription>
                Configure system behavior and regional settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Automation Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">Auto-Approve Drivers</Label>
                        <p className="text-xs text-muted-foreground">Automatically approve driver registrations</p>
                      </div>
                      <Switch
                        checked={systemSettings.autoApproveDrivers}
                        onCheckedChange={(checked) => setSystemSettings({...systemSettings, autoApproveDrivers: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">Auto-Approve Vehicles</Label>
                        <p className="text-xs text-muted-foreground">Automatically approve vehicle registrations</p>
                      </div>
                      <Switch
                        checked={systemSettings.autoApproveVehicles}
                        onCheckedChange={(checked) => setSystemSettings({...systemSettings, autoApproveVehicles: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">Enable GPS Tracking</Label>
                        <p className="text-xs text-muted-foreground">Track vehicle locations in real-time</p>
                      </div>
                      <Switch
                        checked={systemSettings.enableGPS}
                        onCheckedChange={(checked) => setSystemSettings({...systemSettings, enableGPS: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">Enable Ratings</Label>
                        <p className="text-xs text-muted-foreground">Allow customer ratings for drivers</p>
                      </div>
                      <Switch
                        checked={systemSettings.enableRatings}
                        onCheckedChange={(checked) => setSystemSettings({...systemSettings, enableRatings: checked})}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Regional Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={systemSettings.timezone} onValueChange={(value) => setSystemSettings({...systemSettings, timezone: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                          <SelectItem value="Asia/Dubai">Asia/Dubai (GST)</SelectItem>
                          <SelectItem value="UTC">UTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select value={systemSettings.currency} onValueChange={(value) => setSystemSettings({...systemSettings, currency: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                          <SelectItem value="USD">US Dollar ($)</SelectItem>
                          <SelectItem value="AED">UAE Dirham (د.إ)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select value={systemSettings.language} onValueChange={(value) => setSystemSettings({...systemSettings, language: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                          <SelectItem value="ar">Arabic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveSystem} className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Save System Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Settings Tab */}
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                API Configuration
              </CardTitle>
              <CardDescription>
                Manage your third-party integrations and API keys
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="googleMapsApi">Google Maps API Key</Label>
                  <Input
                    id="googleMapsApi"
                    type="password"
                    value={apiSettings.googleMapsApiKey}
                    onChange={(e) => setApiSettings({...apiSettings, googleMapsApiKey: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground">
                    Used for location services and route optimization
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twilioApi">Twilio API Key</Label>
                  <Input
                    id="twilioApi"
                    type="password"
                    value={apiSettings.twilioApiKey}
                    onChange={(e) => setApiSettings({...apiSettings, twilioApiKey: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground">
                    Used for SMS notifications and OTP verification
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="razorpayApi">Razorpay API Key</Label>
                  <Input
                    id="razorpayApi"
                    type="password"
                    value={apiSettings.razorpayApiKey}
                    onChange={(e) => setApiSettings({...apiSettings, razorpayApiKey: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground">
                    Used for payment processing and payouts
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <Input
                    id="webhookUrl"
                    value={apiSettings.webhookUrl}
                    onChange={(e) => setApiSettings({...apiSettings, webhookUrl: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground">
                    Endpoint for receiving external notifications
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveApi} className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Save API Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Billing & Subscription
              </CardTitle>
              <CardDescription>
                Manage your subscription and billing information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Professional Plan</h3>
                    <p className="text-muted-foreground">Up to 100 drivers and vehicles</p>
                  </div>
                  <Badge variant="default" className="bg-primary">Active</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Monthly Cost</p>
                    <p className="font-semibold">₹2,999/month</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Next Billing Date</p>
                    <p className="font-semibold">Jan 15, 2024</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Payment Method</p>
                    <p className="font-semibold">•••• 1234</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Update Payment Method
                </Button>
                <Button variant="outline">
                  Download Invoice
                </Button>
                <Button variant="outline">
                  Upgrade Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}