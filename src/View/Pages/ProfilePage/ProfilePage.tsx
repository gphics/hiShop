import React, { useEffect } from "react";
import BarHolder from "../../Components/Navigation/BarHolder";
import { useSelector } from "react-redux";
import { FaPiggyBank, FaUserEdit } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { IoMdContacts } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import {BsFillShieldLockFill} from "react-icons/bs";
import { Link } from "react-router-dom";
function ProfilePage() {
  const {
    user: {
      firstname,
      lastname,
      shopName,
      hiPayAccount,
      userImgName,
      contact,
      location,
      email,
      password,
      created_at
    },
  } = useSelector((state: any) => state.userSlice);
  const date = new Date().getMilliseconds();
  const imgUrl = `https://dhkiodtlpiwxnmsbcepb.supabase.co/storage/v1/object/public/user/${userImgName}?t=${date}`;

  type obj = { label: string; value: string; Icon: any };
  const infoArr: obj[] = [
    { label: "email", value: email, Icon: MdEmail },
    { label: "contact", value: contact, Icon: IoMdContacts },
    { label: "hiPay Account", value: hiPayAccount, Icon: FaPiggyBank },
    { label: "location", value: location, Icon: HiLocationMarker },
    { label: "password", value: password, Icon: BsFillShieldLockFill },
  ];

  return (
    <div className="profile_page">
      <main>
        <BarHolder />
        <header className="profile_page_header">
          <h4>profile</h4>
          <div className="image_holder">
            <img src={imgUrl} alt="user image" />
            <Link to="/updateprofile" className="profile_update_btn">
              {" "}
              <FaUserEdit className="icon" />{" "}
            </Link>
          </div>

          <h4>
            {firstname} {lastname}
          </h4>
          <small> @{shopName} </small>
          <small> joined on {new Date(created_at).toDateString()} </small>
        </header>
        <section className="profile_page_info">
          {infoArr.map((item: obj, index: number) => (
            <article key={index*56565657} className="each_profile_info">
              <h5>
                {" "}
                {item.label} <item.Icon className="icon" />{" "}
              </h5>
              <h4> {item.value} </h4>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default ProfilePage;
