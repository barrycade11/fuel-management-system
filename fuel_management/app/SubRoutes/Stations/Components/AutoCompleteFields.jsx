import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { use, useEffect, useLayoutEffect, useState } from "react";
import useGetBarangays from "~/Hooks/Locations/useGetBarangays";
import useGetCitiesMunicipalities from "~/Hooks/Locations/useGetCitiesMunicipalities";
import useGetProvinces from "~/Hooks/Locations/useGetProvinces";
import useLocationStoreState from "~/Hooks/Locations/useLocationStoreState";

export const AutoCompleteProvince = ({ preSelected = null }) => {
  const { isLoading, isError, data, error, isSuccess } = useGetProvinces();
  const getCityMutate = useGetCitiesMunicipalities();
  const { onSetCitiesMunicipalities, onSetBarangays, onSetError, onSetIsLoading } = useLocationStoreState();
  const [defaultKey, setDefaultKey] = useState(null);

  // Effect to set default value when data is loaded and preSelected is provided
  useEffect(() => {
    if (preSelected && isSuccess && data?.body) {
      const selected = data.body.find((item) => item.name === preSelected);
      if (selected) {
        setDefaultKey(selected.code);
        // Also initialize the cities/municipalities if there's a default selection
        onManageCitiesMunicipalities(selected);
        setDefaultKey(selected.code);
      }
    }
  }, [isSuccess, preSelected, data]);

  const handleChange = (val) => {
    if (!val) {
      onSetCitiesMunicipalities([]);
      onSetBarangays([]);
      return;
    }
    const selected = data.body.find(i => i.code === val);
    onManageCitiesMunicipalities(selected);
  };

  const onManageCitiesMunicipalities = async (selected = []) => {
    onSetIsLoading(true);
    getCityMutate.mutate(selected, {
      onError: (error) => {
        onSetIsLoading(false);
        onSetError(error);
      },
      onSuccess: (response) => {
        onSetCitiesMunicipalities(response.body);
        onSetIsLoading(false);
      }
    });
  };

  // Use a key prop to force re-render when defaultKey changes
  return (
    <Autocomplete
      key={defaultKey} // Force re-render when default changes
      isRequired={true}
      name="province"
      isLoading={isLoading}
      errorMessage={"Something went wrong"}
      aria-labelledby="none"
      labelPlacement="outside"
      label={<span className="text-sm font-semibold text-default-500">Province</span>}
      placeholder="Select Province"
      radius="none"
      onSelectionChange={handleChange}
      defaultSelectedKey={defaultKey}
    >
      {data && Array.isArray(data.body) && data.body.map((item) => (
        <AutocompleteItem key={item.code}>{item.name}</AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

export const AutoCompleteCityMunicipality = ({ preSelected = null }) => {
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
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (val) => {
    const selectedCity = citiesMunicipalities.find(i => i.code === val)
    setSelectedValue(selectedCity?.code);
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

  useEffect(() => {
    if (preSelected !== null && citiesMunicipalities.length > 0) {
      const selected = citiesMunicipalities.find((item) => item.name == preSelected);
      if (selected) {
        onManageGetBarangays(selected);
        setSelectedValue(selected.code);
      }
    }
  }, [preSelected, citiesMunicipalities.length]);


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
      selectedKey={selectedValue}
    >
      {
        citiesMunicipalities && Array.isArray(citiesMunicipalities) && citiesMunicipalities.map((item, index) => (
          <AutocompleteItem key={item.code} >{item.name}</AutocompleteItem>
        ))
      }
    </Autocomplete>
  )
}


export const AutoCompleteBarangays = ({ preSelected = null }) => {
  const { barangays, bIsLoading, bIsError, bError } = useLocationStoreState();
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    if(preSelected !== null && barangays.length > 0) {
      const selected = barangays.find(item => item.name === preSelected);
      setSelectedValue(selected?.code);
    }

  }, [barangays.length, preSelected]);

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
      selectedKey={selectedValue}
      onSelectionChange={setSelectedValue}
    >
      {
        barangays && Array.isArray(barangays) && barangays.map((item, index) => (
          <AutocompleteItem key={item.code} >{item.name}</AutocompleteItem>
        ))
      }
    </Autocomplete>

  )

}
