import { useEffect, useState } from "react";
import Table from "~/Components/Table";
import Dropdown from "~/Components/Dropdown";
import MultiDropdown from "~/Components/MultiDropdown";
import Notification from "~/Components/Notification";
import TableSkeleton from "~/Components/TableSkeleton";
import DropdownStatus from "~/Components/DropdownStatus";
import { Textarea, Input, Button, DatePicker } from "@heroui/react";
import { 
  fetchDiscounts, 
  fetchDiscountDetails, 
  createDiscount, 
  updateDiscount, 
  deleteDiscount 
} from "~/Hooks/Setup/GlobalRecords/Discount/useDiscounts";
import { fetchDropdownTypeList } from "~/Hooks/Setup/GlobalRecords/Dropdown/useDropdowns";

const Discount = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [notification, setNotification] = useState(null);
  const [newDiscount, setNewDiscount] = useState({ 
    code: "", 
    name: "", 
    applicabilityId: [], 
    details: "", 
    criteriaId: "",
    qualifierValue: "",
    discountTypeId: "",
    discountValue: "",
    chargeToId: "",
    startDate: null,
    endDate: null,
    maxLimit: "",
    status: true
  });

  const getDiscounts = async () => {
    setLoading(true);
    try {
        const data = await fetchDiscounts();
        setDiscounts(data);
        // console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
      getDiscounts();
  }, []);

  const handleAdd = () => {
    setNewDiscount({ 
      code: "", 
      name: "", 
      applicabilityId: [], 
      details: "", 
      criteriaId: "",
      qualifierValue: "",
      discountTypeId: "",
      discountValue: "",
      chargeToId: "",
      startDate: null,
      endDate: null,
      maxLimit: "",
      status: true
    });
    setIsEditing(true);
  };

  const handleEdit = async (discount) => {
    try {
        const [criteriaData, discountTypeData, chargeToData] = await Promise.all([
          fetchDropdownTypeList(17, discount.criteriaid),
          fetchDropdownTypeList(18, discount.discounttypeid),
          fetchDropdownTypeList(1, discount.chargetoid),
        ]);
      
        if (discount.discountLin && Array.isArray(discount.discountLin)) {
          const applicabilityIds = discount.discountLin.map(item => item.applicabilityId);
          
          // Update your state with the extracted IDs
          setNewDepartment(prev => ({
            ...prev,
            ...discount,
            applicabilityId: applicabilityIds // This should match what your MultiDropdown expects
          }));
          
          setIsEditing(true);
        }
    } catch (error) {
        console.error("Error fetching sub discount data:", error);
    }
  };


  const handleSave = async () => {
    if (!newDiscount.code || 
      !newDiscount.name || 
      !newDiscount.details
    ) {
      setNotification({ message: "All fields are required.", type: "error" });
      return;
    }
  
    const formatDate = (dateObj) => {
      if (!dateObj || !dateObj.year || !dateObj.month || !dateObj.day) return null;
      return `${dateObj.year}-${String(dateObj.month).padStart(2, "0")}-${String(dateObj.day).padStart(2, "0")}`;
    };

    // const payload = {
    //   ...newDiscount,
    //   applicability: newDiscount.applicabilityId.map(id => ({ applicabilityId: id })), 
    //   startDate: formatDate(newDiscount.startDate),
    //   endDate: formatDate(newDiscount.endDate)
    // };

    const payload = {
      code: newDiscount.code,
      name: newDiscount.name,
      criteriaId: parseInt(newDiscount.criteriaId, 10), 
      qualifierValue: parseInt(newDiscount.qualifierValue, 10),
      discountTypeId: parseInt(newDiscount.discountTypeId, 10),
      discountValue: parseInt(newDiscount.discountValue, 10),
      chargeToId: parseInt(newDiscount.chargeToId, 10),
      maxLimit: parseInt(newDiscount.maxLimit, 10),
      startDate: formatDate(newDiscount.startDate), 
      endDate: formatDate(newDiscount.endDate),
      details: newDiscount.details,
      status: newDiscount.status ?? true, 
      applicabilities: newDiscount.applicabilityId.map(id => ({ applicabilityId: id })), 

    };

    // console.log(payload)
    try {
      if (newDiscount.id) {
        await updateDiscount(newDiscount.id, payload);
      } else {
        const response = await createDiscount(payload);
        setDiscounts([...discounts, response[0]]);
      }
  
      setIsEditing(false);
      setNotification({ message: "Save successful", type: "success" });
      getDiscounts();
    } catch (error) {
      setNotification({ message: "Error saving data", type: "error" });
      console.error("Error saving data:", error);
    }
  };

  const handleDelete = (id) => {
    const handleConfirm = async () => {
        try {
            await deleteDiscount(id);

            setIsEditing(false);
            setNotification({ message: "Record deleted successfully!", type: "success" });
            getDiscounts(); 
            setDiscounts((prevDiscounts) => prevDiscounts.filter(discount => discount.id !== id)); 
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
    { key: "code", label: "Discount Code", hidden: false },
    { key: "name", label: "Discount Name", hidden: false },
    { key: "applicabilities", label: "Applicability", hidden: false },
    { key: "criteria", label: "Criteria", hidden: true },
    { key: "qualifierValue", label: "Qualifier Value", hidden: true },
    { key: "discountType", label: "Discount Type", hidden: false },
    { key: "discountValue", label: "Discount Value", hidden: true },
    { key: "chargeTo", label: "Charge To", hidden: true },
    { key: "maxLimit", label: "Max Limit", hidden: true },
    { key: "startDate", label: "Start Date", hidden: true },
    { key: "endDate", label: "End Date", hidden: true },
    { key: "details", label: "Details", hidden: true },
    { key: "status", label: "Status", hidden: false }
  ];

  const customRender = {
    applicabilities: (row) => {
      // console.log("row:", row); 
      
      if (!row || !Array.isArray(row.discountLin) || row.discountLin.length === 0) {
        return "N/A";
      }
  
      return row.discountLin.map(sub => sub.applicabilityId || "Unnamed").join(", ");
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
        <TableSkeleton columns={5} rows={5}/>
      ) : isEditing ? (
          <div className="h-full flex justify-center items-center">
            <div className="bg-white w-full h-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">{newDiscount.id ? "Edit" : "Add"} Discount</h2>
              <Input 
                className="w-full mb-2" 
                label="Discount Code" 
                placeholder="Enter discount code" 
                value={newDiscount.code}
                onChange={(e) => setNewDiscount({ ...newDiscount, code: e.target.value })}
                isRequired
              />
              <Input 
                className="w-full mb-2" 
                label="Discount Name" 
                placeholder="Enter discount name" 
                value={newDiscount.name}
                onChange={(e) => setNewDiscount({ ...newDiscount, name: e.target.value })}
                isRequired
              />
              <MultiDropdown 
                  label="Applicability"
                  typeId={19} 
                  isMultiline
                  value={newDiscount.applicabilityId} 
                  onChange={(e) => setNewDiscount({ ...newDiscount, applicabilityId: e.target.value })} 
              />
              <div className="flex space-x-4">
                <div className="flex flex-col w-full">
                  <div className="relative flex items-center rounded-lg">
                  <Dropdown 
                    label="Criteria"
                    typeId={17} 
                    value={newDiscount.criteriaId} 
                    onChange={(e) => setNewDiscount({ ...newDiscount, criteriaId: e.target.value })} 
                  />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="relative flex items-center rounded-lg">
                  <Input 
                    className="w-full mb-2" 
                    label="Qualifier Value" 
                    placeholder="Enter qualifier value" 
                    value={newDiscount.qualifierValue}
                    onChange={(e) => setNewDiscount({ ...newDiscount, qualifierValue: e.target.value })}
                    isRequired
                  />
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex flex-col w-full">
                  <div className="relative flex items-center rounded-lg">
                  <Dropdown 
                    label="Discount Type"
                    typeId={18} 
                    value={newDiscount.discountTypeId} 
                    onChange={(e) => setNewDiscount({ ...newDiscount, discountTypeId: e.target.value })} 
                  />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="relative flex items-center rounded-lg">
                  <Input 
                    className="w-full mb-2" 
                    label="Discount Value" 
                    placeholder="Enter discount value" 
                    value={newDiscount.discountValue}
                    onChange={(e) => setNewDiscount({ ...newDiscount, discountValue: e.target.value })}
                    isRequired
                  />
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex flex-col w-full">
                  <div className="relative flex items-center rounded-lg">
                  <Dropdown 
                    label="Charge To"
                    typeId={1} 
                    value={newDiscount.chargeToId} 
                    onChange={(e) => setNewDiscount({ ...newDiscount, chargeToId: e.target.value })} 
                  />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="relative flex items-center rounded-lg">
                  <Input 
                    className="w-full mb-2" 
                    label="Max Limit" 
                    placeholder="Enter max limit" 
                    value={newDiscount.maxLimit}
                    onChange={(e) => setNewDiscount({ ...newDiscount, maxLimit: e.target.value })}
                    isRequired
                  />
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 mb-2">
                <div className="flex flex-col w-full">
                  <div className="relative flex items-center rounded-lg">
                    <DatePicker  
                      isRequired 
                      label="Start Date" 
                      placeholder="Pick a date" 
                      value={newDiscount.startDate} 
                      onChange={(date) => setNewDiscount({ ...newDiscount, startDate: date })}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="relative flex items-center rounded-lg">
                    <DatePicker  
                      isRequired 
                      label="End Date" 
                      placeholder="Pick a date" 
                      value={newDiscount.endDate} 
                      onChange={(date) => setNewDiscount({ ...newDiscount, endDate: date })}
                    />
                  </div>
                </div>
              </div>
              <Textarea 
                className="w-full mb-2" 
                label="Details" 
                placeholder="Enter Details" 
                value={newDiscount.details}
                onChange={(e) => setNewDiscount({ ...newDiscount, details: e.target.value })}
                isRequired
              />
              <DropdownStatus
                className="w-full mb-2"
                value={Boolean(newDiscount.status)} 
                onChange={(val) => setNewDiscount({ ...newDiscount, status: val })} 
              />
              <div className="flex justify-between items-center w-full mt-2">
                {newDiscount.id ? (
                  <Button onClick={() => handleDelete(newDiscount.id)} color="danger">Delete</Button>
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
          title="Discounts" 
          data={discounts} 
          columns={columns} 
          onEdit={handleEdit} 
          onAdd={handleAdd} 
          customRender={customRender} 
        />
      )}
    </div>
  );  
};

export default Discount;
