import "./App.css";
import { Table } from "./components/Table";
import { Sidebar } from "./components/Sidebar";
import { Country } from "./components/Country/Country";

const FAKE_COUNTRY = {
  name: "Afghanistan",
  count: 48,
};

const handleClick = () => {
  console.log("clicked");
};

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Country
        name={FAKE_COUNTRY.name}
        citiesNumber={FAKE_COUNTRY.count}
        onClick={handleClick}
      />
      <Country
        name={FAKE_COUNTRY.name}
        citiesNumber={FAKE_COUNTRY.count}
        isSelected
        onClick={handleClick}
      />
      <Table />
    </div>
  );
}

export default App;
