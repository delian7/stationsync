import EmployeeList from "./components/EmployeeList";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-gray-100">
      <EmployeeList />
    </main>
  );
}