import { Select, SelectItem, Button, TimeInput, Textarea, addToast } from "@heroui/react";
import { Time } from "@internationalized/date";
import { Clock, TimerIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import HeroUIModal from "~/Components/Modal";
import { useCreateShiftMutation, useFetchShifts, useUpdateShiftMutation } from "~/Hooks/Setup/GlobalRecords/Shift/useShifts";
import { useQueryClient } from "@tanstack/react-query";
import useUpdateStationMutation from "~/Hooks/Setup/Station/Station/useUpdateStation";

const ShiftFormModal = ({
  textChange = null,
  isOpen = false,
  onOpenChange = null,
  form = {},
  selectedShiftId = null,
  selectedStationShift = null
}) => {
  const query = useQueryClient();
  const { id } = useParams()
  const [selectedKey, setSelectedKey] = useState(new Set());
  const { data, isSuccess, isLoading, isError, error } = useFetchShifts();
  const createShiftMutation = useCreateShiftMutation();
  const updateShiftMutation = useUpdateShiftMutation();
  const [defStartTime, setDefStartTime] = useState(new Time());

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


  useEffect(() => {
    // console.log(isSuccess);
    if (isSuccess && selectedShiftId !== null) {
      const shift = data.find(a => a.id === parseInt(selectedShiftId))
      if (shift) {
        let s = shift.starttime.split(":");
        let c = shift.endtime.split(":");
        textChange('startShift', new Time(s[0], s[1], s[2]))
        textChange('endShift', new Time(c[0], c[1], c[2]))
        setSelectedKey((state) => {
          if (selectedShiftId) return new Set([selectedShiftId.toString()]);
          return new Set()
        })
      }

    }
  }, [selectedShiftId, isSuccess])


  useEffect(() => {
    if (isSuccess) {
      const shift = data.find(a => a.id === parseInt(selectedKey.currentKey))
      if (shift) {
        let s = shift.starttime.split(":");
        let c = shift.endtime.split(":");
        textChange('startShift', new Time(s[0], s[1], s[2]))
        textChange('endShift', new Time(c[0], c[1], c[2]))
      }
    }
  }, [selectedKey, isSuccess])

  const handleSubmit = () => {
    return selectedShiftId === null ?
      onManageSubmit() :
      onManageUpdate();
  }

  const onManageUpdate = () => {

    if(selectedKey.currentKey === undefined) {
      onOpenChange();
      return;
    }

    const params = {
      stationId: id,
      shiftId: selectedKey.currentKey,
      id: selectedStationShift
    }

    updateShiftMutation.mutate(params, {
      onError: (error) => {
        showToast({
          title: "Error",
          description: error.message,
          color: 'danger'
        })
      },
      onSuccess: (response) => {
        console.log(response);
        query.invalidateQueries(['stationshifts', id])
        showToast({
          title: "'Success",
          description: 'Successfully updated shift',
          color: 'success'
        })

        setTimeout(() => {
          onOpenChange();
        }, 1000)
      }

    })

  }

  const onManageSubmit = () => {
    if (id === null && id === undefined) return;
    let stationId = id;
    const params = { shiftId: form.shiftId }

    createShiftMutation.mutate({ params, stationId }, {
      onError: (error) => {
        console.log(error)
        showToast({
          title: "Error",
          description: error.message,
          color: 'danger'
        })
      },
      onSuccess: (response) => {
        query.invalidateQueries(['stationshifts', id])
        showToast({
          title: "'Success",
          description: 'Successfully added shift',
          color: 'success'
        })

        setTimeout(() => {
          onOpenChange();
        }, 1000)
      },
    });
  }


  return (
    <HeroUIModal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      title="Add Item"
      height={0}
      footer={
        <div className="flex flex-row justify-between bg-default-300 py-1 px-3 flex-grow rounded-bl-lg rounded-br-lg">
          <Button
            className="font-semibold text-danger"
            variant="default"
            color="danger">
            Delete...
          </Button>

          <div className="flex flex-row">
            <Button
              className="font-semibold text-primary"
              variant="default"
              color="primary">
              Close
            </Button>
            <Button
              onPress={handleSubmit}
              radius="sm"
              className="font-semibold text-white"
              variant="solid"
              color="primary">
              Save
            </Button>
          </div>
        </div>
      }
    >
      <div className="px-6">
        <Select
          isLoading={isLoading}
          isError={isError}
          errorMessage={isError && error.message}
          radius="none"
          placeholder="Select Shift"
          labelPlacement="outside"
          onChange={(e) => textChange('shiftId', e.target.value)}
          onSelectionChange={setSelectedKey}
          selectedKeys={selectedKey}
          label={<span className="text-sm font-semibold text-default-500">Shift Name</span>}
        >
          {
            data && Array.isArray(data) && data.length > 0 && data.map((shift) => {
              return (
                <SelectItem key={shift.id}>{shift.name}</SelectItem>
              )
            })
          }
        </Select>

        <div className="flex flex-row gap-4 py-5">
          <TimeInput
            isDisabled={true}
            defaultValue={defStartTime}
            value={form.startShift}
            aria-labelledby="none"
            labelPlacement="outside"
            placeholder={"Input Time"}
            label={<span className="text-sm font-semibold text-default-500">Start Shift</span>}
            radius="none"
            onChange={(e) => {
              textChange('startShift', e)
            }}
            endContent={<Clock />}
          />
          <TimeInput
            isDisabled={true}
            value={form.endShift}
            aria-labelledby="none"
            labelPlacement="outside"
            placeholder={"Input Time"}
            label={<span className="text-sm font-semibold text-default-500">End Shift</span>}
            endContent={<Clock />}
            radius="none"
            onChange={(e) => {
              textChange('endShift', e)
            }}
          />
        </div>

        <div>
          <Textarea
            defaultValue={form.details}
            onChange={(e) => textChange('details', e.target.value)}
            radius="none"
            placeholder="Enter details"
            labelPlacement="outside"
            label={<span className="text-sm font-semibold text-default-500">Details</span>}
          />
        </div>
      </div>

    </HeroUIModal>
  )
}

export default ShiftFormModal;
