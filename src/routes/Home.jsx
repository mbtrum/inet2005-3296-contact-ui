import { Link } from 'react-router-dom';

export default function Create(){
  return (
    <main>
      <h1>Home page</h1>
      <Link to="/create">Add New Contact</Link>
      <p>Display all contacts</p>
    </main>
  )
}