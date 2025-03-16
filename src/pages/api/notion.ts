import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";
import { Employee } from "@/types/Employee";

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const databaseId = process.env.NOTION_DATABASE_ID;

  try {
    const response = await notion.databases.query({
      database_id: databaseId!,
    });

    const propertyIds = {
      employeeName: 'Name',
      typeOfClothing: 'Specific Items',
      status: 'Status',
      timestamps: 'Last edited time',
      department: 'Department',
      tableNumber: 'Table Number',
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const employees: Employee[] = response.results.map((result: any) => ({
      name: result.properties[propertyIds.employeeName].title[0]?.text?.content,
      clothingType: result.properties[propertyIds.typeOfClothing]?.select?.name,
      status: result.properties[propertyIds.status]?.status?.name,
      lastEditTime: result.properties[propertyIds.timestamps]?.last_edited_time,
      department: result.properties[propertyIds.department]?.select?.name,
      tableNumber: result.properties[propertyIds.tableNumber]?.number,
    }));

    res.status(200).json(employees);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}