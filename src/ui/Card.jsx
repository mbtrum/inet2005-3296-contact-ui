import { Link } from 'react-router-dom';

export default function Card(props) {
  return (
    <div className="card mt-2 mb-2">
      <div className="card-body">
        <div className="d-flex align-items-center position-relative">
          <img src={`${props.apiHost}/images/${props.contact.filename}`} className="thumbnail" />

          <div className="contact-info">
            <h5 className="card-title">{ props.contact.firstName + ' ' + props.contact.lastName }</h5>
            <p className="card-text">
              { props.contact.phone }<br />{ props.contact.email }
            </p>                  
          </div>
          
          {props.showLinks && 
            <div className="position-absolute top-0 end-0">
              <Link to={`/update/${props.contact.id}`} className="btn btn-light btn-sm"><i className="bi bi-pencil"></i></Link>&nbsp;
              <Link to={`/delete/${props.contact.id}`} className="btn btn-light btn-sm"><i className="bi bi-trash"></i></Link>
            </div>  
          }
        </div>                         
      </div>
    </div>
  )
}