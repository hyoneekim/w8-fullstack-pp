# 🧾 Self Assessment – Property CRUD Implementation  
*(AddPropertyPage.jsx & EditPropertyPage.jsx)*

## 🏗️ Overview
This project focused on implementing **Add Property** and **Edit Property** pages that interact with a backend API.  
The goal was to manage form inputs, handle API communication, and navigate properly after successful actions.

---

## 🧩 AddPropertyPage.jsx

### ✅ What Went Well

**1. Clear use of controlled components**

Each input field uses `useState`, which ensures a predictable and fully controlled form.

```jsx
const [title, setTitle] = useState('');
const [type, setType] = useState('Apartment'); // default value
...
<input value={title} onChange={(e) => setTitle(e.target.value)} />
```
✅ Keeps form state consistent and easy to debug.
✅ The `type` dropdown also properly initializes with `"Apartment"` as default.

## 2. Good async form submission with token authentication ##
```jsx
const addProperty = async (newProperty) => {
  const res = await fetch('/api/properties', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(newProperty),
  });
  if (!res.ok) throw new Error('Failed to add a new property');
};
```
✅ Proper use of `async/await`
✅ Includes JWT token for authentication
✅ Error handling via `try/catch`

## 3. Smooth navigation flow after submission ##
```jsx
if (success) {
  console.log('submitForm called');
  navigate('/');
}
```
✅ Provides a clear success path and immediate navigation.

### 💡 What Could Be Improved

## 1. Repeated form fields can be refactored ##

You can create a reusable component for repeated inputs:
```jsx
const InputField = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label>{label}</label>
    <input type={type} value={value} onChange={onChange} />
  </div>
);
```

Usage example:

```jsx
<InputField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
```

This makes the code shorter and easier to maintain.

## 2. Add validation for numeric fields ##

Prevent invalid or empty values:

```jsx
if (price <= 0 || squareFeet <= 0) {
  alert("Price and square feet must be positive numbers.");
  return;
}
```

## 3. Improve user feedback ##

Right now, it only uses:

```jsx
alert("Failed to add property");
```


You could use a toast or message banner to give a better UX, e.g.:

```jsx
setStatus("Property added successfully!");
```

🔢 Score: 8.5 / 10

Solid implementation with proper logic and clean state handling.
Can be improved with code reusability and better UX feedback.


---


## 🛠️ EditPropertyPage.jsx

### ✅ What Went Well

**1. Correct use of `useParams` and data fetching**

```jsx
useEffect(() => {
  const fetchProperty = async () => {
    const res = await fetch(`/api/properties/${id}`);
    const data = await res.json();

    setTitle(data.title);
    setType(data.type);
    setDescription(data.description);
    setAddress(data.location.address);
  };
  fetchProperty();
}, [id]);
```

✅ Properly fetches data by id
✅ Updates all related states once data is retrieved
✅ Keeps component reactive with useEffect dependencies

2. Controlled components in sync with fetched data

```jsx
<select value={type} onChange={(e) => setType(e.target.value)}>
  <option value="Apartment">Apartment</option>
  <option value="House">House</option>
  <option value="Commercial">Commercial</option>
</select>
```


✅ All fields reflect the backend data correctly and remain editable.

3. PUT request structure and authentication

```jsx
const res = await fetch(`/api/properties/${id}`, {
  method: 'PUT',
  headers: { 
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify(editedProperty),
});
```

✅ Maintains secure API calls with proper authorization headers.
✅ Good error handling and redirection logic after success.

💡 What Could Be Improved

1. Loading UX

Currently:

```jsx
if (loading) return <p>Loading...</p>;
```

Better approach:

```jsx
if (loading) return <div className="spinner">Loading property data...</div>;
```

Adds a more professional look and improves user perception.

2. Better backend error handling

Right now:
```jsx

alert('Failed to edit property');
```

Improved version:

```jsx
const data = await res.json();
alert(data.message || 'Update failed');

```

This gives the user more meaningful feedback based on the server’s response.

3. Extract reusable logic

Fetching and updating property logic can be abstracted into a custom hook:

```jsx
const useProperty = (id) => {
  const [property, setProperty] = useState(null);
  useEffect(() => { ...fetch logic... }, [id]);
  return property;
};
```

Then both AddPropertyPage and EditPropertyPage can reuse it.

🔢 Score: 9 / 10

Excellent functionality and solid code quality.
Just needs some polish in UX and modularity.

🧠 Overall Reflection

This task strengthened my understanding of:

Controlled components and form handling

Asynchronous data fetching with hooks

Authorization headers and backend communication

React Router navigation patterns

🚀 What I Learned

Keeping form state fully controlled avoids many unexpected bugs.

Consistent naming (address, city, zipCode) across frontend and backend is crucial.

Handling async side effects in useEffect properly ensures data integrity.

🧭 Future Improvements

Add form validation and live input hints

Extract repetitive fields into reusable components

Improve loading and error UI

Add unit tests for form submission

🏁 Final Score: 8.8 / 10
Category	Score	Comment
Functionality	9.0	CRUD features all work smoothly
Code Clarity	9.0	Readable and consistent naming
UX & Validation	8.0	Could enhance feedback and validation
Reusability	8.0	Shared components/hooks can reduce duplication

Overall	8.8 / 10	Strong, reliable implementation with good structure