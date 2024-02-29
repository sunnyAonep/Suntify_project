import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useContext, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Navbar from "./components/Navbar/Navbar";
import ShowPlaylist from "./components/Profile/ShowPlaylist";
import Artist from "./pages/Artist";
import { userContext } from "./context/UserProvider";
import Payment from "./pages/Payment";
import Player from "./pages/Music-Player";
import ForgotPassWord from "./components/Auth/ForgotPassWord";
import { clintID } from "./config/API";
function App() {
  const [count, setCount] = useState(0);
  const { user, userIn, logOut } = useContext(userContext);
  
  const initialOptions = {
    // clientId: process.env.CLIENTID, // Corrected
    clientId: clintID,
    currency: "USD",
    intent: "capture",
   };

  return (
    <>
    <PayPalScriptProvider options={initialOptions}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {!userIn ? (
            <>
              <Route path="/Home" element={<Home />} />
              <Route path="/" element={<Auth />} />
              <Route path="/Forgot" element={<ForgotPassWord />} />
            </>
          ) : (
            <>
              <Route path="/pay" element={<Payment/>}/>
              <Route path="/" element={<Home />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Search" element={<Search />} />
              <Route path="/playlist/:id" element={<ShowPlaylist />} />
              <Route path="/Artist" element={<Artist />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
      <Player/>
      </PayPalScriptProvider>
    </>
  );
}

export default App;
