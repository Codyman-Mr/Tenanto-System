import React, { useEffect, useState } from "react";
import { Search, Power, Zap, ZapOff, MoreHorizontal, Settings } from "lucide-react";

// Unit Type
type Unit = {
  id: string;
  tenant: string;
  status: string;
  grace: string;
  power: boolean;
  rent?: number;
  phone?: string;
  startDate?: string;
  leaseDuration?: string;
};

// Stats Card Component
function StatsCard({ title, value, color }: { title: string; value: number; color: string }) {
  return (
    <div className="relative overflow-hidden bg-card border border-border rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
          </div>
        </div>
      </div>
      <div className={`absolute top-0 right-0 w-1 h-full ${color}`} />
    </div>
  );
}

// Status Badge Component
function StatusBadge({ status }: { status?: string }) {
  const getStatusColor = (status?: string) => {
    const safeStatus = status?.toLowerCase() || "";
    switch (safeStatus) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";
      case "vacant":
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";
    }
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
        status
      )}`}
    >
      {status || "Unknown"}
    </span>
  );
}

// Power Control Component
function PowerControl({ isOn, unitId, togglePower }: { isOn: boolean; unitId: string; togglePower: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
          isOn
            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
            : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
        }`}
      >
        {isOn ? <Zap className="h-3 w-3" /> : <ZapOff className="h-3 w-3" />}
        {isOn ? "ON" : "OFF"}
      </div>
      <button
        onClick={togglePower}
        className="p-1 hover:bg-accent rounded-md transition-colors"
        title={`Turn ${isOn ? "off" : "on"} power for ${unitId}`}
      >
        <Power className="h-4 w-4 text-muted-foreground" />
      </button>
    </div>
  );
}

