import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";

interface Transaction {
  date: string;
  status: string;
  amount: string;
}

interface Tenant {
  name: string;
  phone: string;
  rent: string;
  startDate: string;
  rentPlan: string;
  gracePeriod: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  transactions: Transaction[];
  power: boolean;
}

export default function TenantDetails() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [newTx, setNewTx] = useState<Transaction>({ date: "", status: "Paid", amount: "" });

  useEffect(() => {
    const savedTenants: Tenant[] = JSON.parse(localStorage.getItem("tenants") || "[]");
    const tenantsWithDefaults: Tenant[] = savedTenants.map((t) => ({
      ...t,
      emergencyContact: t.emergencyContact || "Wife",
      emergencyPhone: t.emergencyPhone || "+255747822160",
      transactions: t.transactions || [],
      power: t.power ?? true,
    }));
    setTenants(tenantsWithDefaults);
  }, []);

  const handleDeleteTenant = (index: number) => {
    if (window.confirm("Are you sure you want to delete this tenant?")) {
      const updated = [...tenants];
      updated.splice(index, 1);
      setTenants(updated);
      localStorage.setItem("tenants", JSON.stringify(updated));
      alert("Tenant deleted successfully");
    }
  };

  const togglePower = (index: number) => {
  const updated = [...tenants];
  updated[index].power = !updated[index].power;
  setTenants(updated);
  localStorage.setItem("tenants", JSON.stringify(updated));
};


  const addTransaction = (index: number) => {
    if (!newTx.date || !newTx.amount) {
      alert("Please fill date and amount.");
      return;
    }
    const updated = [...tenants];
    updated[index].transactions.push({ ...newTx });
    setTenants(updated);
    localStorage.setItem("tenants", JSON.stringify(updated));
    setNewTx({ date: "", status: "Paid", amount: "" });
  };

  if (tenants.length === 0) return <p className="p-4">No tenants assigned yet.</p>;

  return (
    <div className="p-4 md:p-8 flex flex-col gap-6">
      {tenants.map((t, index) => (
        <Card key={index} className="p-6 w-full flex flex-col lg:flex-row gap-6">

          {/* Left: Profile */}
          <div className="w-full lg:w-1/3 flex flex-col items-center text-center border-r pr-4 gap-2">
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-2" />
            <h3 className="font-semibold text-lg">{t.name}</h3>
            <p className="text-gray-700">Mobile: {t.phone}</p>
            <p className="text-gray-700">Rent: TSh {t.rent}</p>
            <p className="text-gray-700">Emergency Contact: {t.emergencyContact}</p>
            <p className="text-gray-700">Mobile: {t.emergencyPhone}</p>
          </div>

          {/* Right: Power, Due Info, Transactions, Actions */}
          <div className="flex-1 flex flex-col gap-4">

            {/* Power & Due Info */}
            <div className="flex flex-col sm:flex-row justify-between items-center p-4 border rounded-md">
              <div className="flex items-center gap-2">
                <p className="font-medium">Power:</p>
                <Switch
  defaultChecked={t.power}
  onChange={() => togglePower(index)}
/>


              </div>
              <div className="text-right mt-2 sm:mt-0">
                <p>Due: {t.startDate}</p>
                <p>Grace: {t.gracePeriod} Day(s) left</p>
              </div>
            </div>

            {/* Transactions */}
            <div className="p-4 border rounded-md overflow-x-auto flex flex-col gap-2">
              <h4 className="font-semibold">Recent Transactions</h4>
              {t.transactions.length === 0 ? (
                <p className="text-gray-500">No transactions yet. Add below.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left">
                      <th>Date</th>
                      <th>Status</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.transactions.map((tx, idx) => (
                      <tr key={idx}>
                        <td>{tx.date}</td>
                        <td className={tx.status === "Paid" ? "text-green-600" : "text-red-600"}>
                          {tx.status}
                        </td>
                        <td>{tx.amount}</td>
                        <td>
                          <Button
                            size="sm"
                            onClick={() => {
                              const updated = [...tenants];
                              updated[index].transactions.splice(idx, 1);
                              setTenants(updated);
                              localStorage.setItem("tenants", JSON.stringify(updated));
                            }}
                          >
                            🗑
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Add Transaction */}
              <div className="flex gap-2 mt-2">
                <input
                  type="date"
                  className="border p-1 rounded w-1/3"
                  value={newTx.date}
                  onChange={(e) => setNewTx({ ...newTx, date: e.target.value })}
                />
                <select
                  className="border p-1 rounded w-1/3"
                  value={newTx.status}
                  onChange={(e) => setNewTx({ ...newTx, status: e.target.value })}
                >
                  <option value="Paid">Paid</option>
                  <option value="Overdue">Overdue</option>
                </select>
                <input
                  type="text"
                  className="border p-1 rounded w-1/3"
                  placeholder="Amount"
                  value={newTx.amount}
                  onChange={(e) => setNewTx({ ...newTx, amount: e.target.value })}
                />
              </div>
              <Button
                className="mt-2 bg-blue-600 text-white hover:bg-blue-700 w-full"
                onClick={() => addTransaction(index)}
              >
                Add Transaction
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-2 justify-end">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-1 text-sm">
                Send Reminder
              </Button>
              <Button
                className="bg-red-600 text-white hover:bg-red-700 px-3 py-1 text-sm"
                onClick={() => handleDeleteTenant(index)}
              >
                Delete Tenant
              </Button>
            </div>

          </div>
        </Card>
      ))}
    </div>
  );
}
