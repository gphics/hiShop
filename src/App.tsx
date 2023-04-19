import { BrowserRouter, Routes, Route } from "react-router-dom";
import viewUtils from "./View/Utils";
import DashboardPage from "./View/Pages/DashboardPage";
import HomePage from "./View/Pages/HomePage";
import AuthenticationPage from "./View/Pages/AuthenticationPages";
import ErrorPage from "./View/Pages/ErrorPage";
import SecondaryNav from "./View/Components/Navigation/SecondaryNav";
import PrimaryNav from "./View/Components/Navigation/PrimaryNav";
import ProfileUpdatePage from "./View/Pages/ProfileUpdatePage";
import CartComponent from "./View/Components/Cart/CartComponent";
import ProfilePage from "./View/Pages/ProfilePage/ProfilePage";
import Transactions from "./View/Pages/TransactionsPage/Transactions";
import MyProductsPage from "./View/Pages/MyProducts/MyProductsPage";
import SharedLayout from "./View/Utils/SharedLayout";
import SingleProduct from "./View/Pages/SingleProduct/SingleProduct";
function App() {
  const { HomeSharedLayout, DashboardSharedLayout } = viewUtils;
  const { LoginPage, RegisterPage } = AuthenticationPage;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* MAIN APPLICATION ROUTE */}
          <Route
            path="/"
            element={
              <DashboardSharedLayout
                Nav={PrimaryNav}
                containerClass="main_app_container"
              />
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="updateprofile" element={<ProfileUpdatePage />} />
            <Route path="cart" element={<CartComponent />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="myproducts" element={<MyProductsPage />} />
            <Route path="singleproduct" element={<SharedLayout/>} >
            <Route path=":id" element={<SingleProduct/>} />
            </Route>
          </Route>
          {/* LANDING && AUTHENTICATION ROUTE */}
          <Route
            path="home"
            element={
              <HomeSharedLayout
                containerClass="home_page_holder"
                Nav={SecondaryNav}
              />
            }
          >
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          {/* ERROR PAGE */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
