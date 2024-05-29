
import './App.css';
import Nav from './Nav';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Footer from './Footer/Footer';
import SignUp from './components/Retailer/SignUp';
import Login from './components/Login/Login';
import AdminLogin from './components/AdminLogin/AdminLogin';
import AdminRegion from './components/AdminLogin/AdminRegion/AdminRegion';
import AdminCategories from './components/AdminLogin/AdminCategories/AdminCategories';
import AdminProduct from './components/AdminLogin/AdminProduct/AdminProduct';
import ShowRegion from './components/AdminLogin/AdminRegion/ShowRegion';
import ViewCategory from './components/AdminLogin/AdminCategories/ViewCategory';
import ViewProduct from './components/AdminLogin/AdminProduct/ViewProduct';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Nav />
    <Routes>
      {/* <Route path="/" element={<h1>Product Component</h1>}/> */}
      <Route path="/add" element={<h1>Add Product Component</h1>}/>
      <Route path="/update" element={<h1>Update Product Component</h1>}/>
      <Route path="/logout" element={<h1>Logout  Component</h1>}/>
      <Route path="/profile" element={<h1>Profile Component</h1>}/>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/adminlogin" element={<AdminLogin />}/>
      <Route path="/adminregion" element={<AdminRegion />}/>
      <Route path="/admincategories" element={<AdminCategories />}/>
      <Route path="/adminproduct" element={<AdminProduct />}/>
      <Route path="/showregion" element={<ShowRegion />}/>
      <Route path="/viewcategory" element={<ViewCategory />}/>
      <Route path="/viewproduct" element={<ViewProduct />}/>
     
     
     
    </Routes>
    
     </BrowserRouter>
    
     <Footer />
    </div>
  );
}

export default App;
