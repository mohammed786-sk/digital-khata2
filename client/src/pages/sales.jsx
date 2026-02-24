import React, { useState, useEffect } from 'react';
import { apiRequest } from '../services/api';
import { useStaff } from '../context/StaffContext';

const Sales = () => {
  const { staffKey } = useStaff();
  const [productList, setProductList] = useState([]);
  const [selection, setSelection] = useState({ customerId: '', productName: '' });

  // 1. Fetch real products on mount
  useEffect(() => {
    apiRequest('/products').then(data => {
      if (Array.isArray(data)) setProductList(data);
    });
  }, []);

  const handleSale = async (e) => {
    e.preventDefault();
    const res = await apiRequest('/sales/sell', 'POST', selection, staffKey);
    if (res.remainingStock !== undefined) {
      alert("Sale Recorded!");
      setSelection({ customerId: '', productName: '' });
    } else {
      alert(res.error || "Sale failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4">Point of Sale</h1>
      <form onSubmit={handleSale} className="space-y-4">
        {/* Customer ID Input */}
        <input 
          type="number" 
          placeholder="Customer ID (from Search)" 
          className="w-full border p-2 rounded"
          value={selection.customerId}
          onChange={e => setSelection({...selection, customerId: e.target.value})}
          required
        />

        {/* Product Dropdown */}
        <select 
          className="w-full border p-2 rounded"
          value={selection.productName}
          onChange={e => setSelection({...selection, productName: e.target.value})}
          required
        >
          <option value="">-- Select Product --</option>
          {productList.map(p => (
            <option key={p._id} value={p.product_name}>
              {p.product_name} (₹{p.product_price}) - Stock: {p.stock}
            </option>
          ))}
        </select>

        <button className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">
          Confirm Sale
        </button>
      </form>
    </div>
  );
};

export default Sales;