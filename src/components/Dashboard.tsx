import React from "react";

import {
  TrendingUp,
  Users,
  Home,
  Settings,
  Grid3X3,
} from "lucide-react";

// Dashboard Stats Component
function StatsCard({
  title,
  value,
  trend,
  color,
}: {
  title: string;
  value: number;
  trend?: string;
  color: string;
}) {
  return (
    <div className="relative overflow-hidden bg-card border border-border rounded-lg shadow-sm">
      <div className="p-4 pb-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          {title}
        </h3>
      </div>
      <div className="px-4 pb-4">
        <div className="text-3xl font-bold">{value}</div>
        {trend && (
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm text-green-500">
              {trend}
            </span>
          </div>
        )}
      </div>
      <div
        className={`absolute top-0 right-0 w-1 h-full ${color}`}
      />
    </div>
  );
}

// Navigation Item Component
function NavItem({
  icon: Icon,
  label,
  isActive = false,
  onClick,
}: {
  icon: any;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
        isActive
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-accent"
      }`}
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{label}</span>
    </div>
  );
}

// Sidebar Component
function Sidebar({
  onNavigate,
}: {
  onNavigate?: (view: string) => void;
}) {
  return (
    <div className="w-64 bg-card border-r border-border h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">
          Tenanto System
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Property Management
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavItem
          icon={Grid3X3}
          label="Dashboard"
          isActive
          onClick={() => onNavigate?.("dashboard")}
        />
        <NavItem
          icon={Home}
          label="Units"
          onClick={() => onNavigate?.("units")}
        />
        <NavItem
          icon={Users}
          label="Tenants"
          onClick={() => onNavigate?.("tenants")}
        />
        <NavItem
          icon={Settings}
          label="Settings"
          onClick={() => onNavigate?.("settings")}
        />
      </nav>
    </div>
  );
}

// Upcoming Payments Table
function UpcomingPayments() {
  const payments = [
    {
      name: "John Mtwave",
      date: "Wed 22/7/2025",
      status: "pending",
    },
    {
      name: "Mr Mushi",
      date: "Frid 24/7/2025",
      status: "pending",
    },
    {
      name: "John Mtwave",
      date: "Wed 22/7/2025",
      status: "pending",
    },
    {
      name: "John Mtwave",
      date: "Wed 22/7/2025",
      status: "pending",
    },
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Upcoming Payments
        </h3>
        <select className="px-3 py-1 border border-border rounded-md bg-background text-sm">
          <option value="this-week">This week</option>
          <option value="next-week">Next week</option>
          <option value="this-month">This month</option>
        </select>
      </div>
      <div className="p-4">
        <div className="space-y-1">
          <div className="grid grid-cols-2 gap-4 py-3 border-b font-medium text-sm text-muted-foreground">
            <div>Tenant Name</div>
            <div>Date</div>
          </div>
          {payments.map((payment, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-4 py-3 border-b last:border-0 hover:bg-accent/50 transition-colors"
            >
              <div className="font-medium">{payment.name}</div>
              <div className="text-sm text-muted-foreground">
                {payment.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Dashboard Component
export function Dashboard({
  onNavigate,
}: {
  onNavigate?: (view: string) => void;
}) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar onNavigate={onNavigate} />

      <main className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Dashboard Overview
            </h2>
            <p className="text-muted-foreground">
              Monitor your property management metrics
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
              title="Paid"
              value={12}
              trend="+2.5%"
              color="bg-green-500"
            />
            <StatsCard
              title="Overdue"
              value={12}
              color="bg-red-500"
            />
            <StatsCard
              title="Grace Period"
              value={12}
              color="bg-yellow-500"
            />
          </div>

          {/* Rent Collected Card */}
          <div className="bg-card border border-border rounded-lg shadow-sm">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    Rent Collected
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Total revenue this period
                  </p>
                </div>
                <div className="flex gap-1">
                  <button className="px-3 py-1 text-sm rounded-md hover:bg-accent transition-colors">
                    Today
                  </button>
                  <button className="px-3 py-1 text-sm rounded-md hover:bg-accent transition-colors">
                    This week
                  </button>
                  <button className="px-3 py-1 text-sm rounded-md bg-primary text-primary-foreground">
                    This Month
                  </button>
                  <button className="px-3 py-1 text-sm rounded-md hover:bg-accent transition-colors">
                    This Year
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">
                  11,000,000
                </span>
                <span className="px-2 py-1 bg-secondary text-secondary-foreground text-sm rounded-md text-green-600">
                  +15.2%
                </span>
              </div>

              {/* Chart placeholder */}
              <div className="mt-6 h-48 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Revenue Chart
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Chart visualization will go here
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UpcomingPayments />

            {/* IoT Devices Preview Card */}
            <div className="bg-card border border-border rounded-lg shadow-sm">
              <div className="p-4 border-b border-border">
                <h3 className="text-lg font-semibold">
                  IoT Device Management
                </h3>
                <p className="text-sm text-muted-foreground">
                  Control devices in tenant units
                </p>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">
                        Unit 101 - Smart Thermostat
                      </p>
                      <p className="text-sm text-muted-foreground">
                        John Mtwave
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 border border-green-200 text-green-600 text-sm rounded-md">
                        Online
                      </span>
                      <button className="px-3 py-1 border border-border text-sm rounded-md hover:bg-accent transition-colors">
                        Control
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">
                        Unit 102 - Smart Lock
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Mr Mushi
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 border border-red-200 text-red-600 text-sm rounded-md">
                        Offline
                      </span>
                      <button className="px-3 py-1 border border-border text-sm rounded-md hover:bg-accent transition-colors">
                        Control
                      </button>
                    </div>
                  </div>

                  <button
                    className="w-full py-2 border border-border text-sm rounded-md hover:bg-accent transition-colors"
                    onClick={() => onNavigate?.("units")}
                  >
                    View All Devices
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardWrapper() {
  return (
    <div className="p-4 md:p-8">
      <Dashboard />
    </div>
  );
}
