import { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
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
  AREA: "Set property geographical area",
  PRICE: "Set property price",
  DESCRIPTION: "Write a brief description of the property",
};

const PROPERTY_TYPES = [
  { label: "Rent", value: "Rent" },
  { label: "Buy", value: "Buy" },
  { label: "Exchange", value: "Exchange" },
  { label: "Donation", value: "Donation" },
];

function Form() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Rent");
  const [area, setArea] = useState({
    areaId: "",
    areaText: "",
  });
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

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
          {/* <Autocomplete
            // disablePortal
            // options={top100Films}
            // sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          /> */}
          <TextField
            placeholder={PLACEHOLDERS.AREA}
            variant="outlined"
            fullWidth
            size="small"
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
