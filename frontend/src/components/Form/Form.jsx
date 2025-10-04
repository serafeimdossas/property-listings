import { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { getAreaSuggestions } from "../../services/AreaService";
import { listProperty } from "../../services/PropertiesService";
import "./Form.css";

const TITLE = {
  MAIN: "List a new Property",
  SUBTITLE: "Fill the details to create a new listing",
};

const LABELS = {
  TITLE: "Property Title",
  TYPE: "Property Type",
  AREA: "Area",
  FLOOR_LEVEL: "Floor Level",
  SQUARE_METERS: "Square Meteres",
  BEDROOMS: "Number of Bedrooms",
  BATHROOMS: "Number of Bathrooms",
  YEAR: "Year Built",
  FURNISHED: "Furnished",
  PRICE: "Price",
  DESCRIPTION: "Description",
};

const PLACEHOLDERS = {
  TITLE: "Enter property title",
  TYPE: "Select property type",
  AREA: "Enter property area (e.g. Nea Smyrni)",
  FLOOR_LEVEL: "Enter property floor level",
  SQUARE_METERS: "Enter property's size in square meters",
  BEDROOMS: "Enter number of bedrooms",
  BATHROOMS: "Enter number of bathrooms",
  YEAR: "Enter building's construction year",
  FURNISHED: "Choose furnished status",
  PRICE: "Set property price",
  DESCRIPTION: "Write a brief description of the property",
};

const PROPERTY_TYPES = [
  { label: "Rent", value: "Rent" },
  { label: "Buy", value: "Buy" },
  { label: "Exchange", value: "Exchange" },
  { label: "Donation", value: "Donation" },
];

const COMMON_AREA_SUGGESTIONS = [
  { areaId: "ChIJ8UNwBh-9oRQR3Y1mdkU1Nic", areaText: "Athens, Ελλάδα" },
  { areaId: "ChIJ7eAoFPQ4qBQRqXTVuBXnugk", areaText: "Thessaloniki, Ελλάδα" },
  { areaId: "ChIJLe0kpZk1XhMRoIy54iy9AAQ", areaText: "Patras, Ελλάδα" },
  { areaId: "ChIJP-Fo0GtYmhQR8La54iy9AAQ", areaText: "Heraklion, Ελλάδα" },
  { areaId: "ChIJoUddWVyIWBMRMJy54iy9AAQ", areaText: "Larissa, Ελλάδα" },
];

function Form() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Rent");
  const [areaText, setAreaText] = useState("");
  const [areaId, setAreaId] = useState("");
  const [areaOptions, setAreaOptions] = useState([]);
  const [floorLevel, setFloorLevel] = useState(0);
  const [squareMeters, setSquareMeters] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [year, setYear] = useState(0);
  const [furnished, setFurnished] = useState(false);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [width, setWidth] = useState(window.innerWidth);

  const cacheRef = useRef(new Map());

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const setCachedAreaSuggestion = (query, data) => {
    // save input suggestions, with expiry after 5 mins
    cacheRef.current.set(query, { data, expiry: Date.now() + 5 * 60 * 1000 });
  };

  const getCachedAreaSuggestion = (query) => {
    // get data for user's input from cache object
    const entry = cacheRef.current.get(query);

    // if not found return null
    if (!entry) return null;

    // cache data too old, clean cache to not use much memory
    if (Date.now() > entry.expiry) {
      cacheRef.current.delete(query);
      return null;
    }

    // return found data
    return entry.data;
  };

  const updateSuggestions = async (input) => {
    // check cache
    const cached = getCachedAreaSuggestion(input);
    if (cached) {
      setAreaOptions(cached);
      return;
    }

    // not cached, call API
    const options = await getAreaSuggestions(input);
    setAreaOptions(
      options.map((option) => ({
        areaId: option.placeId,
        areaText: `${option.mainText}, ${option.secondaryText}`,
      }))
    );

    // Save to cache and return
    setCachedAreaSuggestion(
      input,
      options.map((option) => ({
        areaId: option.placeId,
        areaText: `${option.mainText}, ${option.secondaryText}`,
      }))
    );
  };

  const submitButtonDisabled = () => {
    return (
      title === "" || // title has no value
      type === "" || // type has no value
      price < 0 || // price is negative
      (areaText === "" && areaId === "") // area variables have no info
    );
  };

  const clearFormFields = () => {
    setTitle("");
    setType("Rent");
    setAreaText("");
    setAreaId("");
    setAreaOptions([]);
    setFloorLevel(0);
    setSquareMeters(0);
    setBedrooms(0);
    setBathrooms(0);
    setYear(0);
    setFurnished(false);
    setPrice(0);
    setDescription("");
  };

  const submitForm = async () => {
    try {
      const result = await listProperty({
        title,
        type,
        area_id: areaId,
        area: areaText,
        price: parseInt(price),
        description,
        floor_level: floorLevel >= -1 ? floorLevel : null, // handle for basements too
        square_meters: squareMeters > 0 ? squareMeters : null,
        bedrooms: bedrooms >= 0 ? bedrooms : null,
        bathrooms: bathrooms >= 0 ? bathrooms : null,
        year_built: year > 1900 ? year : null,
        furnished,
      });

      if (result.success) {
        // clear form
        clearFormFields();
        // show success toast
        toast.success("Poperty successfully listed.");
        // reload page
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        // show error toast
        toast.error(
          "Oops, we encountered an error listing your property, try again later."
        );
      }
    } catch (error) {
      console.error("Property not listed", error);
      // show error toast
      toast.error(
        "Oops, we encountered an error listing your property, try again later."
      );
    }
  };

  const propertiesListLink = () => {
    return (
      <div className="form-footer-link">
        <Link to="/properties">
          <span>View Properties &rarr;</span>
        </Link>
      </div>
    );
  };

  const toastModal = () => {
    return (
      <ToastContainer
        position="top-right"
        theme="colored"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    );
  };

  return (
    <>
      <div className="hp-form">
        <div className="hp-form-header">
          {width > 600 ? null : (
            <div className="hp-form-header-icon">
              <HomeIcon
                style={{ color: "#002ead", fontSize: "3rem" }}
                fontSize="large"
              />
            </div>
          )}
          <div className="form-header-link">
            <Link to="/properties">
              <span>View Properties &rarr;</span>
            </Link>
          </div>
          <p className="hp-form-title">{TITLE.MAIN}</p>
          <p className="hp-form-subtitle">{TITLE.SUBTITLE}</p>
        </div>
        <div className="hp-form-main-body">
          <div className="hp-form-input">
            <p className="hp-form-input-label">{LABELS.TITLE}</p>
            <TextField
              placeholder={PLACEHOLDERS.TITLE}
              variant="outlined"
              fullWidth
              size="small"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="hp-form-input">
            <p className="hp-form-input-label">{LABELS.TYPE}</p>
            <Select
              placeholder={PLACEHOLDERS.TYPE}
              value={type}
              onChange={(event) => setType(event.target.value)}
              fullWidth
              size="small"
            >
              {PROPERTY_TYPES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="hp-form-input">
            <p className="hp-form-input-label">{LABELS.AREA}</p>
            <Autocomplete
              placeholder={PLACEHOLDERS.AREA}
              disablePortal
              freeSolo
              options={areaOptions}
              getOptionLabel={(option) => option.areaText || ""}
              renderInput={(params) => (
                <TextField {...params} placeholder={PLACEHOLDERS.AREA} />
              )}
              fullWidth
              size="small"
              value={
                areaOptions.find((option) => option.areaText === areaText) ||
                null
              }
              onInputChange={(_event, newInputValue) => {
                setAreaText(newInputValue);
                if (newInputValue.length >= 3) {
                  updateSuggestions(newInputValue);
                } else {
                  setAreaOptions([]);
                }
              }}
              onChange={(_event, newValue) => {
                if (newValue) {
                  setAreaId(newValue.areaId);
                  setAreaText(newValue.areaText);
                }
              }}
            />
          </div>
          <div className="hp-form-input-double">
            <div className="hp-form-input">
              <p className="hp-form-input-label">{LABELS.FLOOR_LEVEL}</p>
              <TextField
                placeholder={PLACEHOLDERS.FLOOR_LEVEL}
                variant="outlined"
                fullWidth
                size="small"
                type="number"
                value={floorLevel}
                onChange={(event) => {
                  if (event.target.value >= -1) {
                    setFloorLevel(event.target.value);
                  }
                }}
              />
            </div>
            <div className="hp-form-input">
              <p className="hp-form-input-label">{LABELS.SQUARE_METERS}</p>
              <TextField
                placeholder={PLACEHOLDERS.SQUARE_METERS}
                variant="outlined"
                fullWidth
                size="small"
                type="number"
                value={squareMeters}
                onChange={(event) => {
                  if (event.target.value > 0) {
                    setSquareMeters(event.target.value);
                  }
                }}
              />
            </div>
          </div>
          <div className="hp-form-input-double">
            <div className="hp-form-input">
              <p className="hp-form-input-label">{LABELS.BEDROOMS}</p>
              <TextField
                placeholder={PLACEHOLDERS.BEDROOMS}
                variant="outlined"
                fullWidth
                size="small"
                type="number"
                value={bedrooms}
                onChange={(event) => {
                  if (event.target.value >= 0) {
                    setBedrooms(event.target.value);
                  }
                }}
              />
            </div>
            <div className="hp-form-input">
              <p className="hp-form-input-label">{LABELS.BATHROOMS}</p>
              <TextField
                placeholder={PLACEHOLDERS.BATHROOMS}
                variant="outlined"
                fullWidth
                size="small"
                type="number"
                value={bathrooms}
                onChange={(event) => {
                  if (event.target.value >= 0) {
                    setBathrooms(event.target.value);
                  }
                }}
              />
            </div>
          </div>
          <div className="hp-form-input-double">
            <div className="hp-form-input">
              <p className="hp-form-input-label">{LABELS.YEAR}</p>
              <TextField
                placeholder={PLACEHOLDERS.YEAR}
                variant="outlined"
                fullWidth
                size="small"
                type="number"
                value={year}
                onChange={(event) => {
                  if (event.target.value >= 0) {
                    setYear(event.target.value);
                  }
                }}
              />
            </div>
            <div className="hp-form-input">
              <p className="hp-form-input-label">{LABELS.FURNISHED}</p>
              <Select
                placeholder={PLACEHOLDERS.FURNISHED}
                value={furnished}
                onChange={(event) => setFurnished(event.target.value)}
                fullWidth
                size="small"
              >
                <MenuItem key={1} value={false}>
                  Not furnished
                </MenuItem>
                <MenuItem key={2} value={true}>
                  Furnished
                </MenuItem>
              </Select>
            </div>
          </div>
          <div className="hp-form-input">
            <p className="hp-form-input-label">{LABELS.PRICE}</p>
            <TextField
              placeholder={PLACEHOLDERS.PRICE}
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              value={price}
              onChange={(event) => {
                if (event.target.value >= 0) {
                  setPrice(event.target.value);
                }
              }}
            />
          </div>
          <div className="hp-form-input">
            <p className="hp-form-input-label">{LABELS.DESCRIPTION}</p>
            <TextField
              placeholder={PLACEHOLDERS.DESCRIPTION}
              variant="outlined"
              fullWidth
              size="small"
              multiline
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
        </div>
        <div className="hp-form-footer">
          <Button
            variant="contained"
            fullWidth
            sx={{ textTransform: "none" }}
            size="large"
            disabled={submitButtonDisabled()}
            onClick={submitForm}
          >
            Submit Property Listing
          </Button>
          {/* {width > 600 ? null : propertiesListLink()} */}
          {propertiesListLink()}
        </div>
      </div>
      {toastModal()}
    </>
  );
}

export default Form;
