import { Button, Input, menuItem, Textarea } from "@heroui/react";
import SelectComponent from "./Components/SelectComponent";
import { MailIcon, SearchIcon, SettingsIcon } from "lucide-react";
import useAuth from "~/Hooks/Auth/useAuth";
import useToken from '~/Hooks/TestHook/useToken';
import { useEffect, useState } from "react";
import HeroUIModal from "~/Components/Modal";
import TextBoxField from "~/Pages/Login/Components/TextBoxField";
import PrimaryButton from "~/Components/PrimayButton";
import { addToast } from "@heroui/react";

//api hooks
import useAddRoleMutation from "~/Hooks/Settings/useAddRoleMutation";
import useRoles from "~/Hooks/Settings/useRoles";
import useRolesDeleteMutation from '~/Hooks/Settings/useRolesDeleteMutation';
import usePermissionsMutation from "~/Hooks/Settings/usePermissionsMutation";
import usePermissionsSaveMutation from "~/Hooks/Settings/usePermissionsSaveMutation";

/**
 * Component for rendering a role check item.
 *
 * @param {object} props - The component props.
 * @param {string} props.action - The action name.
 * @param {boolean} props.checked - The checked state.
 * @param {function} props.onChange - The change event handler.
 * @param {string} props.id - The item ID.
 * @returns {JSX.Element} The rendered component.
 */
