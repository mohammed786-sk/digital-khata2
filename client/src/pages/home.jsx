import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-6">Digital-Khata Ledger</h1>
        <p className="text-xl text-gray-600 mb-8">
          Bridging SQL reliability with NoSQL flexibility for local commerce.
        </p>
        {/* Replace the [Product Demo Video] div with this */}
        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl mb-8 bg-black">
          <video className="w-full h-full object-cover"
          autoPlay
          muted
          loop>
          <source src="/product_demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
          </video>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 text-white text-lg px-10 py-4 rounded-full font-bold shadow-lg hover:bg-blue-700"
        >
          Launch Dashboard
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-12 border-t pt-12">
        <div>
          <h2 className="text-2xl font-bold mb-4 underline decoration-blue-500">
            Our Vision
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To modernize the "Khata" system for small grocery stores (like
            Khanapur's Kaka Grocery), ensuring stock updates are atomic and
            debts are never lost between system crashes.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 underline decoration-blue-500">
            Run Locally
          </h2>
          <pre className="bg-gray-100 p-4 rounded text-sm">
            1. npm install
            <br />
            2. Configure .env (SQL & Mongo)
            <br />
            3. node seed.js
            <br />
            4. npm start
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Home;
