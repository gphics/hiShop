import React from 'react'
import { BsCartCheckFill} from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi"
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
function BarHolder() {
  const {
    user: { myCart },
  } = useSelector((state: any) => state.userSlice);
    function menuClick() {
        const nav = document.querySelector(".primary_nav")
        nav?.classList.toggle("hide_primary_nav")
    }
  return (
    <div className="bar_holder">
      <GiHamburgerMenu onClick={menuClick} className="menu_btn" />
      <Link to="/cart" className='cart_link'>
        {myCart &&
          <h6> {myCart.length < 10 ? myCart.length : "9+"} </h6>
        }
        <BsCartCheckFill className="cart_btn" />
      </Link>
    </div>
  );
}
 
export default BarHolder