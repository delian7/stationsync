import RetroTableGrid from './RetroTableGrid';
const TableGrid = () => {
  // Sample data - replace with your actual data
  const generateData = (maxNum: number) => {
    const data = [];
    for (let i = 1; i <= maxNum; i++) {
      data.push({
        id: i,
        employee: `Employee ${i}`,
        status: ['Active', 'Pending', 'Complete'][Math.floor(Math.random() * 3)],
        clothing: ['Shirt', 'Pants', 'Jacket', 'Shoes'][Math.floor(Math.random() * 4)]
      });
    }
    return data;
  };

  const tables = generateData(104);
  const totalRows = 13;
  const tablesPerRow = 8;
  const emptyTableIds = [83];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-2 gap-4">
        {/* Left grid: the original table grid */}
        <div>
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
                        <div className="text-lg font-bold text-gray-800">
                          #{table.id}
                        </div>
                        <div className="text-sm text-gray-600">
                          {table.employee}
                        </div>
                        <div className="text-sm text-gray-700 font-medium">
                          {table.clothing}
                        </div>
                        <div className="text-sm font-medium rounded-full">
                          {table.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

      <div >
        <RetroTableGrid/>
      </div>{/* Right grid: a new grid with 8 columns and 4 rows */}
      </div>
    </div>
  );
};

export default TableGrid;
