import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../services/http-service";
const Navbar = () => {
  const navigate = useNavigate();
  async function logOutUser() {
    const response = await Axios.post("/logout");
    if (response.status === 200) {
      navigate("/login");
    }
  }
  return (
    <div className="navbar-container">
      <div className="menu-items">
        <img src={"/assets/amazon.png"} className="h-12 w-50" onClick={() => navigate("/")} />
        <ul>
          <li>
            <WidgetsOutlinedIcon />
            All
          </li>
          <li>
            <LocalOfferOutlinedIcon />
            Today's deals
          </li>
          <li>
            <CategoryOutlinedIcon />
            Categories
          </li>
        </ul>
      </div>
      <div className="right-items">
        <ul>
          <li>
            <SearchOutlinedIcon />
            Search
          </li>
          <li>
            <ShoppingCartOutlinedIcon />
          </li>
          <li>
            {/* TODO: to be removed in future */}
            <Person2OutlinedIcon onClick={() => logOutUser()} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
