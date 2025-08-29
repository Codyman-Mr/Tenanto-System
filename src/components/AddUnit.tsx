import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function AddUnit() {
  const [unitName, setUnitName] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleAdd = () => {
    if (!unitName.trim()) {
      alert("Unit name is required");
      return;
    }

    // Step 1: Get existing units
    const stored = localStorage.getItem("units");
    let units = [];
    if (stored) {
      try {
        units = JSON.parse(stored);
      } catch (e) {
        console.error("Invalid data in localStorage");
      }
    }

    // Step 2: Add new unit
    const newUnit = {
      id: unitName,
      tenant: "Vacant",
      status: "Vacant",
      grace: "-",
      power: false
    };

    const updatedUnits = [...units, newUnit];

    // Step 3: Save back to localStorage
    localStorage.setItem("units", JSON.stringify(updatedUnits));

    // Step 4: Reset input + show success
    setUnitName("");
    setSuccessMsg(`Unit "${unitName}" added successfully!`);

    // Auto-clear success message after 3s
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-xl font-semibold mb-4">Add Unit</h2>

      <Card className="w-full max-w-xl space-y-4 p-6">
        <Input
          placeholder="Enter unit name"
          value={unitName}
          onChange={(e) => setUnitName(e.target.value)}
        />
        <Button onClick={handleAdd}>Add Unit</Button>

        {successMsg && (
          <p className="text-green-600 text-sm">{successMsg}</p>
        )}
      </Card>
    </div>
  );
}
