import { generateData } from "./TableGrid";

const NewTables = () => {
  const tables2 = generateData(104);
  const totalRows2 = 13;
  const tablesPerRow2 = 5;
  const emptyTableIds2 = [52];

  return (
    <div className='gap-2'>
      <h2 className="text-center mb-2">Таблици</h2>
      <div className="grid grid-cols-1 gap-2">
        {Array.from({ length: totalRows2 }, (_, rowIndex) => {
          const startIdx = rowIndex * tablesPerRow2;
          const rowTables = tables2.slice(startIdx, startIdx + tablesPerRow2);
          return (
            <div key={rowIndex} className="grid grid-cols-5 gap-0">
              {rowTables.map((table) => (
                <div
                  key={table.id}
                  className={`rounded-lg shadow-md p-2 hover:shadow-lg transition-shadow
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

export default NewTables;