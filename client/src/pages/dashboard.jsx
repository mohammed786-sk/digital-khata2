import React, { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    apiRequest('/analytics').then(data => {
        if(!data.isError) setStats(data);
    });
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
      
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Revenue Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-bold uppercase">Total Debt</p>
            <p className="text-3xl font-black text-blue-600">₹{stats.totalRevenue}</p>
          </div>

          {/* Stock Alert Card */}
          <div className={`p-6 rounded-xl shadow-sm border ${stats.stockAlert ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'}`}>
            <p className="text-sm font-bold uppercase text-gray-500">Stock Health</p>
            <p className="text-2xl font-bold">{stats.lowStockCount} Items Low</p>
            
            {/* LIST OF NAMES HERE */}
            {stats.stockAlert && (
              <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                {stats.lowStockItems.map((name, i) => (
                  <li key={i}>{name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* SEARCH SECTION */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4">Find Customer Debt</h2>
        <SearchBar onResults={(data) => {
            if(!data.isError) setSearchResults(data);
            else alert(data.message);
        }} />

        <div className="mt-6 space-y-2">
          {searchResults.length > 0 ? (
            searchResults.map(customer => (
              <Link 
                key={customer.id} 
                to={`/customers/${customer.id}/history`}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition border border-transparent hover:border-blue-200"
              >
                <div>
                    <p className="font-bold text-gray-800">{customer.customer_name}</p>
                    <p className="text-xs text-gray-500">Phone: {customer.phone}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs font-bold text-blue-600">View Ledger →</p>
                    <p className="text-xs text-gray-400 font-mono">ID: {customer.id}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No search results to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


/*
import React, { useEffect, useState } from "react";
import { apiRequest } from "../services/api";
import SearchBar from "../components/searchBar";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const handleSearchResults = (data) => {
    if(data.isError){
      alert(data.message);
      setSearchResults([]);
    }else {
      setSearchResults
    }
  }
  useEffect(() => {
    apiRequest("/analytics").then((data) => setStats(data));
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Business Analytics</h1>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded shadow border-l-4 border-blue-500">
            <p className="text-gray-500 text-sm">Global Debt</p>
            <p className="text-3xl font-bold">₹{stats.totalDebt}</p>
          </div>
          <div className="bg-white p-6 rounded shadow border-l-4 border-purple-500">
            <p className="text-gray-500 text-sm">Highest Debtor</p>
            <p className="text-xl font-semibold">
              {stats.highestDebtor?.customer_name || "N/A"}
            </p>
          </div>
          <div
            className={`bg-white p-6 rounded shadow border-l-4 ${stats.stockAlert ? "border-red-500" : "border-green-500"}`}
          >
            <p className="text-gray-500 text-sm">Stock Health</p>
            <p className="text-xl font-semibold">
              {stats.stockAlert
                ? `${stats.lowStockItems.length} Low Items`
                : "Healthy"}
            </p>
            {status.stockAlert && (
              <div className ="mt-2">
              <p className="text-xs text-red-500 font-bold">Items to restock:</p>
              <ul className="text-xs text-grey-600 list-disc ml-4">
                {stats.lowStockItems.map((item_name, idx) => (
                  <li key ={idx}>{item_name}</li>
                ))}
              </ul>
              </div>
            )}
          </div>
          <div className="bg-white p-6 rounded shadow border-l-4 border-yellow-500">
            <p className="text-gray-500 text-sm">Last Transaction</p>
            <p className="text-md font-medium">
              {stats.latestTransaction?.item_name || "None"}
            </p>
          </div>
        </div>
      )}

      <div className="bg-white p-8 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Customer Debt Search</h2>
        <SearchBar onResults={handleSearchResults} />
        <div className="mt-4">
          {searchResults.map((c) => (
            <div
              key={c.id}
              className="p-4 border-b flex justify-between items-center hover:bg-blue-50 transition"
            >
              <div>
                {/* Clickable name leads to history *//*}
                <Link
                  to={`/customers/${c.id}/history`}
                  className="font-bold text-blue-700 hover:underline"
                >
                  {c.customer_name}
                </Link>
                <p className="text-sm text-gray-500">{c.phone}</p>
              </div>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-mono text-gray-600">
                ID: {c.id}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
*/