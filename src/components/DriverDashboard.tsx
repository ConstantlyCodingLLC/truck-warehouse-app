
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Truck, 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  FileText,
  ArrowLeft,
  Navigation
} from "lucide-react";
import WeighStationForm from "@/components/WeighStationForm";
import LoadDetails from "@/components/LoadDetails";

interface DriverDashboardProps {
  onLogout: () => void;
}

const DriverDashboard = ({ onLogout }: DriverDashboardProps) => {
  const [activeTab, setActiveTab] = useState("current-load");

  const currentLoad = {
    id: "TL-2024-003",
    pickup: "Chicago, IL",
    destination: "Los Angeles, CA",
    weight: "34,200 lbs",
    eta: "Tomorrow 4:30 PM",
    status: "In Transit",
    progress: 65
  };

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
              <Truck className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Driver Portal</h1>
                <p className="text-gray-600">Welcome back, John Smith</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                On Duty
              </Badge>
              <Button variant="outline" size="sm">
                <Navigation className="h-4 w-4 mr-2" />
                GPS
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Load</p>
                  <p className="text-xl font-bold text-gray-900">{currentLoad.id}</p>
                  <p className="text-sm text-orange-600">{currentLoad.progress}% Complete</p>
                </div>
                <Package className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Next Inspection</p>
                  <p className="text-xl font-bold text-gray-900">48 Hours</p>
                  <p className="text-sm text-blue-600">DOT Required</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Driving Hours</p>
                  <p className="text-xl font-bold text-gray-900">6.5 / 11</p>
                  <p className="text-sm text-green-600">4.5 hrs remaining</p>
                </div>
                <Truck className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="current-load">Current Load</TabsTrigger>
            <TabsTrigger value="weigh-station">Weigh Station</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="history">Trip History</TabsTrigger>
          </TabsList>

          <TabsContent value="current-load">
            <LoadDetails load={currentLoad} />
          </TabsContent>

          <TabsContent value="weigh-station">
            <WeighStationForm />
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Required Documentation
                </CardTitle>
                <CardDescription>Complete and submit required forms and documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Daily Vehicle Inspection Report (DVIR)", status: "Completed", date: "Today", required: true },
                    { name: "Hours of Service Log", status: "Current", date: "Auto-updated", required: true },
                    { name: "Bill of Lading", status: "Pending", date: "Due before delivery", required: true },
                    { name: "Fuel Receipt", status: "Uploaded", date: "2 hours ago", required: false },
                    { name: "Weigh Station Certificate", status: "Pending", date: "Due at next station", required: true }
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-gray-600">{doc.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {doc.required && (
                          <Badge variant="outline" className="text-red-600 border-red-600 text-xs">
                            Required
                          </Badge>
                        )}
                        <Badge 
                          variant={doc.status === 'Completed' || doc.status === 'Uploaded' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {doc.status}
                        </Badge>
                        {doc.status === 'Pending' && (
                          <Button size="sm" variant="outline">
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Recent Trips</CardTitle>
                <CardDescription>Your completed loads and deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: "TL-2024-001", route: "Denver, CO → Salt Lake City, UT", completed: "Yesterday", miles: "467", status: "Delivered" },
                    { id: "TL-2024-002", route: "Phoenix, AZ → Denver, CO", completed: "2 days ago", miles: "589", status: "Delivered" },
                    { id: "TL-2023-098", route: "Las Vegas, NV → Phoenix, AZ", completed: "4 days ago", miles: "297", status: "Delivered" },
                    { id: "TL-2023-097", route: "Los Angeles, CA → Las Vegas, NV", completed: "5 days ago", miles: "270", status: "Delivered" }
                  ].map((trip, index) => (
                    <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Load #{trip.id}</p>
                        <p className="text-sm text-gray-600">{trip.route}</p>
                        <p className="text-xs text-gray-500">{trip.miles} miles • {trip.completed}</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          {trip.status}
                        </Badge>
                        <Button variant="ghost" size="sm" className="ml-2">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DriverDashboard;
