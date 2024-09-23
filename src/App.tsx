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

// admin routes
import AdminLayout from './pages/admin/AdminLayout';
import AdminHome from './pages/admin/AdminHome';
import Users from './pages/admin/Users';
import Cars from './pages/admin/Cars/Cars';
import CreateCar from './pages/admin/Cars/CreateCar';
import EditCar from './pages/admin/Cars/EditCar';

import AuctionsAdm from './pages/admin/Auctions/AuctionsAdm';
import CreateAuction from './pages/admin/Auctions/CreateAuction';
import EditAuction from './pages/admin/Auctions/EditAuction';


// protected routes
import ProtectedRoute from './hooks/useProtectedRoutes';

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

          {/* admin routes */}
          <Route element={<ProtectedRoute><AdminLayout/></ProtectedRoute>}>
            <Route path="/admin" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
            <Route path="/admin/cars" element={<ProtectedRoute><Cars /></ProtectedRoute>} />
            <Route path="/admin/cars/create" element={<ProtectedRoute><CreateCar /></ProtectedRoute>} />
            <Route path="/admin/cars/edit/:id" element={<ProtectedRoute><EditCar /></ProtectedRoute>} />


            <Route path="/admin/auctions" element={<ProtectedRoute><AuctionsAdm /></ProtectedRoute>} />
            <Route path="/admin/auctions/create" element={<ProtectedRoute><CreateAuction /></ProtectedRoute>} />
            <Route path="/admin/auction/edit/:id" element={<ProtectedRoute><EditAuction /></ProtectedRoute>} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
