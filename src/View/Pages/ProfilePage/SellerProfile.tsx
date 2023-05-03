import React, { useEffect, useState } from "react";
import BarHolder from "../../Components/Navigation/BarHolder";
import { useSelector } from "react-redux";
import { FaPiggyBank, FaUserEdit } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { IoMdContacts } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { BsFillShieldLockFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import hiShopSupabase from "../../../Model/Remote/hiShop";
function SellerProfile() {
    const { id } = useParams()
    const [seller, setSeller] = useState({
      firstname:'',
      lastname:'',
      shopName:"",
      hiPayAccount:"",
      userImgName:"",
      contact:'',
      location:'',
      email:'',
      created_at:'',
    });

  const {
      firstname,
      lastname,
      shopName,
      hiPayAccount,
      userImgName,
      contact,
      location,
      email,
      created_at
   
    } = seller
// fetching the seller
    
    async function fetchSeller() {
        const { data, error } = await hiShopSupabase.from("user").select()
            .eq("id", id)
            .single()
        if (data) {
            // @ts-ignore
            setSeller(data)
        }
    }
    useEffect(() => {
        fetchSeller()
    }, [id]);
  const date = new Date().getMilliseconds();
  const imgUrl = `https://dhkiodtlpiwxnmsbcepb.supabase.co/storage/v1/object/public/user/${userImgName}?t=${date}`;

  type obj = { label: string; value: string; Icon: any };
  const infoArr: obj[] = [
    { label: "email", value: email, Icon: MdEmail },
    { label: "contact", value: contact, Icon: IoMdContacts },
    { label: "location", value: location, Icon: HiLocationMarker },

  ];

  return (
    <div className="profile_page">
      <main>
        <BarHolder />
        <header className="profile_page_header">
          <h4>profile</h4>
          <div className="image_holder">
            <img src={imgUrl} alt="user image" />
           
          </div>

          <h4>
            {firstname} {lastname}
          </h4>
          <small> @{shopName} </small>
          <small> joined on {new Date(created_at).toDateString()} </small>
        </header>
        <section className="profile_page_info">
          {infoArr.map((item: obj, index: number) => (
            <article key={index * 56565657} className="each_profile_info">
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

export default SellerProfile;
