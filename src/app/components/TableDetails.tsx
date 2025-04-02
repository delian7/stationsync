import { useState } from "react";
import { Table } from "../types/Table";
import TableUpdateDropdown from "./TableUpdateDropdown";

interface TableDetailProps {
  table: Table;
  setTable: (updatedTable: Table) => void; // Function to update the Table state
}

const TableDetails: React.FC<TableDetailProps> = ({ table, setTable }) => {
  const [tableData] = useState<Table>(table);

  return (
    <div className={`p-4 rounded`}>
      <h3 className="text-xl font-bold mb-2">🪑 Маса #{tableData.tableNumber}</h3>
      <p>ID: {tableData.id}</p>
      <p>Notion Status Field: {tableData.notion_status_field}</p>
      <p>🪪 Име на служител: {tableData.name}</p>
      <p>👕 Артикул: {tableData.clothingType}</p>
      <div>
        📍 Статус на Работниците:
        <TableUpdateDropdown table={tableData} setTable={setTable} />
      </div>
    </div>
  );
};

export default TableDetails;