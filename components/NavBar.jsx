import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const NavBar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <div className="logo">
        <Link href="/">
          <span className="logo-text">MKR Store</span>
        </Link>
      </div>

      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
        aria-label="Shopping Cart"
      >
        <AiOutlineShopping size={25} />
        {totalQuantities > 0 && (
          <span className="cart-item-qty">{totalQuantities}</span>
        )}
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default NavBar;
