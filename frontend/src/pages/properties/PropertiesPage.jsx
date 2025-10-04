import { useState, useEffect } from "react";
import {
  getProperties,
  getFilteredSortedProperties,
} from "../../services/PropertiesService";
import Header from "../../components/Header/Header";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import HomeIcon from "@mui/icons-material/Home";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import "./PropertiesPage.css";

function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);

  const [sorting, setSorting] = useState("");
  const [filtering, setFiltering] = useState("");

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
    fetchFilteredSortedProperties();
  }, [sorting, filtering]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchFilteredSortedProperties = async () => {
    // construct params object
    const params = {
      ...(sorting !== "" && { sorting }),
      ...(filtering !== "" && { filtering }),
    };
    // fetch filtered/sorted properties
    const response = await getFilteredSortedProperties(params);
    // get results
    if (response.success) {
      setProperties([...response.data]);
    } else {
      // show error page
    }
  };

  const propertiesList = () => {
    return properties.map((property) => <PropertyCard property={property} />);
  };

  const sortingDropdown = () => {
    return (
      <Select
        displayEmpty
        value={sorting}
        size="small"
        onChange={(event) => setSorting(event.target.value)}
      >
        <MenuItem value="" disabled>
          Sort by Price
        </MenuItem>
        <MenuItem key={1} value={"asc"}>
          Ascending
        </MenuItem>
        <MenuItem key={2} value={"desc"}>
          Descending
        </MenuItem>
      </Select>
    );
  };

  const filteringDropdown = () => {
    return (
      <Select
        displayEmpty
        value={filtering}
        onChange={(event) => setFiltering(event.target.value)}
      >
        <MenuItem value="" disabled>
          Filter by Property Type
        </MenuItem>
        <MenuItem key={1} value={"Rent"}>
          Rent
        </MenuItem>
        <MenuItem key={2} value={"Buy"}>
          Buy
        </MenuItem>
        <MenuItem key={3} value={"Exchange"}>
          Exchange
        </MenuItem>
        <MenuItem key={4} value={"Donation"}>
          Donation
        </MenuItem>
        <MenuItem key={5} value={""}>
          Show All
        </MenuItem>
      </Select>
    );
  };

  const dropdownsSection = () => {
    return (
      <div className="dropdowns-section">
        {sortingDropdown()}
        {filteringDropdown()}
      </div>
    );
  };

  return (
    <div className="properties-page">
      {width > 600 ? (
        <>
          <Header />
          <div className="properties-page-title">
            <p>Properties listings</p>
          </div>
          {dropdownsSection()}
          <div className="properties-page-body">{propertiesList()}</div>
        </>
      ) : (
        <>
          {
            <div className="properties-page-header-icon">
              <Link to="/">
                <HomeIcon
                  style={{ color: "#002ead", fontSize: "3rem" }}
                  fontSize="large"
                />
              </Link>
            </div>
          }
          <div className="properties-page-title">
            <p>Properties listings</p>
          </div>
          <div className="properties-page-body">{propertiesList()}</div>
        </>
      )}
    </div>
  );
}

export default PropertiesPage;
