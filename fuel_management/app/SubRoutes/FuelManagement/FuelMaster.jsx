import { useState } from "react";
import { SearchIcon, SettingsIcon } from "lucide-react";

const FuelMaster = () => {
  const [search, setSearch] = useState("");
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    code: true,
    name: true,
    details: true,
  });
  const [showFilter, setShowFilter] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingFuel, setEditingFuel] = useState(null);
  const [formData, setFormData] = useState({ code: "", name: "", details: "", color: "#000000" });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const handleSearch = (e) => setSearch(e.target.value);
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleColorChange = (e) => setFormData({ ...formData, color: e.target.value });

  // Add / Edit 
  const handleAddFuel = () => {
    if (editingFuel) {
      setFuels(fuels.map(fuel => 
        fuel.id === editingFuel.id ? { ...fuel, ...formData } : fuel
      ));
    } else {
      const existingFuel = fuels.find(fuel => fuel.code === formData.code);
      
      if (existingFuel) {
        setFuels(fuels.map(fuel =>
          fuel.code === formData.code ? { ...fuel, ...formData } : fuel
        ));
      } else {
        const newId = fuels.length > 0 ? Math.max(...fuels.map(fuel => fuel.id)) + 1 : 1;
        setFuels([...fuels, { id: newId, ...formData }]);
      }
    }
  
    setIsAdding(false);
    setEditingFuel(null);
    setFormData({ code: "", name: "", details: "", color: "#000000" });
  };

  const handleEditFuel = (fuel) => {
    setEditingFuel(fuel);
    setFormData(fuel);
    setIsAdding(true);
  };

  const handleClose = () => {
    setIsAdding(false);
    setEditingFuel(null);
    setFormData({ code: "", name: "", details: "", color: "#000000" });
  };

  // Dummy data 
  const [fuels, setFuels] = useState([
    { id: 1, code: "VPR", name: "Shell V-Power Racing", details: "Fuel Specifications etc.", color: "#ff0000" },
    { id: 2, code: "VPG", name: "Shell V-Power Gasoline", details: "Fuel Specifications etc.", color: "#00ff00" },
    { id: 3, code: "VPD", name: "Shell V-Power Diesel", details: "Fuel Specifications etc.", color: "#ffff00" },
    { id: 4, code: "FSG", name: "Fuel Specification Gas", details: "Fuel Specifications etc.", color: "#008080" },
    { id: 5, code: "FSD", name: "Fuel Specification Diesel", details: "Fuel Specifications etc.", color: "#00ffff" },
  ]);

  const filteredFuels = fuels.filter(
    (fuel) =>
      fuel.name.toLowerCase().includes(search.toLowerCase()) ||
      fuel.code.toLowerCase().includes(search.toLowerCase()) ||
      fuel.details.toLowerCase().includes(search.toLowerCase())
  );
  const toggleColumn = (col) => {
    setVisibleColumns((prev) => ({ ...prev, [col]: !prev[col] }));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {!isAdding ? (
        <>
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Fuels</h2>

            <div className="flex items-center space-x-2">
              <div className="relative flex bg-gray-100 rounded-lg px-3 py-2 w-72 border">
                <input
                  type="text"
                  placeholder="Search Table"
                  value={search}
                  onChange={handleSearch}
                  className="flex-grow bg-transparent focus:outline-none"
                />
                <div className="p-1 rounded-lg">
                  <SearchIcon size={18} />
                </div>
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="p-1 rounded-lg hover:bg-gray-200 relative"
                >
                  <SettingsIcon size={18} />
                </button>
                {showFilter && (
                  <div className="absolute right-0 mt-10 w-48 bg-white shadow-lg rounded-lg p-2 z-10">
                    <p className="text-sm font-semibold mb-2">Columns to Display</p>
                    {Object.keys(visibleColumns).map((col) => (
                      <label key={col} className="flex items-center space-x-2 mb-1">
                        <input
                          type="checkbox"
                          checked={visibleColumns[col]}
                          onChange={() => toggleColumn(col)}
                        />
                        <span>{col.charAt(0).toUpperCase() + col.slice(1)}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={() => { setIsAdding(true); setEditingFuel(null); setFormData(initialFormData); }} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                + Add new
              </button>
            </div>
          </div>

          {/* Table Section */}
          <table className="w-full border-collapse border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                {visibleColumns.id && <th className="p-2 border">No.</th>}
                {visibleColumns.code && <th className="p-2 border">Fuel Code</th>}
                {visibleColumns.name && <th className="p-2 border">Fuel Name</th>}
                {visibleColumns.details && <th className="p-2 border">Details</th>}
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFuels.map((fuel) => (
                <tr key={fuel.id} className="text-center border">
                  {visibleColumns.id && <td className="p-2 border">{fuel.id}</td>}
                  {visibleColumns.code && (
                    <td className="p-2 border">
                      <span className="px-3 py-1 text-white rounded-lg" style={{ backgroundColor: fuel.color }}>{fuel.code}</span>
                    </td>
                  )}
                  {visibleColumns.name && <td className="p-2 border">{fuel.name}</td>}
                  {visibleColumns.details && <td className="p-2 border">{fuel.details}</td>}
                  <td className="p-2 border">
                    <button
                      onClick={() => {
                        setFormData(fuel); 
                        setIsAdding(true);
                      }}
                      className="px-3 py-1 bg-blue-200 text-blue-800 rounded hover:bg-blue-300"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </>
      ) : (
        // Add/Edit Section 
        <div className="p-4 border rounded-lg bg-gray-50 w-full max-w-md mx-auto">

          <h2 className="text-xl font-semibold mb-4">{editingFuel ? "Edit Fuel" : "Add Fuel"}</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium">Fuel Code</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Fuel Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Details</label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Assign Color</label>
              <div className="relative flex items-center">
                <input type="color" value={formData.color} onChange={handleColorChange} className="w-15 cursor-pointer" />
              </div>
              {showColorPicker && <input type="color" value={formData.color} onChange={handleColorChange} className="mt-2" />}
            </div>

            <div className="flex justify-between items-center mt-6 border-t pt-4">
            <button className="text-red-600 hover:underline">Delete...</button>
            <div className="space-x-4">
              <button onClick={handleClose} className="text-blue-500 hover:underline">Close</button>
              <button onClick={handleAddFuel} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Save</button>
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FuelMaster;