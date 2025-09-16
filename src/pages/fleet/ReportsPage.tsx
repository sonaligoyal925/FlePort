import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Download, 
  Filter, 
  Calendar,
  FileText,
  TrendingUp,
  Users,
  Car,
  DollarSign,
  BarChart3,
  PieChart
} from "lucide-react";
import { RevenueChart } from "@/components/fleet/dashboard/RevenueChart";

const reportTypes = [
  {
    title: "Driver Performance Report",
    description: "Detailed analysis of driver ratings, trips, and earnings",
    icon: Users,
    type: "driver-performance",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Vehicle Utilization Report",
    description: "Vehicle usage statistics and maintenance tracking",
    icon: Car,
    type: "vehicle-utilization",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    title: "Revenue Analysis",
    description: "Financial performance and revenue trends",
    icon: DollarSign,
    type: "revenue-analysis",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Trip Summary Report",
    description: "Comprehensive trip data and customer feedback",
    icon: BarChart3,
    type: "trip-summary",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
];

const quickStats = [
  { label: "Total Reports Generated", value: "245", icon: FileText, change: "+12%" },
  { label: "This Month Downloads", value: "67", icon: Download, change: "+8%" },
  { label: "Average Rating", value: "4.7", icon: TrendingUp, change: "+0.2" },
  { label: "Active Drivers", value: "187", icon: Users, change: "+5" },
];

export function ReportsPage() {
  const [dateRange, setDateRange] = useState("last-30-days");
  const [reportType, setReportType] = useState("all");

  const handleGenerateReport = (type: string) => {
    console.log(`Generating ${type} report for ${dateRange}`);
    // Here you would typically call your API to generate the report
  };

  const handleDownloadReport = (format: string) => {
    console.log(`Downloading report in ${format} format`);
    // Here you would typically trigger the download
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate detailed reports and analyze your fleet performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Report
          </Button>
          <Button className="bg-primary hover:bg-primary-hover">
            <Download className="w-4 h-4 mr-2" />
            Download All
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-secondary font-medium">{stat.change}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                  <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                  <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                  <SelectItem value="last-year">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="driver-performance">Driver Performance</SelectItem>
                  <SelectItem value="vehicle-utilization">Vehicle Utilization</SelectItem>
                  <SelectItem value="revenue-analysis">Revenue Analysis</SelectItem>
                  <SelectItem value="trip-summary">Trip Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 items-end">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Chart */}
      <RevenueChart />

      {/* Report Types */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Available Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map((report, index) => (
              <Card key={index} className="border border-border hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${report.bgColor}`}>
                      <report.icon className={`w-6 h-6 ${report.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{report.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-primary hover:bg-primary-hover"
                          onClick={() => handleGenerateReport(report.type)}
                        >
                          Generate
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDownloadReport("pdf")}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          PDF
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDownloadReport("csv")}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          CSV
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Driver Performance - March 2024", date: "2024-03-15", size: "2.4 MB", status: "completed" },
              { name: "Vehicle Utilization - February 2024", date: "2024-02-28", size: "1.8 MB", status: "completed" },
              { name: "Revenue Analysis - Q1 2024", date: "2024-01-31", size: "3.2 MB", status: "completed" },
              { name: "Trip Summary - Weekly", date: "2024-03-10", size: "1.2 MB", status: "processing" },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{report.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Generated on {report.date} • {report.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    className={
                      report.status === "completed" 
                        ? "bg-secondary/10 text-secondary border-secondary/20"
                        : "bg-warning/10 text-warning border-warning/20"
                    }
                  >
                    {report.status}
                  </Badge>
                  {report.status === "completed" && (
                    <Button size="sm" variant="outline">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}