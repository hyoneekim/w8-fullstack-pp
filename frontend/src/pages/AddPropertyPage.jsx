import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPropertyPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [type, setType] = useState('Apartment'); // 초기값 Apartment
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [squareFeet, setSquareFeet] = useState('');
  const [yearBuilt, setYearBuilt] = useState('');
  
  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = user? user.token: null;

  const addProperty = async (newProperty) => {
    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
         },
        body: JSON.stringify(newProperty),
      });

      if (!res.ok) throw new Error('Failed to add a new property');

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const newProperty = {
      title,
      type,
      description,
      price: Number(price),
      location: {
        address,
        city,
        state,
        zipCode,
      },
      squareFeet: Number(squareFeet),
      yearBuilt: Number(yearBuilt),
    };

    const success = await addProperty(newProperty);

    if (success) {
      console.log('submitForm called');
      navigate('/');
    } else {
      alert('Failed to add property');
    }
  };

  return (
    <div className="create">
      <h2>Add a New Property</h2>
      <form onSubmit={submitForm}>
        <div>
          <label>Title:</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>

        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div>
          <label>Address:</label>
          <input value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div>
          <label>City:</label>
          <input value={city} onChange={(e) => setCity(e.target.value)} />
        </div>

        <div>
          <label>State:</label>
          <input value={state} onChange={(e) => setState(e.target.value)} />
        </div>

        <div>
          <label>Zip Code:</label>
          <input value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
        </div>

        <div>
          <label>Square Feet:</label>
          <input type="number" value={squareFeet} onChange={(e) => setSquareFeet(e.target.value)} />
        </div>

        <div>
          <label>Year Built:</label>
          <input type="number" value={yearBuilt} onChange={(e) => setYearBuilt(e.target.value)} />
        </div>

        <button type="submit">Add Property</button>
      </form>
    </div>
  );
};

export default AddPropertyPage;
