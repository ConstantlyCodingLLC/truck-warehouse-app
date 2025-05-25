
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Search, 
  Plus, 
  Calendar, 
  User, 
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Filter
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AuditManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAuditType, setSelectedAuditType] = useState("all");

  const auditReports = [
    {
      id: "AUD-001",
      type: "Inventory Count",
      warehouse: "Main Distribution Center",
      auditor: "Sarah Johnson",
      date: "2024-01-15",
      status: "Completed",
      discrepancies: 3,
      totalItems: 1250,
      accuracy: "99.76%"
    },
    {
      id: "AUD-002",
      type: "Compliance Check",
      warehouse: "East Coast Hub",
      auditor: "Mike Wilson",
      date: "2024-01-14",
      status: "In Progress",
      discrepancies: 0,
      totalItems: 890,
      accuracy: "100%"
    },
    {
      id: "AUD-003",
      type: "Security Audit",
      warehouse: "Regional Depot",
      auditor: "Lisa Garcia",
      date: "2024-01-13",
      status: "Pending Review",
      discrepancies: 7,
      totalItems: 650,
      accuracy: "98.92%"
    },
    {
      id: "AUD-004",
      type: "Quality Control",
      warehouse: "Main Distribution Center",
      auditor: "David Brown",
      date: "2024-01-12",
      status: "Completed",
      discrepancies: 1,
      totalItems: 420,
      accuracy: "99.76%"
    }
  ];

  const auditSchedule = [
    {
      id: "SCH-001",
      type: "Monthly Inventory",
      warehouse: "All Locations",
      scheduledDate: "2024-01-30",
      assignedAuditor: "TBD",
      frequency: "Monthly",
      priority: "High"
    },
    {
      id: "SCH-002",
      type: "Safety Inspection",
      warehouse: "Main Distribution Center",
      scheduledDate: "2024-01-25",
      assignedAuditor: "Sarah Johnson",
      frequency: "Quarterly",
      priority: "Medium"
    },
    {
      id: "SCH-003",
      type: "Compliance Review",
      warehouse: "East Coast Hub",
      scheduledDate: "2024-02-05",
      assignedAuditor: "Mike Wilson",
      frequency: "Bi-Annual",
      priority: "High"
    }
  ];

  const auditDiscrepancies = [
    {
      id: "DISC-001",
      auditId: "AUD-001",
      item: "Electronic Components",
      sku: "SKU-12345",
      expected: 1250,
      actual: 1247,
      difference: -3,
      reason: "Damaged items not logged",
      status: "Resolved",
      reportedBy: "Sarah Johnson"
    },
    {
      id: "DISC-002",
      auditId: "AUD-003",
      item: "Medical Supplies",
      sku: "SKU-54321",
      expected: 500,
      actual: 507,
      difference: 7,
      reason: "Unreported delivery",
      status: "Under Investigation",
      reportedBy: "Lisa Garcia"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "Completed": { variant: "default" as const, className: "bg-green-100 text-green-800 border-green-300" },
      "In Progress": { variant: "default" as const, className: "bg-blue-100 text-blue-800 border-blue-300" },
      "Pending Review": { variant: "default" as const, className: "bg-yellow-100 text-yellow-800 border-yellow-300" },
      "Resolved": { variant: "default" as const, className: "bg-green-100 text-green-800 border-green-300" },
      "Under Investigation": { variant: "default" as const, className: "bg-red-100 text-red-800 border-red-300" }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || { variant: "secondary" as const, className: "" };
    return <Badge variant={config.variant} className={config.className}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      "High": { className: "bg-red-100 text-red-800 border-red-300" },
      "Medium": { className: "bg-yellow-100 text-yellow-800 border-yellow-300" },
      "Low": { className: "bg-green-100 text-green-800 border-green-300" }
    };

    const config = priorityConfig[priority as keyof typeof priorityConfig] || { className: "" };
    return <Badge className={config.className}>{priority}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Audit Management</h2>
          <p className="text-gray-600">Manage warehouse audits, compliance checks, and discrepancy reports</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Schedule Audit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Audits</p>
                <p className="text-2xl font-bold text-gray-900">{auditReports.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {auditReports.filter(audit => audit.status === 'Completed').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">
                  {auditReports.filter(audit => audit.status === 'In Progress').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Discrepancies</p>
                <p className="text-2xl font-bold text-red-600">{auditDiscrepancies.length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reports">Audit Reports</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="discrepancies">Discrepancies</TabsTrigger>
        </TabsList>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Audit Reports
              </CardTitle>
              <CardDescription>View and manage completed and ongoing warehouse audits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search audits..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Audit ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Warehouse</TableHead>
                      <TableHead>Auditor</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Accuracy</TableHead>
                      <TableHead>Discrepancies</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditReports.map((audit) => (
                      <TableRow key={audit.id}>
                        <TableCell className="font-medium">{audit.id}</TableCell>
                        <TableCell>{audit.type}</TableCell>
                        <TableCell>{audit.warehouse}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-gray-400" />
                            {audit.auditor}
                          </div>
                        </TableCell>
                        <TableCell>{audit.date}</TableCell>
                        <TableCell>{getStatusBadge(audit.status)}</TableCell>
                        <TableCell>
                          <span className={`font-medium ${
                            parseFloat(audit.accuracy) >= 99 ? 'text-green-600' : 
                            parseFloat(audit.accuracy) >= 95 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {audit.accuracy}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`font-medium ${audit.discrepancies > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {audit.discrepancies}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Audit Schedule
              </CardTitle>
              <CardDescription>Plan and schedule upcoming warehouse audits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Schedule ID</TableHead>
                      <TableHead>Audit Type</TableHead>
                      <TableHead>Warehouse</TableHead>
                      <TableHead>Scheduled Date</TableHead>
                      <TableHead>Assigned Auditor</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditSchedule.map((schedule) => (
                      <TableRow key={schedule.id}>
                        <TableCell className="font-medium">{schedule.id}</TableCell>
                        <TableCell>{schedule.type}</TableCell>
                        <TableCell>{schedule.warehouse}</TableCell>
                        <TableCell>{schedule.scheduledDate}</TableCell>
                        <TableCell>{schedule.assignedAuditor}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{schedule.frequency}</Badge>
                        </TableCell>
                        <TableCell>{getPriorityBadge(schedule.priority)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Start</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discrepancies">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                Audit Discrepancies
              </CardTitle>
              <CardDescription>Track and resolve inventory discrepancies found during audits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Discrepancy ID</TableHead>
                      <TableHead>Audit ID</TableHead>
                      <TableHead>Item</TableHead>
                      <TableHead>Expected</TableHead>
                      <TableHead>Actual</TableHead>
                      <TableHead>Difference</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditDiscrepancies.map((discrepancy) => (
                      <TableRow key={discrepancy.id}>
                        <TableCell className="font-medium">{discrepancy.id}</TableCell>
                        <TableCell>{discrepancy.auditId}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{discrepancy.item}</p>
                            <p className="text-sm text-gray-600">{discrepancy.sku}</p>
                          </div>
                        </TableCell>
                        <TableCell>{discrepancy.expected}</TableCell>
                        <TableCell>{discrepancy.actual}</TableCell>
                        <TableCell>
                          <span className={`font-medium ${
                            discrepancy.difference > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {discrepancy.difference > 0 ? '+' : ''}{discrepancy.difference}
                          </span>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{discrepancy.reason}</TableCell>
                        <TableCell>{getStatusBadge(discrepancy.status)}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Resolve</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuditManagement;
