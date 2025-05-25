
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";

const OverviewTab = () => {
  return (
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
  );
};

export default OverviewTab;
