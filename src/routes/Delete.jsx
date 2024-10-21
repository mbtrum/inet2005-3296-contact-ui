import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Card from '../ui/Card';

export default function Delete(){
  const { id } = useParams();

  // Store the result from API
  const [contact, setContact] = useState(null);

  const apiHost = import.meta.env.VITE_API_HOST;
  const getUrl = apiHost + '/api/contacts/get/' + id;
  // to-do: const deleteUrl

  // GET the contact to delete
  useEffect(() => {
   // Fetch data from API
   async function fetchContact() {     
     const response = await fetch(getUrl);
     if(response.ok){ 
       const data = await response.json();
       if (!ignore) {
         setContact(data);
       }
     } else {
       setContact(null);
     }
   }

   let ignore = false;
   fetchContact();
   return () => {
      ignore = true;
   }
 }, []);

  return (
    <>
      <h1>Remove Contact</h1>
      <h2>Are you sure you want to remove this contact?</h2>

      { contact && <Card contact={contact} apiHost={apiHost} showLinks={false} />}
      
      <p>
        <button className="btn btn-danger">Yes</button> <Link to="/" className="btn btn-outline-secondary">Cancel</Link>
      </p>
    </>
  )
}