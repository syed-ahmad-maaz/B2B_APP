import "./App.css";
import Nav from "./Nav";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from "./Footer/Footer";
import SignUp from "./components/RetailerSignup/SignUp";
import Login from "./components/Admin/Login/Login";
import AddedRegion from "./components/Admin/Regions/AddRegion";
import AddedCategories from "./components/Admin/Categories/AddCategories";
import AddedProduct from "./components/Admin/Products/AddProduct";
import ViewAllRegions from "./components/Admin/Regions/ViewRegion";
import ViewListOfCategory from "./components/Admin/Categories/ViewCategory";
import ViewListOfProduct from "./components/Admin/Products/ViewProduct";
import ViewOrder from "./components/Admin/Orders/ViewOrder";
import AddUpcomingOffers from "./components/Admin/UpcomingOffers/AddUpcomingOffers";
import ViewUpcomingOffers from "./components/Admin/UpcomingOffers/ViewOffers";
import ViewRetailerList from "./components/Admin/Retailer/ViewRetailers";
import GetOrderByDate from "./components/Admin/Charts/GetOrderByDate";
import GetOrderByCategory from "./components/Admin/Charts/GetOrderByCategory";
import GetOrderByRegion from "./components/Admin/Charts/GetOrderByRegion";
import GetOrderByRetailer from "./components/Admin/Charts/GetOrderByRetailer";
import UpdateRegion from "./components/Admin/Regions/UpdateRegion";
import UpdateCategory from "./components/Admin/Categories/UpdateCategory";
import { UpdateProduct } from "./components/Admin/Products/UpdateProduct";
import { UpdateOffers } from "./components/Admin/UpcomingOffers/UpdateOffers";
import ConfirmEmail from "./components/Admin/Login/ConfirmEmail";
import Otp from "./components/Admin/Login/Otp";
import Home from "./components/Admin/SideBar/Home";
import CreateNewDistributor from "./assets/Distributor/SignUp";
import Start from "./components/Admin/SideBar/Start";
import DistributorLogin from "./assets/Distributor/Login";
import DistributorHome from "./assets/Distributor/Home";
import CreateNewBooker from "./components/Admin/Booker/Booker";
import ViewAllRetailerList from "./assets/Distributor/Retailers/Retailers";
import CreateNewDispatch from "./components/Admin/Dispatch/Dispatch";
import DistributorFooter from "./Footer/Footer";
import ViewAllDistributor from "./components/Admin/Distributor/ViewDistributor";
import { ViewallDispatchers } from "./components/Admin/Dispatch/ViewDispatchers";
import { UpdateDispatchers } from "./components/Admin/Dispatch/UpdateDispatch";
// import Navbar from "./assets/Distributor/Sidebar/Navbar";
import Dashboard from "./Footer/abc";
import { OrdersBySpecificRetailers } from "./assets/Distributor/RetailersOrder";
import { AddDispatch } from "./assets/Distributor/Dispatch/Dispatch";
import { ViewDispatchers } from "./assets/Distributor/Dispatch/ViewDispatch";
import { UpdateDispatchByDistributor } from "./assets/Distributor/Dispatch/UpdateDispatch";
import { ViewRetailerforDistributor } from "./assets/Distributor/Retailers/ViewRetailer";
import { ViewBooker } from "./components/Admin/Booker/ViewBooker";
import { ErrorPage } from "./components/Admin/404";

const App = () => {
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  const distributorIsLoggedIn = window.localStorage.getItem(
    "DistributorLoggedIn"
  );

  return (
    <div>
      <BrowserRouter>
        <Nav />

        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn === "true" ? (
                <Home />
              ) : distributorIsLoggedIn === "true" ? (
                <Navigate to="/distributor/home" replace={true} />
              ) : (
                <Start />
              )
            }
          />

          <Route path="/adminlogin" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/adminlogin" element={<Login />} />
          <Route path="/addregion" element={<AddedRegion />} />
          <Route path="/addedcategories" element={<AddedCategories />} />
          <Route path="/addedproduct" element={<AddedProduct />} />
          <Route path="/viewallregions" element={<ViewAllRegions />} />
          <Route path="/viewlistofcategory" element={<ViewListOfCategory />} />
          <Route path="/viewlistofproduct" element={<ViewListOfProduct />} />
          <Route path="/viewOrder" element={<ViewOrder />} />
          <Route path="/upcomingoffers" element={<AddUpcomingOffers />} />
          <Route path="/viewupcomingoffers" element={<ViewUpcomingOffers />} />
          <Route path="/orderbydatechart" element={<GetOrderByDate />} />
          <Route path="/orderbydatecategory" element={<GetOrderByCategory />} />
          <Route path="/orderbyregion" element={<GetOrderByRegion />} />
          <Route path="/orderbyretailer" element={<GetOrderByRetailer />} />
          <Route path="/retailerlist" element={<ViewRetailerList />} />
          <Route path="/updateregion/:id" element={<UpdateRegion />} />
          <Route path="/updatecategory/:id" element={<UpdateCategory />} />
          <Route path="/updateproduct/:id" element={<UpdateProduct />} />
          <Route path="/updateoffers/:id" element={<UpdateOffers />} />
          <Route path="/confirmemail" element={<ConfirmEmail />} />
          <Route path="/otpconfirmation" element={<Otp />} />
          <Route path="/createdistributor" element={<CreateNewDistributor />} />
          <Route path="/distributorlogin" element={<DistributorLogin />} />
          <Route path="/distributor/home" element={<DistributorHome />} />
          <Route path="/createbooker" element={<CreateNewBooker />} />
          <Route path="/viewretailerlist" element={<ViewAllRetailerList />} />
          <Route path="/createdispatch" element={<CreateNewDispatch />} />
          <Route path="/viewdistributor" element={<ViewAllDistributor />} />
          <Route path="/listofdispatchers" element={<ViewallDispatchers />} />
          <Route path="/updatedispatch/:id" element={<UpdateDispatchers />} />
          <Route
            path="/updatedispatchbydistributor/:id"
            element={<UpdateDispatchByDistributor />}
          />
          <Route path="/dispatcher" element={<AddDispatch />} />
          <Route path="/listofdispatch" element={<ViewDispatchers />} />
          <Route path="/allbookers" element={<ViewBooker />} />
          <Route path="*" element={<ErrorPage />} />
          <Route
            path="/viewretailerlistfordistributor"
            element={<ViewRetailerforDistributor />}
          />

          <Route
            path="/retailer/order"
            element={<OrdersBySpecificRetailers />}
          />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
};

export default App;
