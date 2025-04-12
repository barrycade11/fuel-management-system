import HeroUIModal from "~/Components/Modal";
import { Form, Button, Textarea, Select, SelectItem } from "@heroui/react";
import TextBoxField from "~/Pages/Login/Components/TextBoxField";
import { PlusIcon, X } from "lucide-react";
import { useFetchFuelMasterProducts } from "~/Hooks/Setup/GlobalRecords/FuelMaster/FuelMasterRQuery";
import { useEffect, useState } from "react";
import useStationStore from "~/Hooks/Setup/Station/Station/useStationStore";


const SelectFuelMasterProducts = ({
  onChange = null,
}) => {
  const { isLoading, isError, error, data } = useFetchFuelMasterProducts();
  const [selectedKey, setSelectedKey] = useState(new Set())

  const handleChange = (e) => {
    if (isError) return;
    const selected = data?.find((item) => item.id === parseInt(e.target.value));
    onChange(selected);
  }

  return (
    <Select
      isLoading={isLoading}
      labelPlacement="outside"
      errorMessage={isError ? error.message : null}
      radius="none"
      label={<span className="text-sm text-default-500 font-semibold">Product</span>}
      placeholder="Select Products"
      selectedKeys={selectedKey}
      onSelectionChange={setSelectedKey}
      onChange={handleChange}
    >
      {
        data && Array.isArray(data) && data.map((product) => {
          return <SelectItem key={product.id}>{product.name}</SelectItem>
        })
      }
    </Select>
  )
}
const pumpDefaultVal = {
  pumps: "",
  nozzles: new Set([]),
}

const TankFormModal = ({
  onOpenChange = () => { },
  isOpen = false,
}) => {
  const [form, setForm] = useState({
    tankName: "",
    productId: null,
    productCode: "",
    productColor: "",
    capacity: 0,
    safeCapacity: 0,
    details: "",
    pumpManagement: [],
  })
  const [pumpMng, setPumpMng] = useState([]);
  const { nozzleCount, onSetTanks, tanks, product, onSetSelectedProduct, viewTank } = useStationStore();
  const [nozzles, setNozzles] = useState([]);
  const [selectedNozzles, setSelectedNozzles] = new Set([]);

  useEffect(() => {
    if (viewTank !== null) {
      const _newForm = { ...viewTank }
      setForm(_newForm);
    }
  }, [viewTank])

  useEffect(() => {
    setNozzles((state) => {
      const _nozzles = Array.from({ length: nozzleCount }, (_, index) => index + 1);
      return _nozzles;
    })
  }, [nozzleCount])

  const handleChange = (key, val) => {
    setForm((state) => {
      const _form = state;
      _form[key] = val;
      return _form;
    })
  }

  const handleChangePumpValues = (key, val, i) => {
    setPumpMng((state) => {
      let items = [...state];
      const update = {
        ...items[i],
        [key]: val,
      }
      items[i] = update;

      return items;
    })
  }

  const handleSubmit = () => {
    setForm(state => {
      return { ...state, pumpManagement: pumpMng }; // Create a new object with the updated property
    });
    // Create a new copy of the form before passing it to onSetTanks
    const newTank = { ...form, pumpManagement: pumpMng };
    onSetTanks(newTank);
    onOpenChange();
  }

  return (
    <HeroUIModal
      viewTransitionName="tank-modal"
      height={0}
      onOpenChange={() => {
        onOpenChange()
      }}
      isOpen={isOpen}
      title={"Add Item"}
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
      <Form>
        <TextBoxField
          value={viewTank !== null ? form.tankName : null}
          onChange={(e) => handleChange('tankName', e.currentTarget.value)}
          label="Tank Name" />

        <SelectFuelMasterProducts
          onChange={(e) => {
            // onSetSelectedProduct(e);
            handleChange('productColor', e.color)
            handleChange('productId', e.id)
            handleChange('productCode', e.code)
          }} />

        <TextBoxField
          type="number"
          onChange={(e) => handleChange('capacity', e.currentTarget.value)}
          label="Capacity" />

        <TextBoxField
          type="number"
          onChange={(e) => handleChange('safeCapacity', e.currentTarget.value)}
          label="Safe Capacity" />

        <div className="flex flex-row items-center py-2">
          <span className="text-md text-default-500 font-semibold">Pump Management</span>
          <Button
            onPress={() => setPumpMng(state => {
              const items = [...state];
              let numbering = items.length + 1;
              items.push({
                pumps: `Pump ${numbering}`,
                nozzles: "",
              })
              return items;
            })}
            className="ml-2 text-sm text-primary-500 font-bold"
            fullWidth={false}
            variant="flat"
            color="primary"
            radius="sm"
          >
            <PlusIcon size={12} />
            <span>Add row</span>
          </Button>

        </div>
        {
          pumpMng.length > 0 && pumpMng.map((item, index) => {
            let numbering = index + 1;
            return (
              <div key={index} className="flex py-1 flex-row gap-2 items-center">
                <div>
                  <span className="text-sm text-default-500 font-semibold">Pumps</span>
                  <TextBoxField
                    readonly={true}
                    value={`Pump ${numbering}`}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex flex-row items-center">
                    <Select
                      selectionMode="multiple"
                      radius="none"
                      fullWidth={false}
                      labelPlacement="outside"
                      placeholder="Select Nozzles"
                      onChange={(e) => handleChangePumpValues('nozzles', e.target.value, index)}
                      onSelectionChange={setSelectedNozzles}
                      selectedKeys={selectedNozzles}
                      label={<span className="text-sm text-default-500 font-semibold">Nozzles</span>}
                    >
                      {
                        nozzles.length > 0 && nozzles.map((no) => {
                          return <SelectItem key={no}>{no.toString()}</SelectItem>
                        })
                      }
                    </Select>
                    <X
                      onClick={() => setPumpMng((state) => {
                        let items = [...state];
                        items.splice(index, 1);
                        return items;
                      })}
                      size={18} className="ml-4" />
                  </div>
                </div>
              </div>
            )
          })
        }

        <Textarea
          onChange={(e) => handleChange('details', e.currentTarget.value)}
          label={<span className="text-sm text-default-500 font-semibold">Details</span>}
          labelPlacement="outside"
          radius="none"
          placeholder="Enter details"
        />

      </Form>
    </HeroUIModal>
  )
}

export default TankFormModal;
