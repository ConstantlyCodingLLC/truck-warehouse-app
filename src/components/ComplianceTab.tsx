
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Clock } from "lucide-react";

const ComplianceTab = () => {
  return (
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
  );
};

export default ComplianceTab;
