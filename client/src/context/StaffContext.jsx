import React, { createContext, useState, useContext } from 'react';

const StaffContext = createContext();

export const StaffProvider = ({ children }) => {
  const [staffKey, setStaffKey] = useState(localStorage.getItem('staffKey') || null);

  const login = (key) => {
    setStaffKey(key);
    localStorage.setItem('staffKey', key);
  };

  const logout = () => {
    setStaffKey(null);
    localStorage.removeItem('staffKey');
  };

  return (
    <StaffContext.Provider value={{ staffKey, isStaff: !!staffKey, login, logout }}>
      {children}
    </StaffContext.Provider>
  );
};

export const useStaff = () => useContext(StaffContext);