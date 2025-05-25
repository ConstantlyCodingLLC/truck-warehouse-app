
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Users, Package, Weight } from "lucide-react";
import ManagerDashboard from "@/components/ManagerDashboard";
import DriverDashboard from "@/components/DriverDashboard";

const Index = () => {
  const [userRole, setUserRole] = useState<'manager' | 'driver' | null>(null);

  if (userRole === 'manager') {
    return <ManagerDashboard onLogout={() => setUserRole(null)} />;
  }

  if (userRole === 'driver') {
    return <DriverDashboard onLogout={() => setUserRole(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Truck className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">TruckTrack Pro</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete trucking management system for tracking, receiving, and deploying loads with full compliance support
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-16 w-16 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-blue-700">Manager Portal</CardTitle>
              <CardDescription className="text-lg">
                Manage fleet operations, assign loads, track drivers, and oversee compliance
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-3 mb-6 text-sm text-gray-600">
                <div className="flex items-center justify-center">
                  <Package className="h-4 w-4 mr-2" />
                  Load Assignment & Tracking
                </div>
                <div className="flex items-center justify-center">
                  <Truck className="h-4 w-4 mr-2" />
                  Fleet Management
                </div>
                <div className="flex items-center justify-center">
                  <Weight className="h-4 w-4 mr-2" />
                  Compliance Oversight
                </div>
              </div>
              <Button 
                onClick={() => setUserRole('manager')}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                Access Manager Dashboard
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-orange-500">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Truck className="h-16 w-16 text-orange-600" />
              </div>
              <CardTitle className="text-2xl text-orange-700">Driver Portal</CardTitle>
              <CardDescription className="text-lg">
                View assigned loads, update status, and complete compliance documentation
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-3 mb-6 text-sm text-gray-600">
                <div className="flex items-center justify-center">
                  <Package className="h-4 w-4 mr-2" />
                  Load Updates & Status
                </div>
                <div className="flex items-center justify-center">
                  <Weight className="h-4 w-4 mr-2" />
                  Weigh Station Forms
                </div>
                <div className="flex items-center justify-center">
                  <Truck className="h-4 w-4 mr-2" />
                  Trip Documentation
                </div>
              </div>
              <Button 
                onClick={() => setUserRole('driver')}
                className="w-full bg-orange-600 hover:bg-orange-700"
                size="lg"
              >
                Access Driver Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">Real-time Tracking</h3>
                <p className="text-gray-600 text-sm">Monitor truck locations, load status, and delivery progress in real-time</p>
              </div>
              <div>
                <h3 className="font-semibold text-orange-600 mb-2">Compliance Management</h3>
                <p className="text-gray-600 text-sm">Digital forms for weigh stations, inspections, and regulatory compliance</p>
              </div>
              <div>
                <h3 className="font-semibold text-green-600 mb-2">Load Optimization</h3>
                <p className="text-gray-600 text-sm">Efficient load assignment and route planning for maximum productivity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
