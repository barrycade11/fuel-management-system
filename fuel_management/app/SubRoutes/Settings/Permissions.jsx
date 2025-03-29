import { Button, Input, Textarea } from "@heroui/react";
import SelectComponent from "./Components/SelectComponent";
import { MailIcon, SearchIcon, SettingsIcon } from "lucide-react";
import useAuth from "~/Hooks/Auth/useAuth";
import useToken from '~/Hooks/TestHook/useToken';
import { useEffect, useState } from "react";
import HeroUIModal from "~/Components/Modal";
import TextBoxField from "~/Pages/Login/Components/TextBoxField";
import PrimaryButton from "~/Components/PrimayButton";
import { addToast } from "@heroui/react";
import useAddRoleMutation from "~/Hooks/Settings/useAddRoleMutation";
import useRoles from "~/Hooks/Settings/useRoles";
import usePermissionsMutation from "~/Hooks/Settings/usePermissionsMutation";

const RoleCheckItem = ({
  action = "",
  checked = false,
  onChange = () => {},
  id = ""
}) => {
  return (
    <div className="flex flex-row items-center">
      <input 
        type="checkbox" 
        className="mr-2" 
        checked={checked}
        onChange={(e) => onChange(e, id, action)}
        id={`${id}-${action}`}
      />
      <span className="text-sm text-black font-normal ">{action}</span>
    </div>
  )
}

/**
 * Permission page to handle role based permission on each modules & submodules
 */
