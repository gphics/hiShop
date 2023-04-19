import React from "react";
import viewUtils from "../../Utils";
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BiTransferAlt } from "react-icons/bi";
import { MdTrackChanges } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { FaLuggageCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { userSliceActions } from "../../../Model/Local/UserSlice";

function PrimaryNav() {
  const { logOutUser } = userSliceActions;
  const dispatch = useDispatch();
  const { MainLink } = viewUtils;
  // @ts-ignore
  const {
    user: { userImgName, firstname },
  } = useSelector((state:any) => state.userSlice);
  const date = new Date().getMilliseconds()
  const imgUrl = `https://dhkiodtlpiwxnmsbcepb.supabase.co/storage/v1/object/public/user/${userImgName}?t=${date}`;
  type obj = {
    name: string;
    Icon: any;
    to: string;
  };
  const linkObj: obj[] = [
    { name: "dashboard", Icon: AiFillHome, to: "/" },
    { name: "my products", Icon: FaLuggageCart, to: "/myproducts" },
    { name: "transactions", Icon: BiTransferAlt, to: "/transactions" },
    { name: "profile", Icon: CgProfile, to: "/profile" },
    { name: "update profile", Icon: MdTrackChanges, to: "/updateprofile" },
  ];
  function onClickHandler(): void {
    document
      .querySelector(".primary_nav")
      ?.classList.toggle("hide_primary_nav");
  }
  function logoutHandler(): void {
    onClickHandler();
    dispatch(logOutUser());
  }
  return (
    <nav className="primary_nav hide_primary_nav">
      <header className="primary_nav_header">
        <img src={imgUrl} alt="user image" />
        <h4> {firstname}</h4>
      </header>
      <section className="all_primary_nav_links_holder">
        <div className="main_part">
          {linkObj.map((item, i) => (
            <MainLink
              linkClass="each_primary_nav_link"
              holderClass="each_primary_nav_link_holder"
              iconClass="primary_nav_icon"
              action={onClickHandler}
              key={i * 777}
              {...item}
            />
          ))}
        </div>
        <aside className="secondary_part">
          <MainLink
            linkClass="each_primary_nav_link"
            holderClass="each_primary_nav_link_holder"
            iconClass="primary_nav_icon"
            action={logoutHandler}
            name="logout"
            Icon={IoMdLogOut}
            to="/"
          />
        </aside>
      </section>
    </nav>
  );
}

export default PrimaryNav;
