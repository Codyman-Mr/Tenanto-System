import React from "react";

import { TrendingUp, Users, Home, Settings, Grid3X3, Search, Power, MoreHorizontal, Zap, ZapOff } from "lucide-react";
///import svgPaths from "../imports/svg-qcnkfunr5a";

// Navigation Item Component (shared with Dashboard)
function NavItem({ icon: Icon, label, isActive = false }: { icon: any; label: string; isActive?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
      isActive 
        ? 'bg-primary text-primary-foreground shadow-sm' 
        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
    }`}>
      <Icon className="h-5 w-5" />
      <span className="font-medium">{label}</span>
    </div>
  );
}

// Sidebar Component (shared with Dashboard)
function Sidebar() {
  return (
    <div className="w-64 bg-card border-r border-border h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">Tenanto System</h1>
        <p className="text-sm text-muted-foreground mt-1">Property Management</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <NavItem icon={Grid3X3} label="Dashboard" />
        <NavItem icon={Home} label="Units" isActive />
        <NavItem icon={Users} label="Tenants" />
        <NavItem icon={Settings} label="Settings" />
      </nav>
    </div>
  );
}

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
function StatusBadge({ status }: { status: string }) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
      case 'vacant':
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
      {status}
    </span>
  );
}

// Power Control Component
function PowerControl({ isOn, unitId }: { isOn: boolean; unitId: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
        isOn 
          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      }`}>
        {isOn ? <Zap className="h-3 w-3" /> : <ZapOff className="h-3 w-3" />}
        {isOn ? 'ON' : 'OFF'}
      </div>
      <button 
        className="p-1 hover:bg-accent rounded-md transition-colors"
        title={`Turn ${isOn ? 'off' : 'on'} power for ${unitId}`}
      >
        <Power className="h-4 w-4 text-muted-foreground" />
      </button>
    </div>
  );
}

// Units Table Component
function UnitsTable() {
  const units = [
    { id: 'G1', tenant: 'Tenant Name', status: 'Overdue', grace: '3d', power: true },
    { id: 'G2', tenant: 'Jane Smith', status: 'Paid', grace: '-', power: true },
    { id: 'G3', tenant: 'Vacant', status: 'Vacant', grace: '-', power: false },
    { id: 'G4', tenant: 'Ahmed Said', status: 'Grace Period', grace: '1d', power: true },
  ];

  return (
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
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {units.map((unit, index) => (
              <tr key={index} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-medium">{unit.id}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={unit.tenant === 'Vacant' ? 'text-muted-foreground italic' : ''}>{unit.tenant}</span>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={unit.status} />
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">{unit.grace}</span>
                </td>
                <td className="px-6 py-4">
                  <PowerControl isOn={unit.power} unitId={unit.id} />
                </td>
                <td className="px-6 py-4">
                  <button className="p-2 hover:bg-accent rounded-md transition-colors">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Search Component
function SearchBar() {
  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search tenant name..."
        className="pl-10 pr-4 py-2 w-full border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
      />
    </div>
  );
}

// Main Units Component
export function Units() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">Units Management</h2>
            <p className="text-muted-foreground">Monitor and control your property units</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard title="No of Units" value={12} color="bg-blue-500" />
            <StatsCard title="Occupied" value={12} color="bg-green-500" />
            <StatsCard title="Empty" value={0} color="bg-yellow-500" />
          </div>

          {/* Search Bar */}
          <div className="flex justify-between items-center">
            <SearchBar />
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Add Unit
            </button>
          </div>

          {/* Units Table */}
          <UnitsTable />

          {/* IoT Control Panel */}
          <div className="bg-card border border-border rounded-lg shadow-sm">
            <div className="p-4 border-b border-border">
              <h3 className="text-lg font-semibold">Quick IoT Controls</h3>
              <p className="text-sm text-muted-foreground">Bulk control for all units</p>
            </div>
            <div className="p-4">
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors">
                  <Zap className="h-4 w-4" />
                  Turn On All
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors">
                  <ZapOff className="h-4 w-4" />
                  Turn Off All
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                  <Settings className="h-4 w-4" />
                  Advanced Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function UnitsWrapper() {
  return (
    <div className="p-4 md:p-8 overflow-x-auto">
      <Units />
    </div>
  );
}
