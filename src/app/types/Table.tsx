export interface TableGroups {
  OldTables: Table[];
  NewTables: Table[];
  RetroTables: Table[];
  RetroSortingTables: Table[];
  SortingLine: Table[];
  SortingTables: Table[];
}

export interface Table {
  name: string;
  clothingType: string;
  absent: boolean;
  reason: string;
  lastEditTime: number;
  department: string;
  tableNumber: number;
  tableType: string;
  hidden: boolean;
}