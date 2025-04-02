import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { Table, TableGroups } from "@/app/types/Table";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(request: Request) {
  const url = new URL(request.url);
  const rawData = url.searchParams.get("raw");

  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) {
    return NextResponse.json({ error: "Database ID is not defined" }, { status: 500 });
  }

  try {
    // Gather all results using pagination
    const allResults: Array<Record<string, unknown>> = [];
    let cursor: string | undefined = undefined;

    do {
      const response = await notion.databases.query({
        database_id: databaseId,
        sorts: [
          {
            property: "title",
            direction: "ascending",
          },
        ],
        start_cursor: cursor,
      });
      allResults.push(...response.results);
      cursor = response.has_more ? response.next_cursor! : undefined;
    } while (cursor);

    const propertyIds = {
      employeeName: "bfda5057-9abd-4a54-b0bb-02ade7ac557f", // multi_select
      typeOfClothing: "SE%7Be", // select
      status: "%3Fzms", // select
      timestamps: "Jt%5BG", // last_edited_time
      department: "etCY", // select
      tableNumber: "title", // title
      absent: "IBBq", // formula
      tableType: "~xFw", // select
      hiddenTable: "ZpCY", // boolean
    };

    if (rawData) {
      return NextResponse.json(allResults);
    }

    // Helper to find property by id from the properties object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getPropertyById = (properties: ArrayLike<any>, id: string) => {
      return Object.values(properties).find((prop) => prop.id === id);
    };

    // Map the full results to Table items
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tables: Table[] = allResults.map((result: any) => {
      const names = getPropertyById(result.properties, propertyIds.employeeName)?.multi_select?.map((name: {name: string}) => {
        return name.name;
      })

      return {
        id: result['id'],
        notion_status_field: Object.entries(result.properties).find((prop): prop is [string, { id: string }] => (prop[1] as { id: string })?.id === propertyIds["status"])?.[0],
        name: names.join(',\n'),
        clothingType: getPropertyById(result.properties, propertyIds.typeOfClothing)?.select?.name,
        reason: getPropertyById(result.properties, propertyIds.status)?.select?.name,
        absent: getPropertyById(result.properties, propertyIds.absent)?.formula?.boolean,
        lastEditTime: getPropertyById(result.properties, propertyIds.timestamps)?.last_edited_time,
        department: getPropertyById(result.properties, propertyIds.department)?.select?.name,
        tableNumber: getPropertyById(result.properties, propertyIds.tableNumber)?.title[0]?.text?.content,
        tableType: getPropertyById(result.properties, propertyIds.tableType)?.select?.name,
        hidden: getPropertyById(result.properties, propertyIds.hiddenTable)?.checkbox,
      };
    });

    // Group results by tableType
    const groupedTables: TableGroups = tables.reduce((acc, table) => {
      const groupKey = (table.tableType || "Unknown") as keyof TableGroups;
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(table);
      return acc;
    }, {
      OldTables: [],
      NewTables: [],
      RetroTables: [],
      RetroSortingTables: [],
      SortingLine: [],
      SortingTables: []
    } as TableGroups);

    return NextResponse.json(groupedTables);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch data", error },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    return NextResponse.json({ error: "Database ID is not defined" }, { status: 500 });
  }
  const body = await request.json();
  const newStatus = body['newValue'];
  const notionStatusField = body['notionStatusField'];
  const tableId = body['tableId']; // You can view the params in the console

  // return NextResponse.json({ body }, { status: 200 });

  let response;
  try {
    response = await notion.pages.update({
      page_id: tableId,
      properties: {
        [notionStatusField]: {
          select: {
            name: newStatus
          }
        }
      }
    })
    return NextResponse.json(response);
  } catch (error) {
    console.log(response);
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update page", error },
      { status: 500 }
    );
  }
}