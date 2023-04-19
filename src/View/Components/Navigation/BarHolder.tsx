import React from 'react'
import { BsCartCheckFill} from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi"
import { Link } from 'react-router-dom';
function BarHolder() {

    function menuClick() {
        const nav = document.querySelector(".primary_nav")
        nav?.classList.toggle("hide_primary_nav")
    }
  return (
    <div className="bar_holder">
      <GiHamburgerMenu onClick={menuClick} className="menu_btn" />
      <Link to="/cart">
        <BsCartCheckFill className="cart_btn" />
      </Link>
    </div>
  );
}

export default BarHolder