const RoleCheckItem = ({
  action = "",
  checked = false,
  onChange = () => { },
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
 *
 * @returns {JSX.Element} The rendered component.
 */
const Permissions = () => {
  //api hooks
  const { refetch, isSuccess } = useRoles();
  const addNewRoleMutation = useAddRoleMutation();
  const permissionsMutation = usePermissionsMutation();
  const permissionSaveMutation = usePermissionsSaveMutation();
  const roleDeleteMutaion = useRolesDeleteMutation();

  //states
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [isAddNewRoleLoading, setAddNewRoleLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);

  /**
   * Shows a toast notification.
   *
   * @param {object} params - The toast parameters.
   * @param {string} params.title - The toast title.
   * @param {string} params.color - The toast color.
   * @param {string} params.description - The toast description.
   */
  const showToast = ({
    title = "",
    color = "danger",
    description = "",
  }) => addToast({
    timeout: 3000,
    title: title,
    description: description,
    color: color,
  });

  /**
   * Sets the form data for adding a new role.
   *
   * @param {string} val - The value to set.
   * @param {string} key - The form field key.
   */
  const onSetFormAddNewRole = (val, key) => {
    setFormAddNewRole(prevState => ({
      ...prevState,
      [key]: val,
    }))
  }

  /**
   * Manages the process of adding a new role.
   */
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

  /**
   * Manages the role permission selection.
   *
   * @param {object} e - The event object.
   */
  const onManageRolePermission = (e) => {
    const { value } = e.target;

    setSelectedRole(value); //save selected role to state

    permissionsMutation.mutate(value, {
      onSuccess: (response) => {
        const data = response.data.body;
        // Initialize menuItems with permissions mapping
        const updatedMenuItems = data.map(item => ({
          ...item,
          permissions: {
            View: item.view,
            Add: item.add,
            Edit: item.edit,
            Delete: item.delete
          }
        }));
        setMenuItems(updatedMenuItems);
        setFilteredMenuItems(updatedMenuItems);
        // Reset selected rows
        setSelectedRows({});
        setSelectAll(false);
        setTopPermissions({
          View: false,
          Add: false,
          Edit: false,
          Delete: false
        });
        setSearchTerm("");
      },
      onError: (error) => {
        showToast({
          title: "Error",
          description: "Error: " + error.response?.data?.message || error.message,
          color: 'danger',
        })
      }
    })
  }

  /**
   * Performs a fuzzy search on the menu items.
   *
   * @param {array} items - The menu items.
   * @param {string} searchTerm - The search term.
   * @returns {array} The filtered menu items.
   */
  const fuzzySearch = (items, searchTerm) => {
    if (!searchTerm || searchTerm.trim() === "") {
      return items;
    }

    const term = searchTerm.toLowerCase();

    return items.filter(item => {
      const name = item.name.toLowerCase();

      // Direct match
      if (name.includes(term)) {
        return true;
      }

      // Fuzzy match - check if characters appear in sequence
      let termIndex = 0;
      for (let i = 0; i < name.length && termIndex < term.length; i++) {
        if (name[i] === term[termIndex]) {
          termIndex++;
        }
      }

      // If we matched all characters in the search term
      return termIndex === term.length;
    });
  };

  /**
   * Handles the search input change.
   *
   * @param {object} e - The event object.
   */
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredMenuItems(fuzzySearch(menuItems, value));

    // Reset selection when search changes
    if (value) {
      setSelectedRows({});
      setSelectAll(false);
    }
  };

  /**
   * Handles row selection.
   *
   * @param {object} e - The event object.
   * @param {string} itemId - The item ID.
   */
  const handleRowSelect = (e, itemId) => {
    const isChecked = e.target.checked;
    setSelectedRows(prev => ({
      ...prev,
      [itemId]: isChecked
    }));
  }

  /**
   * Handles select all rows.
   *
   * @param {object} e - The event object.
   */
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    const newSelectedRows = {};
    filteredMenuItems.forEach(item => {
      newSelectedRows[item.id] = isChecked;
    });

    setSelectedRows(newSelectedRows);
  }

  /**
   * Handles top permissions change.
   *
   * @param {object} e - The event object.
   * @param {string} action - The permission action.
   */
  const handleTopPermissionChange = (e, action) => {
    const isChecked = e.target.checked;
    setTopPermissions(prev => ({
      ...prev,
      [action]: isChecked
    }));
  }

  /**
   * Applies permissions to selected rows.
   */
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
    setFilteredMenuItems(fuzzySearch(updatedMenuItems, searchTerm));

    showToast({
      title: "Success",
      description: "Permissions applied to selected menus",
      color: 'success',
    });
  }

  /**
   * Handles individual permission change.
   *
   * @param {object} e - The event object.
   * @param {string} itemId - The item ID.
   * @param {string} action - The permission action.
   */
  const handlePermissionChange = (e, itemId, action) => {
    const isChecked = e.target.checked;

    const updatedItems = menuItems.map(item => {
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
    });

    setMenuItems(updatedItems);
    setFilteredMenuItems(fuzzySearch(updatedItems, searchTerm));
  }

  /**
   * Saves all permissions.
   */
  const savePermissions = async () => {
    const selectedMenuRows = Object.keys(selectedRows)
    let items = [];

    selectedMenuRows.map((id) => {
      const item = menuItems.find(menu => menu.id === parseInt(id));
      if (item) {
        items.push({
          id: item.id,
          name: item.name,
          create: item.permissions.Add,
          read: item.permissions.View,
          update: item.permissions.Edit,
          delete: item.permissions.Delete,
        });
      }
    });

    if(items.length === 0) return;

    onManageSavePermissions(items);
  }

  /**
   * Manages the saving of permissions.
   *
   * @param {array} items - The permission items.
   */
  const onManageSavePermissions = async (items) => {
    const request = { items: items };
    permissionSaveMutation.mutate(request, {
      onSettled: (response) => {
        if (response.data.success) {
          showToast({
            title: "Success",
            description: response.data.message,
            color: 'success',
          });
        }
      },
      onError: (error) => {
        showToast({
          title: "Error",
          description: error.message,
          color: 'danger',
        });
      }
    });
  }

  /**
   * Handles the delete role action.
   */
  const handleDeleteRole = () => {
    setDeleteModalIsOpen(true);
  }

  /**
   * Manages the deletion of a role.
   */
  const onManageDeleteRole = async () => {
    roleDeleteMutaion.mutate(selectedRole, {
      onSuccess: async (response) => {
        setDeleteModalIsOpen(false);
        setFilteredMenuItems([]); //clear table if role is deleted
        setSelectedRole(null)
        showToast({
          title: 'Success',
          description: response.data.message,
          color: 'success',
        })
        await refetch();
      },
      onError: (error) => {
        setDeleteModalIsOpen(false);
        showToast({
          title: 'Error',
          description: error.message,
          color: 'danger',
        })

      }
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
              value={searchTerm}
              onChange={handleSearchChange}
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
              {filteredMenuItems.map((item, index) => (
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
              {filteredMenuItems.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-4 px-4 text-center text-gray-500">
                    {searchTerm ? 'No matching menu items found' : 'Select a role to view menu items'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="absolute bottom-[3%] right-[3%] flex flex-row gap-2">
          <Button
            radius="none"
            className="rounded-sm"
            color={selectedRole === null ? 'default' : 'danger'}
            onPress={handleDeleteRole}
            disabled={selectedRole === null ? true : false}
          >
            <span className="font-semibold text-white">Delete</span>
          </Button>
          <Button
            radius="none"
            color='primary'
            className="rounded-sm"
            onPress={savePermissions}
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

      <HeroUIModal
        size="lg"
        height="60px"
        isOpen={deleteModalIsOpen}
        onOpenChange={() => setDeleteModalIsOpen(false)}
        title="Delete role"
        footer={
          <div className="flex flex-row justify-end flex-grow">
            <Button
              color='default'
              onClick={() => setDeleteModalIsOpen(false)}
              className="bg-white">
              <span className="text-gray-600 font-semibold">Cancel</span>
            </Button>
            <PrimaryButton
              color='danger'
              onClick={onManageDeleteRole}
              fullWidth={false}
              isLoading={isAddNewRoleLoading}
              title={"Confirm"}
            />
          </div>

        }
      >
        <span>Are you sure you want to delete this role? It will remove all related permissions associated of this role.</span>
      </HeroUIModal>
    </>
  )
}

export default Permissions;
