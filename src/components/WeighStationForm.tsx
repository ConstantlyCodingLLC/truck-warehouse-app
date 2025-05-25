
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Weight, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Upload,
  MapPin,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WeighStationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    stationLocation: "",
    inspectionType: "",
    grossWeight: "",
    axleWeights: {
      steer: "",
      drive: "",
      trailer: ""
    },
    violations: [] as string[],
    notes: "",
    inspectorName: "",
    certificateNumber: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasViolations, setHasViolations] = useState(false);

  const commonViolations = [
    "Overweight - Gross Vehicle Weight",
    "Overweight - Axle Weight Limit",
    "Hours of Service Violation",
    "Vehicle Maintenance Issue",
    "Documentation Missing",
    "Hazmat Violation",
    "Driver License Issue",
    "Vehicle Registration Issue"
  ];

  const handleViolationChange = (violation: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        violations: [...prev.violations, violation]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        violations: prev.violations.filter(v => v !== violation)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Weigh Station Report Submitted",
      description: "Your inspection report has been successfully submitted to dispatch.",
    });

    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      stationLocation: "",
      inspectionType: "",
      grossWeight: "",
      axleWeights: { steer: "", drive: "", trailer: "" },
      violations: [],
      notes: "",
      inspectorName: "",
      certificateNumber: ""
    });
    setHasViolations(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Weight className="h-5 w-5 mr-2 text-orange-600" />
            Weigh Station Inspection Form
          </CardTitle>
          <CardDescription>
            Complete this form during or after weigh station inspection. All fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="station">Weigh Station Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="station"
                    placeholder="Enter station location"
                    value={formData.stationLocation}
                    onChange={(e) => setFormData(prev => ({ ...prev, stationLocation: e.target.value }))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="inspection-type">Inspection Type *</Label>
                <Select 
                  value={formData.inspectionType}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, inspectionType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select inspection type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="routine">Routine Weight Check</SelectItem>
                    <SelectItem value="level1">Level 1 Inspection</SelectItem>
                    <SelectItem value="level2">Level 2 Inspection</SelectItem>
                    <SelectItem value="level3">Level 3 Inspection</SelectItem>
                    <SelectItem value="random">Random Inspection</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Weight Measurements</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gross-weight">Gross Weight (lbs) *</Label>
                  <Input
                    id="gross-weight"
                    type="number"
                    placeholder="80,000"
                    value={formData.grossWeight}
                    onChange={(e) => setFormData(prev => ({ ...prev, grossWeight: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="steer-axle">Steer Axle (lbs)</Label>
                  <Input
                    id="steer-axle"
                    type="number"
                    placeholder="12,000"
                    value={formData.axleWeights.steer}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      axleWeights: { ...prev.axleWeights, steer: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="drive-axle">Drive Axle (lbs)</Label>
                  <Input
                    id="drive-axle"
                    type="number"
                    placeholder="34,000"
                    value={formData.axleWeights.drive}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      axleWeights: { ...prev.axleWeights, drive: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trailer-axle">Trailer Axle (lbs)</Label>
                  <Input
                    id="trailer-axle"
                    type="number"
                    placeholder="34,000"
                    value={formData.axleWeights.trailer}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      axleWeights: { ...prev.axleWeights, trailer: e.target.value }
                    }))}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has-violations"
                  checked={hasViolations}
                  onCheckedChange={(checked) => {
                    setHasViolations(checked as boolean);
                    if (!checked) {
                      setFormData(prev => ({ ...prev, violations: [] }));
                    }
                  }}
                />
                <Label htmlFor="has-violations" className="text-sm font-medium">
                  Were there any violations or issues found?
                </Label>
              </div>

              {hasViolations && (
                <div className="border rounded-lg p-4 bg-red-50">
                  <h4 className="font-medium text-red-800 mb-3 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Select all violations that apply:
                  </h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {commonViolations.map((violation) => (
                      <div key={violation} className="flex items-center space-x-2">
                        <Checkbox
                          id={violation}
                          checked={formData.violations.includes(violation)}
                          onCheckedChange={(checked) => handleViolationChange(violation, checked as boolean)}
                        />
                        <Label htmlFor={violation} className="text-sm text-red-700">
                          {violation}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="inspector">Inspector Name</Label>
                <Input
                  id="inspector"
                  placeholder="Inspector's name"
                  value={formData.inspectorName}
                  onChange={(e) => setFormData(prev => ({ ...prev, inspectorName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="certificate">Certificate/Report Number</Label>
                <Input
                  id="certificate"
                  placeholder="Certificate number"
                  value={formData.certificateNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, certificateNumber: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional notes about the inspection..."
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={4}
              />
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">Upload inspection documents or photos</p>
              <Button variant="outline" type="button">
                Choose Files
              </Button>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button">
                Save as Draft
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Submit Report
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            Recent Weigh Station Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: "Today 10:30 AM", location: "I-40 Weigh Station, Flagstaff, AZ", status: "Passed", violations: 0 },
              { date: "Yesterday 2:15 PM", location: "I-25 Weigh Station, Santa Fe, NM", status: "Passed", violations: 0 },
              { date: "2 days ago 9:45 AM", location: "I-70 Weigh Station, Denver, CO", status: "Warning", violations: 1 }
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-sm">{report.location}</p>
                  <p className="text-xs text-gray-600">{report.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={report.status === "Passed" ? "default" : "secondary"}>
                    {report.status}
                  </Badge>
                  {report.violations > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {report.violations} Violation{report.violations > 1 ? 's' : ''}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeighStationForm;
