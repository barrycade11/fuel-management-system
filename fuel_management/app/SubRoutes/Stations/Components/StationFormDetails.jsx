import { TimeInput, Form, Input, Autocomplete, AutocompleteItem, Progress } from '@heroui/react';
import { AutoCompleteBarangays, AutoCompleteCityMunicipality, AutoCompleteProvince } from './AutoCompleteFields';
import { TimerIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFetchStationId } from '~/Hooks/Setup/Station/Station/useStations';
import TableSkeleton from '~/Components/TableSkeleton';
import { useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { Time } from "@internationalized/date";
import ErrorElement from '~/Components/ErrorElement';
import useStationStore from '~/Hooks/Setup/Station/Station/useStationStore';

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

  const { id } = useParams()
  const { isSuccess, isLoading, isError, error, data: stationData, refetch, } = useFetchStationId(id);
  const [scheduleOpening, setScheduleOpening] = useState(null)
  const [scheduleClosing, setScheduleClosing] = useState(null)
  const { onSetNozzlesCount } = useStationStore(); 
  const query = useQueryClient();

  //initialize on mount
  useEffect(() => {
    query.invalidateQueries(['stationid', id])
    if (id !== undefined || id === null) {
      refetch();
    }
  }, [])


  useEffect(() => {
    if (isSuccess) {
      const st = stationData.body[0];
      onSetNozzlesCount(st.nozzles);
      const defaultValues = {
        stationCode: st.code,
        stationName: st.name,
        details: st.details,
        address: st.address,
        openingTime: st.openingtime,
        closingTime: st.closingtime,
        pumps: st.pumps,
        nozzles: st.nozzles,
        fillingPosition: st.fillingposition,
        posStations: st.posstation,
        shipToNumber: st.shiptonumber,
      };

      const o = defaultValues.openingTime.split(":");
      setScheduleOpening(new Time(o[0], o[1], o[2]))
      const c = defaultValues.closingTime.split(":");
      setScheduleClosing(new Time(c[0], c[1], c[2]))

      Object.entries(defaultValues).forEach(([name, value]) => {
        const input = document.querySelector(`[name="${name}"]`);
        if (input) {
          input.value = value;
        }
      });
    }
  }, [isSuccess])

  if (isLoading) {
    return <TableSkeleton />
  }

  if(isError) {
    return (
      <div className='mt-5'>
        <ErrorElement>{error.message}</ErrorElement>
      </div>
    )
  }

  return (
    <div className='flex flex-col border border-default-200 rounded-sm mt-5 '>
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

        <AutoCompleteProvince preSelected={isSuccess ? stationData?.body[0]?.province : null } />

        <AutoCompleteCityMunicipality preSelected={isSuccess ? stationData?.body[0]?.city : null}  />

        <AutoCompleteBarangays preSelected={isSuccess ? stationData?.body[0]?.barangay: null}/>


        <TimeInput
          isRequired={false}
          labelPlacement='outside'
          name="openingTime"
          onChange={setScheduleOpening}
          value={scheduleOpening}
          endContent={
            <TimerIcon />
          }
          label={<span className='text-sm font-semibold text-default-500'>Opening Time</span>}
        />

        <TimeInput
          isRequired={false}
          labelPlacement='outside'
          name="closingTime"
          onChange={setScheduleClosing}
          value={scheduleClosing}
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
          onChange={(e) => onSetNozzlesCount(e.currentTarget.value)}
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
