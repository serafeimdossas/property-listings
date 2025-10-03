import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Form from "./components/Form/Form";
import "./App.css";

function App() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="App">
      {width > 600 ? (
        <>
          <Header />
          <div className="main-content">
            <Form />
          </div>
        </>
      ) : (
        <div className="main-content">
          <Form />
        </div>
      )}
    </div>
  );
}

export default App;
