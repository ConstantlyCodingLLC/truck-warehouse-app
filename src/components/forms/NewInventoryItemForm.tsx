
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewInventoryItemFormData {
  sku: string;
  name: string;
  category: string;
  quantity: string;
  minStock: string;
  maxStock: string;
  location: string;
  warehouse: string;
  description: string;
  supplier: string;
  unitPrice: string;
}

interface NewInventoryItemFormProps {
  onClose: () => void;
  onSubmit?: (data: NewInventoryItemFormData) => void;
}

const NewInventoryItemForm = ({ onClose, onSubmit }: NewInventoryItemFormProps) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<NewInventoryItemFormData>();
  const { toast } = useToast();

  const categories = [
    "Electronics",
    "Automotive",
    "Healthcare",
    "Industrial",
    "Consumer Goods",
    "Food & Beverage",
    "Textiles",
    "Chemicals"
  ];

  const warehouses = [
    { id: "WH-001", name: "Main Distribution Center" },
    { id: "WH-002", name: "East Coast Hub" },
    { id: "WH-003", name: "Regional Depot" }
  ];

  const handleFormSubmit = (data: NewInventoryItemFormData) => {
    console.log("New inventory item data:", data);
    
    if (onSubmit) {
      onSubmit(data);
    }
    
    toast({
      title: "Item Added",
      description: `${data.name} (${data.sku}) has been added to inventory.`,
    });
    
    onClose();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Package className="h-5 w-5 mr-2 text-blue-600" />
          Add New Inventory Item
        </CardTitle>
        <CardDescription>Enter the details for the new inventory item</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                {...register("sku", { required: "SKU is required" })}
                placeholder="SKU-12345"
              />
              {errors.sku && (
                <p className="text-sm text-red-600">{errors.sku.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                {...register("name", { required: "Item name is required" })}
                placeholder="Electronic Components"
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="warehouse">Warehouse</Label>
              <Select onValueChange={(value) => setValue("warehouse", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select warehouse" />
                </SelectTrigger>
                <SelectContent>
                  {warehouses.map((warehouse) => (
                    <SelectItem key={warehouse.id} value={warehouse.id}>
                      {warehouse.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="quantity">Current Quantity</Label>
              <Input
                id="quantity"
                type="number"
                {...register("quantity", { required: "Quantity is required" })}
                placeholder="1000"
              />
              {errors.quantity && (
                <p className="text-sm text-red-600">{errors.quantity.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="minStock">Min Stock Level</Label>
              <Input
                id="minStock"
                type="number"
                {...register("minStock", { required: "Min stock is required" })}
                placeholder="500"
              />
              {errors.minStock && (
                <p className="text-sm text-red-600">{errors.minStock.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="maxStock">Max Stock Level</Label>
              <Input
                id="maxStock"
                type="number"
                {...register("maxStock", { required: "Max stock is required" })}
                placeholder="2000"
              />
              {errors.maxStock && (
                <p className="text-sm text-red-600">{errors.maxStock.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Storage Location</Label>
              <Input
                id="location"
                {...register("location", { required: "Location is required" })}
                placeholder="A-12-03"
              />
              {errors.location && (
                <p className="text-sm text-red-600">{errors.location.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="unitPrice">Unit Price ($)</Label>
              <Input
                id="unitPrice"
                type="number"
                step="0.01"
                {...register("unitPrice")}
                placeholder="25.99"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="supplier">Supplier</Label>
            <Input
              id="supplier"
              {...register("supplier")}
              placeholder="ABC Suppliers Inc."
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Item description and specifications..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Add Item
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewInventoryItemForm;
