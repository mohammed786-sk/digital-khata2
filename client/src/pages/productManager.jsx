import React, { useState, useEffect } from 'react';
import { apiRequest } from '../services/api';
import { useStaff } from '../context/StaffContext';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ product_name: '', product_price: '', stock: '' });
  const { staffKey } = useStaff();

  const load = async () => {
    // Note: You would normally have a GET /products route, 
    // for this demo we fetch from the lowStock endpoint if needed or a dedicated one
    const res = await apiRequest('/analytics');
    // Using items found in analytics for demo
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await apiRequest('/products/add', 'POST', form, staffKey);
    setForm({ product_name: '', product_price: '', stock: '' });
    alert("Product Added!");
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
    <div className="max-w-2xl bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Inventory Management (Staff Only)</h1>
      <form onSubmit={handleAdd} className="space-y-4">
        <input className="w-full border p-2" placeholder="Item Name" value={form.product_name} onChange={e => setForm({...form, product_name: e.target.value})} />
        <input className="w-full border p-2" type="number" placeholder="Price" value={form.product_price} onChange={e => setForm({...form, product_price: e.target.value})} />
        <input className="w-full border p-2" type="number" placeholder="Stock" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} />
        <button className="bg-green-600 text-white w-full py-2 font-bold">Add to Catalog</button>
      </form>
    </div>
    </div>
  );
};

export default ProductManager;