import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import Snowfall from 'react-snowfall';
import {  collection, query, where, getDocs , updateDoc, arrayUnion, doc, addDoc} from 'firebase/firestore';
const SecuritySentaFinder = () => {
  const [jsonData, setJsonData] = useState([]);
  const [emailAddress, setEmailAddress] = useState('');
  const [securitySentaEmail, setSecuritySentaEmail] = useState('');
  const [assignedSentaEmail, setAssignedSentaEmail] = useState(false);

  useEffect(() => {
    fetch('data.json')
      .then(response => response.json())
      .then(data => setJsonData(data));
  }, []);

  const updateJsonFile = async (updatedUserData) => {
    await fetch('data.json', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUserData)
    });
  };
  

const handleCheckEmail1 = async () => {
  // Check if the employee has already been assigned as Santa
  const assignedSantaQuery = query(collection(db, 'AssignedSanta'), where('email', '==', emailAddress));
  const assignedSantaSnapshot = await getDocs(assignedSantaQuery);

  // if (!assignedSantaSnapshot.empty) {
  //   alert('You have already been assigned as Santa!');
  //   return;
  // }

  // If not assigned as Santa, proceed to find a Santa
  const employeeQuery = query(collection(db, 'EmployeData'), where('Email', '==', emailAddress));
  const employeeSnapshot = await getDocs(employeeQuery);

  if (!employeeSnapshot.empty) {
    // Email address found
    const currentEmployee = employeeSnapshot.docs[0].data();
    if(currentEmployee.Santa == ""){

    // Retrieve all unassigned Santas
    const allEmployeesQuery = query(collection(db, 'EmployeData'));
    const allEmployeesSnapshot = await getDocs(allEmployeesQuery);
    const allEmployees = allEmployeesSnapshot.docs.map(doc => doc.data());

    // Retrieve already assigned Santas
    const assignedSantaSnapshot = await getDocs(collection(db, 'AssignedSanta'));
    const assignedSantaEmails = assignedSantaSnapshot.docs.map(doc => doc.data().email);

    // Filter out already assigned Santas
    const unassignedSantas = allEmployees.filter(employee => !assignedSantaEmails.includes(employee.Email) && employee.Email!= emailAddress);

    if (unassignedSantas.length === 0) {
      alert('All employees have been assigned as Santas.');
      return;
    }

    // Randomly pick a Santa
    const randomSanta = unassignedSantas[Math.floor(Math.random() * unassignedSantas.length)];

    // Update current employee's Santa field
    await updateDoc(doc(db, 'EmployeData', employeeSnapshot.docs[0].id), {
      Santa: randomSanta.Name,  // Assuming the Santa's name is stored in the 'Name' field
    });

    // // Update Santa's Recipient field
    // await updateDoc(doc(db, 'EmployeData', randomSanta.id), {
    //   Recipient: currentEmployee.Name,  // Assuming the recipient's name is stored in the 'Name' field
    // });

    // Add the current employee to the AssignedSanta collection
    setSecuritySentaEmail(randomSanta.Name);
    await addDoc(collection(db, 'AssignedSanta'), { email: randomSanta.Email });
  }else{
    alert('already assigned ');
    setAssignedSentaEmail(true)

  }
  } else {
    // Email address not found
    alert('Email address not found');
  }
};


  
  
  

  return (
    <div style={styles.container}>
      <Snowfall />
      <h1 style={styles.title}>Typefi Secret Santa</h1>

      <label htmlFor="emailAddressInput" style={styles.label}>
        Enter your email address:
      </label>
      <input
        type="email"
        id="emailAddressInput"
        placeholder="Enter email"
        value={emailAddress}
        onChange={(event) => setEmailAddress(event.target.value)}
        style={styles.input}
      />

      <button onClick={handleCheckEmail1} style={styles.button}>
        Find 
      </button>
{securitySentaEmail ?
      <div id="securitySentaDisplay" style={styles.securitySentaDisplay}>
      Congrats! 🎉🎉🎉..... 
      <p>You are the Secret Santa of :  {securitySentaEmail}</p>
      
    </div>:assignedSentaEmail?
      <div id="securitySentaDisplay" style={styles.securitySentaDisplayEroor}>
      You already a Santa. If you forget your gift recipient, please contact Harshini.
    </div>:""
}
    </div>

  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#e74c3c', // Christmas red
    color: 'white',
    minHeight: '100vh',
    backgroundImage: 'url("image1.jpg")', // Add your Christmas background image path
    backgroundSize: 'cover',
  },
  title: {
    fontSize: '3em',
    color: '#952121',
    marginBottom: '20px',
    fontFamily: 'cursive',
  },
  label: {
    display: 'block',
    fontSize: '1.2em',
    marginBottom: '10px',
    fontWeight: 'bold'
  },
  input: {
    padding: '8px',
    fontSize: '1em',
    width: '40%',
    marginBottom: '20px',
    marginRight:'10px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '1em',
    background: '#2ecc71', // Christmas green
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  securitySentaDisplay: {
    marginTop: '20px',
    fontSize: '2em',
    fontWeight: 'bold'
  },
  securitySentaDisplayEroor: {
    marginTop: '20px',
    fontSize: '1.2em',
    fontWeight: 'bold'
    
  },
};



export default SecuritySentaFinder;
