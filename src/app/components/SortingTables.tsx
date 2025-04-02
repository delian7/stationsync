import { Table, TableGroups } from "../types/Table";
import { useModal } from "../contexts/ModalContext";
import TableDetails from "./TableDetails";
import { useState } from 'react';
import useTableUpdater from '../utils/tableUpdater';

interface SrotingTablesProps {
  data: Table[];
  setTables: React.Dispatch<React.SetStateAction<TableGroups | undefined>>;
}

const SortingTables = ({data, setTables}: SrotingTablesProps) => {
  const updateTable = useTableUpdater(setTables, "OldTables");
  const { openModal } = useModal();
  const [tables] = useState<Table[]>(data);
  const totalRows = 6;
  const tablesPerRow = 2;

  return (
    <div className="">
      {Array.from({ length: totalRows }, (_, rowIndex) => {
        const startIdx = rowIndex * tablesPerRow;
        const rowTables = tables.slice(startIdx, startIdx + tablesPerRow);

        return (
          <div key={rowIndex} className="grid grid-cols-2 gap-4">
            {rowTables.map((table) => (
              <div
                key={table.tableNumber}
                onClick={() => openModal(<TableDetails table={table} setTable={updateTable} />)}
                className={`rounded-lg shadow-md p-2 my-2 hover:shadow-lg transition-shadow
                  ${table.hidden ? 'opacity-0' : 'cursor-pointer'}
                  ${table.absent ? "bg-red-100" : "bg-green-100"}
                `}
              >
                <div className="flex flex-col space-y-2">
                  <div className="text-md font-bold text-gray-800">
                    #{table.tableNumber}
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

export default SortingTables;