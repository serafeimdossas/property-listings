import placeholderImg from "./../../assets/placeholder-image.png";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import StairsOutlinedIcon from "@mui/icons-material/StairsOutlined";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import ShowerOutlinedIcon from "@mui/icons-material/ShowerOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import "./PropertyCard.css";

function PropertyCard(props) {
  const {
    title,
    area,
    type,
    description,
    price,
    floor_level,
    square_meters,
    bedrooms,
    bathrooms,
    year_built,
    furnished,
  } = props.property;

  const formatPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="property-card">
      <div className="property-card-img">
        <img src={placeholderImg} />
      </div>
      <div className="property-card-details">
        <p className="property-card-title">
          {title} <span className="property-card-type">{`(${type})`}</span>
        </p>
        <p className="property-card-area">
          <LocationOnOutlinedIcon fontSize="small" />
          <span>{area}</span>
        </p>
        <p className="property-card-description">{description}</p>
        <p className="property-card-attributes">
          {floor_level ? (
            <div className="property-attribute">
              <StairsOutlinedIcon fontSize="small" />
              <span>{floor_level}</span>
            </div>
          ) : null}
          {square_meters ? (
            <div className="property-attribute">
              <FullscreenIcon fontSize="small" />
              <span>{`${square_meters}m²`}</span>
            </div>
          ) : null}
          {bedrooms ? (
            <div className="property-attribute">
              <BedOutlinedIcon fontSize="small" />
              <span>{bedrooms}</span>
            </div>
          ) : null}
          {bathrooms ? (
            <div className="property-attribute">
              <ShowerOutlinedIcon fontSize="small" />
              <span>{bathrooms}</span>
            </div>
          ) : null}
          {year_built ? (
            <div className="property-attribute">
              <HandymanOutlinedIcon fontSize="small" />
              <span>{year_built}</span>
            </div>
          ) : null}
        </p>
        <p className="property-card-price">{`${formatPrice(price)} €`}</p>
      </div>
    </div>
  );
}

export default PropertyCard;
