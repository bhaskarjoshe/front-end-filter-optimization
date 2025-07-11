import { useEffect, useState } from "react";
import { csvData } from "../utils/dataLoader";
import DataTable from "./DataTable";
import { useFilterContext } from "../context/FilterContext";
import FilterDropdown from "./FilterDropdown";

const Content = () => {
  const {
    setOriginalData,
    availableOptions,
    activeFilters,
    updateFilters,
    clearAllFilter,
    filteredData,
  } = useFilterContext();

  const [isLoading, setIsLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [dropdownLoading, setDropdownLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const result = await csvData("/dataset_small.csv");
      setOriginalData(result);
      setIsLoading(false);
    };
    load();
  }, [setOriginalData]);

  useEffect(() => {
    if (!isLoading) {
      setFilterLoading(true);
      const timeout = setTimeout(() => setFilterLoading(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [activeFilters]);

  const handleDropdownOpen = () => {
    setDropdownLoading(true);
    setTimeout(() => setDropdownLoading(false), 300);
  };

  const handleUpdateFilters = (column: string, values: (string | number)[]) => {
    setFilterLoading(true);
    updateFilters(column, values);
  };

  const activeCount = Object.values(activeFilters).filter((v) => v.length > 0).length;

  return (
    <div className="mx-auto my-6 max-w-7xl px-4 relative z-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800">Dynamic Filter Dashboard</h2>
        <button
          onClick={clearAllFilter}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 shadow-md cursor-pointer"
        >
          Clear All Filters
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-4 italic">{activeCount} filter{activeCount !== 1 ? 's' : ''} active</p>

      <div className="flex flex-row  gap-4 pb-2 mb-6 z-50 ">
        {(isLoading || dropdownLoading) ? (
          [...Array(4)].map((_, i) => (
            <div
              key={i}
              className="min-w-[200px] h-10 bg-gray-200 animate-pulse rounded "
            ></div>
          ))
        ) : (
          Object.entries(availableOptions).map(([column, options]) => (
            <div key={column} className="min-w-[200px] z-50">
              <FilterDropdown
                column={column}
                options={options ?? []}
                selected={activeFilters[column] || []}
                onChange={(values) => handleUpdateFilters(column, values)}
                onOpen={handleDropdownOpen}
              />
            </div>
          ))
        )}
      </div>

      {(isLoading || filterLoading) ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-4 text-gray-600 text-lg">
            {isLoading ? "Loading data..." : "Applying filters..."}
          </span>
        </div>
      ) : (
        <div className="relative z-0">
          <DataTable data={filteredData} />
        </div>
      )}
    </div>
  );
};

export default Content;
