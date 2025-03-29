import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { Employee } from "@/types/Employee";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) {
    return NextResponse.json({ error: "Database ID is not defined" }, { status: 500 });
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const propertyIds = {
      employeeName: "QyEw", // select
      typeOfClothing: "SE%7Be",  //select
      status: "%3Fzms", //select
      timestamps: "Jt%5BG", // last_edited_time
      department: "etCY", // select
      tableNumber: "title", // title
      absent: "IBBq" // formula
    };

    // Helper to find property by id from the properties object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getPropertyById = (properties: ArrayLike<any>, id: string) => {
      return Object.values(properties).find((prop) => prop.id === id);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const employees: Employee[] = response.results.map((result: any) => ({
    //   name: getPropertyById(result.properties, propertyIds.employeeName)?.select?.name,
    //   clothingType: getPropertyById(result.properties, propertyIds.typeOfClothing)?.select?.name,
    //   status: getPropertyById(result.properties, propertyIds.status)?.select?.name,
    //   lastEditTime: getPropertyById(result.properties, propertyIds.timestamps)?.last_edited_time,
    //   department: getPropertyById(result.properties, propertyIds.department)?.select?.name,
    //   tableNumber: getPropertyById(result.properties, propertyIds.tableNumber)?.title[0]?.text?.content,
    // }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const employees: Employee[] = response.results.map((result: any) => {
      return {
        name: getPropertyById(result.properties, propertyIds.employeeName)?.select?.name,
        clothingType: getPropertyById(result.properties, propertyIds.typeOfClothing)?.select?.name,
        reason: getPropertyById(result.properties, propertyIds.status)?.select?.name,
        absent: getPropertyById(result.properties, propertyIds.absent)?.formula?.boolean,
        lastEditTime: getPropertyById(result.properties, propertyIds.timestamps)?.last_edited_time,
        department: getPropertyById(result.properties, propertyIds.department)?.select?.name,
        tableNumber: getPropertyById(result.properties, propertyIds.tableNumber)?.title[0]?.text?.content,
      }
    })

    return NextResponse.json(employees);
    // return NextResponse.json(response.results)
    throw new Error("Simulated error for testing");
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch data", error },
      { status: 500 }
    );
  }
}