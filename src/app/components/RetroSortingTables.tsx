import { Table, TableGroups } from "../types/Table";
import { useModal } from "../contexts/ModalContext";
import TableDetails from "./TableDetails";
import { useState } from 'react';
import useTableUpdater from '../utils/tableUpdater';

interface RetroSortingTablesProps {
  data: Table[];
  setTables: React.Dispatch<React.SetStateAction<TableGroups | undefined>>;
}

const RetroSortingTables = ({data, setTables}: RetroSortingTablesProps) => {
  const updateTable = useTableUpdater(setTables, "RetroSortingTables");
  const { openModal } = useModal();
  const [tables] = useState<Table[]>(data);
  const totalRows = 10;
  const tablesPerRow = 7;

  return (
    <div className="grid grid-cols-1 gap-4 overflow-x-auto">

      {Array.from({ length: totalRows }, (_, rowIndex) => {
        const startIdx = rowIndex * tablesPerRow;
        const rowTables = tables.slice(startIdx, startIdx + tablesPerRow);

        return (
          <div key={rowIndex} className="grid grid-cols-7 gap-2 md:w-auto w-3xl">
            {rowTables.map((table) => (
              <div
                key={table.tableNumber}
                onClick={() => openModal(<TableDetails table={table} setTable={updateTable} />)}
                className={`rounded-lg shadow-md p-2 hover:shadow-lg transition-shadow
                  ${table.hidden ? 'opacity-0' : 'cursor-pointer'}
                  ${table.absent ? "bg-red-100" : "bg-green-100"}
                `}
              >
                <div className="flex flex-col space-y-2">
                  <div className="text-md font-bold text-gray-800">
                    {table.tableNumber}
                  </div>
                  <div className="text-xs text-gray-600">
                    {table.name}
                  </div>
                  <div className="text-xs text-gray-700 font-medium">
                    {table.clothingType}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default RetroSortingTables;
