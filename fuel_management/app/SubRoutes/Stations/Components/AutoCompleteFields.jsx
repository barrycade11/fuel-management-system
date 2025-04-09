import { Autocomplete, AutocompleteItem } from "@heroui/react";
import useGetBarangays from "~/Hooks/Locations/useGetBarangays";
import useGetCitiesMunicipalities from "~/Hooks/Locations/useGetCitiesMunicipalities";
import useGetProvinces from "~/Hooks/Locations/useGetProvinces";
import useLocationStoreState from "~/Hooks/Locations/useLocationStoreState";

export const AutoCompleteProvince = () => {
  const { isLoading, isError, data, error } = useGetProvinces();
  const getCityMutate = useGetCitiesMunicipalities();
  const { onSetCitiesMunicipalities, onSetBarangays, onSetError, onSetIsLoading } = useLocationStoreState();

  const handleChange = (val) => {
    if(!val) {
      onSetCitiesMunicipalities([]);
      onSetBarangays([]);
      return;
    }

    const selected = data.body.find(i => i.code === val);
    onManageCitiesMunicipalities(selected);
  }

  const onManageCitiesMunicipalities = async (selected = []) => {
    onSetIsLoading(true);
    getCityMutate.mutate(selected, {
      onError: (error) => {
        onSetIsLoading(false);
        onSetError(error);
      },
      onSuccess: (response) => {
        onSetCitiesMunicipalities(response.body);
      }
    })
  }

  return (
    <Autocomplete
      isRequired={true}
      name="province"
      isLoading={isLoading}
      errorMessage={"Something went wrong"}
      aria-labelledby='none'
      labelPlacement='outside'
      label={<span className='text-sm font-semibold text-default-500'>Province</span>}
      placeholder='Select Province'
      radius='none'
      onSelectionChange={handleChange}
    >
      {
        data && Array.isArray(data.body) && data.body.map((item, index) => (
          <AutocompleteItem key={item.code} >{item.name}</AutocompleteItem>
        ))
      }
    </Autocomplete>
  )
}


export const AutoCompleteCityMunicipality = () => {
  const { 
    citiesMunicipalities, 
    isLoading, 
    error, 
    isError,
    onSetBarangays,
    onSetBarangayLoading,
    onSetBarangayError
  } = useLocationStoreState();
  const getBarangaysMutation = useGetBarangays();

  const handleChange = (val) => {
    const selectedCity = citiesMunicipalities.find(i => i.code === val)
    onManageGetBarangays(selectedCity);
  }

  const onManageGetBarangays = (selectedCity) => {
    onSetBarangayLoading(true);
    getBarangaysMutation.mutate(selectedCity, {
      onError: (error) => {
        onSetBarangayError(error);
      },
      onSuccess: (response) => {
        onSetBarangays(response.body)
      }
    })

  }

  return (
    <Autocomplete
      isRequired={true}
      name="city"
      isLoading={isLoading}
      isInvalid={error !== null}
      errorMessage={error !== null ? error.message : null}
      aria-labelledby='none'
      labelPlacement='outside'
      label={<span className='text-sm font-semibold text-default-500'>City / Municipality</span>}
      placeholder='Select City/Municipality'
      radius='none'
      onSelectionChange={handleChange}
    >
      {
        citiesMunicipalities && Array.isArray(citiesMunicipalities) && citiesMunicipalities.map((item, index) => (
          <AutocompleteItem key={item.code} >{item.name}</AutocompleteItem>
        ))
      }
    </Autocomplete>
  )
}


export const AutoCompleteBarangays = () => {
  const { barangays, bIsLoading, bIsError, bError } = useLocationStoreState();

  const handleChange = () => {

  }


  return (
    <Autocomplete
      isRequired={true}
      name="barangay"
      isLoading={bIsLoading}
      isInvalid={bError !== null}
      errorMessage={bError !== null ? error.message : null}
      aria-labelledby='none'
      labelPlacement='outside'
      label={<span className='text-sm font-semibold text-default-500'>Barangays</span>}
      placeholder='Select Barangay'
      radius='none'
      onSelectionChange={handleChange}
    >
      {
        barangays && Array.isArray(barangays) && barangays.map((item, index) => (
          <AutocompleteItem key={item.code} >{item.name}</AutocompleteItem>
        ))
      }
    </Autocomplete>

  )

}
