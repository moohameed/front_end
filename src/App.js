/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppFooter from './Components/AppFooter';
import AppHeader from './Components/AppHeader';
import SideMenu from './Components/SideMenu';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import PasswordResetPage from './Pages/PasswordResetPage'; // Import your password reset component
import Customers from './Pages/Customers';
import Dashboard from './Pages/Dashbaord';
import Orders from './Pages/Orders';
import ProtectedRoutes from './Services/ProtectedRoutes';
import SelectedDataSources from './Pages/SelectedDataSources';
import Facebook from './Pages/facebook';
import GoogleAnalytics from './Pages/googleanalytics';
// eslint-disable-next-line import/no-named-as-default
import WooCommerceIntegration from './Pages/WooCommerceIntegration';
import AnalyticsProperties from './Pages/analyticsProperties';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication state

  return (
    <Routes>
      {/* <Route path="*" element={<NotFoundPage />} /> */}
      {/* public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<PasswordResetPage />} />
      {/* protected routes */}
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<SelectedDataSources />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/facebook" element={<Facebook />} />
        <Route path="/googleanalytics" element={<GoogleAnalytics />} />
        <Route path="/googleanalyticsproperties" element={<AnalyticsProperties />} />
        <Route
          path="/woocomerceintegration"
          element={<WooCommerceIntegration />}
        />
      </Route>
    </Routes>
  );
}

export default App;
