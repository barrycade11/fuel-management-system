import { Button, Form, Textarea, Select, SelectItem } from "@heroui/react";
import HeroUIModal from "~/Components/Modal";
import { useEffect, useRef, useState } from "react";
import useStationStore from "~/Hooks/Setup/Station/Station/useStationStore";
import { useFetchStationDepartments, useAddDepartmentsMutation, useFetchDepartments } from "~/Hooks/Setup/GlobalRecords/Department/useDepartments";
import { CheckIcon } from "lucide-react";
import { useParams } from "react-router";

const SelectDepartmentDropdown = ({
  onChange = null,
  defaultValue = null,
}) => {
  const { isLoading, isError, error, data, isSuccess } = useFetchDepartments();
  const { departmentOnViewId, departmentOnView, onSetDepartments } = useStationStore();
  const [selectedDepName, setSelectedDepName] = useState();
  const [selectedKeys, setSelectedKey] = useState(new Set());

  useEffect(() => {
    if (selectedKeys.size !== 0) {
      const selected = data.find((item) => (item.id).toString() === selectedKeys.currentKey)
      onSetDepartments(selected);
      onChange();
    }
  }, [selectedKeys])

  useEffect(() => {
    if (isSuccess && departmentOnView) {
      const item = data.find(a => a.id === departmentOnViewId);
      setSelectedDepName(item.name);
      const ids = new Set([item.id.toString()]);
      setSelectedKey(ids);
    }
  }, [isSuccess, data])



  return (
    <Select
      name="departments"
      isLoading={isLoading}
      isError={isError}
      errorMessage={isError && error.message}
      placeholder="Select Department"
      isInvalid={isError}
      radius="none"
      labelPlacement="outside"
      label="Departments"
      aria-labelledby="none"
      onSelectionChange={setSelectedKey}
      selectedKeys={selectedKeys}
    >
      {
        data && Array.isArray(data) && data.map((item, index) => (
          <SelectItem key={item.id}>{item.name}</SelectItem>
        ))
      }
    </Select>
  )
}


const DeparmentModal = ({
  isOpen = false,
  onOpenChange = null
}) => {
  const { id } = useParams();
  const {
    onSetEditSaveDepartments,
    onSetDeleteSaveDepartments,
    departmentOnViewId,
    departmentOnView,
    departments,
    saveDepartments,
    onSetDepartments,
    onSetSaveDepartments
  } = useStationStore();
  const [subDeps, setSubDeps] = useState([]);
  const [data, setData] = useState({});
  const [textareaValue, setTextAreaValue] = useState("");
  const addDepartmentMutation = useAddDepartmentsMutation();
  

  const resetState = () => {
    setTextAreaValue("");
    // setSubDeps([]);
    setData({});
  }

  useEffect(() => {
    if (departmentOnView) {
      const selected = saveDepartments.find(a => a.id === departmentOnViewId);
      setSubDeps(selected.departmentLin);
    }

  }, [departmentOnView])

  useEffect(() => {
    //new selected sub dep
    setData({
      id: departments?.id,
      name: departments?.name,
      details: departments?.details,
      departmentLin: [],
    })
  }, [departments])

  const handleSaveDepartment = () => {
    setData(prevState => {
      const updated = {
        ...prevState,
        details: textareaValue
      }
      return updated;
    })

    onManageAddDepartment(data);
  }

  const handleSelectSubDeps = (item) => {
    setSubDeps((prevState) => {
      let updatedSubs;
      if (prevState.some((subDep) => subDep.id === item.id)) {
        updatedSubs = prevState.filter((subDep) => subDep.id !== item.id);
      } else {
        updatedSubs = [...prevState, item];
      }

      setData(prevData => ({
        ...prevData,
        departmentLin: updatedSubs, // Using the updatedSubs here
      }));

      return updatedSubs;
    });

    setData(prevData => ({
      ...prevData,
      departmentLin: subDeps
    }));
  };

  const onManageAddDepartment = (item) => {
    const params = {
      departmentId: item.id,
      details: item.details,
    }

    addDepartmentMutation.mutate({ params, id }, {
      onErrror: (error) => {
        console.error(error);
      },
      onSucess: (response) => {
        console.log(response)
        if (!departmentOnView && departmentOnViewId == null) {
          onSetSaveDepartments(data);
        } else {
          onSetEditSaveDepartments(departmentOnViewId, data);
        }

        resetState();
        onOpenChange()
      }
    })
  }

  return (
    <HeroUIModal
      height={0}
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      title={"Add new"}
      footer={
        <div className="flex flex-row justify-between bg-default-300 py-1 px-3 flex-grow rounded-bl-lg rounded-br-lg">
          <Button
            onPress={() => {
              onSetDeleteSaveDepartments(departmentOnViewId);
              resetState();
              onSetDepartments(null)
              onOpenChange();
            }}
            className="font-semibold text-danger"
            variant="default"
            color="danger">
            Delete...
          </Button>

          <div className="flex flex-row">
            <Button
              onPress={() => {
                resetState();
                onSetDepartments(null)
                onOpenChange();
              }}
              className="font-semibold text-primary"
              variant="default"
              color="primary">
              Close
            </Button>
            <Button
              onPress={handleSaveDepartment}
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
      <div className="pb-10">
        <SelectDepartmentDropdown
          onChange={resetState} />
        <ul>
          <li className="p-2 mt-2 border border-default-200 text-sm font-semibold text-default-500">
            <span>Sub Departments</span>
          </li>
          {
            departments && departments.departmentLin.map((item) => {
              const isSelected = subDeps.find(dep => dep.id === item.id)
              return (
                <li onClick={() => handleSelectSubDeps(item)} key={item.id} className="flex flex-row  items-center cursor-pointer hover:bg-primary-100 p-2 border border-default-200 text-sm font-normal text-default-600">
                  {isSelected && <CheckIcon size={16} className="mx-2" />}
                  <span>{item.subDepartment}</span>
                </li>
              )
            })
          }
        </ul>

        <Textarea
          onChange={(e) => setTextAreaValue(e.target.value)}
          name="details"
          labelPlacement="outside"
          radius="none"
          placeholder="Enter details"
          label={<span className="text-md font-semibold text-default-600">Details</span>} />

      </div>
    </HeroUIModal>

  )

}

export default DeparmentModal;
