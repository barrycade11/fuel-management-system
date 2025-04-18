import React, { useEffect, useState } from "react";
import Table from "~/Components/Table";
import Dropdown from "~/Components/Dropdown";
import Notification from "~/Components/Notification";
import TableSkeleton from "~/Components/TableSkeleton";
import { CalendarDate, parseZonedDateTime, parseAbsolute, parseAbsoluteToLocal } from "@internationalized/date";
import {
  Select,
  SelectItem, 
  Input,
  Button,
  Accordion, 
  AccordionItem,
  DatePicker,
  Textarea,
  Spinner
} from "@heroui/react";
import { 
  useGetGlobalRecords, 
  useGetGlobalRecordById, 
  useAddGlobalRecord, 
  useUpdateGlobalRecord, 
  useDeleteGlobalRecord 
} from "~/Hooks/Setup/GlobalRecords/useGlobalRecordsApi";
import { 
  fetchEmployeeContacts, 
  useAddEmployeeContactsByEmployeeId,
  useDeleteEmployeeContactsByEmployeeId
} from "~/Hooks/Setup/GlobalRecords/EmployeeContact/useEmployeeContacts";
import { 
  fetchEmployeePhoto, 
  useAddEmployeePhotoByEmployeeId, 
  useDeleteEmployeePhotoByEmployeeId 
} from "~/Hooks/Setup/GlobalRecords/EmployeePhoto/useEmployeePhotos";
import { useGenerateEmployeeCode } from "~/Hooks/Setup/GlobalRecords/Employee/useEmployees";
import { useGetStationRecords } from "~/Hooks/Setup/Station/useStationRecordsApi";
import { fetchDropdowns, fetchDropdownTypeList } from "~/Hooks/Setup/GlobalRecords/Dropdown/useDropdowns";
import { AutoCompleteProvince, AutoCompleteCityMunicipality, AutoCompleteBarangays } from "./Components/AutoCompleteFields";

