import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const PropertyPage = () => {
    const navigate = useNavigate();
  const {id} = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchProperty = async() =>{
      try{
      const res = await fetch(`/api/properties/${id}`)
      if(!res.ok){
        throw new Error("failed to fetch one property");
      }
      const data = await res.json();
      setProperty(data);

      }catch(err){
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  },[id])

  const deleteProperty = async(id) =>{
    try{
      const res = await fetch(`/api/properties/${id}`,{
        method : "DELETE"
      });
      if(!res.ok){
        throw new Error("Failed to delete property")
      }
      navigate("/");

    }catch(err){
      console.error(err)
    }

  }
  return (
    <div>{error &&<div>{error}</div>}
      {loading &&<div>Loading...</div>}
      <h2>{property?.title}</h2>
      <p>Type: {property?.type}</p>
      <p>Description: {property?.description}</p>
      <p>Price: {property?.price}</p>
      <p>Address: {property?.location.address}</p>
      <p>City: {property?.location.city}</p>
      <p>State: {property?.location.state}</p>
      <p>Zip code: {property?.location.zipCode}</p>
      <p>Size: {property?.squareFeet}</p>
      <p>Year built: {property?.yearBuilt}</p>
      <button onClick={()=>{deleteProperty(property._id)}}>Delete</button>
      <button onClick={()=> navigate(`/edit-property/${property._id}`)}>Edit</button>
    </div>
  )
}

export default PropertyPage