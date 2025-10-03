import Header from "./components/Header/Header";
import Form from "./components/Form/Form";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <Form />
      </div>
    </div>
  );
}

export default App;
