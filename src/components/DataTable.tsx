import DataTableLib, { type TableColumn } from "react-data-table-component";
import type React from "react";
import type { DynamicRow } from "../utils/dataLoader";

interface Props {
  data: DynamicRow[];
}

const generateColumns = (data: DynamicRow[]): TableColumn<DynamicRow>[] => {
  if (!data.length) return [];

  return Object.keys(data[0]).map((key) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    selector: (row) => row[key],
    sortable: true,
  }));
};

const customStyles = {
  table: {
    style: {
      border: "1px solid #ddd",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#f4f4f4",
      borderBottom: "2px solid #ccc",
    },
  },
  rows: {
    style: {
      borderBottom: "1px solid #eee",
    },
  },
  cells: {
    style: {
      paddingTop: "12px",
      paddingBottom: "12px",
    },
  },
};

const DataTable: React.FC<Props> = ({ data }) => {
  const columns = generateColumns(data);

  return (
    <div className="border rounded shadow-sm">
      <DataTableLib
        columns={columns}
        data={data}
        fixedHeader
        fixedHeaderScrollHeight="500px"
        pagination
        paginationPerPage={100}
        highlightOnHover
        customStyles={customStyles}
      />
    </div>
  );
};

export default DataTable;
