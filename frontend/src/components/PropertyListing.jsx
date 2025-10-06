import {Link} from 'react-router-dom';

const PropertyListing = ({property}) => {
  //console.log(property._id);
  return (
    <div className="job-preview">

      
      <Link to ={`/properties/${property._id}`}>
      <h2>{property.title}</h2>
      </Link>
      <p>{property.type}</p>
      <p>{property.price}</p>
      <p>{property.location.city}</p>
    </div>
  );
};

export default PropertyListing;
