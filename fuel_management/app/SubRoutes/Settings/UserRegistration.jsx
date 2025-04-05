import TextBoxField from "~/Pages/Login/Components/TextBoxField";
import SettingsMultiSelectDropdown from "./Components/SettingsMultiSelectDropdown";
import { Select, SelectSection, SelectItem } from "@heroui/select";
import useRoles from "~/Hooks/Settings/useRoles";
import { SelectOptionRole } from "./Components/SelectComponent";
import { Button, CircularProgress, Form } from "@heroui/react";
import PrimaryButton from "~/Components/PrimayButton";
import { useNavigate, useParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchStationIdAndName } from "~/Hooks/Setup/Station/useFetchStationIdAndNameOnly";
import { useDebugValue, useEffect, useState } from "react";
import useAccountAddMutation from "~/Hooks/Settings/userAccountAddMutation";
import { addToast } from "@heroui/react";
import useAccountGetById from "~/Hooks/Settings/useAccountGetById";
import useAccountMutation from "~/Hooks/Settings/useAccounts";
import useAccountUpdateMutation from "~/Hooks/Settings/useAccountUpdateMutation";
import useSettingsState from "~/Hooks/Settings/useSettingsState";
import useAccountDeleteMutation from "~/Hooks/Settings/userAccountDeleteMutation";

