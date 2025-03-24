import { useEffect, useState } from "react";
import Table from "~/Components/Table";
import Dropdown from "~/Components/Dropdown";
import Notification from "~/Components/Notification";
import { 
  fetchPaymentModes, 
  fetchPaymentModeDetails, 
  createPaymentMode, 
  updatePaymentMode, 
  deletePaymentMode
} from "~/Hooks/Setup/GlobalRecords/PaymentMode/usePaymentModes";

const PaymentMode = () => {
  const [paymentModes, setPaymentModes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [notification, setNotification] = useState(null);
  const [newPaymentMode, setNewPaymentMode] = useState({  
    code: "", 
    name: "", 
    details: "", 
    status: true
  });

  const getPaymentModes = async () => {
    setLoading(true);
    try {
        const data = await fetchPaymentModes();
        setPaymentModes(data);
        // console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setLoading(false);
    }
};
  useEffect(() => {
      getPaymentModes();
  }, []);

  const handleAdd = () => {
    setNewPaymentMode({ 
      code: "", 
      name: "", 
      status: true
    });
    setIsEditing(true);
  };

  const handleEdit = async (paymentMode) => {
    try {
        setNewPaymentMode((prev) => ({
          ...prev,
          ...paymentMode
        }));

        setIsEditing(true);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
  };

  const handleSave = async () => {
    if (!newPaymentMode.code || !newPaymentMode.name || !newPaymentMode.details) {
        setNotification({ message: "All fields are required.", type: "error" });
        return;
    }

    try {
        if (newPaymentMode.id) {
            await updatePaymentMode(newPaymentMode.id, newPaymentMode);
        } else {
            const response = await createPaymentMode(newPaymentMode);
            setPaymentModes([...paymentModes, response[0]]); 
        }

        setIsEditing(false);
        setNotification({ message: "Save successful", type: "success" });

        getPaymentModes(); 
    } catch (error) {
        setNotification({ message: "Error saving data", type: "error" });
        console.error("Error saving data:", error);
    }
  };

  const handleDelete = (id) => {
    const handleConfirm = async () => {
        try {
            await deletePaymentMode(id);

            setIsEditing(false);
            setNotification({ message: "Record deleted successfully!", type: "success" });
            getPaymentModes(); 
            setPaymentModes((prevPaymentModes) => prevPaymentModes.filter(paymentMode => paymentMode.id !== id)); 
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
    { key: "code", label: "Payment Code", hidden: false },
    { key: "name", label: "Payment Name", hidden: false },
    { key: "details", label: "Details", hidden: false },
    { 
      key: "status", 
      label: "Status",
      render: (paymentMode) => {
        // console.log("Rendering status:", paymentMode.status);
        return paymentMode.status ? "Active" : "Inactive";
      },
      hidden: false
    }
  ];

  const customRender = {
    
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
              <h2 className="text-xl font-semibold mb-4">{newPaymentMode.id ? "Edit" : "Add"} Payment Mode</h2>
              <label className="block text-sm font-medium">Payment Code</label>
              <input
                type="text"
                value={newPaymentMode.code}
                onChange={(e) => setNewPaymentMode({ ...newPaymentMode, code: e.target.value })}
                className="w-full mb-2 p-2 border rounded"
              />
              <label className="block text-sm font-medium">Payment Name</label>
              <input
                type="text"
                value={newPaymentMode.name}
                onChange={(e) => setNewPaymentMode({ ...newPaymentMode, name: e.target.value })}
                className="w-full mb-2 p-2 border rounded"
              />
              <label className="block text-sm font-medium">Details</label>
              <textarea
                value={newPaymentMode.details}
                onChange={(e) => setNewPaymentMode({ ...newPaymentMode, details: e.target.value })}
                className="w-full mb-2 p-2 border rounded"
              />
              <label className="block text-sm font-medium">Status</label>
              <select
                value={newPaymentMode.status}
                onChange={(e) => setNewPaymentMode({ ...newPaymentMode, status: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
              <div className="flex justify-between items-center w-full">
                {newPaymentMode.id ? (
                  <button 
                    onClick={() => handleDelete(newPaymentMode.id)} 
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
          title="Payment Modes" 
          data={paymentModes} 
          columns={columns} 
          onEdit={handleEdit} 
          onAdd={handleAdd} 
          customRender={customRender} 
        />
      )}
    </div>
  );  
};

export default PaymentMode;
