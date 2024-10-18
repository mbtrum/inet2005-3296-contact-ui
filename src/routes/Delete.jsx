import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
      <div className="card mt-3">
        { contact && 
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
        </div>}
      </div>
      <p>
        <button className="btn btn-danger">Yes</button> <Link to="/" className="btn btn-outline-secondary">Cancel</Link>
      </p>
    </>
  )
}