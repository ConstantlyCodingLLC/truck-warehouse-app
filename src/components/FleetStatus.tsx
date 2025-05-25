
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Truck, 
  MapPin, 
  Fuel, 
  Wrench, 
  CheckCircle, 
  AlertTriangle,
  Clock
} from "lucide-react";

const FleetStatus = () => {
  const trucks = [
    {
      id: "TR-101",
      driver: "John Smith",
      location: "Denver, CO",
      status: "In Transit",
      fuel: 75,
      mileage: "487,234",
      maintenance: "Due in 2,300 miles",
      lastInspection: "2 days ago",
      issues: []
    },
    {
      id: "TR-105",
      driver: "Sarah Wilson",
      location: "Flagstaff, AZ",
      status: "In Transit",
      fuel: 45,
      mileage: "392,156",
      maintenance: "Current",
      lastInspection: "1 week ago",
      issues: ["Low fuel warning"]
    },
    {
      id: "TR-108",
      driver: "David Brown",
      location: "Albuquerque, NM",
      status: "In Transit",
      fuel: 85,
      mileage: "234,567",
      maintenance: "Current",
      lastInspection: "3 days ago",
      issues: []
    },
    {
      id: "TR-112",
      driver: "Lisa Garcia",
      location: "Kansas City, MO",
      status: "In Transit",
      fuel: 60,
      mileage: "156,789",
      maintenance: "Due in 1,200 miles",
      lastInspection: "5 days ago",
      issues: []
    },
    {
      id: "TR-103",
      driver: "Mike Johnson",
      location: "Miami, FL",
      status: "Available",
      fuel: 95,
      mileage: "298,432",
      maintenance: "Current",
      lastInspection: "Yesterday",
      issues: []
    },
    {
      id: "TR-115",
      driver: "Unassigned",
      location: "Phoenix, AZ",
      status: "Maintenance",
      fuel: 30,
      mileage: "445,123",
      maintenance: "In Progress",
      lastInspection: "1 week ago",
      issues: ["Engine service", "Brake inspection"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Transit": return "bg-blue-100 text-blue-800";
      case "Available": return "bg-green-100 text-green-800";
      case "Maintenance": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getFuelColor = (fuel: number) => {
    if (fuel > 60) return "text-green-600";
    if (fuel > 30) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Truck className="h-5 w-5 mr-2 text-blue-600" />
            Fleet Overview
          </CardTitle>
          <CardDescription>Real-time status of all trucks in your fleet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-700">4</p>
              <p className="text-sm text-blue-600">In Transit</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-700">1</p>
              <p className="text-sm text-green-600">Available</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-700">1</p>
              <p className="text-sm text-red-600">In Maintenance</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-700">2</p>
              <p className="text-sm text-yellow-600">Need Attention</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {trucks.map((truck) => (
          <Card key={truck.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="grid lg:grid-cols-6 gap-4 items-center">
                <div>
                  <div className="flex items-center mb-2">
                    <Truck className="h-5 w-5 mr-2 text-gray-600" />
                    <h3 className="font-semibold text-lg">{truck.id}</h3>
                  </div>
                  <Badge className={getStatusColor(truck.status)}>
                    {truck.status}
                  </Badge>
                </div>

                <div className="text-sm">
                  <p className="font-medium text-gray-900">
                    {truck.driver !== "Unassigned" ? truck.driver : "No Driver"}
                  </p>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {truck.location}
                  </div>
                </div>

                <div className="text-sm">
                  <div className="flex items-center mb-2">
                    <Fuel className={`h-4 w-4 mr-1 ${getFuelColor(truck.fuel)}`} />
                    <span className={getFuelColor(truck.fuel)}>
                      {truck.fuel}% Fuel
                    </span>
                  </div>
                  <p className="text-gray-600">{truck.mileage} miles</p>
                </div>

                <div className="text-sm">
                  <div className="flex items-center mb-1">
                    <Wrench className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-gray-700">{truck.maintenance}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-gray-600">Inspected {truck.lastInspection}</span>
                  </div>
                </div>

                <div className="text-sm">
                  {truck.issues.length > 0 ? (
                    <div>
                      <div className="flex items-center mb-1">
                        <AlertTriangle className="h-4 w-4 mr-1 text-red-500" />
                        <span className="text-red-700 font-medium">Issues</span>
                      </div>
                      {truck.issues.map((issue, index) => (
                        <p key={index} className="text-red-600 text-xs">• {issue}</p>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                      <span className="text-green-700 font-medium">All Good</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2 justify-end">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {truck.status === "Available" && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Assign Load
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FleetStatus;
