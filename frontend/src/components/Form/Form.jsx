import { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { getAreaSuggestions } from "../../services/AreaService";
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

  const updateSuggestions = async (input) => {
    const options = await getAreaSuggestions(input);
    setAreaOptions(
      options.map((option) => ({
        areaId: option.placeId,
        areaText: `${option.mainText}, ${option.secondaryText}`,
      }))
    );
  };

  return (
    <div className="hp-form">
      <div className="hp-form-header">
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
              areaOptions.find((option) => option.areaText === areaText) || null
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
        >
          Submit Property Listing
        </Button>
      </div>
    </div>
  );
}

export default Form;
