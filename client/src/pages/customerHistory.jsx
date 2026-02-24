import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import { useStaff } from "../context/StaffContext";
/*
const CustomerHistory = () => {
  const { id } = useParams();
  const [data, setData] = useState({ history: [], totalDebt: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest(`/customers/customer/${id}/history`).then(res => {
      setData(res);
      setLoading(false);
    });
  }, [id]);
*/
const CustomerHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isStaff, staffKey } = useStaff(); // Get staff status
  const [data, setData] = useState({ history: [], totalDebt: 0 });
  const [loading, setLoading] = useState(true);

  const fetchHistory = () => {
    apiRequest(`/customers/customer/${id}/history`).then((res) => {
      setData(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchHistory();
  }, [id]);

  const handlePayDebt = async () => {
    if (
      !window.confirm(
        `Are you sure you want to settle ₹${data.totalDebt}? This will clear the transaction history.`,
      )
    )
      return;

    const res = await apiRequest(
      `/customers/customer/${id}/clear-debt`,
      "DELETE",
      null,
      staffKey,
    );

    if (res.affectedRows >= 0) {
      alert("Debt Cleared Successfully!");
      fetchHistory(); // Refresh the list
    } else {
      alert("Error: " + res.error);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Customer Ledger</h1>
          <p className="text-gray-500 text-sm">Customer ID: {id}</p>
        </div>
        <Link
          to="/dashboard"
          className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm transition"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Debt Summary Card */}
      <div className="bg-white border rounded-xl p-6 mb-8 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-gray-500 font-semibold uppercase text-xs">Total Outstanding Debt</h2>
          <p className="text-4xl font-black text-red-600">₹{data.totalDebt.toLocaleString()}</p>
        </div>
        
        {/* Only Staff see the Pay Button */}
        {isStaff && data.totalDebt > 0 && (
          <button 
            onClick={handlePayDebt}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition transform active:scale-95"
          >
            Record Full Payment
          </button>
        )}
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden border">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-gray-600 text-sm font-bold">DATE</th>
              <th className="p-4 text-gray-600 text-sm font-bold">
                ITEM DESCRIPTION
              </th>
              <th className="p-4 text-gray-600 text-sm font-bold text-right">
                AMOUNT
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="p-10 text-center text-gray-400">
                  Loading records...
                </td>
              </tr>
            ) : data.history.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-10 text-center text-gray-400">
                  No purchase history found.
                </td>
              </tr>
            ) : (
              <>
                {data.history.map((t, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-sm text-gray-500">
                      {new Date(t.created_at).toLocaleDateString(undefined, {
                        dateStyle: "medium",
                      })}
                    </td>
                    <td className="p-4 font-medium text-gray-800">
                      {t.item_name}
                    </td>
                    <td className="p-4 text-right font-bold text-gray-700">
                      ₹{t.amount}
                    </td>
                  </tr>
                ))}
                {/* Footer Row for Total */}
                <tr className="bg-gray-50 font-bold">
                  <td colSpan="2" className="p-4 text-right text-gray-600">
                    SUBTOTAL DEBT
                  </td>
                  <td className="p-4 text-right text-red-600 text-lg">
                    ₹{data.totalDebt}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerHistory;
/*
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiRequest } from '../services/api';

const CustomerHistory = () => {
  const { id } = useParams();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest(`/customers/customer/${id}/history`).then(data => {
      setHistory(data);
      setLoading(false);
    });
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Transaction History (ID: {id})</h1>
        <Link to="/dashboard" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Date</th>
              <th className="p-4 font-semibold text-gray-600">Item</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="3" className="p-10 text-center text-gray-400">Loading history...</td></tr>
            ) : history.length === 0 ? (
              <tr><td colSpan="3" className="p-10 text-center text-gray-400">No transactions found for this customer.</td></tr>
            ) : (
              history.map((t, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(t.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 font-medium text-gray-800">{t.item_name}</td>
                  <td className="p-4 text-right font-bold text-red-600">₹{t.amount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerHistory;
*/
