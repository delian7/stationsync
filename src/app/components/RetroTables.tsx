import { Table } from "../types/Table";

interface RetroTablesProps {
  tables: Table[];
}

const RetroTables = ({tables}: RetroTablesProps) => {
  const totalRows = 10;
  const tablesPerRow = 8;

  return (
    <div className="grid grid-cols-1 gap-4">

      {Array.from({ length: totalRows }, (_, rowIndex) => {
        const startIdx = rowIndex * tablesPerRow;
        const rowTables = tables.slice(startIdx, startIdx + tablesPerRow);

        return (
          <div key={rowIndex} className="grid grid-cols-8 gap-2">
            {rowTables.map((table) => (
              <div
                key={table.tableNumber}
                className={`rounded-lg shadow-md p-2 hover:shadow-lg transition-shadow
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

export default RetroTables;
