// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import OlvidePass from './pages/OlvidePass';
import ResetPassword from './pages/ResetPassword';
import ConfirmAcount from './pages/ConfirmAcount';
import Profile from './pages/Profile';

import AuctionDetails from './pages/AuctionDetails';
import Suscriptions from './pages/Suscriptions';
import AboutUs from './pages/AboutUs';
import Auctions from './pages/Auctions';

const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subastas" element={<Auctions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgot-password" element={<OlvidePass />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/confirm-account" element={<ConfirmAcount />} />


          <Route path="/auction/:id" element={<AuctionDetails />} />
          <Route path="/suscriptions" element={<Suscriptions />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/me" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
