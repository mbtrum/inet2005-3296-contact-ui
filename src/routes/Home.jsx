import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
  const [contacts, setContacts] = useState([]); // initialize as empty array
  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = apiHost + '/api/contacts/all';

  useEffect(() => {
    // Fetch data from API
    async function fetchData() {
      const response = await fetch(apiUrl); 

      if(response.ok){
        const data = await response.json();
        if (!ignore) { 
          setContacts(data);
        }
      } else {
        setContacts(null);
      }
    }

    let ignore = false;
    fetchData();
    return () => {
       ignore = true;
    }
  }, []); // run only once

  return (
    <>
      <h1>My Contacts</h1>
      <Link to="/create" className="btn btn-outline-secondary">Add New Contact</Link>
      {
        contacts.length > 0 ?
        contacts.map(contact => (
          <div className="card mt-3">
            <div className="card-body">
              <div className="d-flex align-items-center position-relative">
                <img src={`${apiHost}/images/${contact.filename}`} className="thumbnail" />

                <div className="contact-info">
                  <h5 className="card-title">{ contact.firstName + ' ' + contact.lastName }</h5>
                  <p className="card-text">
                    { contact.phone }<br />{ contact.email }
                  </p>                  
                </div>
                
                <div className="position-absolute top-0 end-0">
                  <Link to={`/update/${contact.id}`} className="btn btn-light btn-sm"><i className="bi bi-pencil"></i></Link>&nbsp;
                  <Link to={`/delete/${contact.id}`} className="btn btn-light btn-sm"><i className="bi bi-trash"></i></Link>
                </div>  
              </div>                         
            </div>
          </div>
        )) :
        <p>No contacts.</p>
      }
    </>
  )
}