import React, { useState } from "react";

const FuelPrice = () => {
  const [fuels, setFuels] = useState([
    { code: "VPR", name: "V-Power Racing", currentPrice: 72.50, newPrice: 72.50, remarks: "no changes" },
    { code: "VPG", name: "V-Power Gasoline", currentPrice: 70.60, newPrice: "", remarks: "" },
    { code: "VPD", name: "V-Power Diesel", currentPrice: 68.50, newPrice: "", remarks: "" },
    { code: "FSG", name: "Fuel Save Gasoline", currentPrice: 69.08, newPrice: "", remarks: "" },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedFuels = [...fuels];
    updatedFuels[index][field] = value;
    setFuels(updatedFuels);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Effective Date */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Effective Date</label>
        <input type="date" className="border rounded-md px-3 py-2 w-60 mt-1" defaultValue="2025-03-02" />
      </div>

      {/* Fuel Price Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Fuel</th>
              <th className="p-2">Current Price (02/25/2025)</th>
              <th className="p-2">New Price (RSOP) 03/02/2025</th>
              <th className="p-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {fuels.map((fuel, index) => (
              <tr key={fuel.code} className="text-center">
                <td className="border p-2">
                  <span className={`px-3 py-1 rounded-full text-white font-bold ${fuel.code === "VPR" ? "bg-red-400" : fuel.code === "VPG" ? "bg-green-400" : fuel.code === "VPD" ? "bg-yellow-400" : "bg-blue-400"}`}>
                    {fuel.code}
                  </span>
                </td>
                <td className="border p-2">{fuel.currentPrice.toFixed(2)}</td>
                <td className="border p-2">
                  <input
                    type="text"
                    className="border px-2 py-1 rounded w-full"
                    value={fuel.newPrice}
                    onChange={(e) => handleInputChange(index, "newPrice", e.target.value)}
                    placeholder="type here"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    className="border px-2 py-1 rounded w-full"
                    value={fuel.remarks}
                    onChange={(e) => handleInputChange(index, "remarks", e.target.value)}
                    placeholder="type here"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details / Remarks */}
      <div className="mt-4">
        <label className="block text-gray-700 font-semibold">Details</label>
        <textarea className="border rounded-md px-3 py-2 w-150 mt-1" placeholder="Remarks etc."></textarea>
      </div>
      <div className="flex justify-end items-center gap-2 mb-4">
        <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Back</button>
        <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">Delete</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Save</button>
        <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">View History</button>
      </div>
    </div>
  );
};

export default FuelPrice;
