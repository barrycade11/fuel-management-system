import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { useEffect, useState } from "react";

const LocationAutocomplete = ({
  label,
  selectedKey,
  onSelectionChange,
  fetchData,              // e.g. mutation or query function
  data: defaultItems = [], // optional initial data
  isLoading,
  isError,
  errorMessage,
}) => {
  const [items, setItems] = useState(defaultItems);

  useEffect(() => {
    let isMounted = true;

    const fetchItems = async () => {
      if (fetchData && selectedKey) {
        try {
          const response = await fetchData(selectedKey);
          if (isMounted && response?.body) {
            setItems(response.body);
          }
        } catch (err) {
          console.error("Failed to fetch location data:", err);
        }
      }
    };

    fetchItems();

    return () => {
      isMounted = false;
    };
  }, [selectedKey, fetchData]);

  return (
    <Autocomplete
      isRequired={true}
      isLoading={isLoading}
      isInvalid={isError}
      errorMessage={isError ? errorMessage : null}
      aria-labelledby="none"
      label={label}
      placeholder={`Select ${label}`}
      selectedKey={selectedKey}
      onSelectionChange={onSelectionChange}
    >
      {Array.isArray(items) &&
        items.map((item) => (
          <AutocompleteItem key={item.code} textValue={item.name}>
            {item.name}
          </AutocompleteItem>
        ))}
    </Autocomplete>
  );
};

export default LocationAutocomplete;
