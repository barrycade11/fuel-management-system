import { useEffect, useState } from "react";
import Table from "~/Components/Table";
import Dropdown from "~/Components/Dropdown";
import Notification from "~/Components/Notification";
import TableSkeleton from "~/Components/TableSkeleton";
import DropdownStatus from "~/Components/DropdownStatus";
import { Textarea, Input, Button } from "@heroui/react";
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
        const categoryData = await fetchDropdownTypeList(3, 0, fuel.categoryid); 

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
    actions: (item) => (
      <Button 
      onClick={() => handleEdit(item)} 
      className="bg-blue-200 text-blue-800 rounded-lg hover:bg-blue-300"
      >
        Edit
      </Button>
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
        // <p>Loading...</p>
        <TableSkeleton columns={4} rows={5}/>
      ) : isEditing ? (
          <div className="h-screen flex justify-center items-center">
            <div className="bg-white p-6 w-96 h-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">{newFuel.id ? "Edit" : "Add"} Fuel</h2>
              <Input 
                className="w-full mb-2" 
                label="Fuel Code" 
                placeholder="Enter fuel code" 
                value={newFuel.code}
                onChange={(e) => setNewFuel({ ...newFuel, code: e.target.value })}
                isRequired
              />
              <Input 
                className="w-full mb-2" 
                label="Fuel Name" 
                placeholder="Enter fuel name" 
                value={newFuel.name}
                onChange={(e) => setNewFuel({ ...newFuel, name: e.target.value })}
                isRequired
              />
              <Dropdown 
                  label="Fuel Category"
                  typeId={3} 
                  parentId={0} 
                  value={newFuel.categoryId} 
                  onChange={(e) => setNewFuel({ ...newFuel, categoryId: e.target.value })} 
              />
              <Textarea 
                className="w-full mb-2" 
                label="Details" 
                placeholder="Enter Details" 
                value={newFuel.details}
                onChange={(e) => setNewFuel({ ...newFuel, details: e.target.value })}
                isRequired
              />
              <Input 
                type="color"
                className="w-full mb-2 cursor-pointer" 
                label="Assign Color" 
                value={newFuel.color}
                onChange={(e) => setNewFuel({ ...newFuel, color: e.target.value })}
                isRequired
              />
              <DropdownStatus
                className="w-full mb-2"
                value={Boolean(newFuel.status)} 
                onChange={(val) => setNewFuel({ ...newFuel, status: val })} 
              />
              <div className="flex justify-between items-center w-full mt-2">
                {newFuel.id ? (
                  <Button onClick={() => handleDelete(newFuel.id)} color="danger">Delete</Button>
                ) : (
                  <div></div> 
                )}
                <div className="flex space-x-2">
                  <Button onClick={() => setIsEditing(false)} color="default" className="text-[blue]">Close</Button>
                  <Button onClick={handleSave} color="primary">Save</Button>
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
