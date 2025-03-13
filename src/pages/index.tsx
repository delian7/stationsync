import { useEffect, useState } from 'react';
import mockData from '../../mockdata.json';
import { Employee } from '../types/Employee';
import styles from '../styles/Home.module.css';


const Home = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    // simulate the fetching
    setEmployees(mockData.results);
  }, [])

  return (
    <div>
      <h1>StationSync</h1>
      <div className={styles.grid}>
        {employees.map((employee, index) => (
          <div key={index} className={styles.card}>
            <h2>{employee.properties['Employee Name'].title[0].text.content}</h2>
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