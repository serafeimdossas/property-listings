import placeholderImg from "./../../assets/placeholder-image.png";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import "./PropertyCard.css";

function PropertyCard(props) {
  const { title, area, type, description, price } = props.property;

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
        <p className="property-card-price">{`${formatPrice(price)} €`}</p>
      </div>
    </div>
  );
}

export default PropertyCard;
