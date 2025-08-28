import React from "react";

type SwitchProps = {
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Switch({ defaultChecked = false, onChange }: SwitchProps) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" defaultChecked={defaultChecked} onChange={onChange} className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 relative">
        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
      </div>
    </label>
  );
}