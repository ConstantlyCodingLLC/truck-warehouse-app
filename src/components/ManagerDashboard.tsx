
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Truck, 
  Package, 
  Users, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Plus,
  ArrowLeft,
  Warehouse
} from "lucide-react";
import LoadManagement from "@/components/LoadManagement";
import FleetStatus from "@/components/FleetStatus";
import WarehouseInventory from "@/components/WarehouseInventory";
import AuditManagement from "@/components/AuditManagement";

interface ManagerDashboardProps {
  onLogout: () => void;
}

const ManagerDashboard = ({ onLogout }: ManagerDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { title: "Active Loads", value: "47", icon: Package, color: "blue" },
    { title: "Available Trucks", value: "12", icon: Truck, color: "green" },
    { title: "Active Drivers", value: "35", icon: Users, color: "orange" },
    { title: "Pending Compliance", value: "3", icon: AlertTriangle, color: "red" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onLogout}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Truck className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Manager Dashboard</h1>
                <p className="text-gray-600">Fleet Operations Control Center</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                System Online
              </Badge>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Load
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 text-${stat.color}-600`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="loads">Load Management</TabsTrigger>
            <TabsTrigger value="fleet">Fleet Status</TabsTrigger>
            <TabsTrigger value="warehouse">Warehouse</TabsTrigger>
            <TabsTrigger value="audit">Audit</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: "Load #TL-2024-001 assigned to Driver John Smith", time: "2 min ago", status: "success" },
                      { action: "Truck #TR-105 completed weigh station inspection", time: "15 min ago", status: "success" },
                      { action: "Load #TL-2024-002 delivered successfully", time: "1 hour ago", status: "success" },
                      { action: "Driver Mike Johnson submitted HOS violation report", time: "2 hours ago", status: "warning" }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-green-600" />
                    Active Deliveries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { load: "TL-2024-003", driver: "Sarah Wilson", destination: "Los Angeles, CA", eta: "4:30 PM", progress: 85 },
                      { load: "TL-2024-004", driver: "David Brown", destination: "Phoenix, AZ", eta: "6:15 PM", progress: 60 },
                      { load: "TL-2024-005", driver: "Lisa Garcia", destination: "Denver, CO", eta: "Tomorrow 9:00 AM", progress: 25 }
                    ].map((delivery, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-sm">Load #{delivery.load}</p>
                            <p className="text-xs text-gray-600">Driver: {delivery.driver}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {delivery.progress}% Complete
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-1">{delivery.destination}</p>
                        <p className="text-xs text-green-600">ETA: {delivery.eta}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="loads">
            <LoadManagement />
          </TabsContent>

          <TabsContent value="fleet">
            <FleetStatus />
          </TabsContent>

          <TabsContent value="warehouse">
            <WarehouseInventory />
          </TabsContent>

          <TabsContent value="audit">
            <AuditManagement />
          </TabsContent>

          <TabsContent value="compliance">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Dashboard</CardTitle>
                <CardDescription>Monitor regulatory compliance and documentation status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <Card className="border-green-200 bg-green-50">
                      <CardContent className="p-4 text-center">
                        <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="font-semibold text-green-800">Compliant Drivers</p>
                        <p className="text-2xl font-bold text-green-900">32</p>
                      </CardContent>
                    </Card>
                    <Card className="border-yellow-200 bg-yellow-50">
                      <CardContent className="p-4 text-center">
                        <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                        <p className="font-semibold text-yellow-800">Pending Reviews</p>
                        <p className="text-2xl font-bold text-yellow-900">3</p>
                      </CardContent>
                    </Card>
                    <Card className="border-blue-200 bg-blue-50">
                      <CardContent className="p-4 text-center">
                        <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="font-semibold text-blue-800">Recent Inspections</p>
                        <p className="text-2xl font-bold text-blue-900">8</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-4">Recent Compliance Activities</h3>
                    <div className="space-y-3">
                      {[
                        { driver: "John Smith", activity: "Weigh Station Inspection", status: "Passed", time: "1 hour ago" },
                        { driver: "Mike Johnson", activity: "HOS Violation Report", status: "Under Review", time: "2 hours ago" },
                        { driver: "Sarah Wilson", activity: "DOT Physical", status: "Completed", time: "1 day ago" },
                        { driver: "David Brown", activity: "Vehicle Inspection", status: "Passed", time: "2 days ago" }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <div>
                            <p className="font-medium text-sm">{item.driver}</p>
                            <p className="text-sm text-gray-600">{item.activity}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={item.status === 'Passed' || item.status === 'Completed' ? 'default' : 'secondary'}>
                              {item.status}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ManagerDashboard;
