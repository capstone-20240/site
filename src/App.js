import logo from './logo.svg';
import './App.css';
import Chart from './SensorDataDisplay';
import ResetDatabaseButton from './reset'; // Import Reset component
import IntroThis from './intro';
import ARgraphs from './ARgraphs';
import ApplianceSignals from './ApplianceSignals';
function App() {
  return (
    <div className="App">
      <IntroThis/>
      <ResetDatabaseButton />
      <ARgraphs />
      <ApplianceSignals/>
    </div>
  );
}

export default App;
