import { Autocomplete, AutocompleteItem } from "@heroui/react";
import useGetBarangays from "~/Hooks/Locations/useGetBarangays";
import useGetCitiesMunicipalities from "~/Hooks/Locations/useGetCitiesMunicipalities";
import useGetProvinces from "~/Hooks/Locations/useGetProvinces";
import useLocationStoreState from "~/Hooks/Locations/useLocationStoreState";

export const AutoCompleteProvince = ({ selectedKey, onSelectionChange }) => {
  // console.log("Autocomplete Province Call", selectedKey)
    const { isLoading, isError, data } = useGetProvinces();
    const getCityMutate = useGetCitiesMunicipalities();
    const { onSetCitiesMunicipalities, onSetBarangays, onSetError, onSetIsLoading } = useLocationStoreState();

    
    const handleChange = (val) => {
      // console.log("Autocomplete Province handleChange", val)
      onSelectionChange(val); 
      if (!val) {
        // console.log("No val")
        onSetCitiesMunicipalities([]);
        onSetBarangays([]);
        return;
      }
      // console.log("Val", val)
      const selected = data?.body.find(i => i.code === val);
      if (selected) {
        // console.log("Selected:", selected)
        onManageCitiesMunicipalities(selected.code);
      }
    };
  
    const onManageCitiesMunicipalities = async (provinceId) => {
      // console.log("PROVINCE MANAGE CITY")
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
  // console.log("Autocomplete City Call", selectedKey)
  const { isLoading2, isErro2r, data } = useGetCitiesMunicipalities();
    const {
      citiesMunicipalities, isLoading, error,
      onSetBarangays, onSetBarangayLoading, onSetBarangayError
    } = useLocationStoreState();

    const getBarangaysMutation = useGetBarangays();
  
    const handleChange = (val) => {
      // console.log("Autocomplete City handleChange", val)
      onSelectionChange(val);
      // console.log("Autocomplete City full", citiesMunicipalities)
      const selectedCity = citiesMunicipalities.find(i => i.code === val);
      if (selectedCity) {
        onManageGetBarangays(selectedCity.code);
      }
    };
  
    const onManageGetBarangays = (cityId) => {
      // console.log("Autocomplete City getBarangay", selectedKey)
      onSetBarangayLoading(true);
      getBarangaysMutation.mutate({ code: cityId }, {
        onError: (error) => onSetBarangayError(error),
        onSuccess: (response) => onSetBarangays(response.body)
      });
    };
// console.log(citiesMunicipalities, "TESTING AUTOCITY")
    return (
      <Autocomplete
        isRequired
        name="cityId"
        selectedKey={selectedKey}
        isLoading={isLoading}

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
