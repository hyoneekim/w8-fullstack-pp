import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPropertyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [type, setType] = useState('Apartment');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [squareFeet, setSquareFeet] = useState('');
  const [yearBuilt, setYearBuilt] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = user? user.token: null;

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${id}`);
        if (!res.ok) throw new Error("Couldn't fetch the property");

        const data = await res.json();

        setTitle(data.title);
        setType(data.type);
        setDescription(data.description);
        setPrice(data.price);
        setAddress(data.location.address);
        setCity(data.location.city);
        setState(data.location.state);
        setZipCode(data.location.zipCode);
        setSquareFeet(data.squareFeet);
        setYearBuilt(data.yearBuilt);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const editedProperty = {
      title,
      type,
      description,
      price: Number(price),
      location: {
        address,
        city,
        state,
        zipCode
      },
      squareFeet: Number(squareFeet),
      yearBuilt: Number(yearBuilt)
    };

    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',Authorization: `Bearer ${token}` },
        body: JSON.stringify(editedProperty)
      });

      if (!res.ok) throw new Error("Couldn't update the property");

      navigate(`/properties/${id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to edit property');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div>
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Commercial">Commercial</option>
        </select>
      </div>

      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div>
        <label>Price</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>

      <div>
        <label>Address</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>

      <div>
        <label>City</label>
        <input value={city} onChange={(e) => setCity(e.target.value)} />
      </div>

      <div>
        <label>State</label>
        <input value={state} onChange={(e) => setState(e.target.value)} />
      </div>

      <div>
        <label>Zip Code</label>
        <input value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
      </div>

      <div>
        <label>Square Feet</label>
        <input type="number" value={squareFeet} onChange={(e) => setSquareFeet(e.target.value)} />
      </div>

      <div>
        <label>Year Built</label>
        <input type="number" value={yearBuilt} onChange={(e) => setYearBuilt(e.target.value)} />
      </div>

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditPropertyPage;
