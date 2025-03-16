import { useEffect, useState } from 'react';
import mockData from '../../mockdata.json';
import { Employee } from '../types/Employee';

const Home = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    // simulate the fetching
    setEmployees(mockData.results);
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">StationSync</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
        {employees.map((employee, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <h2 className="text-center text-xl font-semibold mb-4">Table: {employee.properties['Table Number'].number}</h2>
            <h3 className="text-center text-lg font-medium mb-2">{employee.properties['Employee Name'].title[0].text.content}</h3>
            <p><strong>Type of Clothing:</strong> {employee.properties['Type of Clothing'].rich_text[0].text.content}</p>
            <p><strong>Status:</strong> {employee.properties.Status.select.name}</p>
            <p><strong>Timestamps:</strong> {employee.properties.Timestamps.date.start}</p>
            <p><strong>Department:</strong> {employee.properties.Department.rich_text[0].text.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;