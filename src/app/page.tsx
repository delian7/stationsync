import EmployeeList from "./components/EmployeeList";
import TableGrid from "./components/TableGrid";

export default function Home() {
  return (
    <main className="flex flex-col bg-gray-100">
      <div>
        <EmployeeList />
      </div>
      <div>
        <TableGrid />
      </div>
    </main>
  );
}