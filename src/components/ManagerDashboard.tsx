
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoadManagement from "@/components/LoadManagement";
import FleetStatus from "@/components/FleetStatus";
import WarehouseInventory from "@/components/WarehouseInventory";
import AuditManagement from "@/components/AuditManagement";
import ManagerHeader from "@/components/ManagerHeader";
import ManagerStats from "@/components/ManagerStats";
import OverviewTab from "@/components/OverviewTab";
import ComplianceTab from "@/components/ComplianceTab";

interface ManagerDashboardProps {
  onLogout: () => void;
}

const ManagerDashboard = ({ onLogout }: ManagerDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      <ManagerHeader onLogout={onLogout} />

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
            <LoadManagement />
          </TabsContent>

          <TabsContent value="fleet">
            <FleetStatus />
          </TabsContent>

          <TabsContent value="warehouse">
            <WarehouseInventory />
          </TabsContent>

          <TabsContent value="audit">
            <AuditManagement />
          </TabsContent>

          <TabsContent value="compliance">
            <ComplianceTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ManagerDashboard;
