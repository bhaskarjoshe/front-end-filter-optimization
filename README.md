# Filter Optimization Dashboard

A modern React + TypeScript web application for interactive data exploration and filtering of CSV datasets. This dashboard allows you to load, view, and filter large CSV files with a responsive, user-friendly interface.

---

## Features

- **Dynamic CSV Data Loading:** Loads CSV files from the `public/` directory using the `papaparse` library.
- **Automatic Table Generation:** Displays data in a paginated, sortable table using `react-data-table-component`.
- **Multi-Column Filtering:** Each column gets a multi-select dropdown (powered by `multiselect-react-dropdown`) for filtering.
- **Cascading Filter Options:** Filter options update dynamically based on current selections, always reflecting available values.
- **Clear All Filters:** One-click reset to remove all active filters.
- **Loading Indicators:** Smooth loading and filtering transitions with animated placeholders.
- **Responsive UI:** Built with Tailwind CSS for a modern, responsive look.

---

## File Structure

- `src/`
  - `App.tsx`: Main app entry, sets up context and layout.
  - `components/`
    - `Content.tsx`: Main dashboard logic, handles data loading and filter orchestration.
    - `DataTable.tsx`: Renders the data table with dynamic columns.
    - `FilterDropdown.tsx`: Multi-select dropdown for each column.
    - `Header.tsx`: Simple header bar.
  - `context/FilterContext.tsx`: Provides global state for data, filters, and available options.
  - `utils/dataLoader.ts`: Loads and parses CSV files using `papaparse`.
  - `index.css`: Tailwind CSS import.
  - `main.tsx`: React root rendering.
- `public/`
  - `dataset_small.csv`: Example dataset (10,000 rows, columns: `number,mod3,mod4,mod5,mod6`).
  - `dataset_large.csv`: Larger dataset (50,000 rows, columns: `number,mod350,mod8000,mod20002`).

---

## CSV Data Format

- **Small Dataset (`dataset_small.csv`):**
  ```csv
  number,mod3,mod4,mod5,mod6
  12,0,0,2,0
  24,0,0,4,0
  ...
  ```
- **Large Dataset (`dataset_large.csv`):**
  ```csv
  number,mod350,mod8000,mod20002
  21,21,21,21
  110,110,110,110
  ...
  ```
- **Requirements:** The first row must be a header. All columns will be available for filtering.

---

## Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **npm** (v9+ recommended)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd filter-optimization
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) (default Vite port).

### Build for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

---

## Usage

- The app loads `public/dataset_small.csv` by default.
- To use your own data, place a CSV file in the `public/` directory and update the path in `src/components/Content.tsx` (look for the `csvData("/dataset_small.csv")` line).
- Use the dropdowns at the top to filter by any column. Multiple filters can be combined.
- Click "Clear All Filters" to reset.

---

## Customization

- **Styling:** Uses Tailwind CSS. Modify `src/index.css` or Tailwind config as needed.
- **Table:** Uses `react-data-table-component` for advanced table features.
- **Filters:** Uses `multiselect-react-dropdown` for multi-select dropdowns.

---

## Dependencies

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [papaparse](https://www.papaparse.com/) (CSV parsing)
- [react-data-table-component](https://www.npmjs.com/package/react-data-table-component)
- [multiselect-react-dropdown](https://www.npmjs.com/package/multiselect-react-dropdown)
- [styled-components](https://styled-components.com/)

---



## FAQ

**Q: Can I use my own CSV file?**
A: Yes! Place your CSV in the `public/` directory and update the path in `src/components/Content.tsx`.

**Q: What size of data can this handle?**
A: The app is optimized for tens of thousands of rows, but performance may vary based on your machine and browser.

**Q: How are filter options determined?**
A: Filter dropdowns always show only the values available in the currently filtered dataset, making filtering intuitive and efficient.
