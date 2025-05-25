
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ClipboardCheck, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewAuditFormData {
  auditType: string;
  warehouse: string;
  scheduledDate: string;
  assignedAuditor: string;
  scope: string;
  priority: string;
  description: string;
  categories: string[];
}

interface NewAuditFormProps {
  onClose: () => void;
  onSubmit?: (data: NewAuditFormData) => void;
}

const NewAuditForm = ({ onClose, onSubmit }: NewAuditFormProps) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<NewAuditFormData>();
  const { toast } = useToast();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const auditTypes = [
    "Inventory Count",
    "Quality Inspection",
    "Safety Compliance",
    "Security Review",
    "Process Audit",
    "Financial Audit"
  ];

  const warehouses = [
    { id: "WH-001", name: "Main Distribution Center" },
    { id: "WH-002", name: "East Coast Hub" },
    { id: "WH-003", name: "Regional Depot" }
  ];

  const auditors = [
    "John Smith",
    "Sarah Johnson",
    "Mike Wilson",
    "Lisa Davis"
  ];

  const categories = [
    "Electronics",
    "Automotive",
    "Healthcare",
    "Industrial",
    "Consumer Goods",
    "Food & Beverage"
  ];

  const handleCategoryChange = (category: string, checked: boolean) => {
    let updatedCategories;
    if (checked) {
      updatedCategories = [...selectedCategories, category];
    } else {
      updatedCategories = selectedCategories.filter(c => c !== category);
    }
    setSelectedCategories(updatedCategories);
    setValue("categories", updatedCategories);
  };

  const handleFormSubmit = (data: NewAuditFormData) => {
    console.log("New audit data:", data);
    
    if (onSubmit) {
      onSubmit(data);
    }
    
    toast({
      title: "Audit Scheduled",
      description: `${data.auditType} audit has been scheduled for ${data.scheduledDate}.`,
    });
    
    onClose();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ClipboardCheck className="h-5 w-5 mr-2 text-blue-600" />
          Schedule New Audit
        </CardTitle>
        <CardDescription>Set up a new audit for warehouse operations</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="auditType">Audit Type</Label>
              <Select onValueChange={(value) => setValue("auditType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select audit type" />
                </SelectTrigger>
                <SelectContent>
                  {auditTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="scheduledDate">Scheduled Date & Time</Label>
              <Input
                id="scheduledDate"
                type="datetime-local"
                {...register("scheduledDate", { required: "Scheduled date is required" })}
              />
              {errors.scheduledDate && (
                <p className="text-sm text-red-600">{errors.scheduledDate.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="assignedAuditor">Assigned Auditor</Label>
              <Select onValueChange={(value) => setValue("assignedAuditor", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select auditor" />
                </SelectTrigger>
                <SelectContent>
                  {auditors.map((auditor) => (
                    <SelectItem key={auditor} value={auditor}>
                      {auditor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="scope">Audit Scope</Label>
              <Select onValueChange={(value) => setValue("scope", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select scope" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Warehouse</SelectItem>
                  <SelectItem value="section">Specific Section</SelectItem>
                  <SelectItem value="category">Product Category</SelectItem>
                  <SelectItem value="sample">Random Sample</SelectItem>
                </SelectContent>
              </Select>
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
            <Label>Categories to Audit</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                  />
                  <Label htmlFor={category} className="text-sm">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description & Notes</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Additional instructions or focus areas for the audit..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Schedule Audit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewAuditForm;
