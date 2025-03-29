"use client";

import { useEffect, useState } from "react";
import { Employee } from "../../types/Employee";
import LoadingSpinner from "./LoadingSpinner";

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

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
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <h2 className="text-center text-xl font-semibold mb-4">
              маса: {employee.tableNumber}
            </h2>
            <h3 className="text-center text-lg font-medium mb-2">
              {employee.name}
            </h3>
            <p>
              <strong>Тип дреха:</strong> {employee.clothingType}
            </p>
            <p>
              <strong>Статус на Работниците:</strong> {employee.status}
            </p>
            <p>
              <strong>Отдел:</strong> {employee.department}
            </p>
            <p>
              <strong>Последно редактирано:</strong> {formatDate(employee.lastEditTime.toString())}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}