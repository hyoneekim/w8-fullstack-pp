import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/HomePage";
import AddPropertyPage from "./pages/AddPropertyPage";
import Navbar from "./components/Navbar";
import EditPropertyPage from "./pages/EditPropertyPage";
import PropertyPage from "./pages/PropertyPage";
import NotFoundPage from "./pages/NotFoundPage"

const App = () => {

    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-property" element={<AddPropertyPage />} />
              <Route path="/edit-property/:id" element={<EditPropertyPage/>}/>
              <Route path="/properties/:id" element={<PropertyPage/>}/>
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;
