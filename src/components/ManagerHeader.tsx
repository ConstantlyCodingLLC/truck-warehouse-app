
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, ArrowLeft, Plus } from "lucide-react";

interface ManagerHeaderProps {
  onLogout: () => void;
}

const ManagerHeader = ({ onLogout }: ManagerHeaderProps) => {
  return (
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
  );
};

export default ManagerHeader;
