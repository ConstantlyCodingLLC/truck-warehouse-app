
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Package, 
  MapPin, 
  Clock, 
  Truck, 
  Navigation, 
  Phone,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface LoadDetailsProps {
  load: {
    id: string;
    pickup: string;
    destination: string;
    weight: string;
    eta: string;
    status: string;
    progress: number;
  };
}

const LoadDetails = ({ load }: LoadDetailsProps) => {
  const milestones = [
    { name: "Load Assigned", completed: true, time: "Yesterday 3:00 PM" },
    { name: "Pickup Confirmed", completed: true, time: "Yesterday 8:30 AM" },
    { name: "In Transit", completed: true, time: "Today 6:00 AM" },
    { name: "Delivery Scheduled", completed: false, time: "Tomorrow 4:30 PM" },
    { name: "Delivered", completed: false, time: "Pending" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2 text-orange-600" />
                Load #{load.id}
              </CardTitle>
              <CardDescription>Current load details and tracking information</CardDescription>
            </div>
            <Badge className="bg-blue-100 text-blue-800">
              {load.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Route Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-sm">
                      <strong>Pickup:</strong> {load.pickup}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-red-600" />
                    <span className="text-sm">
                      <strong>Destination:</strong> {load.destination}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="text-sm">
                      <strong>ETA:</strong> {load.eta}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Load Details</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Weight:</strong> {load.weight}</p>
                  <p><strong>Commodity:</strong> General Freight</p>
                  <p><strong>Special Instructions:</strong> Handle with care, temperature sensitive</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Progress</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Delivery Progress</span>
                    <span>{load.progress}%</span>
                  </div>
                  <Progress value={load.progress} className="h-2" />
                  <p className="text-xs text-gray-600">
                    Estimated {Math.round((100 - load.progress) * 8 / 100)} hours remaining
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Navigation className="h-4 w-4 mr-1" />
                    GPS
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Phone className="h-4 w-4 mr-1" />
                    Dispatch
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Report Issue
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Truck className="h-4 w-4 mr-1" />
                    Update Status
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Delivery Milestones</CardTitle>
          <CardDescription>Track your progress through each stage of delivery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  milestone.completed 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {milestone.completed ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${
                    milestone.completed ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {milestone.name}
                  </p>
                  <p className="text-sm text-gray-600">{milestone.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Dispatch</h4>
              <p className="text-sm text-gray-600">Phone: (555) 123-4567</p>
              <p className="text-sm text-gray-600">Emergency: (555) 123-4568</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Customer</h4>
              <p className="text-sm text-gray-600">ABC Logistics</p>
              <p className="text-sm text-gray-600">Phone: (555) 987-6543</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadDetails;
