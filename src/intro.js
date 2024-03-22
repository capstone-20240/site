import React, { useState } from "react";
import "./intro.css"; // Import CSS file for styling
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue,get,set } from 'firebase/database';
import Chart from './SensorDataDisplay';
import NewAppliance from './NewAppliance';

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

function IntroThis() {
    const [showInput, setShowInput] = useState(false); // State to toggle input visibility
    const [applianceName, setApplianceName] = useState(''); // State to store the entered appliance name
    const [showSensorDisplay, setShowSensorDisplay] = useState(false); // State to toggle sensor display visibility
    const [showDoneButton, setShowDoneButton] = useState(false); // State to toggle "Done" button visibility
    const [enteredAppliance, setEnteredAppliance] = useState(''); // State to store the entered appliance name as a variable

    // Function to handle "Begin" button click
const handleBeginClick = () => {
    // Check if appliance name is not empty
    if (applianceName.trim() !== '') {
        const enteredAppliance = applianceName.trim();
        setEnteredAppliance(enteredAppliance);

        // Create a new path in the Firebase database under the "appliances" path
        const database = getDatabase(app);
        const appliancesRef = ref(database, 'appliances');

        // Add the new appliance under the "appliances" node
        const newApplianceRef = push(appliancesRef);
        set(newApplianceRef, enteredAppliance)
            .then(() => {
                console.log(`New appliance added: ${enteredAppliance}`);
                // Show the miniature version of SensorDataDisplay component
                setShowSensorDisplay(true);
                // Hide the input box and "Begin" button
                setShowInput(false);
                // Show the "Done" button
                setShowDoneButton(true);
            })
            .catch((error) => {
                console.error('Error adding new appliance:', error);
            });

        // Reset data paths
        const paths = [
            '/data/1min',
            '/data/3min',
            '/data/5min',
            '/data/All-Time'
            // Add more paths if needed
        ];

        paths.forEach((path) => {
            const dataRef = ref(database, path);
            set(dataRef, 0)
                .then(() => {
                    console.log(`Data under path ${path} reset successfully.`);
                })
                .catch((error) => {
                    console.error(`Error resetting data under path ${path}: ${error.message}`);
                });
        });
    } else {
        // Appliance name is empty, show error message or handle accordingly
        console.error('Appliance name cannot be empty');
    }
};



    // Function to handle "Done" button click
    const handleDoneClick = () => {
        // Reset all states to initial values
        setShowInput(false);
        setApplianceName('');
        setShowSensorDisplay(false);
        setShowDoneButton(false);
        
        const database = getDatabase(app);
        // Reset data paths
        const paths = [
            '/data/1min',
            '/data/3min',
            '/data/5min',
            '/data/All-Time'
            // Add more paths if needed
        ];

        paths.forEach(path => {
            const dataRef = ref(database, path);
            set(dataRef, 0)
                .then(() => {
                    console.log(`Data under path ${path} reset successfully.`);
                })
                .catch(error => {
                    console.error(`Error resetting data under path ${path}: ${error.message}`);
                });
        });
    };

    return (
        <div className="intro-container">
            <div className="container-left">
                {/* Content for the left container */}
                <p className="title">
                     FM06- NILM Smart Energy Meter
                </p>
                <p style={{textAlign:"left", fontSize:"20px", fontWeight:"400", color:"white"}}>
                    By: Rahaj Chowdhury, Hannah Hassen, Yamen Nasser & Abdullah Syed
                </p>
                <img src={'https://cdn-icons-png.flaticon.com/512/649/649826.png'} alt="logo" style={{maxHeight:"360px"}}/>
            </div>
            <div className="container-right">
                {/* Content for the right container */}
                <p className="title2">
                    Add Another Appliance:
                </p>
                {/* Conditionally render the input and "Begin" button */}
                {!showSensorDisplay && !showDoneButton && (
                    <button className="reset-button" onClick={() => setShowInput(true)}>Start</button>
                )}
                {showInput && !showDoneButton && (
                    <div>
                       <input 
                            type="text" 
                            placeholder="Enter appliance name" 
                            value={applianceName} 
                            onChange={(e) => setApplianceName(e.target.value)} 
                        />
                        {/* "Begin" button to create new path in the database */}
                        <button onClick={handleBeginClick}>Begin</button>
                    </div>
                )}
                
                {/* Conditionally render the miniature version of SensorDataDisplay component */}
                {showSensorDisplay &&
                    <div style={{ background: "white" }}>
                        <NewAppliance enteredAppliance={enteredAppliance}/>
                    </div>}
                
                {/* Conditionally render the "Done" button */}
                {showDoneButton && (
                    <button style={{fontSize:"30px", marginTop:"10px", fontWeight:"600"}} onClick={handleDoneClick}>DONE</button>
                )}
            </div>
        </div>
    )
}


export default IntroThis;
