import { Form, Input } from '@heroui/react';

const StationTextFieldBox = ({
  label = "",
  type = "text",
  name = "",
  placeholder = "",
  onChange,
  value = "",
  endContent = null, // get JSX.Element
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
        />
      </div>
    </div>
  );
}

const StationFormDetails = () => {
  return (
    <div className='flex flex-col border border-default-200 rounded-sm '>
      <span className='bg-blue-100 flex-1 text-md font-semibold text-default-600 px-4 py-2'>Station Details</span>
      <Form className='grid grid-cols-1 md:grid-cols-5 px-10 py-5 gap-5'>

        <div className='col-span-1'>
          <StationTextFieldBox
            label="Station Code" />
        </div>

        <div className='md:col-start-2 md:col-span-2'>
          <StationTextFieldBox
            label="Station Name" />
        </div>

        <div className='cols-span-1 md:col-start-4 md:col-span-2'>
          <StationTextFieldBox
            label="Station Details" />
        </div>

        <div className='col-span-1 md:col-span-2'>
          <StationTextFieldBox
            label="Street Address" />
        </div>

        <StationTextFieldBox
          label="Province" />

        <StationTextFieldBox
          label="City/Municipality" />

        <StationTextFieldBox
          label="Barangay" />

        <StationTextFieldBox
          label="Opening Time" />

        <StationTextFieldBox
          label="Closing Time" />

        <StationTextFieldBox
          label="Pumps" />

        <StationTextFieldBox
          label="Nozzles" />

        <StationTextFieldBox
          label="Filling Positions" />

        <StationTextFieldBox
          label="POS Stations" />

        <div className='md:col-start-2 md:col-span-4'>
          <StationTextFieldBox
            label="Ship To Number" />
        </div>
      </Form>
    </div>
  )
}

export default StationFormDetails;
