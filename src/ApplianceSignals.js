import React, { useEffect, useState } from "react";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import EmptyChart from './EmptyChart'; // Assuming you have a component for empty charts
import './ApplianceSignals.css'; // Import CSS for styling

function ApplianceSignals() {
    const [appliances, setAppliances] = useState([]);

    useEffect(() => {
        // Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyCTE_wM9n2TC_NyRkIfZ5t3OJo380AnwS8",
          authDomain: "nilm-database-de335.firebaseapp.com",
          databaseURL: "https://nilm-database-de335-default-rtdb.firebaseio.com",
          projectId: "nilm-database-de335",
          storageBucket: "nilm-database-de335.appspot.com",
          messagingSenderId: "337277772529",
          appId: "1:337277772529:web:73fa027fea48923e7aff50"
        };

        // Initialize Firebase app
        const app = initializeApp(firebaseConfig);

        // Get a reference to the database
        const database = getDatabase(app);

        // Reference to the 'appliances' path in the database
        const appliancesRef = ref(database, 'appliances');

        // Fetch the list of appliances from the database
        onValue(appliancesRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Convert the object keys to an array of appliance names
                const applianceNames = Object.values(data);
                setAppliances(applianceNames);
            }
        });

        // Cleanup function
        return () => {
            // Cleanup operations if needed
        };
    }, []);

    return (
        <div className="appliance-signals-container">
            <h1 style={{background:"black", color:"white", height:"50px"}}>Individual Appliance Signals</h1>
            <div className="charts-container">
                {/* Render an empty chart for each appliance */}
                {appliances.map((appliance, index) => (
                    <div key={index} className="chart-wrapper">
                        <EmptyChart appliance={appliance}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ApplianceSignals;
