
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Package, MapPin, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewLoadFormData {
  loadNumber: string;
  customerName: string;
  pickupLocation: string;
  deliveryLocation: string;
  pickupDate: string;
  deliveryDate: string;
  weight: string;
  commodity: string;
  specialInstructions: string;
  priority: string;
}

interface NewLoadFormProps {
  onClose: () => void;
  onSubmit?: (data: NewLoadFormData) => void;
}

const NewLoadForm = ({ onClose, onSubmit }: NewLoadFormProps) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<NewLoadFormData>();
  const { toast } = useToast();

  const handleFormSubmit = (data: NewLoadFormData) => {
    console.log("New load data:", data);
    
    if (onSubmit) {
      onSubmit(data);
    }
    
    toast({
      title: "Load Created",
      description: `Load ${data.loadNumber} has been created successfully.`,
    });
    
    onClose();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Package className="h-5 w-5 mr-2 text-blue-600" />
          Create New Load
        </CardTitle>
        <CardDescription>Enter the details for the new load assignment</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="loadNumber">Load Number</Label>
              <Input
                id="loadNumber"
                {...register("loadNumber", { required: "Load number is required" })}
                placeholder="LD-001"
              />
              {errors.loadNumber && (
                <p className="text-sm text-red-600">{errors.loadNumber.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                {...register("customerName", { required: "Customer name is required" })}
                placeholder="ABC Corporation"
              />
              {errors.customerName && (
                <p className="text-sm text-red-600">{errors.customerName.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pickupLocation">Pickup Location</Label>
              <Input
                id="pickupLocation"
                {...register("pickupLocation", { required: "Pickup location is required" })}
                placeholder="Los Angeles, CA"
              />
              {errors.pickupLocation && (
                <p className="text-sm text-red-600">{errors.pickupLocation.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="deliveryLocation">Delivery Location</Label>
              <Input
                id="deliveryLocation"
                {...register("deliveryLocation", { required: "Delivery location is required" })}
                placeholder="Phoenix, AZ"
              />
              {errors.deliveryLocation && (
                <p className="text-sm text-red-600">{errors.deliveryLocation.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pickupDate">Pickup Date</Label>
              <Input
                id="pickupDate"
                type="datetime-local"
                {...register("pickupDate", { required: "Pickup date is required" })}
              />
              {errors.pickupDate && (
                <p className="text-sm text-red-600">{errors.pickupDate.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="deliveryDate">Delivery Date</Label>
              <Input
                id="deliveryDate"
                type="datetime-local"
                {...register("deliveryDate", { required: "Delivery date is required" })}
              />
              {errors.deliveryDate && (
                <p className="text-sm text-red-600">{errors.deliveryDate.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="weight">Weight (lbs)</Label>
              <Input
                id="weight"
                type="number"
                {...register("weight", { required: "Weight is required" })}
                placeholder="45000"
              />
              {errors.weight && (
                <p className="text-sm text-red-600">{errors.weight.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select onValueChange={(value) => setValue("priority", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="commodity">Commodity</Label>
            <Input
              id="commodity"
              {...register("commodity", { required: "Commodity is required" })}
              placeholder="Electronics, Food, etc."
            />
            {errors.commodity && (
              <p className="text-sm text-red-600">{errors.commodity.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="specialInstructions">Special Instructions</Label>
            <Textarea
              id="specialInstructions"
              {...register("specialInstructions")}
              placeholder="Any special handling requirements..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Create Load
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewLoadForm;
