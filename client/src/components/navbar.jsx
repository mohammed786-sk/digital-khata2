import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStaff } from '../context/StaffContext';

const Navbar = () => {
  const { isStaff, login, logout } = useStaff();
  const navigate = useNavigate();

  const handleStaffAuth = () => {
    if (isStaff) {
      logout();
      navigate('/');
    } else {
      const key = prompt("Enter Staff API Key:");
      if (key == "kaka_staff_badge"){ login(key)} 
      else if (key) {
        alert("Invalid Key! Access Denied.");
      }
    }
  };

  return (
    <nav className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex gap-8 font-medium">
        <Link to="/" className="text-blue-600 font-bold">DIGITAL KHATA</Link>
        <Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link>
        {isStaff && (
          <>
            <Link to="/sales" className="hover:text-blue-500">New Sale</Link>
            <Link to="/products" className="hover:text-blue-500">Inventory</Link>
            <Link to="/customers" className="hover:text-blue-500">Customers</Link>
          </>
        )}
      </div>
      <button 
        onClick={handleStaffAuth}
        className={`px-4 py-2 rounded-md transition ${isStaff ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-blue-600 text-white'}`}
      >
        {isStaff ? 'Exit Staff Mode' : 'Are you Staff?'}
      </button>
    </nav>
  );
};

export default Navbar;