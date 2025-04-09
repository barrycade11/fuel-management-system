import { TimeInput, Form, Input, Autocomplete, AutocompleteItem, Progress } from '@heroui/react';
import { AutoCompleteBarangays, AutoCompleteCityMunicipality, AutoCompleteProvince } from './AutoCompleteFields';
import { TimerIcon } from 'lucide-react';
import { useEffect } from 'react';

const StationTextFieldBox = ({
  label = "",
  type = "text",
  name = "",
  placeholder = "",
  onChange,
  value = "",
  endContent = null, // get JSX.Element
  onValidate = null,
  errorMessage = null,
  isRequired = false,
}) => {

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-default-500 font-semibold text-small pb-1">{label}</h3>
      <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          aria-labelledby="none"
          onChange={handleChange}
          labelPlacement={'outside'}
          placeholder={placeholder}
          type={type}
          radius='none'
          defaultValue={value}
          name={name}
          endContent={endContent}
          className={`w-full border border-default-50 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-400`}
          validate={onValidate}
          errorMessage={errorMessage}
          isRequired={isRequired}
        />
      </div>
    </div>
  );
}



const StationFormDetails = () => {


  useEffect(() => {
    // Debugging: Set default values
    const defaultValues = {
      stationCode: "STN-123",
      stationName: "Debug Station",
      details: "Test details",
      address: "123 Debug Street",
      openingTime: "08:00",
      closingTime: "18:00",
      pumps: "5",
      nozzles: "10",
      fillingPosition: "4",
      posStations: "2",
      shipToNumber: "40213",
    };

    Object.entries(defaultValues).forEach(([name, value]) => {
      const input = document.querySelector(`[name="${name}"]`);
      if (input) {
        input.value = value;
      }
    });

    // Handle autocomplete defaults. Since these are components, they must be set a little differently.
    // Assuming you have a way to set the value of these components.
    // Example (you might need to adapt this to your AutocompleteFields):
    // setProvinceValue("Debug Province");
    // setCityMunicipalityValue("Debug City");
    // setBarangayValue("Debug Barangay");
  }, [])

    return (
    <div className='flex flex-col border border-default-200 rounded-sm '>
      <span className='bg-blue-100 flex-1 text-md font-semibold text-default-600 px-4 py-2'>Station Details</span>
      <div className='grid grid-cols-1 md:grid-cols-5 px-10 py-5 gap-5'>

        <div className='col-span-1'>
          <StationTextFieldBox
            name="stationCode"
            isRequired={true}
            label="Station Code" />
        </div>

        <div className='md:col-start-2 md:col-span-2'>
          <StationTextFieldBox
            name="stationName"
            isRequired={true}
            label="Station Name" />
        </div>

        <div className='cols-span-1 md:col-start-4 md:col-span-2'>
          <StationTextFieldBox
            isRequired={true}
            name="details"
            label="Details" />
        </div>

        <div className='col-span-1 md:col-span-2'>
          <StationTextFieldBox
            isRequired={true}
            name="address"
            label="Street Address" />
        </div>

        <AutoCompleteProvince />

        <AutoCompleteCityMunicipality />

        <AutoCompleteBarangays />

        <TimeInput
          isRequired={false}
          labelPlacement='outside'
          name="openingTime"
          endContent={
            <TimerIcon />
          }
          label={<span className='text-sm font-semibold text-default-500'>Opening Time</span>}
        />

        <TimeInput
          isRequired={false}
          labelPlacement='outside'
          name="closingTime"
          endContent={
            <TimerIcon />
          }
          label={<span className='text-sm font-semibold text-default-500'>Closing Time</span>}
        />

        <StationTextFieldBox
          isRequired={true}
          name="pumps"
          type="number"
          label="Pumps" />

        <StationTextFieldBox
          isRequired
          name="nozzles"
          type="number"
          label="Nozzles" />

        <StationTextFieldBox
          isRequired
          name="fillingPosition"
          type="number"
          label="Filling Positions" />

        <StationTextFieldBox
          isRequired
          name="posStations"
          type="number"
          label="POS Stations" />

        <div className='md:col-start-2 md:col-span-4'>
          <StationTextFieldBox
            isRequired
            name="shipToNumber"
            label="Ship To Number" />
        </div>
      </div>
    </div>
  )
}

export default StationFormDetails;
