import React from "react";
import Multiselect from "multiselect-react-dropdown";

interface Props {
  column: string;
  options: (string | number | null | undefined)[];
  selected: (string | number | null | undefined)[];
  onChange: (selected: (string | number)[]) => void;
}

const FilterDropdown: React.FC<Props> = ({
  column,
  options,
  selected,
  onChange,
}) => {
  const selectOptions = options
    .filter((v) => v !== null && v !== undefined)
    .map((v) => ({ name: v }));

  return (
    <div className="my-2 w-full z-50">
      <label className="block font-semibold mb-1">{column}</label>
      <Multiselect
        options={selectOptions}
        displayValue="name"
        placeholder={`Filter by ${column}`}
        showCheckbox
        closeOnSelect={false}
        avoidHighlightFirstOption
        onSelect={(selectedList) => {
          const values = selectedList.map((item) => item.name);
          onChange(values);
        }}
        onRemove={(selectedList) => {
          const values = selectedList.map((item) => item.name);
          onChange(values);
        }}
        style={{
          chips: { background: "#007BFF" },
          searchBox: { border: "1px solid #ccc", borderRadius: "4px" },
        }}
      />
    </div>
  );
};

export default FilterDropdown;
