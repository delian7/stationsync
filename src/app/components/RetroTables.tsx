import { generateData } from "./TableGrid";

const RetroTables = () => {


  const tables = generateData(36);
  const totalRows = 10;
  const tablesPerRow = 8;
  const emptyTableIds = [15,16,23,24,30,31,32];

  return (
    <div className="grid grid-cols-1 gap-4">

      {Array.from({ length: totalRows }, (_, rowIndex) => {
        const startIdx = rowIndex * tablesPerRow;
        const rowTables = tables.slice(startIdx, startIdx + tablesPerRow);

        return (
          <div key={rowIndex} className="grid grid-cols-8 gap-2">
            {rowTables.map((table) => (
              <div
                key={table.id}
                className={`rounded-lg shadow-md p-2 hover:shadow-lg transition-shadow
                  ${emptyTableIds.includes(table.id) ? 'opacity-0' : 'cursor-pointer'}
                  ${table.status === 'Active' ? "bg-red-100" : "bg-green-100"}
                `}
              >
                <div className="flex flex-col space-y-2">
                  <div className="text-md font-bold text-gray-800">
                    #{table.id}
                  </div>
                  <div className="text-xs text-gray-600">
                    {table.employee}
                  </div>
                  <div className="text-xs text-gray-700 font-medium">
                    {table.clothing}
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
