import { useCallback } from "react";
import { Table, TableGroups } from "../types/Table";
import { Dispatch, SetStateAction } from "react";

function useTableUpdater<T extends keyof TableGroups>(
  setTables: Dispatch<SetStateAction<TableGroups | undefined>>,
  groupName: T
) {
  return useCallback(
    (updatedTable: Table) => {
      setTables((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          [groupName]: prev[groupName].map((table) =>
            table.id === updatedTable.id ? updatedTable : table
          ),
        };
      });
    },
    [setTables, groupName]
  );
}

export default useTableUpdater;