// Assign Tenant Form Component
function AssignTenantForm({
  unitId,
  onClose,
  onAssign,
}: {
  unitId: string;
  onClose: () => void;
  onAssign: (tenantData: {
    tenant: string;
    mobile: string;
    rent: number;
    startDate: string;
    leaseDuration: string;
    graceDuration: string;
  }) => void;
}) {
  const [tenant, setTenant] = useState("");
  const [mobile, setMobile] = useState("");
  const [rent, setRent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [leaseDuration, setLeaseDuration] = useState("1 month");
  const [graceDuration, setGraceDuration] = useState("7 days");

  useEffect(() => {
    const savedData = localStorage.getItem(`tenantData-${unitId}`);
    if (savedData) {
      const data = JSON.parse(savedData);
      setTenant(data.tenant || "");
      setMobile(data.mobile || "");
      setRent(data.rent || "");
      setStartDate(data.startDate || "");
      setLeaseDuration(data.leaseDuration || "1 month");
      setGraceDuration(data.graceDuration || "7 days");
    }
  }, [unitId]);

  useEffect(() => {
    const data = { tenant, mobile, rent, startDate, leaseDuration, graceDuration };
    localStorage.setItem(`tenantData-${unitId}`, JSON.stringify(data));
  }, [tenant, mobile, rent, startDate, leaseDuration, graceDuration, unitId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenant || !mobile || !rent || !startDate) {
      alert("Please fill all fields");
      return;
    }
    onAssign({
      tenant,
      mobile,
      rent: Number(rent),
      startDate,
      leaseDuration,
      graceDuration,
    });
    localStorage.removeItem(`tenantData-${unitId}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form className="bg-white rounded-lg p-4 w-96 space-y-2 shadow-lg" onSubmit={handleSubmit}>
        <h3 className="text-lg font-bold mb-2">Assign Tenant to {unitId}</h3>

        <input
          type="text"
          value={tenant}
          onChange={(e) => setTenant(e.target.value)}
          placeholder="Tenant name"
          className="w-full border border-border rounded px-3 py-2 text-sm"
          required
        />
        <input
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Tenant mobile"
          className="w-full border border-border rounded px-3 py-2 text-sm"
          required
        />
        <input
          type="number"
          min={0}
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          placeholder="Rent amount"
          className="w-full border border-border rounded px-3 py-2 text-sm"
          required
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border border-border rounded px-3 py-2 text-sm"
          required
        />
        <select
          value={leaseDuration}
          onChange={(e) => setLeaseDuration(e.target.value)}
          className="w-full border border-border rounded px-3 py-2 text-sm"
        >
          <option>1 month</option>
          <option>2 months</option>
        </select>
        <select
          value={graceDuration}
          onChange={(e) => setGraceDuration(e.target.value)}
          className="w-full border border-border rounded px-3 py-2 text-sm"
        >
          <option>7 days</option>
          <option>14 days</option>
        </select>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => onClose()}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
          >
            Assign Tenant
          </button>
        </div>
      </form>
    </div>
  );
}

// Search Component
function SearchBar() {
  return (
    <div className="relative max-w-md mb-4">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search tenant name..."
        className="pl-10 pr-4 py-2 w-full border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
      />
    </div>
  );
}

// Units Table Component
function UnitsTable({
  units,
  setUnits,
  onAssignClick,
}: {
  units: Unit[];
  setUnits: React.Dispatch<React.SetStateAction<Unit[]>>;
  onAssignClick: (unitId: string) => void;
}) {
  const togglePower = (unitId: string) => {
    const updatedUnits = units.map((unit) =>
      unit.id === unitId ? { ...unit, power: !unit.power } : unit
    );
    setUnits(updatedUnits);
    localStorage.setItem("units", JSON.stringify(updatedUnits));
  };

  const deleteUnit = (unitId: string) => {
    if (window.confirm(`Are you sure you want to delete ${unitId}?`)) {
      const updatedUnits = units.filter((u) => u.id !== unitId);
      setUnits(updatedUnits);
      localStorage.setItem("units", JSON.stringify(updatedUnits));
    }
  };

  const totalUnits = units.length;
  const occupiedUnits = units.filter((u) => (u.tenant?.toLowerCase() || "") !== "unknown").length;
  const emptyUnits = totalUnits - occupiedUnits;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatsCard title="No of Units" value={totalUnits} color="bg-blue-500" />
        <StatsCard title="Occupied" value={occupiedUnits} color="bg-green-500" />
        <StatsCard title="Empty" value={emptyUnits} color="bg-yellow-500" />
      </div>

      <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Unit</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Tenant Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Grace</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Power</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Mobile</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Rent</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {units.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-muted-foreground italic">
                    No units found.
                  </td>
                </tr>
              ) : (
                units.map((unit) => (
                  <tr key={unit.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">{unit.id}</td>
                    <td className="px-6 py-4">
                      {unit.tenant || "Unknown"}
                    </td>
                    <td className="px-6 py-4"><StatusBadge status={unit.status} /></td>
                    <td className="px-6 py-4">{unit.grace}</td>
                    <td className="px-6 py-4">
                      <PowerControl
                        isOn={unit.power}
                        unitId={unit.id}
                        togglePower={() => togglePower(unit.id)}
                      />
                    </td>
                    <td className="px-6 py-4">{unit.phone || "-"}</td>
                    <td className="px-6 py-4">{unit.rent !== undefined ? `TSh ${unit.rent}` : "-"}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => onAssignClick(unit.id)}
                        className="p-2 bg-blue-100 hover:bg-blue-200 rounded-md transition-colors"
                        title="Assign Tenant"
                      >
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => deleteUnit(unit.id)}
                        className="p-2 bg-red-100 hover:bg-red-200 rounded-md transition-colors"
                        title="Delete Unit"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// Main Units Component (default export)
const Units = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<string>("");

  useEffect(() => {
    const storedUnits = localStorage.getItem("units");
    if (storedUnits) {
      try {
        setUnits(JSON.parse(storedUnits));
      } catch {
        setUnits([]);
      }
    } else {
      const defaultUnits: Unit[] = Array.from({ length: 12 }, (_, i) => ({
        id: `G${i + 1}`,
        tenant: "Unknown",
        status: "pending",
        grace: "7 days",
        power: false,
        phone: "-",
        rent: undefined,
      }));
      setUnits(defaultUnits);
      localStorage.setItem("units", JSON.stringify(defaultUnits));
    }
  }, []);

  const turnOnAll = () => {
    const updated = units.map((u) => ({ ...u, power: true }));
    setUnits(updated);
    localStorage.setItem("units", JSON.stringify(updated));
  };

  const turnOffAll = () => {
    const updated = units.map((u) => ({ ...u, power: false }));
    setUnits(updated);
    localStorage.setItem("units", JSON.stringify(updated));
  };

  const openAdvancedSettings = () => alert("Advanced settings clicked!");

  const handleAssignClick = (unitId: string) => {
    setSelectedUnit(unitId);
    setAssignModalOpen(true);
  };

  const handleAssignTenant = (tenantData: {
    tenant: string;
    mobile: string;
    rent: number;
    startDate: string;
    leaseDuration: string;
    graceDuration: string;
  }) => {
    const updated = units.map((u) =>
      u.id === selectedUnit
        ? {
            ...u,
            tenant: tenantData.tenant,
            status: "paid",
            grace: tenantData.graceDuration,
            power: true,
            rent: tenantData.rent,
            phone: tenantData.mobile,
            startDate: tenantData.startDate,
            leaseDuration: tenantData.leaseDuration,
          }
        : u
    );
    setUnits(updated);
    localStorage.setItem("units", JSON.stringify(updated));
  };

  return (
    <main className="p-6 space-y-6 bg-background min-h-screen">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Units Management</h2>
        <p className="text-muted-foreground">Monitor and control your property units</p>
      </div>

      <div className="flex justify-between items-center">
        <SearchBar />
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          Add Unit
        </button>
      </div>

      <UnitsTable units={units} setUnits={setUnits} onAssignClick={handleAssignClick} />

      <div className="bg-card border border-border rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold">Quick IoT Controls</h3>
          <p className="text-sm text-muted-foreground">Bulk control for all units</p>
        </div>
        <div className="p-4 flex gap-3">
          <button
            onClick={turnOnAll}
            className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors"
          >
            <Zap className="h-4 w-4" />
            Turn ON all units
          </button>
          <button
            onClick={turnOffAll}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
          >
            <ZapOff className="h-4 w-4" />
            Turn OFF all units
          </button>
          <button
            onClick={openAdvancedSettings}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-foreground rounded-lg hover:bg-accent/90 transition-colors"
          >
            <Settings className="h-4 w-4" />
            Advanced Settings
          </button>
        </div>
      </div>

      {assignModalOpen && (
        <AssignTenantForm
          unitId={selectedUnit}
          onClose={() => setAssignModalOpen(false)}
          onAssign={handleAssignTenant}
        />
      )}
    </main>
  );
};

export default Units;