const UserRegistration = () => {
  const { id } = useParams();
  //api hooks
  const query = useQueryClient();
  const { isSuccess: userSuccess, isLoading: userLoading, data: userDetails, error: userError } = useAccountGetById();
  const { data, isLoading, isSuccess } = useRoles();
  const { refetch, isSuccess: stationSuccess } = useFetchStationIdAndName()
  const accountMutation = useAccountAddMutation();
  const accountUpdateMutation = useAccountUpdateMutation();
  const accountDeleteMutation = useAccountDeleteMutation();


  //&& remove the update in state forms to avoid network request
  //states
  const { accounts, onSetAccounts } = useSettingsState();
  const [formAddLoading, setFormAddLoading] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    lastname: "",
    firstname: "",
    stationAssignments: [],
    userRole: null,
    status: null
  });

  if (userLoading || isLoading) {
    return (
      <div className="flex flex-col bg-white flex-grow justify-center items-center">
        <CircularProgress aria-labelledby="loading" />
      </div>
    )
  }

  let ids = null;
  let currentRoleId = []
  if (userSuccess && isSuccess && stationSuccess || id !== "0") {
    ids = userDetails?.body[0]?.stationids;
    currentRoleId.push(userDetails?.body[0]?.roleid.toString());
    query.invalidateQueries(['accountid'])
  }

  const cachedData = query.getQueryData(['stationidname'])

  if (!cachedData) {
    refetch();
  }


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

  const handleFormUpdate = (key, value) => {
    setForm((prevState) => ({
      ...prevState,
      [key]: value, // Dynamically update the form field based on the key
    }));
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries((new FormData(e.currentTarget)))
    const items = [...data.stationAssignments]; //convert Set() to array
    data.stationAssignments = items; //update to list of station ids
    return id === "0" ? onManageAccount(data) : onManageAccountUpdate(data);
  }

  const onManageAccount = (data) => {
    setFormAddLoading(true)
    accountMutation.mutate(data, {
      onError: (error) => {
        setFormAddLoading(false)
        showToast({
          title: "Error",
          description: "Error: " + error.response?.data?.message || error.message,
          color: 'danger',
        })
      },
      onSettled: (response) => {
        setFormAddLoading(false)
        if (!response.data.success) {
          showToast({
            title: "Warning",
            description: response.data.message,
            color: 'warning',
          })
          return
        }


        showToast({
          title: "Success",
          description: response.data.message,
          color: 'success',
        })
      }
    })
  }

  const onManageAccountUpdate = (body) => {
    const _form = { ...body }
    delete _form.password;
    setFormAddLoading(true)
    accountUpdateMutation.mutate(_form, {
      onError: (error) => {
        setFormAddLoading(false)
        showToast({
          title: "Error",
          description: "Error: " + error.response?.data?.message || error.message,
          color: 'danger',
        })
      },
      onSettled: (response) => {
        setFormAddLoading(false)
        if (!response.data.success) {
          showToast({
            title: "Warning",
            description: response.data.message,
            color: 'warning',
          })
          return
        }
        query.invalidateQueries(['accountid', 'roles']);
        onSetAccounts([]) //clear state

        showToast({
          title: "Success",
          description: response.data.message,
          color: 'success',
        })
      }
    })

  }

  const onManageDeleteAccount = () => {
    setFormAddLoading(true);
    accountDeleteMutation.mutate(id, {
      onError: (error) => {
        setFormAddLoading(false)
        showToast({
          title: "Error",
          description: "Error: " + error.response?.data?.message || error.message,
          color: 'danger',
        })
      },
      onSettled: (response) => {
        setFormAddLoading(false)
        query.invalidateQueries(['accountid', 'roles']);
        onSetAccounts([]) //clear state

        showToast({
          title: "Success",
          description: response.data.message,
          color: 'success',
        })

        navigate(-1) 
      }

    })
  }

  return (
    <div className="flex flex-col bg-white flex-grow justify-center items-center">

      <Form
        onSubmit={onSubmit}
        className="w-3/4 items-stretch flex flex-col md:w-[550px] pt-7 border border-default-200">
        <span className="text-lg pl-10 py-5 font-bold text-black">Add Item</span>

        <div className="flex flex-row gap-5 px-10">
          <div className="flex-1">
            <TextBoxField
              name="username"
              label="Username"
              value={userDetails?.body[0]?.username}
            />
          </div>
          <div className="flex-1">
            <TextBoxField
              name="password"
              label="Password"
              type="Password"
            />
          </div>
        </div>

        <div className="flex flex-row gap-5 px-10">
          <div className="flex-1">
            <TextBoxField
              name="lastname"
              label="Lastname"
              value={userDetails?.body[0]?.lastname}
            />
          </div>
          <div className="flex-1">
            <TextBoxField
              name="firstname"
              label="Firstname"
              value={userDetails?.body[0]?.firstname}
            />
          </div>
        </div>

        <div className="block px-10 pt-5">
          <h3 className="text-default-500 font-semibold text-small">Station Assignments</h3>
          <Select
            name="stationAssignments"
            onChange={(e) => {
              setForm((prevState) => ({
                ...prevState,
                stationAssignments: [...prevState.stationAssignments, e.target.value], // Create a new array
              }));
            }}
            aria-labelledby="Station Assignments"
            radius="none"
            placeholder=""
            fullWidth
            selectionMode="multiple"
            className="flex-1"
            defaultSelectedKeys={ids}
          >
            {
              cachedData && cachedData.body.map((item) => (
                <SelectItem key={item.id}>{item.name}</SelectItem>
              ))
            }
          </Select>
        </div>

        <div className="flex flex-col flex-1 pt-5 px-10">
          <h3 className="text-default-500 font-semibold text-small">User Roles</h3>
          <SelectOptionRole
            name="userRole"
            defaultSelectedKeys={currentRoleId}
          />
        </div>

        <div className="flex flex-col flex-1 pt-5 px-10 pb-5">
          <h3 className="text-default-500 font-semibold text-small">Status</h3>
          <Select
            name="status"
            aria-labelledby="Status"
            radius="none"
            placeholder=""
            fullWidth
            className="flex-1"
            defaultSelectedKeys={["true"]}
          >
            <SelectItem key={"true"}>Active</SelectItem>
            <SelectItem key={"false"}>Inactive</SelectItem>
          </Select>
        </div>


        <div className="bg-gray-300 flex flex-row flex-grow px-4 py-2 mt-10 ">

          <Button
            onPress={onManageDeleteAccount}
            disabled={id === "0"}
            color="ghost"
            radius="none"
            variant='flat'>
            <h1 className="text-danger font-semibold">Delete...</h1>
          </Button>

          <div className="flex flex-1 flex-row justify-end items-center gap-2">
            <Button
              onPress={() => navigate(-1)}
              color="ghost"
              radius="none"
              variant='flat'>
              <h1 className="text-primary font-semibold">Close</h1>
            </Button>

            <PrimaryButton
              title={id === "0" ? 'Save' : 'Update'}
              isLoading={formAddLoading}
              type="sumbmit"
              fullWidth={false} />
          </div>

        </div>

      </Form>

    </div>
  )

}

export default UserRegistration;
