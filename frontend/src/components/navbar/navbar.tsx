import './navbar.scss';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FlightIcon from '@mui/icons-material/Flight';
import { useLocation, useNavigate } from 'react-router-dom';
import { Axios } from '../../services/http-service';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearState, searchProducts } from '../../store/slices/productSlice';
import MenuIcon from '@mui/icons-material/Menu';
import LuggageIcon from '@mui/icons-material/Luggage';
import useDebounce from '../../Utils/useDebounce';
const Navbar = ({
  searchValue = '',
  isFocused = false,
  ...rest
}: {
  searchValue: string;
  isFocused: boolean;
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cartSlice);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [focused, setFocus] = useState(false);
  const [isMenuVisible, showMenu] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue, 300);
  async function logOutUser() {
    const response = await Axios.post('/logout');
    if (response.status === 200) {
      localStorage.removeItem('userId');
      navigate('/login');
    }
  }

  useEffect(() => {
    if (pathname.split('/').includes('search')) {
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (debouncedInputValue) {
      dispatch(searchProducts(debouncedInputValue));
    }
  }, [debouncedInputValue]);

  function handleInputChange(e: any) {
    setInputValue(e.target.value);
  }

  function navigateToSearchPage() {
    navigate(`/search?searchValue=${inputValue}`);
  }

  return (
    <div className="navbar-container">
      {/* <div
        className="menu-item-more hidden"
      >
        <MenuIcon />
      </div> */}
      <div className="menu-items">
        <img
          src={'/assets/logo.png'}
          className="h-12 w-50 shop-logo"
          onClick={() => navigate('/')}
        />

        <ul>
          <li className="icon-left" onClick={() => navigate('/products')}>
            <WidgetsOutlinedIcon />
            All
          </li>
          <li className="icon-left" onClick={() => navigate('/categories')}>
            <CategoryOutlinedIcon />
            Categories
          </li>
          <li className="icon-left" onClick={() => navigate('/bookings/')}>
            <FlightIcon />
            Bookings
          </li>
          <li
            className="icon-left"
            onClick={() => navigate('/bookings/my-bookings')}
          >
            <LuggageIcon />
            My trips
          </li>
        </ul>
      </div>
      <div className="right-items">
        <ul>
          <li>
            <div
              className={`search-input-field-container ${
                focused ? 'active-search' : ''
              }`}
              onClick={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            >
              <input
                className="search-input-field"
                onChange={handleInputChange}
                ref={inputRef}
                onClick={navigateToSearchPage}
                placeholder="Search products..."
              />
              <span>
                <SearchOutlinedIcon />
              </span>
            </div>
          </li>
          <li className="icon-right" onClick={() => navigate('/my-orders')}>
            <LocalShippingIcon />
          </li>
          <li className="icon-right" onClick={() => navigate('/cart')}>
            <ShoppingCartOutlinedIcon />
            {cart?.length > 0 ? (
              <span className="cart-item-length">{cart.length} </span>
            ) : (
              ''
            )}
          </li>
          <li
            className="icon-right logout-button"
            onClick={() => showMenu(!isMenuVisible)}
          >
            <Person2OutlinedIcon />

            <div
              className={`logout-menu ${isMenuVisible ? 'visible' : ''}`}
              onClick={() => logOutUser()}
            >
              Logout
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
