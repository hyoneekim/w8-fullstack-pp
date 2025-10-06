import { useEffect, useState } from "react";
import PropertyListings from "../components/PropertyListings";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const dummyData = {
      id:1,
     title: "Modern Apartment in Downtown",
    type: "Apartment",
    description: "A bright, modern 2-bedroom apartment located in the heart of the city. Close to cafes, metro, and parks.",
    price: 320000,
    location:{
    address: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105"},
    squareFeet: 950,
    yearBuilt: 2015
  }
  
  const [properties, setProperties] =useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(()=>{
  
      const fetchProperties = async()=>{
        try{
          const res = await fetch("/api/properties");
          if(!res.ok){
            setError("coudln't fetch properties");
          }
          const data = await res.json();
          setIsLoading(false);
          setProperties(data);
          setError(null);

        }catch(err){
          setIsLoading(false);
      setError(err.message);
    }
      }
      fetchProperties();
  },[])
  return (
    <div className="home">
      {error &&<div>{error}</div>}
      {isLoading &&<div>Loading...</div>}
      <PropertyListings properties={properties} />
    </div>
  );
};

export default Home;
