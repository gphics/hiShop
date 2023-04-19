import { useState } from "react";
import BarHolder from "../../Components/Navigation/BarHolder";
import ProfileUpdateComponents from "../../Components/ProfileUpdate";
import {
  BsShopWindow,
  BsFillPersonFill,
  BsFillPersonLinesFill,
} from "react-icons/bs";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { UserProfileUpdate, userSliceActions } from "../../../Model/Local/UserSlice";
import viewUtils from "../../Utils";
import { FaPiggyBank } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { IoMdContacts } from "react-icons/io";
import hiShopSupabase from "../../../Model/Remote/hiShop";
import hiPaySupabase from "../../../Model/Remote/hiPay";
import { defaultSliceActions } from "../../../Model/Local/DefaultSlice";
function ProfileUpdatePage() {
  const [fileState, setFileState] = useState(null);
  const [currentForm, setCurrentForm] = useState(0);
  const { ProfileUpdateFooter } = ProfileUpdateComponents;
  const { Input, Password } = viewUtils;
  const dispatch = useDispatch();
  const { updateUser } = userSliceActions;
  const {toggleIsLoading} = defaultSliceActions
  // @ts-ignore
  const {
    user: {
      userImgName,
      hiPayAccount,
      shopName,
      email,
      password,
      firstname,
      lastname,
      contact,
      location,
    },
  } = useSelector((state: any) => state.userSlice);

  // all functions
  function Back() {
    setCurrentForm((prev) => (prev > 0 ? prev - 1 : prev));
  }
  function Next() {
    setCurrentForm((prev) => (prev < 2 ? prev + 1 : prev));
  }
  async function submitHandler(e: any) {
    e.preventDefault();
    // making sure all field are filled
    if (!contact || !location || !hiPayAccount || !shopName) {
      toast.warning("fill all input field", {
        position: "top-center",
        theme: "dark",
        toastId: "emptyField",
      });
      return;
    }
    // checking the account number provided
    dispatch(toggleIsLoading())
    const accountCheck = await confirmHiPayAccount()
    if (!accountCheck) {
        toast.warning("hiPay account does not exist", {
          position: "top-center",
          theme: "dark",
          toastId: "emptyField",
        });
       dispatch(toggleIsLoading());
      return;
    }
    // uploading file if present
    if (fileState) {
      const img = await uploadImage();
    }
    // @ts-ignore
    dispatch(UserProfileUpdate())
  }

  function updateField(e: any) {
    const { name, value } = e.target;
    // @ts-ignore
    dispatch(updateUser({ name, value, type: "user" }));
  }

  function fileHandler(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.addEventListener("loadend", (e: any) => {
      setFileState(e.target.result);
    });
  }

  async function uploadImage() {
    const { data, error } = await hiShopSupabase.storage
      .from("user")
      .update(userImgName, fileState);
    if (data) return data;
  }
  async function confirmHiPayAccount() {
    const { data, error } = await hiPaySupabase
      .from("user")
      .select()
      .eq("accountNumber", +hiPayAccount)
      .single();
    if (data) return true;
    return false
  }

  // all form parts
  const footerProps = { Next, Back, currentForm, submitHandler };
  const firstPart: {
    name: string;
    label: string;
    type: string;
    value: string;
    Icon: any;
  }[] = [
    {
      name: "firstname",
      value: firstname,
      label: "firstname",
      type: "text",
      Icon: BsFillPersonFill,
    },
    {
      name: "lastname",
      value: lastname,
      label: "lastname",
      type: "text",
      Icon: BsFillPersonLinesFill,
    },
    {
      name: "email",
      value: email,
      label: "email",
      type: "email",
      Icon: MdEmail,
    },
  ];
  const secondPart: {
    name: string;
    label: string;
    type: string;
    value: string;
    Icon: any;
  }[] = [
    {
      name: "hiPayAccount",
      label: "Account number",
      value: hiPayAccount,
      type: "number",
      Icon: FaPiggyBank,
    },
    {
      name: "shopName",
      label: "shop name",
      value: shopName,
      type: "text",
      Icon: BsShopWindow,
    },
    {
      name: "location",
      label: "location",
      value: location,
      type: "text",
      Icon: HiLocationMarker,
    },
  ];
  return (
    <div className="profile_update_page">
      {/* Nav  */}
      <BarHolder />
      {/* Main Content */}
      <form onSubmit={submitHandler} className="profile_update_form">
        {/* Header for intro */}
        <header className="profile_update_header">
          <h3>update your profile</h3>
        </header>
        {/* main form holder */}
        {/* firstPart */}
        {currentForm === 0 && (
          <section className="each_profile_update_part first_part">
            {firstPart.map((item, i) => (
              <Input action={updateField} {...item} key={i * 464} />
            ))}
          </section>
        )}
        {/* second part */}
        {currentForm === 1 && (
          <section className="each_profile_update_part second_part">
            {secondPart.map((item, i) => (
              <Input action={updateField} {...item} key={i * 464} />
            ))}
          </section>
        )}
        {/* Third Part */}
        {currentForm === 2 && (
          <section className="each_profile_update_part third_part">
            <Input
              action={updateField}
              value={contact}
              label="contact"
              Icon={IoMdContacts}
              name="contact"
              type="number"
            />
            <Password
              name="password"
              value={password}
              action={updateField}
              label="password"
            />
            <div id="img_profile_update_input_holder" className="each_input">
              <label htmlFor="userImgName">image</label>
              <input
                name="userImgName"
                type="file"
                accept=".jpeg, .svg, .png, .jpg"
                onChange={fileHandler}
              />
            </div>
          </section>
        )}
        {/* footer holding the btn */}
        <ProfileUpdateFooter {...footerProps} />
      </form>
    </div>
  );
}

export default ProfileUpdatePage;
