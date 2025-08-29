import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

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
  device?: {
    name: string;
    type: string;
    online: boolean;
  };
};

// Stats Card Component
function StatsCard({
  title,
  value,
  trend,
  color,
}: {
  title: string;
  value: number | string;
  trend?: string;
  color: string;
}) {
  return (
    <div className="relative overflow-hidden bg-card border border-border rounded-lg shadow-sm">
      <div className="p-4 pb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      </div>
      <div className="px-4 pb-4">
        <div className="text-3xl font-bold">{value}</div>
        {trend && (
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm text-green-500">{trend}</span>
          </div>
        )}
      </div>
      <div className={`absolute top-0 right-0 w-1 h-full ${color}`} />
    </div>
  );
}

// Upcoming Payments Component
function UpcomingPayments({ units }: { units: Unit[] }) {
  const payments = units
    .filter((u) => u.status?.toLowerCase() === "paid" && Number(u.grace) > 0)
    .map((u) => ({
      name: u.tenant,
      date: u.startDate || "-",
    }));

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="text-lg font-semibold">Upcoming Payments</h3>
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
          {payments.length === 0 ? (
            <p className="text-muted-foreground italic py-3">No upcoming payments</p>
          ) : (
            payments.map((payment, index) => (
              <div
                key={index}
                className="grid grid-cols-2 gap-4 py-3 border-b last:border-0 hover:bg-accent/50 transition-colors"
              >
                <div className="font-medium">{payment.name}</div>
                <div className="text-sm text-muted-foreground">{payment.date}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// IoT Device Management Component
function IoTDeviceManagement({ units }: { units: Unit[] }) {
  const devices = units
    .filter((u) => u.device)
    .map((u) => ({
      unit: u.id,
      tenant: u.tenant,
      name: u.device?.name,
      type: u.device?.type,
      online: u.device?.online,
    }));

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm mt-6">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold">IoT Device Management</h3>
        <p className="text-sm text-muted-foreground mt-1">Control devices in tenant units</p>
      </div>
      <div className="p-4 space-y-3">
        {devices.length === 0 ? (
          <p className="text-muted-foreground italic">No devices available</p>
        ) : (
          devices.map((d, idx) => (
            <div
              key={idx}
              className="grid grid-cols-4 gap-4 items-center p-3 border-b last:border-0 rounded-md hover:bg-accent/50 transition-colors"
            >
              <div className="font-medium">{d.unit} - {d.name}</div>
              <div>{d.tenant}</div>
              <div className={d.online ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                {d.online ? "Online" : "Offline"}
              </div>
              <button className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/80 transition-colors">
                Control
              </button>
            </div>
          ))
        )}
      </div>
      {devices.length > 0 && (
        <div className="p-4 text-right">
          <button className="text-sm text-primary underline hover:text-primary/80 transition-colors">
            View All Devices
          </button>
        </div>
      )}
    </div>
  );
}

// Dashboard Content (Main)
export default function DashboardContent() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const storedUnits = localStorage.getItem("units");
    if (storedUnits) {
      try {
        const parsedUnits: Unit[] = JSON.parse(storedUnits);
        setUnits(parsedUnits);

        const revenue = parsedUnits.reduce((sum, u) => sum + (u.rent || 0), 0);
        setTotalRevenue(revenue);
      } catch {
        setUnits([]);
      }
    }
  }, []);

  const paidCount = units.filter((u) => u.status?.toLowerCase() === "paid").length;
  const overdueCount = units.filter((u) => u.status?.toLowerCase() === "overdue").length;
  const graceCount = units.filter((u) => Number(u.grace) > 0).length;

  return (
    <main className="flex-1 overflow-auto p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
        <p className="text-muted-foreground">Monitor your property management metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Paid" value={paidCount} trend={paidCount > 0 ? "+2.5%" : undefined} color="bg-green-500" />
        <StatsCard title="Overdue" value={overdueCount} color="bg-red-500" />
        <StatsCard title="Grace Period" value={graceCount} color="bg-yellow-500" />
      </div>

      <div className="bg-card border border-border rounded-lg shadow-sm">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Rent Collected</h3>
            <p className="text-sm text-muted-foreground mt-1">Total revenue this period</p>
          </div>
          <div className="flex gap-1">
            <button className="px-3 py-1 text-sm rounded-md hover:bg-accent transition-colors">Today</button>
            <button className="px-3 py-1 text-sm rounded-md hover:bg-accent transition-colors">This week</button>
            <button className="px-3 py-1 text-sm rounded-md bg-primary text-primary-foreground">This Month</button>
            <button className="px-3 py-1 text-sm rounded-md hover:bg-accent transition-colors">This Year</button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold">TSh {totalRevenue.toLocaleString()}</span>
            <span className="px-2 py-1 bg-secondary text-secondary-foreground text-sm rounded-md text-green-600">+15.2%</span>
          </div>

          <div className="mt-6 h-48 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Revenue Chart</p>
              <p className="text-xs text-muted-foreground mt-1">Chart visualization will go here</p>
            </div>
          </div>
        </div>
      </div>

      <UpcomingPayments units={units} />
      <IoTDeviceManagement units={units} />
    </main>
  );
}
