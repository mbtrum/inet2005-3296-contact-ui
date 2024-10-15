import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
  const [contacts, setContacts] = useState([]); // initialize as empty array

  useEffect(() => {
    // Fetch data from API
    async function fetchData() {
      const response = await fetch('http://localhost:3000/api/contacts/all'); 

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
          <div>
            { contact.firstName + ' ' + contact.lastName } <Link to={`/update/${contact.id}`}>update</Link> <Link to={`/delete/${contact.id}`}>delete</Link>
          </div>
        )) :
        <p>No contacts.</p>
      }
    </>
  )
}