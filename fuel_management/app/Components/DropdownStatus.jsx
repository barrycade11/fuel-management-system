import { Autocomplete, AutocompleteItem } from "@heroui/react";

const statusOptions = [
  { label: "Active", key: "active", value: true },
  { label: "Inactive", key: "inactive", value: false },
];

export default function DropdownStatus({ onChange, value }) {
  return (
    <Autocomplete
      isRequired
      defaultItems={statusOptions}
      label="Status"
      placeholder="Select status"
      selectedKey={value ? "active" : "inactive"}
      onSelectionChange={(key) => {
        const selected = statusOptions.find((item) => item.key === key);
        onChange?.(selected?.value);
      }}
    >
      {(status) => (
        <AutocompleteItem key={status.key} value={status.value}>
          {status.label}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
