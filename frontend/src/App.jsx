import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// pages & components
import Home from "./pages/HomePage";
import AddPropertyPage from "./pages/AddPropertyPage";
import Navbar from "./components/Navbar";
import EditPropertyPage from "./pages/EditPropertyPage";
import PropertyPage from "./pages/PropertyPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const [isAuth, setIsAuth]= useState(()=>{
    const user = JSON.parse(sessionStorage.getItem("user"));
    return user && user.token? true : false;
  });

    return (
      <div className="App">
        <BrowserRouter>
          <Navbar isAuth ={isAuth} setIsAuth={setIsAuth}/>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-property" element={isAuth? <AddPropertyPage /> : <Navigate to ="/sign-up"/>} />
              <Route path="/edit-property/:id" element={isAuth? <EditPropertyPage/>: <Navigate to ="/sign-up"/>}/>
              <Route path="/properties/:id" element={<PropertyPage isAuth={isAuth}/>}/>
              <Route path="/sign-up" element={isAuth? <Navigate to="/"/>:<SignupPage setIsAuth={setIsAuth}/>}/>
              <Route path="/log-in" element={isAuth? <Navigate to="/"/>:<LoginPage setIsAuth={setIsAuth}/>}/>
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;
