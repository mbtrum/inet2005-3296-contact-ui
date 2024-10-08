import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
  const [contacts, setContacts] = useState([]); // initialize as empty array

  useEffect(() => {
    // Fetch data from API
    async function fetchData() {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + character); 

      if(response.ok){
        const data = await response.json();
        if (!ignore) { 
          setBio(data);
        }
      } else {
        setBio(null);
      }
    }

    let ignore = false;
    fetchData();
    return () => {
       ignore = true;
    }
  }, [character]);

  return (
    <main>
      <h1>Home page</h1>
      <Link to="/create">Add New Contact</Link>
      <p>Display all contacts</p>
    </main>
  )
}