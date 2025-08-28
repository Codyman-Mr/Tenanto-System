import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input"; // custom Input for text fields
import { Button } from "./ui/button";
import { Select } from "./ui/select";
import { useNavigate } from "react-router-dom";

export default function AssignTenant() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [rent, setRent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [rentPlan, setRentPlan] = useState("1month");
  const [gracePeriod, setGracePeriod] = useState("7");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || !phone || !rent || !startDate) {
      alert("Please fill all fields!");
      return;
    }

    const tenants = JSON.parse(localStorage.getItem("tenants") || "[]");
    tenants.push({ name, phone, rent, startDate, rentPlan, gracePeriod });
    localStorage.setItem("tenants", JSON.stringify(tenants));

    alert(`🎉 Congratulations! Tenant "${name}" has been assigned successfully.`);

    // Clear form
    setName("");
    setPhone("");
    setRent("");
    setStartDate("");
    setRentPlan("1month");
    setGracePeriod("7");

    // Optional: navigate("/tenants");
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-xl font-semibold mb-4">Assign Tenant to G1</h2>
      <Card className="w-full max-w-xl space-y-4 p-6">
        <Input placeholder="Enter tenant name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Enter tenant mobile" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Input placeholder="Rent amount" value={rent} onChange={(e) => setRent(e.target.value)} />

        {/* Use native input for date */}
        <div>
          <label className="block text-sm font-medium mb-1">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <Select value={rentPlan} onChange={(e) => setRentPlan(e.target.value)}>
          <option value="1month">1 month</option>
          <option value="2month">2 months</option>
        </Select>
        <Select value={gracePeriod} onChange={(e) => setGracePeriod(e.target.value)}>
          <option value="7">7 Days</option>
          <option value="14">14 Days</option>
        </Select>
        <Button onClick={handleSubmit}>Assign Tenant</Button>
      </Card>
    </div>
  );
}
