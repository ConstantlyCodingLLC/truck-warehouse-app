
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Package, 
  MapPin, 
  Truck, 
  Clock, 
  Search, 
  Plus,
  Edit,
  Eye
} from "lucide-react";

const LoadManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  const loads = [
    {
      id: "TL-2024-003",
      pickup: "Chicago, IL",
      destination: "Los Angeles, CA",
      driver: "Sarah Wilson",
      truck: "TR-105",
      weight: "34,200 lbs",
      status: "In Transit",
      eta: "Tomorrow 4:30 PM",
      priority: "High",
      progress: 85
    },
    {
      id: "TL-2024-004",
      pickup: "Houston, TX",
      destination: "Phoenix, AZ",
      driver: "David Brown",
      truck: "TR-108",
      weight: "28,900 lbs",
      status: "In Transit",
      eta: "Tomorrow 6:15 PM",
      priority: "Normal",
      progress: 60
    },
    {
      id: "TL-2024-005",
      pickup: "Atlanta, GA",
      destination: "Denver, CO",
      driver: "Lisa Garcia",
      truck: "TR-112",
      weight: "31,500 lbs",
      status: "In Transit",
      eta: "Tomorrow 9:00 AM",
      priority: "Normal",
      progress: 25
    },
    {
      id: "TL-2024-006",
      pickup: "Seattle, WA",
      destination: "Portland, OR",
      driver: "Unassigned",
      truck: "Unassigned",
      weight: "22,400 lbs",
      status: "Pending Assignment",
      eta: "TBD",
      priority: "High",
      progress: 0
    },
    {
      id: "TL-2024-007",
      pickup: "Miami, FL",
      destination: "Jacksonville, FL",
      driver: "Mike Johnson",
      truck: "TR-103",
      weight: "18,600 lbs",
      status: "Delivered",
      eta: "Completed",
      priority: "Normal",
      progress: 100
    }
  ];

  const handleCreateNewLoad = () => {
    toast({
      title: "New Load",
      description: "Opening load creation form...",
    });
    console.log("Creating new load...");
  };

  const handleViewLoad = (loadId: string) => {
    toast({
      title: "Load Details",
      description: `Viewing details for ${loadId}`,
    });
    console.log("Viewing load:", loadId);
  };

  const handleEditLoad = (loadId: string) => {
    toast({
      title: "Edit Load",
      description: `Editing ${loadId}`,
    });
    console.log("Editing load:", loadId);
  };

  const handleAssignLoad = (loadId: string) => {
    toast({
      title: "Assign Load",
      description: `Assigning ${loadId} to driver and truck`,
    });
    console.log("Assigning load:", loadId);
  };

  const handleLoadMore = () => {
    toast({
      title: "Loading",
      description: "Loading more results...",
    });
    console.log("Loading more results...");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Transit": return "bg-blue-100 text-blue-800";
      case "Delivered": return "bg-green-100 text-green-800";
      case "Pending Assignment": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    return priority === "High" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800";
  };

  const filteredLoads = loads.filter(load => {
    const matchesSearch = load.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         load.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         load.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "in-transit" && load.status === "In Transit") ||
                         (statusFilter === "pending" && load.status === "Pending Assignment") ||
                         (statusFilter === "delivered" && load.status === "Delivered");
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2 text-blue-600" />
              Load Management
            </CardTitle>
            <CardDescription>Assign, track, and manage all freight loads</CardDescription>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleCreateNewLoad}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Load
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search loads by ID, driver, or destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="in-transit">In Transit</SelectItem>
              <SelectItem value="pending">Pending Assignment</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {filteredLoads.map((load) => (
            <div key={load.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="grid lg:grid-cols-6 gap-4 items-center">
                <div className="lg:col-span-2">
                  <div className="flex items-center mb-2">
                    <h3 className="font-semibold text-lg">Load #{load.id}</h3>
                    <div className="ml-2 flex space-x-2">
                      <Badge className={getPriorityColor(load.priority)}>
                        {load.priority}
                      </Badge>
                      <Badge className={getStatusColor(load.status)}>
                        {load.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {load.pickup} → {load.destination}
                    </div>
                    <p>Weight: {load.weight}</p>
                  </div>
                </div>

                <div className="text-sm">
                  <p className="font-medium text-gray-900">
                    {load.driver !== "Unassigned" ? load.driver : "No Driver"}
                  </p>
                  <div className="flex items-center text-gray-600">
                    <Truck className="h-4 w-4 mr-1" />
                    {load.truck !== "Unassigned" ? load.truck : "No Truck"}
                  </div>
                </div>

                <div className="text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    ETA: {load.eta}
                  </div>
                  {load.status === "In Transit" && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${load.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{load.progress}% Complete</p>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-2 flex space-x-2 justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewLoad(load.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditLoad(load.id)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  {load.status === "Pending Assignment" && (
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleAssignLoad(load.id)}
                    >
                      Assign
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredLoads.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No loads found matching your criteria.
          </div>
        )}

        <div className="mt-6 text-center">
          <Button variant="outline" onClick={handleLoadMore}>
            Load More Results
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadManagement;
