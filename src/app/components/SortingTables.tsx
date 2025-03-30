import { generateData } from "./TableGrid";

const SortingTables = () => {
  const tables2 = generateData(12);
  const totalRows2 = 6;
  const tablesPerRow2 = 2;
  const emptyTableIds2 = [7,10];

  return (
    <div className="">
      {Array.from({ length: totalRows2 }, (_, rowIndex) => {
        const startIdx = rowIndex * tablesPerRow2;
        const rowTables = tables2.slice(startIdx, startIdx + tablesPerRow2);

        return (
          <div key={rowIndex} className="grid grid-cols-2 gap-4">
            {rowTables.map((table) => (
              <div
                key={table.id}
                className={`rounded-lg shadow-md p-2 my-2 hover:shadow-lg transition-shadow
                  ${emptyTableIds2.includes(table.id) ? 'opacity-0' : 'cursor-pointer'}
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
                  <div className="text-xs font-medium rounded-full">
                    {table.status}
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