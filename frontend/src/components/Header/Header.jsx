import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="hp-header">
      <div className="hp-header-div">
        <Link to="/">
          <HomeIcon
            style={{ color: "#002ead", fontSize: "3rem" }}
            fontSize="large"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
