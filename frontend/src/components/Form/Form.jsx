import { useState, useEffect } from "react";
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
  PRICE: "Price",
  DESCRIPTION: "Description",
};

const PLACEHOLDERS = {
  TITLE: "Enter property title",
  TYPE: "Select property type",
  AREA: "Enter property area (e.g. Nea Smyrni)",
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
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateSuggestions = async (input) => {
    const options = await getAreaSuggestions(input);
    setAreaOptions(
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
          <div className="hp-form-input">
            <p className="hp-form-input-label">{LABELS.PRICE}</p>
            <TextField
              placeholder={PLACEHOLDERS.PRICE}
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
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
