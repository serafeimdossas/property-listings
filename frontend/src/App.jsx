import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header/Header";
import Form from "./components/Form/Form";
import PropertiesPage from "./pages/properties/PropertiesPage";
import "./App.css";

function App() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderHomePage = () => {
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
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={renderHomePage()} />
        <Route path="/properties" element={<PropertiesPage />} />
      </Routes>
    </div>
  );
}

export default App;
