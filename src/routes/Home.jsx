import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Card from '../ui/Card';

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
          <Card contact={contact} apiHost={apiHost} showLinks={true} />
        )) :
        <p>No contacts.</p>
      }
    </>
  )
}