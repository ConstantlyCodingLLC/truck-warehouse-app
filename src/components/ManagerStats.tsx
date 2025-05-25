
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Package, Users, AlertTriangle } from "lucide-react";

const ManagerStats = () => {
  const stats = [
    { title: "Active Loads", value: "47", icon: Package, color: "blue" },
    { title: "Available Trucks", value: "12", icon: Truck, color: "green" },
    { title: "Active Drivers", value: "35", icon: Users, color: "orange" },
    { title: "Pending Compliance", value: "3", icon: AlertTriangle, color: "red" }
  ];

  return (
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
  );
};

export default ManagerStats;
