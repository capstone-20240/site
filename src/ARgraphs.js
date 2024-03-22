import React from "react";
import "./ARgraphs.css"; // Import CSS file for styling
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';
import Chart from './SensorDataDisplay';
import RealPower from './RealPower';
import SensorDataDisplay from "./SensorDataDisplay";

function ARgraphs() {
    return (
        <div className="argraphs-intro-container" style={{ background: "white" }}>
            <div className="argraphs-container-left">
                {/* Content for the left container */}
                <div className="graph-container">
                    <SensorDataDisplay />
                </div>
            </div>
            <div className="argraphs-container-right">
                {/* Content for the right container */}
                <div className="graph-container">
                    <RealPower />
                </div>
            </div>
        </div>
    )
}

export default ARgraphs;
