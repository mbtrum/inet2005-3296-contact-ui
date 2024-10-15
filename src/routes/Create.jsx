import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

export default function Create(){
  // API URL
  const apiUrl = "http://localhost:3000/api/contacts/create";

  // form state variable
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [imageFile, setImageFile] = useState(null);

  // Add new contact to API
  function addContact(e){
    e.preventDefault();
    
    // Create form
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('image', imageFile);
    
    // Post data to API
    async function postData() {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      }); 

      if(response.ok){
        window.location.href = '/';       
      } else { 
        // to-do: handle error        
      }
    }

    postData();
  }

  return (
    <>
      <h1>Add new contact</h1>

      <form onSubmit={addContact} method="post" encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input required type="text" name="firstName" className="form-control bg-light" value={firstName} onChange={e => setFirstName(e.target.value)}  />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input required type="text" name="lastName" className="form-control bg-light" value={lastName} onChange={e => setLastName(e.target.value)}  />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input type="text" name="phone" className="form-control bg-light" value={phone} onChange={e => setPhone(e.target.value)}  />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input required type="text" name="email" className="form-control bg-light" value={email} onChange={e => setEmail(e.target.value)}  />
          </div>
          <div className="mb-3">
            <label className="form-label">Image</label>
            <input type="file" name="image" className="form-control bg-light" onChange={e => setImageFile(e.target.files[0])} />
          </div>   

          <button type="submit" className="btn btn-primary">Add</button>
          <Link to="/" className="btn btn-outline-secondary ms-3">Cancel</Link>
        </form>
      </>
  )
}