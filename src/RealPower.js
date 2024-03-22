import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import Chart from 'chart.js/auto';

// Your web app's Firebase configuration
const firebaseConfig = {
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

const RealPower = () => {
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
  };

  // Set up the data listener
  onValue(dataRef, onDataChange);

  // Cleanup function to remove the listener when the component unmounts
  return () => {
    off(dataRef, 'value', onDataChange);
  };
}, [selectedTimeFrame]);



  const filterDataByTimeFrame = (data, timeFrame) => {
    // Implement logic to filter data based on the selected time frame
    // For example, if timeFrame is '1min', filter the data for the last 1 minute
    // You'll need to adjust this logic based on how your data is structured
    return data;
  };

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Real Power Data',
        data: Object.values(data),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <h1 style={{fontSize:"34px"}}>Real-Time Aggregated Real Power Signal</h1>
      <select value={selectedTimeFrame} onChange={(e) => setSelectedTimeFrame(e.target.value)}>
        <option value="all">All Time</option>
        <option value="1min">Last 60 Entries (Ideally Last 1 Minute)</option>
        <option value="3min">Last 180 Entries (Ideally Last 3 Minutes)</option>
        <option value="5min">Last 300 Entries (Ideally Last 5 Minutes)</option>
      </select>
      <Line data={chartData} />
    </div>
  );
};

export default RealPower;
