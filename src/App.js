import "./App.css";
import "../src/components/dR.css";
import Login from "./components/login";
import AdminDashbord from "./Dashbord/adminDashbord";
import Register from "./components/register";
import FoodWebsite from "./components/foodWebsite";
import AppBarComponent from "../src/components/appBarComponent";
import Branches from "./components/Branches";
import Reviews from "./components/Reviews";
import About from "./components/About";
import Contact from "./components/contact";
import SearchContent from "./components/searchContent";
import MealDesc from "./components/MealDesc";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";

import { Route, Routes } from "react-router-dom";

import { MyContextProvider } from "./components/MainDataContext";
import { DataContextProvider } from "./firebase/dataBaseContext";

function App() {
  return (
    <MyContextProvider>
      <DataContextProvider>
        <div className="App">
          <AppBarComponent />
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/AdminDashbord" element={<AdminDashbord />} />
            <Route path="/" element={<FoodWebsite />} />
            <Route path="/Branches" element={<Branches />} />
            <Route path="/Reviews" element={<Reviews />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/SearchContent" element={<SearchContent />} />
            <Route path="/dish/:id" element={<MealDesc />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </DataContextProvider>
    </MyContextProvider>
  );
}

export default App;
