
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Warehouse, 
  Package, 
  Search, 
  Plus, 
  AlertTriangle, 
  CheckCircle,
  TrendingDown,
  TrendingUp,
  Scan
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const WarehouseInventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("WH-001");

  const warehouses = [
    { id: "WH-001", name: "Main Distribution Center", location: "Los Angeles, CA" },
    { id: "WH-002", name: "East Coast Hub", location: "Atlanta, GA" },
    { id: "WH-003", name: "Regional Depot", location: "Phoenix, AZ" }
  ];

  const inventoryItems = [
    {
      id: "INV-001",
      sku: "SKU-12345",
      name: "Electronic Components",
      category: "Electronics",
      quantity: 1250,
      minStock: 500,
      maxStock: 2000,
      location: "A-12-03",
      lastUpdated: "2024-01-15 14:30",
      status: "In Stock"
    },
    {
      id: "INV-002",
      sku: "SKU-67890",
      name: "Automotive Parts",
      category: "Automotive",
      quantity: 75,
      minStock: 100,
      maxStock: 500,
      location: "B-08-15",
      lastUpdated: "2024-01-15 12:15",
      status: "Low Stock"
    },
    {
      id: "INV-003",
      sku: "SKU-54321",
      name: "Medical Supplies",
      category: "Healthcare",
      quantity: 2100,
      minStock: 1000,
      maxStock: 3000,
      location: "C-05-22",
      lastUpdated: "2024-01-15 16:45",
      status: "Overstocked"
    },
    {
      id: "INV-004",
      sku: "SKU-98765",
      name: "Industrial Equipment",
      category: "Industrial",
      quantity: 0,
      minStock: 10,
      maxStock: 50,
      location: "D-15-08",
      lastUpdated: "2024-01-14 09:20",
      status: "Out of Stock"
    }
  ];

  const getStatusBadge = (status: string, quantity: number, minStock: number, maxStock: number) => {
    if (quantity === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (quantity < minStock) {
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Low Stock</Badge>;
    } else if (quantity > maxStock) {
      return <Badge className="bg-purple-100 text-purple-800 border-purple-300">Overstocked</Badge>;
    } else {
      return <Badge className="bg-green-100 text-green-800 border-green-300">In Stock</Badge>;
    }
  };

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalItems: inventoryItems.length,
    lowStock: inventoryItems.filter(item => item.quantity < item.minStock).length,
    outOfStock: inventoryItems.filter(item => item.quantity === 0).length,
    overstocked: inventoryItems.filter(item => item.quantity > item.maxStock).length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Warehouse Inventory</h2>
          <p className="text-gray-600">Manage and track inventory across all warehouse locations</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Scan className="h-4 w-4 mr-2" />
            Scan Items
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalItems}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.lowStock}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overstocked</p>
                <p className="text-2xl font-bold text-purple-600">{stats.overstocked}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Warehouse className="h-5 w-5 mr-2 text-blue-600" />
                Inventory Management
              </CardTitle>
              <CardDescription>Track and manage warehouse inventory levels</CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <div>
                <Label htmlFor="warehouse-select" className="text-sm font-medium">Warehouse</Label>
                <select
                  id="warehouse-select"
                  value={selectedWarehouse}
                  onChange={(e) => setSelectedWarehouse(e.target.value)}
                  className="ml-2 border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  {warehouses.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by item name, SKU, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Details</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Stock Levels</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.sku}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell className="font-medium">{item.quantity}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>Min: {item.minStock}</p>
                        <p>Max: {item.maxStock}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(item.status, item.quantity, item.minStock, item.maxStock)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{item.lastUpdated}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Move</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WarehouseInventory;
