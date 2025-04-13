import { addToast, Button, Chip, defaultLayout, Form } from "@heroui/react";
import { PlusIcon, X } from "lucide-react";
import { useState, useEffect } from "react";
import useStationStore from "~/Hooks/Setup/Station/Station/useStationStore";
import HeroUIModal from "~/Components/Modal";
import TextBoxField from "~/Pages/Login/Components/TextBoxField";
import { Textarea, Select, SelectItem } from '@heroui/react'
import { useFetchFuelMasterProducts } from "~/Hooks/Setup/GlobalRecords/FuelMaster/FuelMasterRQuery";
import useAddStationTankMutation from "~/Hooks/Setup/Station/StationTank/useAddStationTank";
import { useParams } from "react-router";
import useDeleteStationTankMutation from "~/Hooks/Setup/Station/StationTank/useDeleteStationTank";

/**
 * 
 * @param {CallableFunction|null} onChange 
 * @param {string|null} preSelectedKey 
 * @returns {JSX.Element} 
 */
const SelectFuelMasterProducts = ({
  onChange = null,
  preSelectedKey = null
}) => {
  const { isLoading, isError, error, data } = useFetchFuelMasterProducts();
  const [selectedKey, setSelectedKey] = useState(new Set());

  useEffect(() => {
    if (preSelectedKey !== null) {
      setSelectedKey(new Set([preSelectedKey.toString()]));
    }
  }, [preSelectedKey]);

  const handleChange = (e) => {
    if (isError) return;
    const selected = data?.find((item) => item.id === parseInt(e.target.value));
    if (selected && onChange) {
      onChange(selected);
    }
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
          return <SelectItem key={product.id.toString()} value={product.id.toString()}>{product.name}</SelectItem>
        })
      }
    </Select>
  )
}

const defaultForm = {
  tankName: "",
  productId: null,
  productCode: "",
  productColor: "",
  capacity: 0,
  safeCapacity: 0,
  details: "",
  pumpManagement: [],
}

const TankFormModal = ({
  onOpenChange = () => { },
  isOpen = false,
}) => {
  const { id } = useParams();
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
  const { nozzleCount, onSetTanks, tanks, product, onSetSelectedProduct, viewTank, onSetDeleteTanks } = useStationStore();
  const [nozzles, setNozzles] = useState([]);
  const [selectedNozzles, setSelectedNozzles] = new Set([]);
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const addStationTankMutation = useAddStationTankMutation();
  const tankDeleteMutation = useDeleteStationTankMutation();

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

  const handleFakeLoading = async () => await new Promise(resolve => setTimeout(resolve, 1000));

  useEffect(() => {
    if (viewTank) {
      setPumpMng(viewTank.pumpManagement);
    }
  }, [viewTank])

  useEffect(() => {
    const _nozzles = Array.from({ length: nozzleCount }, (_, index) => index + 1);
    setNozzles(_nozzles);
  }, [nozzleCount])

  const handleChange = (key, val) => {
    setForm((state) => {
      let _form = state;
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

  const handleSubmit = async () => {
    setIsBtnLoading(true); // Set loading state immediately
    await handleFakeLoading();
    setIsBtnLoading(false);

    let updatedForm = null;

    if (viewTank.tankName !== '') {
      updatedForm = {
        id: tanks.length + 1,
        tankName: form.tankName === '' ? viewTank.tankName : form.tankName,
        productId: form.productId === null ? viewTank.productId : form.productId,
        productCode: form.productCode === '' ? viewTank.productCode : form.productCode,
        productColor: form.productColor === '' ? viewTank.productColor : form.productColor,
        capacity: form.capacity === 0 ? viewTank.capacity : form.capacity,
        safeCapacity: form.safeCapacity === 0 ? viewTank.safeCapacity : form.safeCapacity,
        details: form.details === 0 ? viewTank.details : form.details,
        pumpManagement: pumpMng,
      }
    } else {
      console.log('add')
      updatedForm = {
        id: tanks.length + 1,
        ...form,
        pumpManagement: pumpMng
      };
      console.log(updatedForm);
    }

    await onAddStationTank(updatedForm);
    onOpenChange();
  }

  const onManageDeleteTank = async () => {
    setIsBtnLoading(true)
    let items = tanks.filter(a => a.id !== viewTank.id);
    const stationId = id;
    const tankId = viewTank.id;

    tankDeleteMutation.mutate({ stationId, tankId }, {
      onError: (error) => {
        console.error(error);
        setIsBtnLoading(false)
      },
      onSuccess: (response) => {
        setIsBtnLoading(false)
        onSetDeleteTanks(items);
        onOpenChange()
      }
    })

  }

  const onAddStationTank = async (params) => {
    addStationTankMutation.mutate({ params, id }, {
      onError: (error) => {
        showToast({
          title: 'Error',
          description: error.message,
          color: 'danger'
        });
      },
      onSuccess: (response) => {
        onSetTanks(params);
        setForm(defaultForm);
        showToast({
          title: 'Success',
          description: "Successfully Added Station",
          color: 'success'
        })
      }
    })
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
            onPress={onManageDeleteTank}
            isDisabled={isBtnLoading}
            isLoading={isBtnLoading}
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

              isDisabled={isBtnLoading}
              isLoading={isBtnLoading}
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
          value={viewTank !== null ? viewTank?.tankName : null}
          onChange={(e) => handleChange('tankName', e.currentTarget.value)}
          label="Tank Name" />

        <SelectFuelMasterProducts
          preSelectedKey={viewTank !== null ? viewTank?.productId : null}
          onChange={(e) => {
            // onSetSelectedProduct(e);
            handleChange('productColor', e.color)
            handleChange('productId', e.id)
            handleChange('productCode', e.code)
          }} />

        <TextBoxField
          value={viewTank !== null ? viewTank?.capacity : null}
          type="number"
          onChange={(e) => handleChange('capacity', e.currentTarget.value)}
          label="Capacity" />

        <TextBoxField
          type="number"
          value={viewTank !== null ? viewTank?.safeCapacity : null}
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
          pumpMng && pumpMng.length > 0 && pumpMng.map((item, index) => {
            let numbering = index + 1;
            let keys = item.nozzles.split(',');
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
                      defaultSelectedKeys={new Set(keys)}
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
          defaultValue={viewTank !== null ? viewTank?.details : null}
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
