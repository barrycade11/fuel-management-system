import { Autocomplete, AutocompleteItem } from "@heroui/react";
import useGetBarangays from "~/Hooks/Locations/useGetBarangays";
import useGetCitiesMunicipalities from "~/Hooks/Locations/useGetCitiesMunicipalities";
import useGetProvinces from "~/Hooks/Locations/useGetProvinces";
import useLocationStoreState from "~/Hooks/Locations/useLocationStoreState";

export const AutoCompleteProvince = ({ selectedKey, onSelectionChange }) => {
    const { isLoading, isError, data } = useGetProvinces();
    const getCityMutate = useGetCitiesMunicipalities();
    const { onSetCitiesMunicipalities, onSetBarangays, onSetError, onSetIsLoading } = useLocationStoreState();
  
    const handleChange = (val) => {
      onSelectionChange(val); 
      if (!val) {
        onSetCitiesMunicipalities([]);
        onSetBarangays([]);
        return;
      }
  
      const selected = data?.body.find(i => i.code === val);
      if (selected) {
        onManageCitiesMunicipalities(selected.code);
      }
    };
  
    const onManageCitiesMunicipalities = async (provinceId) => {
      onSetIsLoading(true);
      getCityMutate.mutate({ code: provinceId }, {
        onError: (error) => {
          onSetIsLoading(false);
          onSetError(error);
        },
        onSuccess: (response) => {
          onSetCitiesMunicipalities(response.body);
        }
      });
    };
  
    return (
      <Autocomplete
        isRequired
        name="provinceId"
        selectedKey={selectedKey}
        isLoading={isLoading}
        errorMessage={"Something went wrong"}
        aria-labelledby='none'
        label='Province'
        placeholder='Select Province'
        onSelectionChange={handleChange}
      >
        {data?.body?.map((item) => (
          <AutocompleteItem key={item.code}>{item.name}</AutocompleteItem>
        ))}
      </Autocomplete>
    );
  };  


  export const AutoCompleteCityMunicipality = ({ selectedKey, onSelectionChange }) => {
    const {
      citiesMunicipalities, isLoading, error,
      onSetBarangays, onSetBarangayLoading, onSetBarangayError
    } = useLocationStoreState();
  
    const getBarangaysMutation = useGetBarangays();
  
    const handleChange = (val) => {
      onSelectionChange(val);
      const selectedCity = citiesMunicipalities.find(i => i.code === val);
      if (selectedCity) {
        onManageGetBarangays(selectedCity.code);
      }
    };
  
    const onManageGetBarangays = (cityId) => {
      onSetBarangayLoading(true);
      getBarangaysMutation.mutate({ code: cityId }, {
        onError: (error) => onSetBarangayError(error),
        onSuccess: (response) => onSetBarangays(response.body)
      });
    };
  
    return (
      <Autocomplete
        isRequired
        name="cityId"
        selectedKey={selectedKey}
        isLoading={isLoading}
        isInvalid={!!error}
        errorMessage={error?.message ?? null}
        aria-labelledby='none'
        label={<span className='text-sm font-semibold text-default-500'>City / Municipality</span>}
        placeholder='Select City/Municipality'
        onSelectionChange={handleChange}
      >
        {citiesMunicipalities?.map((item) => (
          <AutocompleteItem key={item.code}>{item.name}</AutocompleteItem>
        ))}
      </Autocomplete>
    );
  };  


export const AutoCompleteBarangays = ({ selectedKey, onSelectionChange }) => {
  const { barangays, bIsLoading, bIsError, bError } = useLocationStoreState();

  const handleChange = (val) => {
    onSelectionChange?.(val);
  }

  return (
    <Autocomplete
      isRequired={true}
      name="barangayId"
      selectedKey={selectedKey}
      isLoading={bIsLoading}
      isInvalid={bError !== null}
      errorMessage={bError !== null ? error.message : null}
      aria-labelledby='none'
      label='Barangays'
      placeholder='Select Barangay'
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
