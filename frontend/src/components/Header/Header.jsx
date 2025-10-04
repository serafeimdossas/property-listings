import HomeIcon from "@mui/icons-material/Home";
// import EastIcon from "@mui/icons-material/East";
import "./Header.css";

function Header() {
  return (
    <header className="hp-header">
      <div className="hp-header-div">
        <HomeIcon
          style={{ color: "#002ead", fontSize: "3rem" }}
          fontSize="large"
        />
        {/* <h3>Properties App</h3> */}
      </div>
      {/* <div className="hp-header-div">
        <h3>View Properties</h3>
        <EastIcon style={{ color: "#002ead" }} fontSize="large" />
      </div> */}
    </header>
  );
}

export default Header;