const Permissions = () => {
  //api hooks
  const { refetch, isSuccess } = useRoles();
  const addNewRoleMutation = useAddRoleMutation();
  const permissionsMutation = usePermissionsMutation();

  //local state
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [isAddNewRoleLoading, setAddNewRoleLoading] = useState(false);
  const [formAddNewRole, setFormAddNewRole] = useState({
    role: "",
    role_detail: "",
  });
  const [selectedRows, setSelectedRows] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [topPermissions, setTopPermissions] = useState({
    View: false,
    Add: false,
    Edit: false,
    Delete: false
  });

  const showToast = ({
    title = "",
    color = "danger",
    description = "",
  }) => addToast({
    title: title,
    description: description,
    color: color,
  });

  const onSetFormAddNewRole = (val, key) => {
    setFormAddNewRole(prevState => ({
      ...prevState,
      [key]: val,
    }))
  }

  const onManageAddRole = () => {
    setAddNewRoleLoading(true);
    addNewRoleMutation.mutate(formAddNewRole, {
      onError: (error) => {
        setAddNewRoleLoading(false);
        showToast({
          title: "Error",
          description: "Error: " + error.response?.data?.message || error.message,
          color: 'danger',
        })
      },
      onSettled: async (response) => {
        setAddNewRoleLoading(false);
        if (response.data.success) {
          await refetch()
          showToast({
            title: "Success",
            description: response.data.message,
            color: 'success',
          })
          setIsOpen(false);
        }
      }
    })
  }

  const onManageRolePermission = (e) => {
    const { value } = e.target;
    permissionsMutation.mutate(value, {
      onSuccess: (response) => {
        const data = response.data.body;
        // Initialize menuItems with permissions mapping
        const updatedMenuItems = data.map(item => ({
          ...item,
          permissions: {
            View: false,
            Add: false,
            Edit: false,
            Delete: false
          }
        }));
        setMenuItems(updatedMenuItems);
        // Reset selected rows
        setSelectedRows({});
        setSelectAll(false);
        setTopPermissions({
          View: false,
          Add: false,
          Edit: false,
          Delete: false
        });
      },
      onError: (error) => {
        console.log(error);
        showToast({
          title: "Error",
          description: "Error: " + error.response?.data?.message || error.message,
          color: 'danger',
        })
      }
    })
  }

  // Handle row selection
  const handleRowSelect = (e, itemId) => {
    const isChecked = e.target.checked;
    setSelectedRows(prev => ({
      ...prev,
      [itemId]: isChecked
    }));
  }

  // Handle select all rows
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    
    const newSelectedRows = {};
    menuItems.forEach(item => {
      newSelectedRows[item.id] = isChecked;
    });
    
    setSelectedRows(newSelectedRows);
  }

  // Handle top permissions change
  const handleTopPermissionChange = (e, action) => {
    const isChecked = e.target.checked;
    setTopPermissions(prev => ({
      ...prev,
      [action]: isChecked
    }));
  }

  // Apply permissions to selected rows
  const applyToSelected = () => {
    const updatedMenuItems = menuItems.map(item => {
      if (selectedRows[item.id]) {
        return {
          ...item,
          permissions: {
            ...item.permissions,
            ...topPermissions
          }
        };
      }
      return item;
    });
    
    setMenuItems(updatedMenuItems);
    
    showToast({
      title: "Success",
      description: "Permissions applied to selected menus",
      color: 'success',
    });
  }

  // Handle individual permission change
  const handlePermissionChange = (e, itemId, action) => {
    const isChecked = e.target.checked;
    
    setMenuItems(prevItems => 
      prevItems.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            permissions: {
              ...item.permissions,
              [action]: isChecked
            }
          };
        }
        return item;
      })
    );
  }

  // Save all permissions
  const savePermissions = () => {
    // Here you would typically send the updated permissions to the server
    // This is a mock implementation
    showToast({
      title: "Success",
      description: "Permissions saved successfully",
      color: 'success',
    });
  }

  // Count selected rows
  const selectedRowsCount = Object.values(selectedRows).filter(Boolean).length;

  return (
    <>
      <section className="flex flex-col px-4">
        <SelectComponent
          onChange={onManageRolePermission}
          label="User Role" />

        <div className="grid grid-cols-1 md:grid-cols-3 pt-5 items-center">

          <div className="col-span-2 flex flex-wrap flex-row items-center gap-2">
            <RoleCheckItem 
              action="View" 
              checked={topPermissions.View}
              onChange={(e) => handleTopPermissionChange(e, 'View')}
            />
            <RoleCheckItem 
              action="Add" 
              checked={topPermissions.Add}
              onChange={(e) => handleTopPermissionChange(e, 'Add')}
            />
            <RoleCheckItem 
              action="Edit" 
              checked={topPermissions.Edit}
              onChange={(e) => handleTopPermissionChange(e, 'Edit')}
            />
            <RoleCheckItem 
              action="Delete" 
              checked={topPermissions.Delete}
              onChange={(e) => handleTopPermissionChange(e, 'Delete')}
            />

            <Button
              radius="none"
              className="ml-2 rounded-md opacity-80 bg-primary text-white font-semibold"
              onClick={applyToSelected}
              disabled={selectedRowsCount === 0}
            >
              Apply to Selected Menus {selectedRowsCount > 0 ? `(${selectedRowsCount})` : ''}
            </Button>
          </div>

          <div className="justify-end flex flex-row items-center pt-5 md:p-0">
            <Input
              radius="none"
              endContent={
                <div className="flex gap-2">
                  <SearchIcon className="rounded-sm text-2xl text-default-400 pointer-events-none flex-shrink-0" size={18} />
                  <SettingsIcon size={18} />

                </div>
              }
              labelPlacement="outside"
              placeholder="Search Module"
            />
            <Button
              radius="none"
              className="rounded-md bg-primary opacity-80 ml-2 text-white font-semibold"
              onClick={() => setIsOpen(true)}
            >
              Add New
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 bg-white rounded-md shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-white">
                <th className="w-12 py-3 px-4 text-left">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th colSpan={1} className="py-3 px-4 text-left font-medium text-gray-800">
                  <div className="flex items-center">
                    Menu Item
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 11l5-5m0 0l5 5m-5-5v12"
                      ></path>
                    </svg>
                  </div>
                </th>
                <th colSpan={1} className="py-3 px-4 text-left font-medium text-gray-800">
                  Permissions
                </th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}
                >
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600"
                      checked={!!selectedRows[item.id]}
                      onChange={(e) => handleRowSelect(e, item.id)}
                    />
                  </td>
                  <td className="py-3 px-4 text-gray-800">{item.name}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-6">
                      <RoleCheckItem 
                        action="View" 
                        checked={item.permissions?.View}
                        onChange={handlePermissionChange}
                        id={item.id}
                      />
                      <RoleCheckItem 
                        action="Add" 
                        checked={item.permissions?.Add}
                        onChange={handlePermissionChange}
                        id={item.id}
                      />
                      <RoleCheckItem 
                        action="Edit" 
                        checked={item.permissions?.Edit}
                        onChange={handlePermissionChange}
                        id={item.id}
                      />
                      <RoleCheckItem 
                        action="Delete" 
                        checked={item.permissions?.Delete}
                        onChange={handlePermissionChange}
                        id={item.id}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {menuItems.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-4 px-4 text-center text-gray-500">
                    Select a role to view menu items
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="absolute bottom-[3%] right-[3%] flex flex-row gap-2">
          <Button
            radius="none"
            color="danger"
            className="rounded-sm"
            disabled={selectedRowsCount === 0}
          >
            <span className="font-semibold">Delete</span>
          </Button>
          <Button
            radius="none"
            color="primary"
            className="rounded-sm"
            onClick={savePermissions}
          >
            <span className="font-semibold">Save</span>
          </Button>

        </div>

      </section>

      <HeroUIModal
        onOpenChange={(e) => setIsOpen(e)}
        isOpen={isOpen}
        title="Add New"
        footer={
          <div className="flex flex-row justify-end flex-grow">
            <Button
              onClick={() => setIsOpen(false)}
              className="bg-white">
              <span className="text-blue-600 font-semibold">Close...</span>
            </Button>
            <PrimaryButton
              onClick={onManageAddRole}
              fullWidth={false}
              isLoading={isAddNewRoleLoading}
              title={"Add"}
            />
          </div>
        }
      >
        <form className="flex flex-col">
          <TextBoxField
            label="User Role"
            onChange={(e) => onSetFormAddNewRole(e.target.value, 'role')}
          />
          <span className="text-gray py-3 mt-2 font-semibold text-small">Details</span>
          <Textarea
            onChange={(e) => onSetFormAddNewRole(e.target.value, 'role_detail')}
            radius="sm" className="flex-grow" label="" placeholder="Enter your description" />
        </form>
      </HeroUIModal>

    </>
  )
}

export default Permissions;
