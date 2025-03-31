"use client";

import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import NewTables from './NewTables';
import OldTables from './OldTables';
import RetroTables from './RetroTables';
import SortingLine from './SortingLine';
import SortingTables from './SortingTables';
import { TableGroups } from '../types/Table';
import RetroSortingTables from './RetroSortingTables';

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
  const [loading, setLoading] = useState(true);
  const [tables, setTables] = useState<TableGroups>();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/notion");
      const result = await res.json();
      setLoading(false);
      if (res.status === 200) {
        setTables(result);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-6 gap-3 min-w-dvh overflow-x-auto">
        <div className="border-2 p-2">
          <h2 className="text-center mb-2">Стари Маси</h2>
          {tables?.OldTables && <OldTables data={tables.OldTables}/>}
        </div>

        <div className="col-span-2 border-2 p-2">
          <h2 className="text-center">Нови Маси</h2>
          {tables?.NewTables && <NewTables data={tables.NewTables} />}
        </div>

        <div className="col-span-3">
          <div className="px-2 min-h-screen">
            <div className="grid grid-cols-1 gap-4">
              <div className="border-2 p-2">
                <h2 className="text-center">Старо Първично</h2>
                <div>
                  {tables?.RetroTables && <RetroTables tables={tables.RetroTables} />}
                  {tables?.RetroSortingTables && <RetroSortingTables tables={tables.RetroSortingTables} />}
                </div>
              </div>

              <div className="border-2 p-2">
                <h2 className="text-center mb-2">Първично</h2>
                <div className="grid grid-cols-2 gap-3">
                  <div className="pr-4">
                    { tables?.SortingTables && <SortingTables data={tables.SortingTables}/> }
                  </div>
                  <div className="border-l-2 border-dotted pl-8">
                    { tables?.SortingLine && <SortingLine data={tables.SortingLine} /> }
                  </div>
                </div>
              </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TableGrid;