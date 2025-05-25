
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoadManagement from "@/components/LoadManagement";
import FleetStatus from "@/components/FleetStatus";
import WarehouseInventory from "@/components/WarehouseInventory";
import AuditManagement from "@/components/AuditManagement";
import ManagerHeader from "@/components/ManagerHeader";
import ManagerStats from "@/components/ManagerStats";
import OverviewTab from "@/components/OverviewTab";
import ComplianceTab from "@/components/ComplianceTab";
import NewLoadForm from "@/components/forms/NewLoadForm";
import NewInventoryItemForm from "@/components/forms/NewInventoryItemForm";
import NewAuditForm from "@/components/forms/NewAuditForm";
import { useToast } from "@/hooks/use-toast";

interface ManagerDashboardProps {
  onLogout: () => void;
}

const ManagerDashboard = ({ onLogout }: ManagerDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showNewLoadForm, setShowNewLoadForm] = useState(false);
  const [showNewInventoryForm, setShowNewInventoryForm] = useState(false);
  const [showNewAuditForm, setShowNewAuditForm] = useState(false);
  const { toast } = useToast();

  const handleNewLoad = () => {
    setShowNewLoadForm(true);
    setActiveTab("loads");
  };

  const handleNewInventoryItem = () => {
    setShowNewInventoryForm(true);
    setActiveTab("warehouse");
  };

  const handleNewAudit = () => {
    setShowNewAuditForm(true);
    setActiveTab("audit");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ManagerHeader onLogout={onLogout} onNewLoad={handleNewLoad} />

      <div className="container mx-auto px-4 py-8">
        <ManagerStats />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="loads">Load Management</TabsTrigger>
            <TabsTrigger value="fleet">Fleet Status</TabsTrigger>
            <TabsTrigger value="warehouse">Warehouse</TabsTrigger>
            <TabsTrigger value="audit">Audit</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="loads">
            <LoadManagement onNewLoad={handleNewLoad} />
          </TabsContent>

          <TabsContent value="fleet">
            <FleetStatus />
          </TabsContent>

          <TabsContent value="warehouse">
            <WarehouseInventory onNewItem={handleNewInventoryItem} />
          </TabsContent>

          <TabsContent value="audit">
            <AuditManagement onNewAudit={handleNewAudit} />
          </TabsContent>

          <TabsContent value="compliance">
            <ComplianceTab />
          </TabsContent>
        </Tabs>
      </div>

      {/* Form Modals */}
      <Dialog open={showNewLoadForm} onOpenChange={setShowNewLoadForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <NewLoadForm onClose={() => setShowNewLoadForm(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={showNewInventoryForm} onOpenChange={setShowNewInventoryForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <NewInventoryItemForm onClose={() => setShowNewInventoryForm(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={showNewAuditForm} onOpenChange={setShowNewAuditForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <NewAuditForm onClose={() => setShowNewAuditForm(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManagerDashboard;
