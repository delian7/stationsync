import { generateData } from "./TableGrid";

const OldTables = () => {
  const tables = generateData(39);
  const totalRows = 13;
  const tablesPerRow = 3;
  const emptyTableIds = [100];

  return (
    <div>
      <h2 className="text-center mb-2">Стари Маси</h2>
      <div className="grid grid-cols-1 gap-2">
        {Array.from({ length: totalRows }, (_, rowIndex) => {
          const startIdx = rowIndex * tablesPerRow;
          const rowTables = tables.slice(startIdx, startIdx + tablesPerRow);
          return (
            <div key={rowIndex} className="grid grid-cols-3 gap-1">
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
    </div>
  );
};

export default OldTables;