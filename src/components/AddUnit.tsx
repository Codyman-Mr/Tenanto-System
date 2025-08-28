import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function AddUnit() {
  const [unitName, setUnitName] = useState("");

  const handleAdd = () => {
    console.log({ unitName });
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-xl font-semibold mb-4">Add Unit</h2>
      <Card className="w-full max-w-xl space-y-4 p-6">
        <Input placeholder="Enter unit name" value={unitName} onChange={(e) => setUnitName(e.target.value)} />
        <Button onClick={handleAdd}>Add Unit</Button>
      </Card>
    </div>
  );
}
export {};
