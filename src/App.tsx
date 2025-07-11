import Content from "./components/Content";
import Header from "./components/Header";
import { FilterProvider } from "./context/FilterContext";

const App = () => {
  return (
    <div>
      <Header />
      <FilterProvider>
        <Content />
      </FilterProvider>
    </div>
  );
};

export default App;
