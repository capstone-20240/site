import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, remove } from 'firebase/database';
import './reset.css'; // Import the CSS file

const ResetDatabaseButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [password, setPassword] = useState('');
  
  const handleReset = () => {
    setShowModal(true);
  };


  /////////////////////////////////////////////////////////////////////////////////////
  const handleSubmit2 = () => {
  // Check if the password is correct
    if (password === "1234") {
    setPassword('');
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
    
    // Define the paths to be deleted
    const pathsToDelete = [
      'appliances',
      'stampedAppliances'
      // Add more paths if needed
    ];

    // Delete each path
    pathsToDelete.forEach(path => {
      const pathRef = ref(database, path);
      remove(pathRef)
        .then(() => {
          console.log(`Path ${path} deleted successfully.`);
        })
        .catch(error => {
          console.error(`Error deleting path ${path}: ${error.message}`);
        });
    });

    // Close the modal after successful deletion
    setShowModal2(false);
  } else {
    // Incorrect password, show error message or handle accordingly
    console.error("Incorrect password. Please try again.");
    }
    window.location.reload();
};

  /////////////////////////////////////////////////////////////////////////////////////

const handleCancel = () => {
  window.location.reload()
}
  const handleSubmit = () => {
    // Check if the password is correct
    if (password === '1234') {
      // Firebase configuration
      setPassword('');
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
      
      // Assuming there are multiple paths you want to clear
      const paths = [
        '/data/1min',
        '/data/3min',
        '/data/5min',
        '/data/All-Time'
        // Add more paths if needed
      ];

      // Loop through each path and set zero as the data
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

      // Close the modal after resetting
      setShowModal(false);
    } else {
      // Password is incorrect, reset it
      setPassword('');
    }
  };

  return (
    <div style={{background:"black"}}>
      <button className="reset-button" onClick={handleReset}>Reset RT Database</button>
      <button className="reset-button" style={{marginLeft:"20px"}} onClick={() => setShowModal2(true)}>Reset Appliances Database</button>  

      {/* Modal for password prompt */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2 style={{color:"white", marginTop:"-10px"}}>Password Required to Reset RT Database:</h2>
            <input type="password" className="large-input" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button style={{ marginLeft: "10px", marginTop: "5px", background: "red" }} onClick={handleSubmit}>Submit</button>
            <button style={{marginLeft:"10px", marginTop:"5px", background:"rgb(222, 221, 221)"}} onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}

      {/* Modal for password prompt */}
      {showModal2 && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal2(false)}>&times;</span>
            <h2 style={{color:"white", marginTop:"-10px"}}>Password Required to Reset Appliances Database:</h2>
            <input type="password" className="large-input" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button style={{ marginLeft: "10px", marginTop: "5px", background: "red" }} onClick={handleSubmit2}>Submit</button>
            <button style={{marginLeft:"10px", marginTop:"5px", background:"rgb(222, 221, 221)"}} onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetDatabaseButton;
