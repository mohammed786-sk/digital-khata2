import React, { useState } from 'react';
import { apiRequest } from '../services/api';
import { useStaff } from '../context/StaffContext';

const CustomerManager = () => {
  const [form, setForm] = useState({ customer_name: '', phone: '' });
  const { staffKey } = useStaff();

  const handleAdd = async (e) => {
    e.preventDefault();

    const payload = {
      customer_name: form.customer_name,
      phone: form.phone,
    };
    const res = await apiRequest('/customers/register', 'POST', payload, staffKey);
    if(res.result) alert(`Customer Saved with ID: ${res.result}`);
    else alert(res.error);
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
    <div className= "max-w-2xl bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Customer Registration (Staff Only)</h1>
      <form onSubmit={handleAdd} className="space-y-4">
        <input className="w-full border p-2" placeholder="Full Name" value={form.customer_name} onChange={e => setForm({...form, customer_name: e.target.value})} />
        <input className="w-full border p-2" placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
        <button className="bg-blue-600 text-white w-full py-2 font-bold">Register Customer</button>
      </form>
    </div>
    </div>
  );
};

export default CustomerManager;