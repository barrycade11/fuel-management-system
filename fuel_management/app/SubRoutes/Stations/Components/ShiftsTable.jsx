import { Button } from "@heroui/react";
import { PlusIcon } from "lucide-react";
import ShiftFormModal from "./ShiftFormModal";
import { useState } from "react";
import { useParams } from "react-router";
import { useDeleteShiftMutation, useFetchStationShifts } from "~/Hooks/Setup/GlobalRecords/Shift/useShifts";
import TableSkeleton from "~/Components/TableSkeleton";
import ErrorElement from "~/Components/ErrorElement";
import { Time } from "@internationalized/date";
import moment from "moment";
import { useQueryClient } from "@tanstack/react-query";

const defaultForm = {
  shiftId: null,
  startShift: null,
  endShift: null,
  details: null,
}

const ShiftsTable = () => {
  const query = useQueryClient();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState();
  const [selectedStationShift, setSelectedStationShift] = useState(null);
  const [selectedShift, setSelectedShift] = useState();
  const [form, setForm] = useState({
    shiftId: null,
    startShift: null,
    endShift: null,
    details: null,
  });
  const { isLoading: fetchShiftsLoading, isError, isLoading, error, data, isSuccess } = useFetchStationShifts(id);
  const deleteStationShiftMutation = useDeleteShiftMutation();

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

  if (fetchShiftsLoading) {
    return (
      <div className="flex flex-col md:w-1/2 w-full">
        <TableSkeleton />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col md:w-1/2 w-full">
        <ErrorElement>{error.message}</ErrorElement>
      </div>
    )
  }

  const handleOpenFormModal = (shiftId = null, id = null) => {
    setSelectedShift((state) => shiftId ? shiftId : null);
    setSelectedStationShift((state) => shiftId ? id : null);
    setForm((state) => {
      if (shiftId) {
        const selected = data.find(i => i.shiftid === shiftId)
        let s = selected.starttime.split(":");
        let c = selected.endtime.split(":");
        let start = new Time(s[0], s[1], s[2]);
        let end = new Time(c[0], c[1], c[2])
        return {
          shiftId: selected.id,
          details: selected.details,
          startShift: start,
          endShift: end,
        }
      }
    })
    setIsOpen(true);
  }

  const onChange = (key, val) => {
    setForm((state) => ({
      ...state,
      [key]: val,
    }))
  }

  const handleDelete = (id) => {
    const res = confirm("Are you sure to delete this shift?");
    if (!res) return;

    onManageDelete(id);
  }

  const onManageDelete = (shiftId) => {
    deleteStationShiftMutation.mutate({ stationId: id, id: shiftId }, {
      onError: (error) => {
        showToast({
          title: "Error",
          description: error.message,
          color: 'danger',
        });
      },
      onSuccess: (response) => {
        query.invalidateQueries(['stationshifts', id])
        showToast({
          title: "Success",
          description: "Successfully deleted shift",
          color: 'success',
        });
      }
    });
  }

  return (
    <div className="flex flex-col md:w-1/2 w-full">
      <div className="flex flex-row justify-between">
        <span className="text-lg text-default-700 font-semibold">Shifts</span>
        <Button
          onPress={() => handleOpenFormModal()}
          radius="none"
          fullWidth={false}
          color="primary">
          <PlusIcon />
          Add New
        </Button>
      </div>

      <table className="mt-2  p-4 w-full whitespace-nowrap">
        <thead>
          <tr className="border border-default-200 h-[40px]">
            <th align="center" className="text-md text-default-800 font-semibold">Shift Name</th>
            <th align="center" className="text-md text-default-800 font-semibold">Shift Schedule</th>
            <th align="center" className="text-md text-default-800 font-semibold">Action</th>
          </tr>
        </thead>

        <tbody>
          {
            data && Array.isArray(data) && data.length > 0 && data.map((shift, index) => {
              let start = moment(shift.starttime, "HH:mm:ss").format("hh:mm A");
              let end = moment(shift.endtime, "HH:mm:ss").format("hh:mm A");

              return (
                <tr className="border border-default-200 h-[60px]" key={index}>
                  <td onClick={() => handleOpenFormModal(shift.shiftid, shift.id)} align="center" className="cursor-pointer text-md text-primary font-normal">{shift.shift}</td>
                  <td align="center" className="text-md text-default-800 font-normal">{start} - {end}</td>
                  <td align="center" className="text-md text-default-800 font-normal">
                    <Button
                      onPress={() => handleDelete(shift.id)}
                      radius="none"
                      variant="flat"
                      color="danger">
                      Remove
                    </Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      <ShiftFormModal
        isOpen={isOpen}
        onOpenChange={() => {
          setForm(defaultForm)
          setIsOpen(false)
        }}
        textChange={onChange}
        form={form}
        selectedShiftId={selectedShift}
        selectedStationShift={selectedStationShift}
      />
    </div>
  )
}


export default ShiftsTable;

