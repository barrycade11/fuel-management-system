import React, { useState } from "react";

const FuelDelivery = () => {
  const [date, setDate] = useState("");
  const [station, setStation] = useState("SH Nuvali");
  const [shiftManager, setShiftManager] = useState("Feeney, Alice");
  const [shiftNo, setShiftNo] = useState("2nd Shift");
  const [receiver, setReceiver] = useState("Sample Receiver 1");
  
  const fuelData = [
    { id: 1, fuel: "VPR", price: 72.5, beginningDip: "14,284", endDip: "19,155", delivery: "5,000", grossIncrease: "4,871", interimSales: 51, shortOver: 0 },
    { id: 2, fuel: "VPG", price: 70.4, beginningDip: "", endDip: "", delivery: "", grossIncrease: "", interimSales: "", shortOver: "" },
    { id: 3, fuel: "VPD", price: 69.6, beginningDip: "", endDip: "", delivery: "", grossIncrease: "", interimSales: "", shortOver: "" },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm">Effective Date</label>
          <input type="date" className="w-full border p-2 rounded" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Station</label>
          <select className="w-full border p-2 rounded" value={station} onChange={(e) => setStation(e.target.value)}>
            <option>SH Nuvali</option>
            <option>Other Station</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">Shift Manager</label>
          <select className="w-full border p-2 rounded" value={shiftManager} onChange={(e) => setShiftManager(e.target.value)}>
            <option>Feeney, Alice</option>
            <option>Other Manager</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">Shift No.</label>
          <select className="w-full border p-2 rounded" value={shiftNo} onChange={(e) => setShiftNo(e.target.value)}>
            <option>2nd Shift</option>
            <option>1st Shift</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm">Delivery Receipt No.</label>
            <input
              type="text"
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm">Hauler</label>
            <input
              type="text"
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm">Plate No.</label>
            <input
              type="text"
              className="border px-2 py-1 rounded w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm">Driver</label>
            <input
              type="text"
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm">Receiver</label>
            <select className="w-full border p-2 rounded" value={receiver} onChange={(e) => setReceiver(e.target.value)}>
              <option>Sample Receiver 1</option>
              <option>Sample Receiver 2</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Tank Name</th>
              <th className="border p-2">Fuel</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Beginning Dip</th>
              <th className="border p-2">End Dip</th>
              <th className="border p-2">Delivery</th>
              <th className="border p-2">Gross Increase</th>
              <th className="border p-2">Interim Sales</th>
              <th className="border p-2">Short/Over</th>
            </tr>
          </thead>
          <tbody>
            {fuelData.map((row) => (
              <tr key={row.id}>
                <td className="border p-2 text-center">{row.id}</td>
                <td className="border p-2 text-center"><span className={`px-2 py-1 rounded text-white ${row.fuel === "VPR" ? "bg-red-500" : row.fuel === "VPG" ? "bg-green-500" : "bg-yellow-500"}`}>{row.fuel}</span></td>
                <td className="border p-2 text-center">{row.price}</td>
                <td className="border p-2 text-center">
                  <input
                    type="text"
                    className="border px-2 py-1 rounded w-full"
                    value={row.beginningDip}
                    onChange={(e) => handleInputChange(index, "beginningDip", e.target.value)}
                    placeholder="type here"
                  />
                </td>
                <td className="border p-2 text-center">
                  <input
                    type="text"
                    className="border px-2 py-1 rounded w-full"
                    value={row.endDip}
                    onChange={(e) => handleInputChange(index, "endDip", e.target.value)}
                    placeholder="type here"
                  />
                </td>
                <td className="border p-2 text-center">
                  <input
                    type="text"
                    className="border px-2 py-1 rounded w-full"
                    value={row.delivery}
                    onChange={(e) => handleInputChange(index, "delivery", e.target.value)}
                    placeholder="type here"
                  />
                </td>
                <td className="border p-2 text-center">
                  <input
                    type="text"
                    className="border px-2 py-1 rounded w-full"
                    value={row.grossIncrease}
                    onChange={(e) => handleInputChange(index, "grossIncrease", e.target.value)}
                    placeholder="type here"
                  />
                </td>
                <td className="border p-2 text-center">
                  <input
                    type="text"
                    className="border px-2 py-1 rounded w-full"
                    value={row.interimSales}
                    onChange={(e) => handleInputChange(index, "interimSales", e.target.value)}
                    placeholder="type here"
                  />
                </td>
                <td className="border p-2 text-center">{row.shortOver || <input className="border p-1 w-full" placeholder="type here" />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">+ Attachment</button>
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

export default FuelDelivery;
