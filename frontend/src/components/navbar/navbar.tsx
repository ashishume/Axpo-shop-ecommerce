import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../services/http-service";
import { useEffect, useRef, useState } from "react";
const Navbar = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [focused, setFocus] = useState(false);
  async function logOutUser() {
    const response = await Axios.post("/logout");
    if (response.status === 200) {
      localStorage.removeItem("userId");
      navigate("/login");
    }
  }

  function handleInputChange() {
    if (inputRef?.current) {
      console.log(inputRef.current?.value);
    }
  }
  return (
    <div className="navbar-container">
      <div className="menu-items">
        <img src={"/assets/amazon.png"} className="h-12 w-50" onClick={() => navigate("/")} />
        <ul>
          <li onClick={() => navigate("/products")}>
            <WidgetsOutlinedIcon />
            All
          </li>
          {/* <li>
            <LocalOfferOutlinedIcon />
            Today's deals
          </li> */}
          <li onClick={() => navigate("/categories")}>
            <CategoryOutlinedIcon />
            Categories
          </li>
        </ul>
      </div>
      <div className="right-items">
        <ul>
          <li>
            <div
              className={`search-input-field-container ${focused ? "active-search" : ""}`}
              onClick={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            >
              <input className="search-input-field" ref={inputRef} onChange={handleInputChange} placeholder="Search products..." />
            </div>
          </li>
          <li onClick={() => navigate("/cart")}>
            <ShoppingCartOutlinedIcon />
          </li>
          <li onClick={() => logOutUser()}>
            {/* TODO: to be removed in future */}
            <Person2OutlinedIcon />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
