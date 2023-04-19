import React, {useEffect} from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
// @ts-ignore
function HomeSharedLayout({ containerClass, Nav }) {
  const Navigate = useNavigate()
  // @ts-ignore
  const { defaultSlice: { isLoading }, userSlice: { isAuthenticated } } = useSelector((state) => state);
  
  useEffect(() => {
 
    if (isAuthenticated) {
      Navigate("/")
      return;
    }
    
  },[isAuthenticated])
  
  return (
    <div className={containerClass && containerClass}>
      <ToastContainer />
      {isLoading && <Loading />}
      {Nav && <Nav />}
      <Outlet />
    </div>
  );
}

export default HomeSharedLayout;
