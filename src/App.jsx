// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import LuckySpinParty from './pages/LuckySpinParty';

function App() {
  return (
    <>
      <Header />
      
      <Routes>
        <Route path="/" element={<LuckySpinParty />} />
      </Routes>
      
      <Footer />
    </>
  );
}

export default App;