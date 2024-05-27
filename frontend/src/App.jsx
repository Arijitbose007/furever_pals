// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Donate from './pages/Donate';
import Shelter from './pages/Shelter';
import Volunteer from './pages/Volunteer';
import VolShelter from './pages/VolShelter';
import Adopt from './pages/Adopt';
import AdShelter from './pages/AdShelter';
import Sos from './pages/Sos';
import SosShelter from './pages/SosShelter';
import Emergency from './components/Emergency';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import RoleBasedRedirect from './components/RoleBasedRedirect';
import Catalog from './components/Catalog';
import Buddies from './pages/Buddies';

const App = () => {
  return (
    <BrowserRouter>
      <RoleBasedRedirect />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shelter" element={<Shelter />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/volshelter" element={<AdminRoute><VolShelter /></AdminRoute>} />
        <Route path="/adopt" element={<ProtectedRoute><Adopt /></ProtectedRoute>} />
        <Route path="/adshelter" element={<AdminRoute><AdShelter /></AdminRoute>} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/buddies" element={<Buddies />} />
        <Route path="/sos" element={<Sos />} />
        <Route path="/sosshelter" element={<AdminRoute><SosShelter /></AdminRoute>} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
