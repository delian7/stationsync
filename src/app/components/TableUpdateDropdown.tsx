"use client";

import { useState } from "react";
import { Table } from "../types/Table";
import LoadingSpinner from "./LoadingSpinner";

const statusDropdownOptions = [
  'Присъства',
  'Неплатен отпуск',
  'Платен отпуск',
  'Болничен'
]

interface TableUpdateDropdownProps {
  table: Table
  setTable: (updatedTable: Table) => void;
}

const TableUpdateDropdown = ({table, setTable}: TableUpdateDropdownProps) => {
  const [selectedValue, setSelectedValue] = useState(table.reason);
  const [loading, setLoading] = useState(false);

  const handleChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setLoading(true);
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
      table.reason = value;
      table.absent = value === "Присъства" ? false : true
      setTable(table);
      setLoading(false);
      console.log("Update successful:", result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <span className="p-2 inline-flex item-center">
      {loading ? (
        <span className="mx-10 h-7 inline-block"><LoadingSpinner /></span>
      ) : (
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
      )}
    </span>
  );
};

export default TableUpdateDropdown;