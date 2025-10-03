import Header from "./components/header/Header";
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
