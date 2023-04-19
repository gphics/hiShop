import React from "react";
import Hero from "../../../assets/Static/JPEG/LoginHero.jpg";
import { useDispatch, useSelector } from "react-redux";
import viewUtils from "../../Utils";
import { userSliceActions } from "../../../Model/Local/UserSlice";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { LoginUser } from "../../../Model/Local/UserSlice";
import { toast } from "react-toastify";
function LoginPage() {
  // @ts-ignore
  const { login } = useSelector((state) => state.userSlice);
  const { Password, Input } = viewUtils;
  const { updateUser } = userSliceActions;
  const dispatch = useDispatch();

  function onChangeHandler(e: any): void {
    const { name, value } = e?.target;
    const type: string = "login";
    // @ts-ignore
    dispatch(updateUser({ name, value, type }));
  }
  function handleSubmit(e: any) {
    e.preventDefault();
    // checking for unpopulated field
    if (!login.email) {
      toast.warning("input field must be populated", {
        position: "top-center",
        theme: "dark",
        toastId: "loginToast",
      });
      return;
    }
    if (login?.password.length < 8) {
      toast.warning("password length must be 8 or more", {
        position: "top-center",
        theme: "dark",
        toastId: "loginToast",
      });
      return;
    }
    //@ts-ignore
    dispatch(LoginUser())
  }
  return (
    <div className="login_page">
      {/* Hero section */}
      <section className="login_hero">
        <img src={Hero} alt="login_hero" />
      </section>
      {/* form section */}
      <form onSubmit={handleSubmit} className="login_form">
        <header className="login_form_header">
          <h2> Login </h2>
        </header>

        <main className="main_login_form">
          <Input
            Icon={MdEmail}
            action={onChangeHandler}
            type="email"
            name="email"
            label="email"
            value={login.email}
          />

          <Password
            action={onChangeHandler}
            name="password"
            label="password"
            value={login.password}
          />
        </main>
        <footer className="login_form_footer">
          <button onClick={handleSubmit} type="submit">
            Login
          </button>
          <h5>
            {" "}
            Not yet a member ? <Link to="/home/register">Register</Link>{" "}
          </h5>
        </footer>
      </form>
    </div>
  );
}

export default LoginPage;
