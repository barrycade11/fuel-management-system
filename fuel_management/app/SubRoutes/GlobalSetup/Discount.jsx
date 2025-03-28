import { useEffect, useState } from "react";
import Table from "~/Components/Table";
import Dropdown from "~/Components/Dropdown";
import Notification from "~/Components/Notification";
import { 
  fetchDiscounts, 
  fetchDiscountDetails, 
  createDiscount, 
  updateDiscount, 
  deleteDiscount  
} from "~/Hooks/Setup/GlobalRecords/Discount/useDiscounts";
import { ClockIcon } from "lucide-react";

const Discount = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [notification, setNotification] = useState(null);
  const [newDiscount, setNewDiscount] = useState({  
    name: "", 
    startTime: "00:00",
    endTime: "00:00",
    details: "", 
    status: true
  });

  const getDiscounts = async () => {
    setLoading(true);
    try {
        const data = await fetchDiscounts();

        const formattedData = data.map(discount => ({
            ...discount,
            startTime: discount.starttime, 
            endTime: discount.endtime  
        }));

        setDiscounts(formattedData);
        // console.log(formattedData);
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setLoading(false);
    }
};
  useEffect(() => {
      getDiscounts();
  }, []);

  const handleAdd = () => {
    setNewDiscount({ 
      name: "", 
      startTime: "00:00",
      endTime: "00:00", 
      details: "", 
      status: true
    });
    setIsEditing(true);
  };

  const handleEdit = async (discount) => {
    try {
        setNewDiscount((prev) => ({
          ...prev,
          ...discount
        }));

        setIsEditing(true);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
  };

  const handleSave = async () => {
    if (!newDiscount.name || !newDiscount.startTime || !newDiscount.endTime || !newDiscount.details) {
        setNotification({ message: "All fields are required.", type: "error" });
        return;
    }

    try {
        if (newDiscount.id) {
            await updateDiscount(newDiscount.id, newDiscount);
        } else {
            const response = await createDiscount(newDiscount);
            setDiscounts([...discounts, response[0]]); 
        }

        setIsEditing(false);
        setNotification({ message: "Save successful", type: "success" });

        getDiscounts(); 
    } catch (error) {
        setNotification({ message: "Error saving data", type: "error" });
        console.error("Error saving data:", error);
    }
  };

  const handleDelete = (id) => {
    const handleConfirm = async () => {
        try {
            await deleteDiscount(id);

            setIsEditing(false);
            setNotification({ message: "Record deleted successfully!", type: "success" });
            getDiscounts(); 
            setDiscounts((prevDiscounts) => prevDiscounts.filter(discount => discount.id !== id)); 
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
    { key: "name", label: "Discount Name", hidden: false },
    { key: "startTime", label: "Start Time", hidden: false },
    { key: "endTime", label: "End Time", hidden: false },
    { key: "details", label: "Details", hidden: true },
    { 
      key: "status", 
      label: "Status",
      render: (discount) => {
        // console.log("Rendering status:", discount.status);
        return discount.status ? "Active" : "Inactive";
      },
      hidden: true
    }
  ];

  const customRender = {
    actions: (item) => (
      <button
        onClick={() => handleEdit(item)} 
        className="px-3 py-1 bg-blue-200 text-blue-800 rounded hover:bg-blue-300"
      >
        Edit
      </button>
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
              <h2 className="text-xl font-semibold mb-4">{newDiscount.id ? "Edit" : "Add"} Discount</h2>
              <label className="block text-sm font-medium">Discount Name</label>
              <input
                type="text"
                value={newDiscount.name}
                onChange={(e) => setNewDiscount({ ...newDiscount, name: e.target.value })}
                className="w-full mb-2 p-2 border rounded"
              />
              <div className="flex space-x-4">
                <div className="flex flex-col w-full">
                  <label className="text-sm font-medium mb-1">Start Discount</label>
                  <div className="relative flex items-center border rounded-lg px-2 py-1">
                    <TimePicker
                      value={newDiscount.startTime} 
                      onChange={(time) => setNewDiscount({ ...newDiscount, startTime: time })}
                      disableClock={true} 
                      clearIcon={null} 
                      format="HH:mm" 
                      className="w-full bg-transparent border-none focus:outline-none"
                    />
                    <ClockIcon className="absolute right-2 text-gray-500 w-5 h-5" />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-sm font-medium mb-1">End Discount</label>
                  <div className="relative flex items-center border rounded-lg px-2 py-1">
                    <TimePicker
                      value={newDiscount.endTime} 
                      onChange={(time) => setNewDiscount({ ...newDiscount, endTime: time })}
                      disableClock={true} 
                      clearIcon={null} 
                      format="HH:mm" 
                      className="w-full bg-transparent border-none focus:outline-none"
                    />
                    <ClockIcon className="absolute right-2 text-gray-500 w-5 h-5" />
                  </div>
                </div>
              </div>
              <label className="block text-sm font-medium">Details</label>
              <textarea
                value={newDiscount.details}
                onChange={(e) => setNewDiscount({ ...newDiscount, details: e.target.value })}
                className="w-full mb-2 p-2 border rounded"
              />
              <label className="block text-sm font-medium">Status</label>
              <select
                value={newDiscount.status}
                onChange={(e) => setNewDiscount({ ...newDiscount, status: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
              <div className="flex justify-between items-center w-full">
                {newDiscount.id ? (
                  <button 
                    onClick={() => handleDelete(newDiscount.id)} 
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
          title="Discounts" 
          data={discounts} 
          columns={columns} 
          onEdit={handleEdit} 
          onAdd={handleAdd} 
          customRender={customRender} 
        />
      )}
    </div>
  );  
};

export default Discount;
