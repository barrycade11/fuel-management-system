import StationFormDetails from "./Components/StationFormDetails";
import { addToast, Button, Form } from '@heroui/react';
import { PlusIcon } from 'lucide-react'
import TanksTable from "./Components/TanksTable";
import TanksDepartmentTable from "./Components/TanksDepartmentTable";
import useAddStationMutation from "~/Hooks/Setup/Station/Station/useAddStation";
import { useNavigate } from "react-router";

const InitialPage = () => {
  const addStationMutation = useAddStationMutation();
  const navigate = useNavigate();

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


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries((new FormData(e.currentTarget)))
    addStationMutation.mutate(data, {
      onError: (error) => {
        console.log(error);
        showToast({
          title: "Error",
          description: error.message,
          color: 'danger'
        })
      },
      onSuccess: (response) => {
        showToast({
          title: "Success",
          description: response.message,
          color: 'success'
        })

        setTimeout(() => {
          navigate(-1);
        }, 2000)
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit} className="flex bg-white flex-col px-4 items-stretch">
      <StationFormDetails />
      <div className="grid md:grid-cols-5 mt-14 ">
        <TanksTable />
        <TanksDepartmentTable />
      </div>
      <div className="flex flex-row justify-between pt-10">
        <Button
          radius="none"
          color="primary" >
          <PlusIcon size={18} />
          Attachments
        </Button>

        <div className="flex flex-row gap-4">
          <Button
            className="text-white font-semibold"
            radius="sm"
            color='default'>
            Back
          </Button>

          <Button
            className="font-semibold text-white"
            radius="sm"
            color='danger'>
            Delete
          </Button>

          <Button
            type="submit"
            className="font-semibold text-white"
            radius="sm"
            color='primary'>
            Save
          </Button>

          <Button
            className="font-semibold text-primary"
            radius="sm"
            variant="flat"
            color='primary'>
            View History
          </Button>
        </div>
      </div>
    </Form>
  )
}

export default InitialPage;
