import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import viewUtils from "../../Utils";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { userSliceActions } from "../../../Model/Local/UserSlice";
import { BsFillPersonFill, BsFillPersonLinesFill } from "react-icons/bs";
import { toast} from "react-toastify";
import { defaultSliceActions } from "../../../Model/Local/DefaultSlice";
import hiShopSupabase from "../../../Model/Remote/hiShop";
import { RegisterUser } from "../../../Model/Local/UserSlice";


function RegForm() {
  const { Input, Password, ImageUpload } = viewUtils;
  const {toggleIsLoading}  = defaultSliceActions
  // @ts-ignore
  const { user } = useSelector((state) => state.userSlice);

  const { updateUser } = userSliceActions;
  const [fileState, setFilstate] = useState({name:"", main:[]})
  const dispatch = useDispatch();
  interface inputType {
    name: string;
    label: string;
    type: string;
    Icon: any;
    value: string | number;
  }
  const regFormObj: inputType[] = [
    {
      name: "firstname",
      type: "text",
      label: "firstname",
      Icon: BsFillPersonFill,
      value: user.firstname,
    },
    {
      name: "lastname",
      type: "text",
      label: "lastname",
      Icon: BsFillPersonLinesFill,
      value: user.lastname,
    },
    {
      name: "email",
      type: "email",
      label: "email",
      Icon: MdEmail,
      value: user.email,
    },
  ];
  async function submitHandler(e: any) {
    e.preventDefault();
    // checking if all field are populated
    if (!user.email || !user.firstname || !user.lastname || !fileState?.name) {
      toast.warning("fill all field input", {
        position: "top-center",
        theme:"dark",
        toastId:"regToast"
      })
      return;
    }
    if (user?.password.length < 8) {
      toast.warning("password length must 8 or more", {
        position: "top-center",
        theme: "dark",
        toastId: "regToast",
      });
      return;
    }
    // checking if user exist
    dispatch(toggleIsLoading())
    const { data, error } = await hiShopSupabase.from("user").select().eq("email", user.email).single()
    if (data) {
      toast.warning("user already exist", {
        position: "top-center",
        theme: "dark",
        toastId: "regToast",
      });
      dispatch(toggleIsLoading());
      return;
    }
    const imageUpload = await uploadImage();
    // @ts-ignore
    if(imageUpload) dispatch(RegisterUser())
  }
  function onChangeHandler(e: any): void {
    const { name, value } = e.target;
    const type = "user";
    // @ts-ignore
    dispatch(updateUser({ type, name, value }));
  }
  function fileChangeHnadler(e: any): void{
    const file = e.target.files[0]
    const { name } = file
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.addEventListener("loadend", (e) => {
      const main = e.target?.result
      const obj: { name: string, main: any } = { name, main }
      setFilstate(obj)
    })
  }
  async function uploadImage(): Promise<any> {
    const { name, main } = fileState
    const date = new Date().getMilliseconds()
    // @ts-ignore
    const { data, error } = await hiShopSupabase.storage.from("user").upload("folder/" + date + name, main)
    // @ts-ignore
    const { path } = data
    const obj = { value: path, type: "user", name: "userImgName" }
    // @ts-ignore
    dispatch(updateUser(obj))
    return path
  }
  return (
    <div className="reg_form">
      <header className="reg_form_header">
        <h2>Register</h2>
      </header>
      <form onSubmit={submitHandler} className="main_reg_form">
        <main>
          {regFormObj.map((item, i) => (
            <Input action={onChangeHandler} {...item} key={i} />
          ))}
          <Password
            label="password"
            name="password"
            action={onChangeHandler}
            value={user.password}
          />
          <ImageUpload name="userImgName" customId="reg_image_upload" action={fileChangeHnadler} label="user image" />
        </main>
        <footer className="reg_form_footer">
          <button type="submit" onClick={submitHandler}>
            {" "}
            Register
          </button>
          <h5>
            Already a member ? <Link to="/home/login">Login</Link>
          </h5>
        </footer>
      </form>
    </div>
  );
}

export default RegForm;
