import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { initializeApp } from 'firebase/app';
import Chart from 'chart.js/auto';
import { getDatabase, ref, push, off, onValue } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    // Your Firebase configuration details
    apiKey: "AIzaSyCTE_wM9n2TC_NyRkIfZ5t3OJo380AnwS8",
  authDomain: "nilm-database-de335.firebaseapp.com",
  databaseURL: "https://nilm-database-de335-default-rtdb.firebaseio.com",
  projectId: "nilm-database-de335",
  storageBucket: "nilm-database-de335.appspot.com",
  messagingSenderId: "337277772529",
  appId: "1:337277772529:web:73fa027fea48923e7aff50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const NewAppliance = ({ enteredAppliance }) => {
  const [data, setData] = useState({});
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('all'); // Default to show all data

  useEffect(() => {
    const database = getDatabase(app);
    let dataPath;
    switch (selectedTimeFrame) {
      case '1min':
        dataPath = '/data/1min';
        break;
      case '3min':
        dataPath = '/data/3min';
        break;
      case '5min':
        dataPath = '/data/5min';
        break;
      default:
        dataPath = '/data/All-Time';
    }
    const dataRef = ref(database, dataPath);

    const onDataChange = (snapshot) => {
      const newData = snapshot.val();
      setData(newData);
      monitorIncrements(newData, enteredAppliance); // Call the function to monitor increments
    };

    // Set up the data listener
    onValue(dataRef, onDataChange);

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      off(dataRef, 'value', onDataChange);
    };
  }, [selectedTimeFrame]);

  // Function to monitor increments greater than 100
    const monitorIncrements = (data, enteredAppliance) => {
    const database = getDatabase(); // Get a reference to the Firebase database
    const applianceRef = ref(database, `stampedAppliances/${enteredAppliance}`);

    // Iterate through the data to check for increments
    Object.entries(data).forEach(([timestamp, value], index, array) => {
        if (index > 0) {
        const prevValue = array[index - 1][1];
        const increment = value - prevValue;
        if (increment > 70) {
            console.log(`Increment greater than 100 detected at timestamp ${timestamp}: ${prevValue} to ${value}`);
            // Write the increment to the database under the appliance name
            push(applianceRef, {
            timestamp,
            increment
            });
        }
        }
    });
    };//make this wait till a new value enters the databaseS


  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Apparent Power Data',
        data: Object.values(data),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <h1 style={{fontSize:"34px"}}>Real-Time New Appliance Power Signal</h1>
      <Line data={chartData} />
    </div>
  );
};

export default NewAppliance;
