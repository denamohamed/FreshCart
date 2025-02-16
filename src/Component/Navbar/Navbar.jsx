import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../Context/user.context";
import { cartContext } from "../../Context/cart.context";

export default function Navbar() {
  const { token, Logout } = useContext(userContext);
  const { cartInfo, getUserCart } = useContext(cartContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getUserCart();
  }, []);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <nav className="bg-slate-100 fixed top-0 left-0 right-0 z-10 py-5">
      <div className="container flex justify-between items-center">
        <h1>
          <img src={Logo} alt="freshcart logo" className="" />
        </h1>

        <button className="lg:hidden" onClick={toggleMenu}>
          <i
            className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"} text-xl`}
          ></i>
        </button>

        <div
          className={`flex-col lg:flex-row lg:flex lg:items-center ${
            isOpen ? "flex" : "hidden"
          } lg:flex`}
        >
          {token ? (
            <ul className="flex flex-col lg:flex-row gap-5">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `relative before:absolute before:left-0 before:-bottom-1 before:h-[2px] hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-primary  ${
                      isActive ? "font-bold before:w-full" : "before:w-0"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `relative before:absolute before:left-0 before:-bottom-1 before:h-[2px] hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-primary  ${
                      isActive ? "font-bold before:w-full" : "before:w-0"
                    }`
                  }
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    `relative before:absolute before:left-0 before:-bottom-1 before:h-[2px] hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-primary  ${
                      isActive ? "font-bold before:w-full" : "before:w-0"
                    }`
                  }
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/brands"
                  className={({ isActive }) =>
                    `relative before:absolute before:left-0 before:-bottom-1 before:h-[2px] hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-primary  ${
                      isActive ? "font-bold before:w-full" : "before:w-0"
                    }`
                  }
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/allorders"
                  className={({ isActive }) =>
                    `relative before:absolute before:left-0 before:-bottom-1 before:h-[2px] hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-primary  ${
                      isActive ? "font-bold before:w-full" : "before:w-0"
                    }`
                  }
                >
                  Orders
                </NavLink>
              </li>
            </ul>
          ) : (
            ""
          )}
          {!isOpen ? (
            <ul className="flex flex-col lg:flex-row gap-5 mx-6">
              <li>
                <a href="https://www.facebook.com">
                  <i className="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com">
                  <i className="fa-brands fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com">
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com">
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </li>
            </ul>
          ) : (
            ""
          )}

          {token && (
            <ul className="flex flex-row gap-4 my-3 lg:mx-5">
              <li>
                <Link to="/wishlist">
                  <i className="fa-solid fa-heart text-lg"></i>
                </Link>
              </li>
              <li>
                <Link className="relative" to="/cart">
                  <i className="fa-solid fa-cart-shopping text-lg"></i>
                  <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-sm flex justify-center items-center bg-primary w-5 h-4 rounded-full text-white font-semibold">
                    {cartInfo == null ? (
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    ) : (
                      cartInfo.numOfCartItems
                    )}
                  </span>
                </Link>
              </li>
            </ul>
          )}

          <ul className="flex flex-col my-2 lg:flex-row gap-5 lg:mx-5">
            {!token ? (
              <>
                <li>
                  <NavLink to="/auth/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/auth/register">Signin</NavLink>
                </li>
              </>
            ) : (
              <li>
                <span onClick={Logout}>
                  <i className="fa-solid fa-right-from-bracket cursor-pointer"></i>
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
