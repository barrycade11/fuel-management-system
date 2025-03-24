import { useEffect, useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "~/timepicker.css";
import Table from "~/Components/Table";
import Dropdown from "~/Components/Dropdown";
import Notification from "~/Components/Notification";
import { 
  fetchShifts, 
  fetchShiftDetails, 
  createShift, 
  updateShift, 
  deleteShift  
} from "~/Hooks/Setup/GlobalRecords/Shift/useShifts";
import { ClockIcon } from "lucide-react";

const Shift = () => {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [notification, setNotification] = useState(null);
  const [newShift, setNewShift] = useState({  
    name: "", 
    startTime: "00:00",
    endTime: "00:00",
    details: "", 
    status: true
  });

  const getShifts = async () => {
    setLoading(true);
    try {
        const data = await fetchShifts();

        const formattedData = data.map(shift => ({
            ...shift,
            startTime: shift.starttime, 
            endTime: shift.endtime  
        }));

        setShifts(formattedData);
        // console.log(formattedData);
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setLoading(false);
    }
};
  useEffect(() => {
      getShifts();
  }, []);

  const handleAdd = () => {
    setNewShift({ 
      name: "", 
      startTime: "00:00",
      endTime: "00:00", 
      details: "", 
      status: true
    });
    setIsEditing(true);
  };

  const handleEdit = async (shift) => {
    try {
        setNewShift((prev) => ({
          ...prev,
          ...shift
        }));

        setIsEditing(true);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
  };

  const handleSave = async () => {
    if (!newShift.name || !newShift.startTime || !newShift.endTime || !newShift.details) {
        setNotification({ message: "All fields are required.", type: "error" });
        return;
    }

    try {
        if (newShift.id) {
            await updateShift(newShift.id, newShift);
        } else {
            const response = await createShift(newShift);
            setShifts([...shifts, response[0]]); 
        }

        setIsEditing(false);
        setNotification({ message: "Save successful", type: "success" });

        getShifts(); 
    } catch (error) {
        setNotification({ message: "Error saving data", type: "error" });
        console.error("Error saving data:", error);
    }
  };

  const handleDelete = (id) => {
    const handleConfirm = async () => {
        try {
            await deleteShift(id);

            setIsEditing(false);
            setNotification({ message: "Record deleted successfully!", type: "success" });
            getShifts(); 
            setShifts((prevShifts) => prevShifts.filter(shift => shift.id !== id)); 
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
    { key: "name", label: "Shift Name", hidden: false },
    { key: "startTime", label: "Start Time", hidden: false },
    { key: "endTime", label: "End Time", hidden: false },
    { key: "details", label: "Details", hidden: true },
    { 
      key: "status", 
      label: "Status",
      render: (shift) => {
        // console.log("Rendering status:", shift.status);
        return shift.status ? "Active" : "Inactive";
      },
      hidden: true
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
              <h2 className="text-xl font-semibold mb-4">{newShift.id ? "Edit" : "Add"} Shift</h2>
              <label className="block text-sm font-medium">Shift Name</label>
              <input
                type="text"
                value={newShift.name}
                onChange={(e) => setNewShift({ ...newShift, name: e.target.value })}
                className="w-full mb-2 p-2 border rounded"
              />
              <div className="flex space-x-4">
                <div className="flex flex-col w-full">
                  <label className="text-sm font-medium mb-1">Start Shift</label>
                  <div className="relative flex items-center border rounded-lg px-2 py-1">
                    <TimePicker
                      value={newShift.startTime} 
                      onChange={(time) => setNewShift({ ...newShift, startTime: time })}
                      disableClock={true} 
                      clearIcon={null} 
                      format="HH:mm" 
                      className="w-full bg-transparent border-none focus:outline-none"
                    />
                    <ClockIcon className="absolute right-2 text-gray-500 w-5 h-5" />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-sm font-medium mb-1">End Shift</label>
                  <div className="relative flex items-center border rounded-lg px-2 py-1">
                    <TimePicker
                      value={newShift.endTime} 
                      onChange={(time) => setNewShift({ ...newShift, endTime: time })}
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
                value={newShift.details}
                onChange={(e) => setNewShift({ ...newShift, details: e.target.value })}
                className="w-full mb-2 p-2 border rounded"
              />
              <label className="block text-sm font-medium">Status</label>
              <select
                value={newShift.status}
                onChange={(e) => setNewShift({ ...newShift, status: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
              <div className="flex justify-between items-center w-full">
                {newShift.id ? (
                  <button 
                    onClick={() => handleDelete(newShift.id)} 
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
          title="Shifts" 
          data={shifts} 
          columns={columns} 
          onEdit={handleEdit} 
          onAdd={handleAdd} 
          customRender={customRender} 
        />
      )}
    </div>
  );  
};

export default Shift;
