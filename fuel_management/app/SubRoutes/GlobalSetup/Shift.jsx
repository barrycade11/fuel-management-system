import { useEffect, useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "~/timepicker.css";
import Table from "~/Components/Table";
import Dropdown from "~/Components/Dropdown";
import Notification from "~/Components/Notification";
import TableSkeleton from "~/Components/TableSkeleton";
import DropdownStatus from "~/Components/DropdownStatus";
import TimeInput from "~/Components/TimeInput";
import { Textarea, Input, Button, Spinner } from "@heroui/react";
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
  const [isSaving, setIsSaving] = useState(false);
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
      startTime: "00:00:00",
      endTime: "00:00:00", 
      details: "", 
      status: true
    });
    setIsEditing(true);
  };

  const handleEdit = async (shift) => {
    try {
        setNewShift((prev) => ({
          ...prev,
          ...shift, 
          startTime: ensureTimeFormat(shift.startTime),
          endTime: ensureTimeFormat(shift.endTime)
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

    if (isSaving) return;
    setIsSaving(true);

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
    } finally {
      setIsSaving(false); 
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

  const ensureTimeFormat = (timeString) => {
    if (!timeString) return "00:00:00";
    
    const parts = timeString.split(':');
    if (parts.length === 2) {
      return `${parts[0]}:${parts[1]}:00`; 
    }
    return timeString; 
  };

  const formatTime = (timeString) => {
    if (!timeString) return "-";
    
    const [hours, minutes] = timeString.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const customRender = {
    startTime: (item) => formatTime(item),
    endTime: (item) => formatTime(item),
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
        <TableSkeleton columns={4} rows={5}/>
      ) : isEditing ? (
          <div className="h-screen flex justify-center items-center">
            <div className="bg-white p-6 w-96 h-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">{newShift.id ? "Edit" : "Add"} Shift</h2>
              <Input 
                className="w-full mb-2" 
                label="Shift Name" 
                placeholder="Enter shift name" 
                value={newShift.name}
                onChange={(e) => setNewShift({ ...newShift, name: e.target.value })}
                isRequired
              />
              <div className="flex space-x-4 mb-2">
                <div className="flex flex-col w-full">
                  <div className="relative flex items-center rounded-lg">
                    <TimeInput 
                      isRequired 
                      label="Start Shift" 
                      value={newShift.startTime} 
                      onChange={(time) => setNewShift({ ...newShift, startTime: time })}
                    />
                    <ClockIcon className="absolute right-2 text-gray-500 w-5 h-5" />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="relative flex items-center rounded-lg">
                    <TimeInput 
                      isRequired 
                      label="End Shift" 
                      value={newShift.endTime} 
                      onChange={(time) => setNewShift({ ...newShift, endTime: time })}
                    />
                    <ClockIcon className="absolute right-2 text-gray-500 w-5 h-5" />
                  </div>
                </div>
              </div>
              <Textarea 
                className="w-full mb-2" 
                label="Details" 
                placeholder="Enter Details" 
                value={newShift.details}
                onChange={(e) => setNewShift({ ...newShift, details: e.target.value })}
                isRequired
              />
              <DropdownStatus
                className="w-full mb-2"
                value={Boolean(newShift.status)} 
                onChange={(val) => setNewShift({ ...newShift, status: val })} 
              />
              <div className="flex justify-between items-center w-full mt-2">
                {newShift.id ? (
                  <Button onClick={() => handleDelete(newShift.id)} color="danger">Delete</Button>
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
