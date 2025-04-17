import React, { useEffect, useState } from "react";
import Table from "~/SubRoutes/FuelManagement/Components/Table";
import Dropdown from "~/Components/Dropdown";
import DropdownStatus from "~/Components/DropdownStatus";
import Notification from "~/Components/Notification";
import TableSkeleton from "~/Components/TableSkeleton";
import {
  Select,
  SelectItem, 
  Input,
  Button,
  Textarea,
  Spinner,
  NumberInput
} from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import {
  useGetFuelManagements, 
  useGetFuelManagementById,
  useAddFuelManagement,
  useUpdateFuelManagement,
  useDeleteFuelManagement
} from "~/Hooks/FuelManagement/useFuelManagementApi";
import { fetchDropdowns, fetchDropdownTypeList } from "~/Hooks/Setup/GlobalRecords/Dropdown/useDropdowns";


const LubeType = ({ onDataChange, gotoLubricants }) => {
  // Fetch LubeTypes
  const { 
    data: lubeTypes, 
    isLoading: isLoadingLubeTypes, 
    error: errorLubeTypes 
  } = useGetFuelManagements('LubeTypes');

  // Add LubeType 
  const { 
    mutateAsync: addLubeType, 
    isLoading: isAddingLubeType, 
    isSuccess: isAddLubeTypeSuccess, 
    error: addLubeTypeError 
  } = useAddFuelManagement('LubeType');

  // Update LubeType 
  const { 
    mutateAsync: updateLubeType, 
    isLoading: isUpdatingLubeType, 
    isSuccess: isUpdateLubeTypeSuccess, 
    error: updateLubeTypeError 
  } = useUpdateFuelManagement('LubeType');

  // Delete LubeType 
  const { 
    mutateAsync: deleteLubeType, 
    isLoading: isDeletingLubeType, 
    isSuccess: isDeleteLubeTypeSuccess, 
    error: deleteLubeTypeError 
  } = useDeleteFuelManagement('LubeType');

  useEffect(() => {
    if (lubeTypes) {
      onDataChange?.(lubeTypes); 
    }
  }, [lubeTypes]);

  const [isEditingLubeType, setIsEditingLubeType] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [notification, setNotification] = useState(null);
  const [newLubeType, setNewLubeType] = useState({
    code: "",
    name: "",
    incentive: null,
    details: "",
    status: true,
  })

  const [isLubricants, setIsLubricant] = useState(true);
  const [isBrands, setIsBrands] = useState(false);
  const [isLubeTypes, setIsLubeTypes] = useState(false);

  const handleAdd = async () => {
    setNewLubeType({
      code: "",
      name: "",
      incentive: null, 
      details: "",
      status: true,
    })
  
    setIsEditingLubeType(true);
  }

  const handleEdit = async (lubeType) => {
    setIsEditingLubeType(true);

    try {
      console.log(lubeType)
      setNewLubeType(prev => ({
        ...prev,
        ...lubeType
      }))
    } catch (error) {
      console.error("Error fetching data:", error);
    } 
  }

  const handleSave = async () => {
    if (!newLubeType.code || !newLubeType.name || !newLubeType.incentive ||
      !newLubeType.details || !newLubeType.status) {
      setNotification({ message: "All fields are required.", type: "error" });
      return;
    }

    if (isSaving) return;
    setIsSaving(true);

    const payload = {
      code: newLubeType.code,
      name: newLubeType.name,
      incentive: newLubeType.incentive,
      details: newLubeType.details,
      status: newLubeType.status
    }

    try {
      let lubeTypeId;

      if (newLubeType.id) {
        // Existing LubeType 
        lubeTypeId = newLubeType?.id

        // console.log(lubeTypeId)
        // Update LubeType 
        const response = await updateLubeType({ id: lubeTypeId, payload});

        lubeTypeId = response[0]?.id;
        // console.log(response)
      } else {
        // New LubeType 
        const response = await addLubeType(payload);
        // lubeTypeId = response.id;

        // console.log(response)
      }

      setIsEditingLubeType(false);
      setNotification({ message: "Save successful", type: "success" });

    } catch (error) {
      setNotification({ message: "Error saving data", type: "error" });
      console.error("Error saving data:", error);
    } finally {
      setIsSaving(false); 
    }
  }

  const handleDelete = (id) => {
    const handleConfirm = async () => {
        try {
            // Delete LubeType
            await deleteLubeType(id);

            setIsEditingLubeType(false);
            setNotification({ message: "Record deleted successfully!", type: "success" });
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
    { key: "code", label: "Type Code", hidden: false },
    { key: "name", label: "Type Name", hidden: false },
    { key: "incentive", label: "Incentive", hidden: true },
    { key: "details", label: "Details", hidden: false },
    { key: "status", label: "Status", hidden: false },
  ];

  const customRender = {
      customButtons: () => (
        <Button color="primary">
            <ArrowLeft />
            <span onClick={gotoLubricants} className="text-[18px]">Lubricants</span>
        </Button>
      ),
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
      {isLoadingLubeTypes ? (
        // <p>Loading...</p>
        <TableSkeleton columns={5} rows={5}/>
      ) : isEditingLubeType ? (
          <div className="h-screen flex justify-center items-center">
            <div className="bg-white p-6 w-96 h-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">{newLubeType.id ? "Edit" : "Add"} Lube Type</h2>
              <Input 
                className="w-full mb-2" 
                label="Type Code" 
                placeholder="Enter type code" 
                value={newLubeType.code}
                onChange={(e) => setNewLubeType({ ...newLubeType, code: e.target.value })}
                isRequired
              />
              <Input 
                className="w-full mb-2" 
                label="Lube Type Name" 
                placeholder="Enter type name" 
                value={newLubeType.name}
                onChange={(e) => setNewLubeType({ ...newLubeType, name: e.target.value })}
                isRequired
              />
              <NumberInput
                className="w-full mb-2" 
                label="Incentive Assignment"
                placeholder="0.00"
                value={newLubeType.incentive === undefined ? null : newLubeType.incentive}
                onValueChange={(value) => setNewLubeType({ ...newLubeType, incentive: value })}
                isRequired
                formatOptions={{
                  style: "decimal",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true
                }}
              />
              <Textarea 
                className="w-full mb-2" 
                label="Details" 
                placeholder="Enter Details" 
                value={newLubeType.details}
                onChange={(e) => setNewLubeType({ ...newLubeType, details: e.target.value })}
                isRequired
              />
              <DropdownStatus
                className="w-full mb-2"
                value={Boolean(newLubeType.status)} 
                onChange={(val) => setNewLubeType({ ...newLubeType, status: val })} 
              />
              <div className="flex justify-between items-center w-full mt-2">
                {newLubeType.id ? (
                  <Button onClick={() => handleDelete(newLubeType.id)} color="danger">Delete</Button>
                ) : (
                  <div></div> 
                )}
                <div className="flex space-x-2">
                  <Button onClick={() => setIsEditingLubeType(false)} color="default" className="text-[blue]">Close</Button>
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
          title="Lube Types" 
          data={lubeTypes} 
          columns={columns} 
          onEdit={handleEdit} 
          onAdd={handleAdd} 
          customRender={customRender} 
        />
      )}
    </div>
  );
};

export default LubeType;
