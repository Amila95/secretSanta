import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SecuritySentaFinder from './secretSantaFinder';
import Admin from './Admin';



function App() {
  return (
    // <div className="App">
    //   {/* <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header> */}
    //   <SecuritySentaFinder />
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<SecuritySentaFinder />} />
        <Route path="/home" element={<SecuritySentaFinder />} />
        <Route path="/adminTypefiSecretSanta2023hkotavilacuduwana" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
