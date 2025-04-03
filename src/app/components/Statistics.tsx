import { Table, TableGroups } from "../types/Table";

interface StatisticsProps {
  tables: TableGroups
}

const Statistics = ({tables}: StatisticsProps) => {
  let totalCount = 0;
  const reasonCounts: { [reason: string]: number } = {};

  Object.values(tables).forEach((group) => {
    group.forEach((table: Table) => {
      if (table.name) {
        const reason = table.reason || "Unknown";
        if (reason !== "Unknown") {
          totalCount ++;
        }
        reasonCounts[reason] = (reasonCounts[reason] || 0) + 1;
      }
    });
  });

  return (
    <div className="p-4 bg-white shadow rounded my-4">
      <h2 className="text-xl font-bold mb-2">Статистика</h2>
      <p>Общо маси: {totalCount}</p>
      <div className="mt-2">
        <h3 className="text-lg font-semibold mb-1">Разбивка по причина:</h3>
        {/* {debugger} */}
        {Object.entries(reasonCounts).map(([reason, count]) => (
          <p key={reason}>
            {reason}: {count}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Statistics;