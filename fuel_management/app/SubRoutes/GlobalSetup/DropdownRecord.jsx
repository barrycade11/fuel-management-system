import { useEffect, useState } from "react";
import Table from "~/Components/DropdownTable";
import Notification from "~/Components/Notification";
import TableSkeleton from "~/Components/TableSkeleton";
import DropdownStatus from "~/Components/DropdownStatus";
import { Textarea, Input, Button } from "@heroui/react";
import { 
  fetchDropdowns, 
  createDropdown, 
  updateDropdown, 
  deleteDropdown 
} from "~/Hooks/Setup/GlobalRecords/Dropdown/useDropdowns"; // Import your API functions
import { DropdownType } from "~/Constants/Enums";

const DropdownRecord = () => {
  const [dropdownRecords, setDropdownRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [selectedDropdownKey, setSelectedDropdownKey] = useState("1"); // Default to 1 or whatever ID you want
  // const [selectedDropdownLabel, setSelectedDropdownLabel] = useState("");
  const [newDropdownRecord, setNewDropdownRecord] = useState({ 
    name: "", 
    details: "",
    status: true 
  });

  const dropdownOptions = Object.entries(DropdownType)
  .filter(([key, value]) => !isNaN(Number(value))) 
  .map(([key, value]) => ({
    label: key.replace(/([A-Z])/g, " $1").trim(), 
    key: value.toString(),
  }));

  const selectedDropdownLabel = dropdownOptions.find((opt) => opt.key === selectedDropdownKey)?.label || "Dropdown Record";

  // Fetch dropdown records when the selected dropdown key changes
  const getDropdownRecords = async () => {
    if (!selectedDropdownKey) return; // Prevent empty fetch

    setLoading(true);
    try {
      const data = await fetchDropdowns(selectedDropdownKey); // Fetch the records using the API function
      setDropdownRecords(data); 
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the dropdown records when the component mounts or selectedDropdownKey changes
  useEffect(() => {
    getDropdownRecords();
  }, [selectedDropdownKey]);

  useEffect(() => {
    setNewDropdownRecord({ name: "", status: true }); // Reset form when switching dropdowns
  }, [selectedDropdownKey]);
  
  // Handle adding a new dropdown record
  const handleAdd = () => {
    setNewDropdownRecord({ 
      name: "", 
      details: "", 
      status: true 
    });
    setIsEditing(true);
  };

  // Handle editing an existing dropdown record
  const handleEdit = async (dropdownRecord) => {
    setNewDropdownRecord(dropdownRecord);
    setIsEditing(true);
  };

  // Handle saving a new or updated dropdown record
  const handleSave = async () => {
    if (!newDropdownRecord.name) {
      setNotification({ message: "All fields are required.", type: "error" });
      return;
    }

    try {
      if (newDropdownRecord.id) {
        await updateDropdown(selectedDropdownKey, newDropdownRecord.id, newDropdownRecord); // Update the record
      } else {
        const response = await createDropdown(selectedDropdownKey, newDropdownRecord); // Create a new record
        setDropdownRecords([...dropdownRecords, response[0]]); // Update the dropdown records with the new record
      }

      setIsEditing(false);
      setNotification({ message: "Save successful", type: "success" });

      getDropdownRecords(); // Refresh the records after save
    } catch (error) {
      setNotification({ message: "Error saving data", type: "error" });
      console.error("Error saving data:", error);
    }
  };

  // Handle the deletion of a record
  const handleDelete = (id) => {
    const handleConfirm = async () => {
      try {
        await deleteDropdown(selectedDropdownKey, id); // Delete the record using the API function
        setIsEditing(false);
        setNotification({ message: "Record deleted successfully!", type: "success" });
        getDropdownRecords(); // Refresh after deletion
        setDropdownRecords((prevRecords) => prevRecords.filter(record => record.id !== id)); // Remove from local state
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
      onCancel: handleCancel
    }));
  };

  // Columns for the table display
  const columns = [
    { key: "id", label: "No.", hidden: false },
    { key: "name", label: "Name", hidden: false },
    { key: "details", label: "Details", hidden: true },
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

  // Custom rendering of actions and status
  const customRender = {
    actions: (item) => (
      <Button 
        onPress={() => handleEdit(item)} 
        className="bg-blue-200 text-blue-800 rounded-lg hover:bg-blue-300"
      >
        Edit
      </Button>
    ),
    status: (value) => value ? "Active" : "Inactive"
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
        <TableSkeleton columns={3} rows={5} />
      ) : isEditing ? (
        <div className="h-screen flex justify-center items-center">
          <div className="bg-white p-6 w-96 h-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">{newDropdownRecord.id ? "Edit" : "Add"} {selectedDropdownLabel}</h2>
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
