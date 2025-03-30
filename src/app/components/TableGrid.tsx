import NewTables from './NewTables';
import OldTables from './OldTables';
import RetroTables from './RetroTables';
import SortingLine from './SortingLine';
import SortingTables from './SortingTables';

export const generateData = (maxNum: number) => {
  const data = [];
  for (let i = 1; i <= maxNum; i++) {
    data.push({
      id: i,
      employee: `Служител ${i}`,
      // Bulgarian statuses: Активен, Изчакващ, Завършен
      status: ['Active', 'Pending', 'Complete'][Math.floor(Math.random() * 3)],
      // Bulgarian clothing: Риза, Панталони, Якета, Обувки
      clothing: ['Риза', 'Панталони', 'Якета', 'Обувки'][Math.floor(Math.random() * 4)]
    });
  }
  return data;
};

const TableGrid = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-6 gap-3">
        <OldTables />

        <div className="col-span-2 border-2 p-2">
          <h2 className="text-center">Нови Маси</h2>
          <NewTables />
        </div>

        <div className="col-span-3">
          <div className="px-2 min-h-screen">
            <div className="grid grid-cols-1 gap-4">
              <h2 className="text-center">Старо Първично</h2>
              <div className="border-2 p-2">
                <RetroTables />
              </div>

              <h2 className="text-center mb-2">Първично</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="border-r-2 pr-2">
                  <SortingTables />
                </div>
                <SortingLine />
              </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TableGrid;