"use client";

import { useEffect, useState } from "react";
import { Table } from "../types/Table";
import LoadingSpinner from "./LoadingSpinner";

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/notion");
      const result = await res.json();
      setLoading(false);
      if (res.status === 200) {
        setEmployees(result);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">StationSync</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
        {employees.map((employee, index) => (
          <div
            key={index}
            className={`border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md
              transition-shadow duration-200
              ${employee.absent ? "bg-red-100" : "bg-green-100"}
            `}
          >
            <h2 className="text-center text-xl font-semibold mb-4">
              #{employee.tableNumber}
            </h2>
            <p>
              {employee.clothingType}
            </p>
            <h3 className="my-2">
              {employee.name}
            </h3>
            <p>
              {employee.reason}
            </p>
            {/* <p>
              <strong>Отдел:</strong> {employee.department}
            </p>
            <p>
              <strong>Последно редактирано:</strong> {formatDate(employee.lastEditTime.toString())}
            </p> */}
          </div>
        ))}
      </div>
    </div>
  );
}