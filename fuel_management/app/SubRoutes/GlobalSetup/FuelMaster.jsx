import { useEffect, useState } from "react";
import Table from "~/Components/Table";
import Dropdown from "~/Components/Dropdown";
import Notification from "~/Components/Notification";
import { 
  fetchFuelMasters, 
  fetchFuelMasterDetails, 
  createFuelMaster, 
  updateFuelMaster, 
  deleteFuelMaster 
} from "~/Hooks/Setup/GlobalRecords/FuelMaster/useFuelMasters";
import { fetchDropdownTypeList } from "~/Hooks/Setup/GlobalRecords/Dropdown/useDropdowns";

const FuelMaster = () => {
  const [fuels, setFuels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [notification, setNotification] = useState(null);
  const [newFuel, setNewFuel] = useState({ 
    code: "", 
    name: "", 
    categoryId: "", 
    details: "", 
    color: "#000000", 
    status: true
  });

  const getFuelMasters = async () => {
    setLoading(true);
    try {
        const data = await fetchFuelMasters();
        setFuels(data);
        // console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
      getFuelMasters();
  }, []);

  const handleAdd = () => {
    setNewFuel({ 
      code: "", 
      name: "", 
      categoryId: "", 
      details: "", 
      color: "#000000", 
      status: true 
    });
    setIsEditing(true);
  };

  const handleEdit = async (fuel) => {
    try {
        const categoryData = await fetchDropdownTypeList(3, fuel.categoryid); 

        if (categoryData.length > 0) {
            setNewFuel((prev) => ({
                ...prev,
                ...fuel,
                categoryId: categoryData[0].id, 
            }));

            setIsEditing(true);
        }
    } catch (error) {
        console.error("Error fetching category data:", error);
    }
  };

  const handleSave = async () => {
    if (!newFuel.code || !newFuel.name || !newFuel.categoryId || !newFuel.details || !newFuel.color) {
        setNotification({ message: "All fields are required.", type: "error" });
        return;
    }

    try {
        if (newFuel.id) {
            await updateFuelMaster(newFuel.id, newFuel);
        } else {
            const response = await createFuelMaster(newFuel);
            setFuels([...fuels, response[0]]); 
        }

        setIsEditing(false);
        setNotification({ message: "Save successful", type: "success" });

        getFuelMasters(); 
    } catch (error) {
        setNotification({ message: "Error saving data", type: "error" });
        console.error("Error saving data:", error);
    }
  };

  const handleDelete = (id) => {
    const handleConfirm = async () => {
        try {
            await deleteFuelMaster(id);

            setIsEditing(false);
            setNotification({ message: "Record deleted successfully!", type: "success" });
            getFuelMasters(); 
            setFuels((prevFuels) => prevFuels.filter(fuel => fuel.id !== id)); 
        } catch (error) {
            setNotification({ message: "Failed to delete record.", type: "error" });
            console.error("Error deleting record:", error);
        }
    };

    const handleCancel = () => {
        setNotification(null);
    };

    setNotification(prev => ({
      ...prev, 
      message: "Are you sure you want to delete this record?",
      type: "delete",
      onConfirm: handleConfirm, 
      onCancel: handleCancel,  
    }));
  };

  const columns = [
    { key: "id", label: "No.", hidden: true },
    { key: "code", label: "Fuel Code", hidden: false },
    { key: "name", label: "Fuel Name", hidden: false },
    { key: "category", label: "Category", hidden: true },
    { key: "details", label: "Details", hidden: false },
    { 
      key: "status", 
      label: "Status",
      render: (fuel) => {
        // console.log("Rendering status:", fuel.status);
        return fuel.status ? "Active" : "Inactive";
      },
      hidden: true
    }
  ];

  const customRender = {
    code: (value, row) => (
      <span className="px-3 py-1 text-white rounded-lg" style={{ backgroundColor: row.color }}>
        {value}
      </span>
    ),
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {notification && 
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)}
          onConfirm={notification.onConfirm} 
          onCancel={notification.onCancel}  
        />}
      {loading ? (
        <p>Loading...</p>
      ) : isEditing ? (
          <div className="h-screen flex justify-center items-center">
            <div className="bg-white p-6 w-96 h-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">{newFuel.id ? "Edit" : "Add"} Fuel</h2>
              <label className="block text-sm font-medium">Fuel Code</label>
              <input
                type="text"
                value={newFuel.code}
                onChange={(e) => setNewFuel({ ...newFuel, code: e.target.value })}
                className="w-full mb-2 p-2 border rounded" 
              />
              <label className="block text-sm font-medium">Fuel Name</label>
              <input
                type="text"
                value={newFuel.name}
                onChange={(e) => setNewFuel({ ...newFuel, name: e.target.value })}
                className="w-full mb-2 p-2 border rounded"
              />
              <label className="block text-sm font-medium">Fuel Category</label>
              <Dropdown 
                  typeId={3} 
                  value={newFuel.categoryId} 
                  onChange={(e) => setNewFuel({ ...newFuel, categoryId: e.target.value })} 
              />
              <label className="block text-sm font-medium">Details</label>
              <textarea
                value={newFuel.details}
                onChange={(e) => setNewFuel({ ...newFuel, details: e.target.value })}
                className="w-full mb-2 p-2 border rounded"
              />
              <label className="block text-sm font-medium">Assign Color</label>
              <input
                type="color"
                value={newFuel.color}
                onChange={(e) => setNewFuel({ ...newFuel, color: e.target.value })}
                className="w-full h-12 cursor-pointer"
              />
              <label className="block text-sm font-medium">Status</label>
              <select
                value={newFuel.status}
                onChange={(e) => setNewFuel({ ...newFuel, status: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
              <div className="flex justify-between items-center w-full">
                {newFuel.id ? (
                  <button 
                    onClick={() => handleDelete(newFuel.id)} 
                    className="text-red-500"
                  >
                    Delete...
                  </button>
                ) : (
                  <div></div> 
                )}
                <div className="flex space-x-2">
                  <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-300 text-blue-500 rounded-lg">Close</button>
                  <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Save</button>
                </div>
              </div>
            </div>
          </div>
      ) : (
        <Table 
          title="Fuels" 
          data={fuels} 
          columns={columns} 
          onEdit={handleEdit} 
          onAdd={handleAdd} 
          customRender={customRender} 
        />
      )}
    </div>
  );  
};

export default FuelMaster;
