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
  Spinner
} from "@heroui/react";
import BackButton from "./Components/BackButton";
import {
  useGetFuelManagements, 
  useGetFuelManagementById,
  useAddFuelManagement,
  useUpdateFuelManagement,
  useDeleteFuelManagement
} from "~/Hooks/FuelManagement/useFuelManagementApi";
import { fetchDropdowns, fetchDropdownTypeList } from "~/Hooks/Setup/GlobalRecords/Dropdown/useDropdowns";

const Brand = ({ onDataChange, gotoLubricants }) => {
  // Fetch Brands
  const { 
    data: brands, 
    isLoading: isLoadingBrands, 
    error: errorBrands 
  } = useGetFuelManagements('Brands');

  // Add Brand 
  const { 
    mutateAsync: addBrand, 
    isLoading: isAddingBrand, 
    isSuccess: isAddBrandSuccess, 
    error: addBrandError 
  } = useAddFuelManagement('Brand');

  // Update Brand 
  const { 
    mutateAsync: updateBrand, 
    isLoading: isUpdatingBrand, 
    isSuccess: isUpdateBrandSuccess, 
    error: updateBrandError 
  } = useUpdateFuelManagement('Brand');

  // Delete Brand 
  const { 
    mutateAsync: deleteBrand, 
    isLoading: isDeletingBrand, 
    isSuccess: isDeleteBrandSuccess, 
    error: deleteBrandError 
  } = useDeleteFuelManagement('Brand');

  useEffect(() => {
    if (brands) {
      onDataChange?.(brands); 
    }
  }, [brands]);

  const [isEditingBrand, setIsEditingBrand] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [notification, setNotification] = useState(null);
  const [newBrand, setNewBrand] = useState({
    code: "",
    name: "",
    details: "",
    status: true,
  })

  const [isLubricants, setIsLubricant] = useState(true);
  const [isBrands, setIsBrands] = useState(false);
  const [isLubeTypes, setIsLubeTypes] = useState(false);

  const handleAdd = async () => {
    setNewBrand({
      code: "",
      name: "",
      details: "",
      status: true,
    })
  
    setIsEditingBrand(true);
  }

  const handleEdit = async (brand) => {
    setIsEditingBrand(true);

    try {
      setNewBrand(prev => ({
        ...prev,
        ...brand
      }))
    } catch (error) {
      console.error("Error fetching data:", error);
    } 
  }

  const handleSave = async () => {
    if (!newBrand.code || !newBrand.name || !newBrand.details || !newBrand.status) {
      setNotification({ message: "All fields are required.", type: "error" });
      return;
    }

    if (isSaving) return;
    setIsSaving(true);

    const payload = {
      code: newBrand.code,
      name: newBrand.name,
      details: newBrand.details,
      status: newBrand.status
    }

    try {
      let brandId;

      if (newBrand.id) {
        // Existing Brand 
        brandId = newBrand?.id

        console.log(brandId)
        // Update Brand 
        const response = await updateBrand({ id: brandId, payload});

        brandId = response[0]?.id;
        console.log(response)
      } else {
        // New Brand 
        const response = await addBrand(payload);
        brandId = response.id;

        console.log(response)
      }

      setIsEditingBrand(false);
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
            // Delete Brand
            await deleteBrand(id);

            setIsEditingBrand(false);
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
    { key: "code", label: "Brand Code", hidden: false },
    { key: "name", label: "Brand Name", hidden: false },
    { key: "details", label: "Details", hidden: false },
    { key: "status", label: "Status", hidden: false },
  ];

  const customRender = {
      customButtons: () => (
        <BackButton onClick={gotoLubricants} label="Lubricants" 
        className="bg-blue-200 text-blue-800 rounded-lg hover:bg-blue-300" />
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
      {isLoadingBrands ? (
        // <p>Loading...</p>
        <TableSkeleton columns={5} rows={5}/>
      ) : isEditingBrand ? (
          <div className="h-screen flex justify-center items-center">
            <div className="bg-white p-6 w-96 h-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">{newBrand.id ? "Edit" : "Add"} Brand</h2>
              <Input 
                className="w-full mb-2" 
                label="Brand Code" 
                placeholder="Enter brand code" 
                value={newBrand.code}
                onChange={(e) => setNewBrand({ ...newBrand, code: e.target.value })}
                isRequired
              />
              <Input 
                className="w-full mb-2" 
                label="Payment Name" 
                placeholder="Enter fuel name" 
                value={newBrand.name}
                onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                isRequired
              />
              <Textarea 
                className="w-full mb-2" 
                label="Details" 
                placeholder="Enter Details" 
                value={newBrand.details}
                onChange={(e) => setNewBrand({ ...newBrand, details: e.target.value })}
                isRequired
              />
              <DropdownStatus
                className="w-full mb-2"
                value={Boolean(newBrand.status)} 
                onChange={(val) => setNewBrand({ ...newBrand, status: val })} 
              />
              <div className="flex justify-between items-center w-full mt-2">
                {newBrand.id ? (
                  <Button onClick={() => handleDelete(newBrand.id)} color="danger">Delete</Button>
                ) : (
                  <div></div> 
                )}
                <div className="flex space-x-2">
                  <Button onClick={() => setIsEditingBrand(false)} color="default" className="text-[blue]">Close</Button>
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
          title="Brands" 
          data={brands} 
          columns={columns} 
          onEdit={handleEdit} 
          onAdd={handleAdd} 
          customRender={customRender} 
        />
      )}
    </div>
  );
};

export default Brand;
