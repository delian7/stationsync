"use client";

import { useState } from "react";
import { Table } from "../types/Table";

const statusDropdownOptions = [
  'Присъства',
  'Неплатен отпуск',
  'Платен отпуск',
  'Болничен'
]

interface TableUpdateDropdownProps {
  table: Table
}

const TableUpdateDropdown = ({table}: TableUpdateDropdownProps) => {
  const [selectedValue, setSelectedValue] = useState(table.reason);

  const handleChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setSelectedValue(value);
    try {
      // Call the UPDATE route when the selection changes.
      const response = await fetch("/api/notion", {
        method: "PATCH", // This will hit your UPDATE route in route.ts
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          newValue: value,
          notionStatusField: table.notion_status_field,
          tableId: table.id
        })
      });
      if (!response.ok) {
        throw new Error("Failed to update property");
      }
      const result = await response.json();
      console.log("Update successful:", result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <select
      value={selectedValue}
      onChange={handleChange}
      className="p-2 border rounded"
    >
      <option value={table.reason}>{table.reason}</option>
      {statusDropdownOptions
        .filter((status) => status !== table.reason)
        .map((status) =>
        <option key={status} value={status}>{status}</option>
      )}
    </select>
  );
};

export default TableUpdateDropdown;