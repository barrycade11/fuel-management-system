import { useEffect, useState } from "react";
import Table from "~/Components/Table";
import Dropdown from "~/Components/Dropdown";
import Notification from "~/Components/Notification";
import TableSkeleton from "~/Components/TableSkeleton";
import DropdownStatus from "~/Components/DropdownStatus";
import { Textarea, Input, Button, Spinner } from "@heroui/react";
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
  const [isSaving, setIsSaving] = useState(false);
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

    if (isSaving) return;
    setIsSaving(true);

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
    } finally {
      setIsSaving(false); 
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
    actions: (item) => (
      <Button 
      onPress={() => handleEdit(item)} 
      className="bg-blue-200 text-blue-800 rounded-lg hover:bg-blue-300"
      >
        Edit
      </Button>
    ),
    status: (value) => {
      return value ? "Active" : "Inactive";
    }
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
        <TableSkeleton columns={5} rows={5}/>
      ) : isEditing ? (
          <div className="h-screen flex justify-center items-center">
            <div className="bg-white p-6 w-96 h-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">{newPaymentMode.id ? "Edit" : "Add"} Payment Mode</h2>
              <Input 
                className="w-full mb-2" 
                label="Payment Code" 
                placeholder="Enter fuel code" 
                value={newPaymentMode.code}
                onChange={(e) => setNewPaymentMode({ ...newPaymentMode, code: e.target.value })}
                isRequired
              />
              <Input 
                className="w-full mb-2" 
                label="Payment Name" 
                placeholder="Enter fuel name" 
                value={newPaymentMode.name}
                onChange={(e) => setNewPaymentMode({ ...newPaymentMode, name: e.target.value })}
                isRequired
              />
              <Textarea 
                className="w-full mb-2" 
                label="Details" 
                placeholder="Enter Details" 
                value={newPaymentMode.details}
                onChange={(e) => setNewPaymentMode({ ...newPaymentMode, details: e.target.value })}
                isRequired
              />
              <label className="block text-sm font-medium">Status</label>
              <DropdownStatus
                className="w-full mb-2"
                value={Boolean(newPaymentMode.status)} 
                onChange={(val) => setNewPaymentMode({ ...newPaymentMode, status: val })} 
              />
              <div className="flex justify-between items-center w-full mt-2">
                {newPaymentMode.id ? (
                  <Button onClick={() => handleDelete(newPaymentMode.id)} color="danger">Delete</Button>
                ) : (
                  <div></div> 
                )}
                <div className="flex space-x-2">
                  <Button onClick={() => setIsEditing(false)} color="default" className="text-[blue]">Close</Button>
                  <Button 
                    onClick={handleSave} 
                    disabled={isSaving} 
                    isLoading={isSaving}
                    spinner={<Spinner size="sm" variant="wave" color="default" />}
                    spinnerPlacement="end"
                    color="primary"
                  >
                    {isSaving ? "Saving" : "Save"}
                  </Button>
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
