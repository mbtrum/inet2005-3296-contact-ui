import { useParams } from 'react-router-dom';

export default function Create(){
  const { id } = useParams();

  return (
    <h1>Update page for { id }</h1>
  )
}