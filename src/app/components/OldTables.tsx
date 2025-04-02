import { Table, TableGroups } from '../types/Table';
import { useModal } from "../contexts/ModalContext";
import TableDetails from "./TableDetails";
import { useState } from 'react';
import useTableUpdater from '../utils/tableUpdater';

interface OldTableProps {
  data: Table[];
  setTables: React.Dispatch<React.SetStateAction<TableGroups | undefined>>;
}

const OldTables = ({ data, setTables }: OldTableProps) => {
  const updateTable = useTableUpdater(setTables, "OldTables");
  const { openModal } = useModal();
  const [tables] = useState<Table[]>(data);
  const totalRows = 13;
  const tablesPerRow = 3;

  return (
    <div>
      <div className="grid grid-cols-1 gap-2 overflow-x-auto">
        {Array.from({ length: totalRows }, (_, rowIndex) => {
          const startIdx = rowIndex * tablesPerRow;
          const rowTables = tables.slice(startIdx, startIdx + tablesPerRow);
          return (
            <div key={rowIndex} className="grid md:w-64 w-96 grid-cols-3 gap-1 text-ellipsis">
              {rowTables.map((table) => (
                <div
                  onClick={() => openModal(<TableDetails table={table} setTable={updateTable} />)}
                  key={table.tableNumber}
                  className={`rounded-lg shadow-md p-2 hover:shadow-lg transition-shadow
                    ${table.hidden ? 'opacity-0' : 'cursor-pointer'}
                    ${table.absent ? "bg-red-100" : "bg-green-100"}
                  `}
                >
                  <div className="flex flex-col space-y-2">
                    <div className="text-s font-medium text-gray-800">
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
    </div>
  );
};

export default OldTables;