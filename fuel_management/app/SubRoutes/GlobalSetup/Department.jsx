import { useEffect, useState } from "react";
import Table from "~/Components/TableForObject";
import MultiDropdown from "~/Components/MultiDropdown";
import Notification from "~/Components/Notification";
import TableSkeleton from "~/Components/TableSkeleton";
import DropdownStatus from "~/Components/DropdownStatus";
import { Textarea, Input, Button, Spinner } from "@heroui/react";
import { 
  fetchDepartments, 
  fetchDepartmentDetails, 
  createDepartment, 
  updateDepartment, 
  deleteDepartment 
} from "~/Hooks/Setup/GlobalRecords/Department/useDepartments";
import { fetchDropdownTypeList } from "~/Hooks/Setup/GlobalRecords/Dropdown/useDropdowns";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [notification, setNotification] = useState(null);
  const [newDepartment, setNewDepartment] = useState({ 
    name: "", 
    subDepartmentId: [], 
    details: "", 
    status: true
  });

  const getDepartments = async () => {
    setLoading(true);
    try {
        const data = await fetchDepartments();
        setDepartments(data);
        console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
      getDepartments();
  }, []);

  const handleAdd = () => {
    setNewDepartment({ 
      name: "", 
      subDepartmentId: [], 
      details: "", 
      status: true 
    });
    setIsEditing(true);
  };

  const handleEdit = async (department) => {
    // console.log(department)
    if (department.departmentLin && Array.isArray(department.departmentLin)) {
      const subDepartmentIds = department.departmentLin.map(item => item.subDepartmentId);
      
      setNewDepartment(prev => ({
        ...prev,
        ...department,
        subDepartmentId: subDepartmentIds 
      }));
      
      setIsEditing(true);
    };
  };


  const handleSave = async () => {
    if (!newDepartment.name || !newDepartment.details || !newDepartment.subDepartmentId.length > 0) {
      setNotification({ message: "All fields are required.", type: "error" });
      return;
    }

    if (isSaving) return;
    setIsSaving(true);
  
    try {
      const payload = {
        ...newDepartment,
        subDepartments: newDepartment.subDepartmentId.map(id => ({ subDepartmentId: id })), 
      };
  
      if (newDepartment.id) {
        await updateDepartment(newDepartment.id, payload);
      } else {
        const response = await createDepartment(payload);
        setDepartments([...departments, response[0]]);
      }
  
      setIsEditing(false);
      setNotification({ message: "Save successful", type: "success" });
      getDepartments();
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
            await deleteDepartment(id);

            setIsEditing(false);
            setNotification({ message: "Record deleted successfully!", type: "success" });
            getDepartments(); 
            setDepartments((prevDepartments) => prevDepartments.filter(department => department.id !== id)); 
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
    { key: "name", label: "Department Name", hidden: false },
    { key: "subdepartments", label: "Sub Department", hidden: false },
    { key: "details", label: "Details", hidden: true },
    { key: "status", label: "Status", hidden: true }
  ];

  const customRender = {
    subdepartments: (row) => {
      // console.log("row:", row); 
      
      if (!row || !Array.isArray(row.departmentLin) || row.departmentLin.length === 0) {
        return "N/A";
      }
  
      return row.departmentLin.map(sub => sub.subDepartment || "Unnamed").join(", ");
    },
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
              <h2 className="text-xl font-semibold mb-4">{newDepartment.id ? "Edit" : "Add"} Department</h2>
              <Input 
                className="w-full mb-2" 
                label="Department Name" 
                placeholder="Enter department name" 
                value={newDepartment.name}
                onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                isRequired
              />
              <MultiDropdown 
                  label="Sub Department"
                  typeId={19} 
                  isMultiline
                  value={newDepartment.subDepartmentId} 
                  onChange={(e) => setNewDepartment({ ...newDepartment, subDepartmentId: e.target.value })} 
              />
              <Textarea 
                className="w-full mb-2" 
                label="Details" 
                placeholder="Enter Details" 
                value={newDepartment.details}
                onChange={(e) => setNewDepartment({ ...newDepartment, details: e.target.value })}
                isRequired
              />
              <DropdownStatus
                className="w-full mb-2"
                value={Boolean(newDepartment.status)} 
                onChange={(val) => setNewDepartment({ ...newDepartment, status: val })} 
              />
              <div className="flex justify-between items-center w-full mt-2">
                {newDepartment.id ? (
                  <Button onClick={() => handleDelete(newDepartment.id)} color="danger">Delete</Button>
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
          title="Departments" 
          data={departments} 
          columns={columns} 
          onEdit={handleEdit} 
          onAdd={handleAdd} 
          customRender={customRender} 
        />
      )}
    </div>
  );  
};

export default Department;
