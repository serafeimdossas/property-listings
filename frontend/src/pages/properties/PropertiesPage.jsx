import { useState, useEffect } from "react";
import { getProperties } from "../../services/PropertiesService";
import Header from "../../components/Header/Header";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import "./PropertiesPage.css";

function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await getProperties();
      if (response.success) {
        setProperties(response.data);
      } else {
        // show error page
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const propertiesList = () => {
    return properties.map((property) => <PropertyCard property={property} />);
  };

  return (
    <div className="properties-page">
      <>
        <Header />
        <div className="properties-page-title">
          <p>Properties listings</p>
        </div>
        <div className="properties-page-body">{propertiesList()}</div>
      </>
    </div>
  );
}

export default PropertiesPage;
