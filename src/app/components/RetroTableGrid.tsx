const RetroTableGrid = () => {
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

  const tables2 = generateData(36);
  const totalRows2 = 10;
  const tablesPerRow2 = 8;
  const emptyTableIds2 = [15,16,23,24,30,31,32];

  return (
    <div className="p-4 min-h-screen">
      <div className="grid grid-cols-1 gap-4">
        {/* Right grid: a new grid with 8 columns and 4 rows */}
        <div className="grid grid-cols-1 gap-4">
            {Array.from({ length: totalRows2 }, (_, rowIndex) => {
              const startIdx = rowIndex * tablesPerRow2;
              const rowTables = tables2.slice(startIdx, startIdx + tablesPerRow2);

              return (
                <div key={rowIndex} className="grid grid-cols-8 gap-2">
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
      </div>
    </div>
  );
};

export default RetroTableGrid;
