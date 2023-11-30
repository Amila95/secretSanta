// AdminPage.js
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import styled from 'styled-components';

const AdminContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHead = styled.thead`
  background-color: #2ecc71; /* Christmas green */
  color: white;
`;

const TableHeadCell = styled.th`
  padding: 10px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2; /* Alternate row color */
  }
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: center;
`;

const AdminPage = () => {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    // Fetch all employee data from Firestore
    const fetchData = async () => {
      const employeeCollection = collection(db, 'EmployeData');
      const employeeSnapshot = await getDocs(employeeCollection);

      const employees = employeeSnapshot.docs.map(doc => doc.data());
      setEmployeeData(employees);
    };

    fetchData();
  }, []);

  return (
    <AdminContainer>
      <h1>Secret Santa Det</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Santa</TableHeadCell>
            {/* Add more columns as needed */}
          </TableRow>
        </TableHead>
        <tbody>
          {employeeData.map((employee, index) => (
            <TableRow key={index}>
              <TableCell>{employee.Email}</TableCell>
              <TableCell>{employee.Name}</TableCell>
              <TableCell>{employee.Santa}</TableCell>
              {/* Add more columns as needed */}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </AdminContainer>
  );
};

export default AdminPage;
