import logo from "./logo.svg";
import "./css/App.css";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header>
        <SearchBar />
      </Header>
    </div>
  );
}

export default App;
