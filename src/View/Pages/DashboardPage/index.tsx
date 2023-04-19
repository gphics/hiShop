import { useDispatch, useSelector } from "react-redux";
import {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import viewUtils from "../../Utils";
import { fetchAllProducts, productSliceActions } from "../../../Model/Local/ProductSlice";
import BarHolder from "../../Components/Navigation/BarHolder";
import myProductsComponents from "../../Components/MyProducts";
import CreateModal from "../../Components/MyProducts/CreateModal";
function DashboardPage() {
  const { EachProductList , HeaderComponent} = myProductsComponents;
  const Navigate = useNavigate();
  // @ts-ignore
  const {
    productSlice: { allProducts , filterParam, allProductsCopy},
    userSlice: {
      user: { contact, location, hiPayAccount, shopName },
    },
    defaultSlice:{isLoading}
  } = useSelector((state:any) => state);
  const dispatch = useDispatch();
  const { filterProduct, setFilterDefault } = productSliceActions;
  useEffect(() => {
    if (!contact || !location || !hiPayAccount || !shopName) {
      Navigate("/updateprofile");
    }
  }, []);
  
  // fetching all product and setting filterParam to ""
  useEffect(() => {
    dispatch(setFilterDefault())
    // @ts-ignore
    dispatch(fetchAllProducts())
  }, [])
  // filtering functions
  function searchOnChangeHandler(e: any) {
    const { name, value } = e.target;
    const products = allProductsCopy.filter((item: any) => {
      if( item.name.toLowerCase().includes(value.toLowerCase())) return item
    }
     
    );
    // @ts-ignore
    dispatch(filterProduct({ name, value, type: "allProducts", products }));
  }
   function searchSubmitHandler(e: any) {
     e.preventDefault();  }
   const headerObj = {
     searchOnChangeHandler,
     searchSubmitHandler,
     filterParam,
   };
  return (
    <div className="dashboard_page">
      <BarHolder />
      <main> 
        <HeaderComponent {...headerObj} />
        <section className="products_list">
          {!isLoading && allProducts.length === 0 ? (
            <h1 className="empty_note">Empty !!</h1>
          ) : (
           allProducts && allProducts.map((item: any, index: number) => (
              <EachProductList {...item} key={index * 7373} />
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default DashboardPage;
