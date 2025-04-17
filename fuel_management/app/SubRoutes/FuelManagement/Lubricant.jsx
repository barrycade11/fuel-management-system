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
import BackButton from "./Components/BackButton";
import {
  useGetFuelManagements, 
  useGetFuelManagementById,
  useAddFuelManagement,
  useUpdateFuelManagement,
  useDeleteFuelManagement
} from "~/Hooks/FuelManagement/useFuelManagementApi";
import { fetchDropdowns, fetchDropdownTypeList } from "~/Hooks/Setup/GlobalRecords/Dropdown/useDropdowns";
import NextButton from "./Components/NextButton";

const Lubricant = ({ onDataChange, gotoBrands, gotoLubeTypes }) => {
  // Fetch Lubricants
  const { 
    data: lubricants, 
    isLoading: isLoadingLubricants, 
    error: errorLubricants
  } = useGetFuelManagements('Lubricants');

  // Fetch Brands
  const { 
    data: brands, 
    isLoading: isLoadingBrands, 
    error: errorBrands 
  } = useGetFuelManagements('Brands');

  // Fetch LubeTypes
  const { 
    data: lubeTypes, 
    isLoading: isLoadingLubeTypes, 
    error: errorLubeTypes 
  } = useGetFuelManagements('LubeTypes');

  // Add Lubricant 
  const { 
    mutateAsync: addLubricant, 
    isLoading: isAddingLubricant, 
    isSuccess: isAddLubricantSuccess, 
    error: addLubricantError 
  } = useAddFuelManagement('Lubricant');

  // Update Lubricant 
  const { 
    mutateAsync: updateLubricant, 
    isLoading: isUpdatingLubricant, 
    isSuccess: isUpdateLubricantSuccess, 
    error: updateLubricantError 
  } = useUpdateFuelManagement('Lubricant');

  // Delete Lubricant 
  const { 
    mutateAsync: deleteLubricant, 
    isLoading: isDeletingLubricant, 
    isSuccess: isDeleteLubricantSuccess, 
    error: deleteLubricantError 
  } = useDeleteFuelManagement('Lubricant');

  useEffect(() => {
    if (lubricants) {
      onDataChange(lubricants); 
    }
  }, [lubricants]);

  const [isEditingLubricant, setIsEditingLubricant] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [notification, setNotification] = useState(null);
  const [newLubricant, setNewLubricant] = useState({
    code: "",
    name: "",
    brandId: "",
    lubeTypeId: "",
    liters: null,
    qty: null, 
    cost: null,
    selling: null,
    margins: null,
    incentives: null,
    netMargin: null,
    netMarginPerc: null,
    details: "",
    status: true
  })

  const [isLubricants, setIsLubricant] = useState(true);
  const [isBrands, setIsBrands] = useState(false);
  const [isLubeTypes, setIsLubeTypes] = useState(false);

  const handleAdd = async () => {
    setNewLubricant({
      code: "",
      name: "",
      brandId: "",
      lubeTypeId: "",
      liters: null,
      qty: null, 
      cost: null,
      selling: null,
      margins: null,
      incentives: null,
      netMargin: null,
      netMarginPerc: null,
      details: "",
      status: true
    })
  
    setIsEditingLubricant(true);
  }

  const handleEdit = async (lubricant) => {
    console.log(lubricant)
    setIsEditingLubricant(true);

    try {
      setNewLubricant(prev => ({
        ...prev,
        ...lubricant,
        brandId: lubricant.brandid,
        lubeTypeId: lubricant.lubetypeid
      }))
    } catch (error) {
      console.error("Error fetching data:", error);
    } 
  }

  const handleSave = async () => {
    if (!newLubricant.code || !newLubricant.name || !newLubricant.brandId || !newLubricant.lubeTypeId ||
        !newLubricant.liters || !newLubricant.qty || !newLubricant.cost || !newLubricant.selling || 
        !newLubricant.details || !newLubricant.status
    ) {
      setNotification({ message: "All fields are required.", type: "error" });
      return;
    }

    if (isSaving) return;
    setIsSaving(true);

    const payload = {
      code: newLubricant.code,
      name: newLubricant.name,
      brandId: parseInt(newLubricant.brandId, 10),
      lubeTypeId: parseInt(newLubricant.lubeTypeId, 10),
      liters: newLubricant.liters,
      qty: newLubricant.qty,
      cost: newLubricant.cost,
      selling: newLubricant.selling,
      margins: newLubricant.margins,
      incentives: newLubricant.incentives,
      netMargin: newLubricant.netMargin,
      netMarginPerc: newLubricant.netMarginPerc,
      details: newLubricant.details,
      status: newLubricant.status
    }

    console.log(payload)

    try {
      let lubricantId;

      if (newLubricant.id) {
        // Existing Lubricant 
        lubricantId = newLubricant?.id

        console.log(lubricantId)
        // Update Lubricant 
        const response = await updateLubricant({ id: lubricantId, payload});

        lubricantId = response[0]?.id;
        console.log(response)
      } else {
        // New Lubricant 
        const response = await addLubricant(payload);
        lubricantId = response.id;

        console.log(response)
      }

      setIsEditingLubricant(false);
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
            // Delete Lubricant
            await deleteLubricant(id);

            setIsEditingLubricant(false);
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
    { key: "code", label: "Lubricant Code", hidden: false },
    { key: "name", label: "Lubricant Name", hidden: false },
    { key: "brand", label: "Brand Name", hidden: true },
    { key: "lubetype", label: "Lube Type Name", hidden: true },
    { key: "details", label: "Details", hidden: false },
    { key: "status", label: "Status", hidden: false },
  ];

  const customRender = {
      customButtons: () => (
        <>
          <NextButton onClick={gotoBrands} label="Brands" 
          className="bg-blue-200 text-blue-800 rounded-lg hover:bg-blue-300" />
          &nbsp;
          <NextButton onClick={gotoLubeTypes} label="Lube Type" 
          className="bg-blue-200 text-blue-800 rounded-lg hover:bg-blue-300" />
        </>
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

    useEffect(() => {
      const { cost, selling, incentives } = newLubricant;
    
      if (cost && selling && incentives) {
        const computedMargins = 1 - cost - selling;
        const computedNetMargin = (selling - incentives) - cost;
        const computedMarginPerc = computedNetMargin / selling;
        setNewLubricant(prev => ({
          ...prev,
          margins: computedMargins,
          netMargin: computedNetMargin,
          netMarginPerc: computedMarginPerc,
        }));
      }
    }, [newLubricant.cost, newLubricant.selling, newLubricant.incentives]);
    

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
      {isLoadingLubricants ? (
        // <p>Loading...</p>
        <TableSkeleton columns={5} rows={5}/>
      ) : isEditingLubricant ? (
          <div className="h-screen flex justify-center items-center">
            <div className="bg-white w-full h-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">{newLubricant.id ? "Edit" : "Add"} Lubricant</h2>
              <Input 
                className="w-full mb-2" 
                label="Lube Code" 
                placeholder="Enter lubricant code" 
                value={newLubricant.code}
                onChange={(e) => setNewLubricant({ ...newLubricant, code: e.target.value })}
                isRequired
              />
              <Input 
                className="w-full mb-2" 
                label="Product Name" 
                placeholder="Enter product name" 
                value={newLubricant.name}
                onChange={(e) => setNewLubricant({ ...newLubricant, name: e.target.value })}
                isRequired
              />
              <div className="flex space-x-4">
                <div className="flex flex-col w-full">
                  <div className="relative flex items-center rounded-lg">
                    <Dropdown 
                      label="Brand"
                      customOptions={brands.map(b => ({
                        id: b.id,
                        name: b.name
                      }))}
                      value={newLubricant.brandId} 
                      onChange={(e) => setNewLubricant({ 
                        ...newLubricant, 
                        brandId: parseInt(e.target.value, 10)
                      })} 
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="relative flex items-center rounded-lg">
                    <Dropdown 
                      label="Lube Type"
                      customOptions={lubeTypes.map(l => ({
                        id: l.id,
                        name: l.name,
                        incentive: l.incentive
                      }))}
                      value={newLubricant.lubeTypeId} 
                      onChange={(e) => {
                        const selectedId = parseInt(e.target.value, 10);
                        const selectedLube = lubeTypes.find(l => l.id === selectedId);
                          setNewLubricant({ 
                          ...newLubricant, 
                          lubeTypeId: parseInt(e.target.value, 10),
                          incentives: selectedLube?.incentive ?? 0
                        })
                      }} 
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mb-2">
                <div className="flex flex-col w-full">
                  <div className="relative flex items-center rounded-lg">
                    <NumberInput
                      label="Liters"
                      placeholder="0"
                      value={newLubricant.liters === undefined ? null : newLubricant.liters}
                      onValueChange={(value) => setNewLubricant({ ...newLubricant, liters: value })}
                      isRequired
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="relative flex items-center rounded-lg">
                    <NumberInput
                      label="Quantity Per Box"
                      placeholder="0"
                      value={newLubricant.qty === undefined ? null : newLubricant.qty}
                      onValueChange={(value) => setNewLubricant({ ...newLubricant, qty: value })}
                      isRequired
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mb-2">
                <div className="flex flex-col w-full">
                  <div className="relative flex items-center rounded-lg">
                    <NumberInput
                      label="Cost VatEx"
                      placeholder="0.00"
                      value={newLubricant.cost === undefined ? null : newLubricant.cost}
                      onValueChange={(value) => setNewLubricant({ ...newLubricant, cost: value })}
                      isRequired
                      formatOptions={{
                        style: "decimal",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        useGrouping: true
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="relative flex items-center rounded-lg">
                    <NumberInput
                      label="Selling VatEx"
                      placeholder="0.00"
                      value={newLubricant.selling === undefined ? null : newLubricant.selling}
                      onValueChange={(value) => setNewLubricant({ ...newLubricant, selling: value })}
                      isRequired
                      formatOptions={{
                        style: "decimal",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        useGrouping: true
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="relative flex items-center rounded-lg">
                    <NumberInput
                      label="Margins"
                      placeholder="0%"
                      value={newLubricant.cost && newLubricant.selling
                        ? 1 - newLubricant.cost / newLubricant.selling
                        : null}
                      onValueChange={(value) => setNewLubricant({ ...newLubricant, margins: value })}
                      isRequired
                      isDisabled
                      formatOptions={{
                        style: "percent",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mb-2">
                <div className="flex flex-col w-full">
                  <div className="relative flex items-center rounded-lg">
                    <NumberInput
                      label="Incentive"
                      placeholder="0.00"
                      value={newLubricant.incentives === undefined ? null : newLubricant.incentives}
                      onValueChange={(value) => setNewLubricant({ ...newLubricant, incentives: value })}
                      isRequired
                      isDisabled
                      formatOptions={{
                        style: "decimal",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        useGrouping: true
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="relative flex items-center rounded-lg">
                    <NumberInput
                      label="Net Margins Peso"
                      placeholder="0.00"
                      value={newLubricant.netMargin || null}
                      isRequired
                      isDisabled
                      formatOptions={{
                        style: "decimal",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        useGrouping: true
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="relative flex items-center rounded-lg">
                    <NumberInput
                      label="Net Margins %"
                      placeholder="0%"
                      value={newLubricant.netMarginPerc ?? null}
                      isRequired
                      isDisabled
                      formatOptions={{
                        style: "percent",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mb-2">
                <div className="flex flex-col w-full">
                  <div className="relative flex items-center rounded-lg">
                    <Textarea 
                      className="w-full mb-2" 
                      label="Details" 
                      placeholder="Enter Details" 
                      value={newLubricant.details}
                      onChange={(e) => setNewLubricant({ ...newLubricant, details: e.target.value })}
                      isRequired
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="relative flex items-center rounded-lg">
                   <DropdownStatus
                      className="w-full mb-2"
                      value={Boolean(newLubricant.status)} 
                      onChange={(val) => setNewLubricant({ ...newLubricant, status: val })} 
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center w-full mt-2">
                {newLubricant.id ? (
                  <Button onClick={() => handleDelete(newLubricant.id)} color="danger">Delete</Button>
                ) : (
                  <div></div> 
                )}
                <div className="flex space-x-2">
                  <Button onClick={() => setIsEditingLubricant(false)} color="default" className="text-[blue]">Close</Button>
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
          title="Lubricants" 
          data={lubricants} 
          columns={columns} 
          onEdit={handleEdit} 
          onAdd={handleAdd} 
          customRender={customRender} 
        />
      )}
    </div>
  );
};

export default Lubricant;
