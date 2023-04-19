import React from "react";
import viewUtils from "../../Utils";
import { AiTwotoneHome } from "react-icons/ai";
import { BiLogInCircle } from "react-icons/bi";
import { MdJoinFull } from "react-icons/md";
import { ImMenu } from "react-icons/im";
import Logo from '../../../assets/Static/SVG/Logo.svg'
function SecondaryNav() {
  const { MainLink } = viewUtils;
  type linkType = {
    name: string;
    linkClass: string;
    Icon: any;
    to: string;
  };
  const LinkObj: linkType[] = [
    {
      name: "Home",
      to: "/home",
      linkClass: "nav_links",
      Icon: AiTwotoneHome,
    },
    {
      name: "Login",
      to: "/home/login",
      linkClass: "nav_links",
      Icon: BiLogInCircle,
    },
    {
      name: "Register",
      to: "/home/register",
      linkClass: "nav_links",
      Icon: MdJoinFull,
    },
    ];
    
    function MenuToggle() {
        const elem = document.querySelector(".secondary_navlink_holder")
        elem?.classList.toggle("show_nav_links_holder")
    
    }
    return (
      <div className="secondary_nav">
        <section className="menubar_holder">
          <div className="logo_holder">
            <img src={Logo} className="logo" alt="logo" />
          </div>
          <ImMenu onClick={MenuToggle} className="bar_click" />
        </section>
        <section className="secondary_navlink_holder">
          {LinkObj.map((item, i) => (
            <MainLink
              action={MenuToggle}
              iconClass="link_icon"
              holderClass="each_link_holder"
              {...item}
              key={i * 67}
            />
          ))}
        </section>
      </div>
    );
}

export default SecondaryNav;
