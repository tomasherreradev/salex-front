// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import OlvidePass from './pages/OlvidePass';
import AuctionDetails from './pages/AuctionDetails';
import Suscriptions from './pages/Suscriptions';
import AboutUs from './pages/AboutUs';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgot-password" element={<OlvidePass />} />
          <Route path="/auction/:id" element={<AuctionDetails />} />
          <Route path="/suscriptions" element={<Suscriptions />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
