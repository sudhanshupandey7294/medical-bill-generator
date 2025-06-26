
// --- FILE: src/pages/Admin.js ---
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Admin = () => {
  const [taxRate, setTaxRate] = useState(5);
  const [defaultDiscount, setDefaultDiscount] = useState(0);
  const [logo, setLogo] = useState(null);

  const [patients, setPatients] = useState([]);
  const [services, setServices] = useState([]);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/patients").then((res) => {
      setPatients(res.data);
    });

    axios.get("http://localhost:5000/api/services").then((res) => {
      setServices(res.data);
    });

    axios.get("http://localhost:5000/api/bills").then((res) => {
      setBills(res.data);
    });

    axios.get("http://localhost:5000/api/settings").then((res) => {
      setTaxRate(res.data.taxRate);
      setDefaultDiscount(res.data.defaultDiscount);
      setLogo(res.data.logoUrl);
    });
  }, []);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogo(reader.result); // base64 logo
    };
    if (file) reader.readAsDataURL(file);
  };

  const saveSettings = () => {
    axios.put("http://localhost:5000/api/settings", {
      taxRate,
      defaultDiscount,
      logoUrl: logo,
    }).then(() => alert("Settings updated successfully"));
  };

  const deletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/patients/${id}`);
      setPatients((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting patient:", err);
    }
  };

  const deleteService = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`);
      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error deleting service:", err);
    }
  };

  const deleteBill = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bills/${id}`);
      setBills((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting bill:", err);
    }
  };

  const getPatientName = (patientId) => {
    const patient = patients.find((p) => p._id === patientId);
    return patient ? patient.name : "Unknown";
  };

  return (
    <motion.div className="p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>

      <div className="bg-white p-4 rounded shadow space-y-6">
        <div>
          <label className="font-medium">Default Tax Rate (%)</label>
          <input
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(Number(e.target.value))}
            className="border w-full p-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="font-medium">Default Discount (₹)</label>
          <input
            type="number"
            value={defaultDiscount}
            onChange={(e) => setDefaultDiscount(Number(e.target.value))}
            className="border w-full p-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="font-medium">Upload Hospital Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="w-full mt-1"
          />
          {logo && <img src={logo} alt="Hospital Logo" className="mt-4 h-20 object-contain" />}
        </div>

        <button
          onClick={saveSettings}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Settings
        </button>

        <div>
          <h3 className="text-lg font-semibold">Manage Patients</h3>
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Age</th>
                <th className="border px-2 py-1">Gender</th>
                <th className="border px-2 py-1">Contact</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border px-2 py-1">{p.name}</td>
                  <td className="border px-2 py-1">{p.age}</td>
                  <td className="border px-2 py-1">{p.gender}</td>
                  <td className="border px-2 py-1">{p.contact}</td>
                  <td className="border px-2 py-1">
                    <button onClick={() => deletePatient(p._id)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Manage Services</h3>
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Category</th>
                <th className="border px-2 py-1">Price</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border px-2 py-1">{s.name}</td>
                  <td className="border px-2 py-1">{s.category}</td>
                  <td className="border px-2 py-1">₹{s.price}</td>
                  <td className="border px-2 py-1">
                    <button onClick={() => deleteService(s._id)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Bills History</h3>
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Patient</th>
                <th className="border px-2 py-1">Total (₹)</th>
                <th className="border px-2 py-1">Date</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((b, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border px-2 py-1">{getPatientName(b.patientId)}</td>
                  <td className="border px-2 py-1">₹{b.total}</td>
                  <td className="border px-2 py-1">{new Date(b.date).toLocaleDateString()}</td>
                  <td className="border px-2 py-1">
                    <button onClick={() => deleteBill(b._id)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Admin;

