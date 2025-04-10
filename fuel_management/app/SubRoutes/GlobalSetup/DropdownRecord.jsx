import { useEffect, useState } from "react";
import Table from "~/Components/DropdownTable";
import Notification from "~/Components/Notification";
import TableSkeleton from "~/Components/TableSkeleton";
import DropdownStatus from "~/Components/DropdownStatus";
import { Textarea, Input, Button } from "@heroui/react";

const DropdownRecord = () => {
  const [dropdownRecords, setDropdownRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [notification, setNotification] = useState(null);
  const [selectedDropdownKey, setSelectedDropdownKey] = useState(1);
  const [newDropdownRecord, setNewDropdownRecord] = useState({ 
    name: "", 
    details: "", 
    status: true
  });

  const getDropdownRecords = async () => {
    if (!selectedDropdownKey) return;
    setLoading(true);
    try {
        const data = await fetchDropdownRecords(selectedDropdownKey); 
        setDropdownRecords(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
      getDropdownRecords();
  }, [selectedDropdownKey]);


  const handleAdd = () => {
    setNewDropdownRecord({ 
      name: "", 
      details: "", 
      status: true 
    });
    setIsEditing(true);
  };

  const handleEdit = async (dropdownRecord) => {
    try {
        setNewDropdownRecord(dropdownRecord);
        setIsEditing(true);
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
  };

  const handleSave = async () => {
    if ( !newDropdownRecord.name || !newDropdownRecord.details ) {
        setNotification({ message: "All fields are required.", type: "error" });
        return;
    }

    try {
        if (newDropdownRecord.id) {
            await updateDropdownRecord(newDropdownRecord.id, newDropdownRecord);
        } else {
            const response = await createDropdownRecord(newDropdownRecord);
            setDropdownRecords([...dropdownRecords, response[0]]); 
        }

        setIsEditing(false);
        setNotification({ message: "Save successful", type: "success" });

        getDropdownRecords(); 
    } catch (error) {
        setNotification({ message: "Error saving data", type: "error" });
        console.error("Error saving data:", error);
    }
  };

  const handleDelete = (id) => {
    const handleConfirm = async () => {
        try {
            await deleteDropdownRecord(id);

            setIsEditing(false);
            setNotification({ message: "Record deleted successfully!", type: "success" });
            getDropdownRecords(); 
            setDropdownRecords((prevDropdownRecords) => prevDropdownRecords.filter(dropdownRecord => dropdownRecord.id !== id)); 
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
    { key: "name", label: "Name", hidden: false },
    { key: "details", label: "Details", hidden: false },
    { key: "status", label: "Status", hidden: true }
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
        <TableSkeleton columns={3} rows={5}/>
      ) : isEditing ? (
          <div className="h-screen flex justify-center items-center">
            <div className="bg-white p-6 w-96 h-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">{newDropdownRecord.id ? "Edit" : "Add"} Dropdown Record</h2>
              <Input 
                className="w-full mb-2" 
                label="Name" 
                placeholder="Enter Name" 
                value={newDropdownRecord.name}
                onChange={(e) => setNewDropdownRecord({ ...newDropdownRecord, name: e.target.value })}
                isRequired
              />
              <Textarea 
                className="w-full mb-2" 
                label="Details" 
                placeholder="Enter Details" 
                value={newDropdownRecord.details}
                onChange={(e) => setNewDropdownRecord({ ...newDropdownRecord, details: e.target.value })}
                isRequired
              />
              <DropdownStatus
                className="w-full mb-2"
                value={Boolean(newDropdownRecord.status)} 
                onChange={(val) => setNewDropdownRecord({ ...newDropdownRecord, status: val })} 
              />
              <div className="flex justify-between items-center w-full mt-2">
                {newDropdownRecord.id ? (
                  <Button onClick={() => handleDelete(newDropdownRecord.id)} color="danger">Delete</Button>
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
          data={dropdownRecords} 
          columns={columns} 
          onEdit={handleEdit} 
          onAdd={handleAdd} 
          customRender={customRender} 
          selectedDropdownKey={selectedDropdownKey}
          setSelectedDropdownKey={setSelectedDropdownKey} 
        />
      )}
    </div>
  );  
};

export default DropdownRecord;
