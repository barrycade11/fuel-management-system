const Lubricants = () => {
  const lubricants = [
    { id: "LUB-00001", name: "Adv4TUltSc5W40SNMB_12*1L_A685", brand: "Advance", type: "A. Top" },
    { id: "LUB-00002", name: "Advance 4T Fuel Save 10w30 12×1", brand: "Advance", type: "A. Top" },
    { id: "LUB-00003", name: "Advance 4T Long Ride 10w40 12×1", brand: "Advance", type: "A. Top" },
    { id: "LUB-00004", name: "Advance 4T Power 15w-50 12×1", brand: "Advance", type: "A. Top" },
    { id: "LUB-00005", name: "Advance 4T Ultra 10W-40 12×1", brand: "Advance", type: "A. Top" },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Lubricants</h2>
        <div className="flex justify-end items-center gap-2 mb-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">+ Add new</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Brands</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Lube Type</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border border-gray-300">
                ID 
              </th>
              <th className="p-3 border border-gray-300">
                Product Name 
              </th>
              <th className="p-3 border border-gray-300">
                Brand 
              </th>
              <th className="p-3 border border-gray-300">
                Lube Type 
              </th>
              <th className="p-3 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {lubricants.map((item) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="p-3 border border-gray-300">{item.id}</td>
                <td className="p-3 border border-gray-300">{item.name}</td>
                <td className="p-3 border border-gray-300">{item.brand}</td>
                <td className="p-3 border border-gray-300">{item.type}</td>
                <td className="p-3 border border-gray-300">
                <button className="px-3 py-1 bg-blue-200 text-blue-800 rounded hover:bg-blue-300">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lubricants;
