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
import { DollarSign, Search, Filter, Download, Plus, Clock, CheckCircle, XCircle, User, Calendar } from "lucide-react";
import { toast } from "sonner";

const mockPayouts = [
  {
    id: "PO001",
    driverId: "DR001",
    driverName: "John Smith",
    amount: 2850,
    trips: 12,
    period: "Week 1, Jan 2024",
    status: "paid",
    requestDate: "2024-01-05",
    paidDate: "2024-01-06",
    bankAccount: "****1234",
    transactionId: "TXN123456789"
  },
  {
    id: "PO002", 
    driverId: "DR002",
    driverName: "Raj Kumar",
    amount: 4200,
    trips: 18,
    period: "Week 1, Jan 2024",
    status: "pending",
    requestDate: "2024-01-07",
    paidDate: null,
    bankAccount: "****5678",
    transactionId: null
  },
  {
    id: "PO003",
    driverId: "DR003", 
    driverName: "Mike Johnson",
    amount: 1950,
    trips: 8,
    period: "Week 1, Jan 2024",
    status: "processing",
    requestDate: "2024-01-06",
    paidDate: null,
    bankAccount: "****9012",
    transactionId: null
  },
  {
    id: "PO004",
    driverId: "DR004",
    driverName: "Sarah Wilson", 
    amount: 3650,
    trips: 15,
    period: "Week 1, Jan 2024",
    status: "rejected",
    requestDate: "2024-01-04",
    paidDate: null,
    bankAccount: "****3456",
    transactionId: null
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "paid":
      return <Badge variant="default" className="bg-emerald-100 text-emerald-800 border-emerald-200">Paid</Badge>;
    case "pending":
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
    case "processing":
      return <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">Processing</Badge>;
    case "rejected":
      return <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export function PayoutsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isManualPayoutOpen, setIsManualPayoutOpen] = useState(false);
  const [manualPayout, setManualPayout] = useState({
    driverId: "",
    amount: "",
    reason: ""
  });

  const filteredPayouts = mockPayouts.filter(payout => {
    const matchesSearch = payout.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payout.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || payout.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const payoutStats = {
    totalPaid: mockPayouts.filter(p => p.status === "paid").reduce((sum, p) => sum + p.amount, 0),
    totalPending: mockPayouts.filter(p => p.status === "pending").reduce((sum, p) => sum + p.amount, 0),
    totalProcessing: mockPayouts.filter(p => p.status === "processing").reduce((sum, p) => sum + p.amount, 0),
    pendingCount: mockPayouts.filter(p => p.status === "pending").length,
    processingCount: mockPayouts.filter(p => p.status === "processing").length
  };

  const handleManualPayout = () => {
    toast.success("Manual payout request created successfully");
    setIsManualPayoutOpen(false);
    setManualPayout({ driverId: "", amount: "", reason: "" });
  };

  const handlePayoutAction = (payoutId: string, action: string) => {
    toast.success(`Payout ${payoutId} ${action} successfully`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Payout Management</h1>
        <p className="text-muted-foreground">Manage driver payouts and earnings</p>
      </div>

      {/* Payout Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">₹{payoutStats.totalPaid.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">₹{payoutStats.totalPending.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">₹{payoutStats.totalProcessing.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{payoutStats.pendingCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{payoutStats.processingCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Payouts Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Payout History</CardTitle>
              <CardDescription>View and manage driver payouts</CardDescription>
            </div>
            <div className="flex gap-2">
              <Dialog open={isManualPayoutOpen} onOpenChange={setIsManualPayoutOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Manual Payout
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create Manual Payout</DialogTitle>
                    <DialogDescription>
                      Create a manual payout request for a driver
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="driverId">Driver</Label>
                      <Select value={manualPayout.driverId} onValueChange={(value) => setManualPayout({...manualPayout, driverId: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select driver" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DR001">John Smith</SelectItem>
                          <SelectItem value="DR002">Raj Kumar</SelectItem>
                          <SelectItem value="DR003">Mike Johnson</SelectItem>
                          <SelectItem value="DR004">Sarah Wilson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="amount">Amount (₹)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={manualPayout.amount}
                        onChange={(e) => setManualPayout({...manualPayout, amount: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="reason">Reason</Label>
                      <Textarea
                        id="reason"
                        placeholder="Enter reason for manual payout"
                        value={manualPayout.reason}
                        onChange={(e) => setManualPayout({...manualPayout, reason: e.target.value})}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsManualPayoutOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleManualPayout}>Create Payout</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
                placeholder="Search payouts or drivers..."
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
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payout ID</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Trips</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Bank Account</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayouts.map((payout) => (
                  <TableRow key={payout.id}>
                    <TableCell className="font-medium">{payout.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        {payout.driverName}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-primary">₹{payout.amount.toLocaleString()}</TableCell>
                    <TableCell>{payout.trips}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {payout.period}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(payout.status)}</TableCell>
                    <TableCell>{payout.requestDate}</TableCell>
                    <TableCell className="text-muted-foreground">{payout.bankAccount}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {payout.status === "pending" && (
                          <>
                            <Button size="sm" variant="default" onClick={() => handlePayoutAction(payout.id, "approved")}>
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handlePayoutAction(payout.id, "rejected")}>
                              Reject
                            </Button>
                          </>
                        )}
                        {payout.status === "processing" && (
                          <Button size="sm" variant="secondary" onClick={() => handlePayoutAction(payout.id, "completed")}>
                            Mark Paid
                          </Button>
                        )}
                        {payout.status === "paid" && (
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