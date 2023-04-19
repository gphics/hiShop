import React, {useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Navigate } from "react-router-dom";
import BarHolder from '../Components/Navigation/BarHolder';
// @ts-ignore
function DashboardSharedLayout({ containerClass, Nav }) {
  // @ts-ignore
  const {defaultSlice: { isLoading },userSlice: { isAuthenticated },
  } = useSelector((state) => state);
  if(!isAuthenticated) return <Navigate to="/home" />
  return (
    <div className={containerClass && containerClass}>
      <ToastContainer />
      {isLoading && <Loading />}

      {Nav && <Nav />}
      <Outlet />
    </div>
  );
}

export default DashboardSharedLayout