const Employee = () => {

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_PORT = import.meta.env.VITE_API_PORT;

  // Fetch Employees 
  const { 
    data: employees, 
    isLoading: isLoadingEmployees, 
    error: errorEmployees 
  } = useGetGlobalRecords('Employees');
  
  // Fetch Generated Code 
  const { 
    data: generatedCode, 
    isLoading: isLoadingGeneratedCode, 
    error: errorGeneratingCode 
  } = useGenerateEmployeeCode('Employee');

  // Fetch Departments 
  const { 
    data: departments, 
    isLoading: isLoadingDepartments, 
    error: errorDepartments 
  } = useGetGlobalRecords('Departments');

  // Fetch Stations 
  const { 
    data: stations, 
    isLoading: isLoadingStations, 
    error: errorStations 
  } = useGetStationRecords('Stations');

  // Add Employee 
  const { 
    mutateAsync: addEmployee, 
    isLoading: isAdding, 
    isSuccess: isAddSuccess, 
    error: addError 
  } = useAddGlobalRecord('Employee');

  // Update Employee 
  const { 
    mutateAsync: updateEmployee, 
    isLoading: isUpdating, 
    isSuccess: isUpdateSuccess, 
    error: updateError 
  } = useUpdateGlobalRecord('Employee');

  // Delete Employee 
  const { 
    mutateAsync: deleteEmployee, 
    isLoading: isDeleting, 
    isSuccess: isDeleteSuccess, 
    error: deleteError 
  } = useDeleteGlobalRecord('Employee');

  // Add Employee Contacts 
  const { 
    mutateAsync: addEmployeeContact, 
    isLoading: isAddingEmployeeContact, 
    isSuccess: isAddEmployeeContactSuccess, 
    error: addErrorEmployeeContact 
  } = useAddEmployeeContactsByEmployeeId('Employee');

  // Delete Employee Contacts 
  const { 
    mutateAsync: deleteEmployeeContact, 
    isLoading: isDeletingEmployeeContact, 
    isSuccess: isDeleteEmployeeContactSuccess, 
    error: deleteErrorEmployeeContact 
  } = useDeleteEmployeeContactsByEmployeeId('Employee');

  // Add Employee Photo 
  const { 
    mutateAsync: addEmployeePhoto, 
    isLoading: isAddingEmployeePhoto, 
    isSuccess: isAddEmployeePhotoSuccess, 
    error: addErrorEmployeePhoto 
  } = useAddEmployeePhotoByEmployeeId('Employee');

  // Delete Employee Photo 
  const { 
    mutateAsync: deleteEmployeePhoto, 
    isLoading: isDeletingEmployeePhoto, 
    isSuccess: isDeleteEmployeePhotoSuccess, 
    error: deleteErrorEmployeePhoto 
  } = useDeleteEmployeePhotoByEmployeeId('Employee');

  const [relationships, setRelationships] = useState([]); 
  const [employeeContacts, setEmployeeContacts] = useState([]); 
  const [loadingEmployeeContacts, setLoadingEmployeeContacts] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingEmployeeContacts, setIsEditingEmployeeContacts] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [notification, setNotification] = useState(null);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [newEmployee, setNewEmployee] = useState({  
    code: generatedCode?.code || "", 
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: null,
    age: "", 
    genderId: "", 
    civilStatusId: "", 
    address: "", 
    provinceId: null, 
    cityId: null, 
    barangayId: null, 
    dateHired: null, 
    stationId: "", 
    departmentId: "", 
    designationId: "", 
    employeeStatusId: "", 
    contactNo: "", 
    email: ""
  });
  const [newEmployeeContacts, setNewEmployeeContacts] = useState([]);

  const handleAdd = async () => {
    let codeData = generatedCode;
    // console.log(generatedCode)
  
    setNewEmployee({
      code: codeData.code,
      middleName: "",
      lastName: "",
      birthDate: null,
      age: "",
      genderId: "",
      civilStatusId: "",
      address: "",
      provinceId: null,
      cityId: null,
      barangayId: null,
      dateHired: null,
      stationId: "",
      departmentId: "",
      designationId: "",
      employeeStatusId: "",
      contactNo: "",
      email: ""
    });
  
    setImage(null);
    setImageFile(null);
    setEmployeeContacts([])
    setLoadingEmployeeContacts(false);
    setIsEditing(true);
  };

  useEffect(() => {
    if (newEmployee.birthDate) {
      const today = new CalendarDate(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate()
      );
      
      let age = today.year - newEmployee.birthDate.year;
      
      const hasBirthdayOccurred = 
        today.month > newEmployee.birthDate.month || 
        (today.month === newEmployee.birthDate.month && today.day >= newEmployee.birthDate.day);
      
      if (!hasBirthdayOccurred) {
        age--;
      }
      
      if (newEmployee.age !== age) {
        setNewEmployee(prev => ({
          ...prev,
          age: age
        }));
      }
    }
  }, [newEmployee.birthDate]);


  const handleEdit = async (employee) => {
    setIsEditing(true);
    setEmployeeContacts([]);

    try {   
      // Fetch Contacts 
      const rawContacts = await fetchEmployeeContacts(employee.id);
      const contacts = rawContacts.map(c => ({
        ...c,
        contactNo2: c.contactno2,
      }));

      // Fetch Photo 
      const employeePhotos = await fetchEmployeePhoto(employee.id);
      const mainPhoto = employeePhotos[0] ? employeePhotos[0].photo : null;
      const photoId = employeePhotos[0] ? employeePhotos[0].id : null;

      // 14 15 16 passing undefined to fetchDropdownTypeList

      //employee does not have .provinceid et al

      // Fetch Dropdowns - actually not used at all
      const [genderData, 
        civilStatusData, 
        provinceData, 
        cityData, 
        barangayData, 
        designationData, 
        employeeStatusData
      ] = await Promise.all([
        fetchDropdownTypeList(4, employee.genderid),
        fetchDropdownTypeList(5, employee.civilstatusid),
        fetchDropdownTypeList(14, employee.provinceid),
        fetchDropdownTypeList(15, employee.cityid),
        fetchDropdownTypeList(16, employee.barangayid),
        fetchDropdownTypeList(2, employee.designationid),
        fetchDropdownTypeList(7, employee.employeestatusid)
      ]);

      if (mainPhoto) {
        const fixedPath = mainPhoto.replace(/\\/g, '/');
        setImage(`http://${API_BASE_URL}:${API_PORT}/global-setup/${fixedPath}`);
        setImageFile(null);
      } else {
        setImage(null); 
        setImageFile(null); 
      }

      if (contacts && contacts.length > 0) {
        const contactsWithRelationships = await Promise.all(
          contacts.map(async (contact) => {
            try {
              const relationshipData = await fetchDropdownTypeList(6, contact.relationshipid);
              return {
                ...contact,
                relationshipId: Number(contact.relationshipid),
                relationship: relationshipData?.[0]?.name || "Unknown"
              };
            } catch (error) {
              console.error("Error fetching relationship data:", error);
              return {
                ...contact,
                relationshipId: Number(contact.relationshipid),
                relationship: "Unknown"
              };
            }
          })
        );
        
        setEmployeeContacts(contactsWithRelationships);
      } else {
        setEmployeeContacts([]);
      }

      setNewEmployee(prev => ({
        ...prev, 
        ...employee, 
        firstName: employee.firstname,
        middleName: employee.middlename,
        lastName: employee.lastname,
        genderId: employee.genderid,
        civilStatusId: employee.civilstatusid,
        provinceId: employee.provinceid,
        cityId: employee.cityid,
        barangayId: employee.barangayid,
        stationId: employee.stationid,
        departmentId: employee.departmentid,
        designationId: employee.designationid,
        employeeStatusId: employee.employeestatusid,
        contactNo: employee.contactno,
        birthDate: parseAbsoluteToLocal(employee.birthdate),
        dateHired: parseAbsoluteToLocal(employee.datehired),
        employeeContacts: contacts,
        photo: mainPhoto, 
        photoId: photoId
      }));

  
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingEmployeeContacts(false);
    }
  };

  const handleSave = async () => {
    console.log(newEmployee)
    if (!newEmployee.firstName || !newEmployee.middleName || !newEmployee.lastName ||
        !newEmployee.birthDate || !newEmployee.genderId || !newEmployee.civilStatusId || 
        !newEmployee.address || 
        !newEmployee.provinceId || !newEmployee.cityId || !newEmployee.barangayId || 
        !newEmployee.dateHired || !newEmployee.stationId || 
        !newEmployee.departmentId || !newEmployee.designationId || !newEmployee.employeeStatusId || 
        !newEmployee.contactNo 
        // || !newEmployee.email
      ) {
        setNotification({ message: "All fields are required.", type: "error" });
        return;
    }

    // if (!imageFile && !image) {
    //   setNotification({ message: "Please upload a photo.", type: "error" });
    //   return;
    // }

    if (isSaving) return;
    setIsSaving(true);

    const formatDate = (dateObj) => {
      if (!dateObj || !dateObj.year || !dateObj.month || !dateObj.day) return null;
      return `${dateObj.year}-${String(dateObj.month).padStart(2, "0")}-${String(dateObj.day).padStart(2, "0")}`;
    };

    const payload = {
      firstName: newEmployee.firstName,
      middleName: newEmployee.middleName,
      lastName: newEmployee.lastName,
      birthdate: formatDate(newEmployee.birthDate),
      genderId: parseInt(newEmployee.genderId, 10), 
      civilStatusId: parseInt(newEmployee.civilStatusId, 10),
      address: newEmployee.address, 
      provinceId: newEmployee.provinceId,
      cityId: newEmployee.cityId,
      barangayId: newEmployee.barangayId,
      datehired: formatDate(newEmployee.dateHired), 
      stationId: parseInt(newEmployee.stationId, 10),
      departmentId: parseInt(newEmployee.departmentId, 10),
      designationId: parseInt(newEmployee.designationId, 10),
      employeeStatusId: parseInt(newEmployee.employeeStatusId, 10),
      contactNo: newEmployee.contactNo,
      email: newEmployee.email
    };

    const formData = new FormData();
    formData.append("photo", imageFile);

    try {        
        let employeeId;

        if (newEmployee.id) {
            // Existing Employee 
            employeeId = newEmployee?.id; 
            console.log(employeeId)

            // Update Employee 
            const response = await updateEmployee({ id: employeeId, payload });

            employeeId = response[0]?.id;

            console.log(employeeId)

            // Delete and Add new Contacts 
            await deleteEmployeeContact(employeeId);
      
            console.log(employeeContacts)
            console.log(employeeContacts.length)
            if (employeeContacts.length > 0) {
              await Promise.all(
                employeeContacts.map(contact => addEmployeeContact({ id: employeeId, payload: contact }))
              );
            }

            // Delete and Add new Image 
            if (imageFile && imageFile) {
              await deleteEmployeePhoto(employeeId); 
              const formData = new FormData();
              formData.append("photo", imageFile);
              await addEmployeePhoto({ id: employeeId, payload: formData });
            }
            
        } else {
            // New Employee 
            const response = await addEmployee(payload);
            employeeId = response.id; 

            // console.log(employeeId)

            // Add Contacts
            if (employeeContacts.length > 0) {
              await Promise.all(
                employeeContacts.map(contact => addEmployeeContact({ id: employeeId, payload: contact }))
              );
            }

            // Add Photo 
            if (employeeId && imageFile) {
              const formData = new FormData();
              formData.append("photo", imageFile);
              await addEmployeePhoto({ id: employeeId, payload: formData });
            }
        }

        setIsEditing(false);
        setNotification({ message: "Save successful", type: "success" });

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
            // Delete all records if Employee is deleted 
            await deleteEmployeeContact(id);
            await deleteEmployeePhoto(id);
            await deleteEmployee(id);

            setIsEditing(false);
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

  const formatDate = (dateObj) => {
    if (!dateObj || !dateObj.year || !dateObj.month || !dateObj.day) return null;
    return `${dateObj.year}-${String(dateObj.month).padStart(2, "0")}-${String(dateObj.day).padStart(2, "0")}`;
  };
  
  const columns = [
    { key: "id", label: "No.", hidden: true },
    { key: "code", label: "Employee Code", hidden: false },
    { key: "fullname", label: "Employee Name", hidden: false },
    { key: "birthdate", label: "Birth Date", hidden: true },
    { key: "gender", label: "Gender", hidden: true },
    { key: "civilstatus", label: "Civil Status", hidden: true },
    { key: "address", label: "Address", hidden: true },
    { key: "province", label: "Province", hidden: true },
    { key: "city", label: "City", hidden: true },
    { key: "barangay", label: "Barangay", hidden: true },
    { key: "datehired", label: "Date Hired", hidden: true },
    { key: "station", label: "Station", hidden: true },
    { key: "department", label: "Department", hidden: false },
    { key: "designation", label: "Designation", hidden: false },
    { key: "employeestatus", label: "Employee Status", hidden: true },
    { key: "contactno", label: "Contact No.", hidden: true },
    { key: "email", label: "Email", hidden: true }
  ];

  const customRender = {
    birthdate: (item) => {
      if (!item) return '';
      const date = new Date(item);
      return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
    },
    datehired: (item) => {
      if (!item) return '';
      const date = new Date(item);
      return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
    },
    actions: (item) => (
      <Button
        onClick={() => handleEdit(item)} 
        className="px-3 py-1 bg-blue-200 text-blue-800 rounded hover:bg-blue-300"
      >
        Edit
      </Button>
    ),
  };

  // Employee Contacts Relationship
  const getRelationships = async () => {
    try {
      const response = await fetchDropdowns(6); 
      setRelationships(response); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getRelationships();
  }, []);

  const handleAddEmployeeContacts = () => {
    setNewEmployeeContacts({
      employeeId: "",
      relationshipId: "",
      name: "",
      contactNo: "",
      details: "",
    })
    setIsEditingEmployeeContacts(true);
  }

  const handleEditEmployeeContacts = async (employeeContact) => {
    setNewEmployeeContacts(prev => ({
        ...prev,
        ...employeeContact,
        contactno2: employeeContact.contactNo, 
        relationshipId: Number(employeeContact.relationshipId), 
        relationship: relationships.find(r => r.id === Number(employeeContact.relationshipId))?.name || "Loading...",
    }));

    try {
        const relationshipData = await fetchDropdownTypeList(6, employeeContact.relationshipId);
        const relationship = relationshipData?.[0]?.name || "Unknown";

        setNewEmployeeContacts(prev => ({
            ...prev,
            relationship,
        }));
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    setIsEditingEmployeeContacts(true);
  };

  const handleSaveEmployeeContacts = async () => {
    try {
      const contactId = newEmployeeContacts.id || `temp-${Date.now()}`;
      const relationshipId = parseInt(newEmployeeContacts.relationshipId, 10);
      
      const relationshipData = await fetchDropdownTypeList(6, relationshipId);
      const relationshipName = relationshipData?.[0]?.name || "Unknown";
  
      const updatedContact = {
        ...newEmployeeContacts,
        id: contactId,
        relationshipId,
        relationship: relationshipName,
        contactno2: newEmployeeContacts.contactNo2
      };
  
      const isEdit = employeeContacts.some(contact => contact.id === contactId);
  
      let updatedContacts;
      if (isEdit) {
        updatedContacts = employeeContacts.map((contact) =>
          contact.id === contactId ? updatedContact : contact
        );
      } else {
        const duplicateExists = employeeContacts.some(
          (c) =>
            c.contactNo === updatedContact.contactNo &&
            c.relationshipId === updatedContact.relationshipId
        );
  
        if (duplicateExists) {
          setNotification({
            message: "This contact already exists.",
            type: "error",
          });
          return;
        }
  
        updatedContacts = [...employeeContacts, updatedContact];
      }
  
      setEmployeeContacts(updatedContacts);
      setIsEditingEmployeeContacts(false);
      setNotification({ message: "Save successful (temporary)", type: "success" });
  
    } catch (error) {
      console.error("Error saving contact:", error);
      setNotification({ message: "Error saving contact", type: "error" });
    }
  }; 

  const handleDeleteEmployeeContacts = (id) => {
    const handleConfirm = () => {
        try {
            setIsEditingEmployeeContacts(false);
            setNotification({ message: "Temporary record deleted successfully!", type: "success" });

            setEmployeeContacts((prevEmployeeContacts) => 
                prevEmployeeContacts.filter(employeeContact => employeeContact.id !== id)
            );
        } catch (error) {
            setNotification({ message: "Failed to delete temporary record.", type: "error" });
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

  const employeeContactsColumns = [
    { key: "relationship", label: "Relationship to Employee", hidden: false },
    { key: "name", label: "Name", hidden: false },
    { key: "contactno2", label: "Contact No.", hidden: false }, 
    { key: "details", label: "Details", hidden: true },
  ];

  const customRenderEmployeeContacts = {
    actions: (item) => (
      <Button
        onClick={() => handleEditEmployeeContacts(item)} 
        className="px-3 py-1 bg-blue-200 text-blue-800 rounded hover:bg-blue-300"
      >
        Edit
      </Button>
    ),
  };

  // Employee Photo 
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); 
      setImage(URL.createObjectURL(file)); 
    }
  }
console.log(newEmployee.provinceId, "TEST LOAD PROV")
console.log(newEmployee.cityId, "TEST LOAD CITY")
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
      {isLoadingEmployees ? (
        <TableSkeleton columns={5} rows={5}/>
      ) : isEditing ? (
        <>
        <Accordion variant="splitted" defaultExpandedKeys={["personal_info"]}>
          <AccordionItem key="personal_info" aria-label="Personal Information" title="Personal Information">
            <div className="grid grid-cols-11 gap-3 mb-4">
              <div className="col-span-2 row-span-2 flex flex-col items-center gap-1">
                <div className="w-24 h-24 bg-gray-200 flex items-center justify-center overflow-hidden">
                  {image ? (
                    <img src={image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-500 text-sm">No Image</span>
                  )}
                </div>

                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="upload"
                />

                <label
                  htmlFor="upload"
                  className="px-3 py-1 bg-gray-100 text-[blue] rounded cursor-pointer text-sm"
                >
                  {image ? 'Change image...' : 'Select image...'}
                </label>
                
              </div>
                <div className="col-span-2 gap-3">
                  <Input 
                    className="w-full mb-2" 
                    label="Employee Code" 
                    placeholder="Enter employee code" 
                    value={newEmployee.code}
                    onChange={(e) => setNewEmployee({ ...newEmployee, code: e.target.value })}
                    disabled
                    isRequired
                  />
                </div>
                <div className="col-span-3 gap-3">
                  <Input 
                    className="w-full mb-2" 
                    label="First Name" 
                    placeholder="Enter first name" 
                    value={newEmployee.firstName}
                    onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
                    isRequired
                  />
                </div>
                <div className="col-span-2 gap-3">
                  <Input 
                    className="w-full mb-2" 
                    label="Middle Name" 
                    placeholder="Enter middle name" 
                    value={newEmployee.middleName}
                    onChange={(e) => setNewEmployee({ ...newEmployee, middleName: e.target.value })}
                    isRequired
                  />
                </div>
                <div className="col-span-2 gap-3">
                  <Input 
                    className="w-full mb-2" 
                    label="Last Name" 
                    placeholder="Enter last name" 
                    value={newEmployee.lastName}
                    onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
                    isRequired
                  />
                </div>

                <div className="col-span-3 gap-3">
                <DatePicker  
                  isRequired 
                  label="Date of Birth" 
                  placeholder="Pick a date" 
                  granularity="day"
                  value={newEmployee.birthDate} 
                  onChange={(date) => {
                    const today = new CalendarDate(
                      new Date().getFullYear(),
                      new Date().getMonth() + 1,
                      new Date().getDate()
                    );
                    
                    let age = today.year - date.year;
                    
                    const hasBirthdayOccurred = 
                      today.month > date.month || 
                      (today.month === date.month && today.day >= date.day);
                    
                    if (!hasBirthdayOccurred) {
                      age--;
                    }
                    
                    setNewEmployee({ 
                      ...newEmployee, 
                      birthDate: date,
                      age: age
                    });
                  }}
                  className="max-w-[284px]"
                />
                </div>
                <div className="col-span-2 gap-3">
                  <Input 
                    isDisabled
                    className="w-full mb-2" 
                    label="Age" 
                    value={newEmployee.age}
                  />
                </div>
                <div className="col-span-2 gap-3">
                  <Dropdown 
                    label="Gender"
                    typeId={4} 
                    value={newEmployee.genderId} 
                    onChange={(e) => setNewEmployee({ ...newEmployee, genderId: e.target.value })} 
                  />
                </div>
                <div className="col-span-2 gap-3">
                  <Dropdown 
                    label="Civil Status"
                    typeId={5} 
                    value={newEmployee.civilStatusId} 
                    onChange={(e) => setNewEmployee({ ...newEmployee, civilStatusId: e.target.value })} 
                  />
                </div>
            </div>

            <div className="grid grid-cols-11 gap-3 mb-4">
              <div className="col-span-5 gap-3">
                <Input 
                  className="w-full mb-2" 
                  label="Current Address (Unit/Street #)" 
                  placeholder="Enter address (Unit/Street #)" 
                  value={newEmployee.address}
                  onChange={(e) => setNewEmployee({ ...newEmployee, address: e.target.value })}
                  isRequired
                />
              </div>
              <div className="col-span-2 gap-3">
                <AutoCompleteProvince 
                  selectedKey={newEmployee.provinceId} 
                  onSelectionChange={(code) =>
                    setNewEmployee({
                      ...newEmployee,
                      provinceId: code 
                    })
                  }
                />
              </div>
              <div className="col-span-2 gap-3">
                <AutoCompleteCityMunicipality
                  selectedKey={newEmployee.cityId} 
                  onSelectionChange={(provinceCode) =>
                    setNewEmployee({
                      ...newEmployee,
                      cityId: provinceCode 
                    })
                  }
                />
              </div>
              <div className="col-span-2 gap-3">
                <AutoCompleteBarangays
                  selectedKey={newEmployee.barangayId} 
                  onSelectionChange={(cityCode) =>
                    setNewEmployee({
                      ...newEmployee,
                      barangayId: cityCode 
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-11 gap-3 mb-4">
              <div className="col-span-5 flex gap-3">
                <DatePicker  
                  isRequired 
                  label="Date Hired" 
                  placeholder="Pick a date" 
                  granularity="day"
                  value={newEmployee.dateHired} 
                  onChange={(date) => setNewEmployee({ ...newEmployee, dateHired: date })}
                  className="max-w-[284px]"
                />
                <Dropdown 
                  label="Station"
                  customOptions={stations.body.map(sta => ({
                    id: sta.id,
                    name: sta.name
                  }))}
                  value={newEmployee.stationId} 
                  onChange={(e) => setNewEmployee({ 
                    ...newEmployee, 
                    stationId: parseInt(e.target.value, 10)
                  })} 
                />
              </div>
              <div className="col-span-2 gap-3">
                <Dropdown 
                  label="Department"
                  customOptions={departments.map(d => ({
                    id: d.id,
                    name: d.name
                  }))}
                  value={newEmployee.departmentId} 
                  onChange={(e) => setNewEmployee({ 
                    ...newEmployee, 
                    departmentId: parseInt(e.target.value, 10)
                  })} 
                />
              </div>
              <div className="col-span-2 gap-3">
                <Dropdown 
                  label="Designation"
                  typeId={2} 
                  value={newEmployee.designationId} 
                  onChange={(e) => setNewEmployee({ ...newEmployee, designationId: e.target.value })} 
                />
              </div>
              <div className="col-span-2 gap-3">
                <Dropdown 
                  label="Employee Status"
                  typeId={7} 
                  value={newEmployee.employeeStatusId} 
                  onChange={(e) => setNewEmployee({ ...newEmployee, employeeStatusId: e.target.value })} 
                />
              </div>
            </div>
            <div className="grid grid-cols-11 gap-3 mb-4">
              <div className="col-span-2 gap-3">
                <Input 
                  className="w-full mb-2" 
                  label="Contact No." 
                  placeholder="Enter Contact No." 
                  value={newEmployee.contactNo}
                  onChange={(e) => setNewEmployee({ ...newEmployee, contactNo: e.target.value })}
                  isRequired
                />
              </div>
              <div className="col-span-5 gap-3">
                <Input 
                  className="w-full mb-2" 
                  label="Email" 
                  placeholder="Enter email" 
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                  isRequired
                />
              </div>
              <div></div>
            </div>
          </AccordionItem>
          <AccordionItem key="emergency_contacts" aria-label="Emergency Contacts" title="Emergency Contacts">
            {loadingEmployeeContacts ? (
              <TableSkeleton columns={4} rows={5}/>
            ) : isEditingEmployeeContacts ? (
              <div className="h-screen flex justify-center items-center">
                <div className="bg-white p-6 w-96 h-full max-w-lg">
                  <h2 className="text-xl font-semibold mb-4">{newEmployeeContacts.id ? "Edit" : "Add"} new</h2>
                  <Dropdown 
                    label="Relationship to Employee"
                    typeId={6} 
                    value={newEmployeeContacts.relationshipId} 
                    onChange={(e) => setNewEmployeeContacts({ ...newEmployeeContacts, relationshipId: e.target.value })} 
                  />
                  <Input 
                    className="w-full mb-2" 
                    label="Name" 
                    placeholder="Enter name" 
                    value={newEmployeeContacts.name}
                    onChange={(e) => setNewEmployeeContacts({ ...newEmployeeContacts, name: e.target.value })}
                    isRequired
                  />
                  <Input 
                    className="w-full mb-2" 
                    label="Contact No." 
                    placeholder="Enter contact no." 
                    value={newEmployeeContacts.contactNo2}
                    onChange={(e) => setNewEmployeeContacts({ ...newEmployeeContacts, contactNo2: e.target.value })}
                    isRequired
                  />
                  <Textarea 
                    className="w-full mb-2" 
                    label="Details" 
                    placeholder="Enter Details" 
                    value={newEmployeeContacts.details}
                    onChange={(e) => setNewEmployeeContacts({ ...newEmployeeContacts, details: e.target.value })}
                    isRequired
                  />
                  <div className="flex justify-between items-center w-full mt-2">
                    {newEmployeeContacts.id ? (
                      <Button onClick={() => handleDeleteEmployeeContacts(newEmployeeContacts.id)} color="danger">Delete</Button>
                    ) : (
                      <div></div> 
                    )}
                    <div className="flex space-x-2">
                      <Button onClick={() => setIsEditingEmployeeContacts(false)} color="default" className="text-[blue]">Close</Button>
                      <Button 
                        onClick={handleSaveEmployeeContacts} 
                        color="primary"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Table 
                data={employeeContacts} 
                columns={employeeContactsColumns} 
                onEdit={handleEditEmployeeContacts} 
                onAdd={handleAddEmployeeContacts} 
                customRender={customRenderEmployeeContacts} 
              />
            )}
          </AccordionItem>
          <AccordionItem key="incentive_log" aria-label="Incentive Log" title="Incentive Log">
            {/* {incentives} */}
          </AccordionItem>
        </Accordion>
        <div className="flex items-center justify-between p-4">
          <Button color="primary" variant="solid" className="w-min rounded-md font-semibold text-base text-white">
            + Attachments
          </Button>
          <div className="flex gap-2">
            <Button onClick={() => setIsEditing(false)} color="default" className="w-min rounded-md font-semibold text-base text-white">
                Back
            </Button>
            {newEmployee.id ? (
              <Button onClick={() => handleDelete(newEmployee.id)} color="danger" className="w-min rounded-md font-semibold text-base text-white">
                Delete
              </Button>
            ) : (
              <div></div> 
            )}
            <Button 
              onClick={handleSave} 
              disabled={isSaving} 
              isLoading={isSaving}
              spinner={<Spinner size="sm" variant="wave" color="default" />}
              spinnerPlacement="end"
              color="primary"
              className="w-min rounded-md font-semibold text-base text-white"
            >
              {isSaving ? "Saving" : "Save"}
            </Button>
            <Button className="w-min rounded-md font-semibold text-base text-blue-600 bg-blue-200">
                View History
            </Button>
          </div>
        </div>
        </>
          
      ) : (
        <Table 
          title="Employees" 
          data={employees} 
          columns={columns} 
          onEdit={handleEdit} 
          onAdd={handleAdd} 
          customRender={customRender} 
        />
      )}
    </div>
  );  
};

export default Employee;
