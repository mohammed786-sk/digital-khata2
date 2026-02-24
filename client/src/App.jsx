import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StaffProvider } from './context/StaffContext';
import Navbar from './components/navbar';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import ProductManager from './pages/productManager';
import CustomerManager from './pages/customerManager';
import CustomerHistory from './pages/customerHistory';
import Sales from './pages/sales';


function App() {
  return (
    <StaffProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/products" element={<ProductManager />} />
            <Route path="/customers" element={<CustomerManager />} />
            <Route path="/customers/:id/history" element={<CustomerHistory />} />
          </Routes>
        </div>
      </Router>
    </StaffProvider>
  );
}

export default App;