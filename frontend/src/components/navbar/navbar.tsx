import './navbar.scss';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../../services/http-service';
import React, { useEffect, useRef, useState } from 'react';
import { debounce } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearState, searchProducts } from '../../store/slices/productSlice';
import MenuIcon from '@mui/icons-material/Menu';
const Navbar = ({
  searchValue = '',
  isFocused = false,
}: {
  searchValue: string;
  isFocused: boolean;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cartSlice);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [focused, setFocus] = useState(false);
  const [sidebar, setSidebar] = useState(getScreenSize() ? false : true);
  async function logOutUser() {
    const response = await Axios.post('/logout');
    if (response.status === 200) {
      localStorage.removeItem('userId');
      navigate('/login');
    }
  }

  /** TODO: will use this method for auto suggestions */
  // function handleInputChange() {
  // if (inputRef?.current) {
  // const value = inputRef?.current?.value;
  // dispatch(searchProducts(value));
  // navigate(`/search?searchValue=${value}`);
  // }
  // }

  useEffect(() => {
    function handleResize() {
      setSidebar(getScreenSize());
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function getScreenSize() {
    return window.innerWidth <= 768 ? false : true;
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    setFocus(true);
    if (event.key === 'Enter') {
      onSearch();
    }
  }
  function onSearch() {
    const value = inputRef?.current?.value;
    dispatch(searchProducts(value as any));
    navigate(`/search?searchValue=${value}`);
  }

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.value = searchValue;
      if (searchValue?.length) {
        dispatch(searchProducts(searchValue));
      }
    }
    if (isFocused) {
      inputRef.current?.focus();
    }
  }, [inputRef?.current?.value, isFocused]);

  return (
    <div className="navbar-container">
      <div
        onClick={() => setSidebar(!sidebar)}
        className="menu-item-more hidden"
      >
        <MenuIcon />
      </div>
      <div className={(sidebar ? 'sidebar-menu-items ' : '') + ' menu-items'}>
        {sidebar ? (
          <img
            src={'/assets/logo.png'}
            className="h-12 w-50 shop-logo"
            onClick={() => navigate('/')}
          />
        ) : null}
        <ul>
          {sidebar ? (
            <>
              <li className="icon-left" onClick={() => navigate('/products')}>
                <WidgetsOutlinedIcon />
                All
              </li>
              {/* <li>
          <LocalOfferOutlinedIcon />
          Today's deals
        </li> */}
              <li className="icon-left" onClick={() => navigate('/categories')}>
                <CategoryOutlinedIcon />
                Categories
              </li>
            </>
          ) : null}
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
                ref={inputRef}
                onKeyDown={handleKeyDown}
                // onChange={debounce(handleInputChange, 400)}
                placeholder="Search products..."
              />
              <span onClick={onSearch}>
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
          <li className="icon-right" onClick={() => logOutUser()}>
            {/* TODO: to be removed in future */}
            <Person2OutlinedIcon />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
