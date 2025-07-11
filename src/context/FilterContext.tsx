import React, { createContext, useContext, useEffect, useState } from "react";
import type { DynamicRow } from "../utils/dataLoader";

type FilterMap = {
  [column: string]: (string | number)[];
};

interface FilterContextType {
  originalData: DynamicRow[];
  filteredData: DynamicRow[];
  activeFilters: FilterMap;
  availableOptions: FilterMap;
  setOriginalData: (data: DynamicRow[]) => void;
  updateFilters: (column: string, values: (string | number)[]) => void;
  clearAllFilter: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilterContext = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) {
    throw new Error("useFilterContext must be used within FilterProvider");
  }
  return ctx;
};

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [originalData, setOriginalData] = useState<DynamicRow[]>([]);
  const [filteredData, setFilteredData] = useState<DynamicRow[]>([]);
  const [activeFilters, setActiveFilters] = useState<FilterMap>({});
  const [availableOptions, setAvailableOptions] = useState<FilterMap>({});

  useEffect(() => {
    let updatedFilteredData = [...originalData];
    Object.entries(activeFilters).forEach(([column, values]) => {
      if (values.length > 0) {
        updatedFilteredData = updatedFilteredData.filter((row) =>
          values.includes(row[column])
        );
      }
    });
    setFilteredData(updatedFilteredData);

    const nextAvailableOptions: FilterMap = {};

    if (originalData.length > 0) {
      Object.keys(originalData[0]).forEach((col) => {
        let tempData = [...originalData];

        Object.entries(activeFilters).forEach(([filterCol, filterVals]) => {
          if (filterCol !== col && filterVals.length > 0) {
            tempData = tempData.filter((row) =>
              filterVals.includes(row[filterCol])
            );
          }
        });

        nextAvailableOptions[col] = Array.from(
          new Set(tempData.map((row) => row[col]))
        );
      });
    }

    setAvailableOptions(nextAvailableOptions);
  }, [activeFilters, originalData]);

  const updateFilters = (column: string, values: (string | number)[]) => {
    setActiveFilters((prev) => ({
      ...prev,
      [column]: values,
    }));
  };

  const clearAllFilter = () => {
    setActiveFilters({});
  };

  return (
    <FilterContext.Provider
      value={{
        originalData,
        filteredData,
        activeFilters,
        availableOptions,
        setOriginalData,
        updateFilters,
        clearAllFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
