import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

export default function Create2(){
  // API URL
  const apiUrl = "http://localhost:3000/api/contacts/create";

  // react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Add new contact to API
  function addContact(data){
    //e.preventDefault();

    console.log(data);
    
    // Create form
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('image', data.image[0] || null);
    
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

      <form onSubmit={handleSubmit(addContact)} method="post" encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input {...register("firstName", { required: true })} type="text" className="form-control bg-light" />
            {errors.firstName && <span className="text-danger">First Name is required.</span>}
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input {...register("lastName", { required: true })} type="text" className="form-control bg-light" />
            {errors.lastName && <span className="text-danger">Last Name is required.</span>}
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input {...register("phone")} type="text" className="form-control bg-light" />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            {/* <input {...register("email", { required: true })} type="text" className="form-control bg-light" />
            {errors.email && <span className="text-danger">Email is required.</span>} */}
            <input 
            {...register("email", { 
              required: "Email is required.",
              validate: {
                validFormat: value => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || "Invalid email address."
              }
              })} 
             type="text" className="form-control bg-light"  />
            {errors.email && <span className="text-danger">{errors.email.message}</span>}
          </div>
          <div className="mb-3">
            <label className="form-label">Image</label>
            <input {...register("image")} type="file" className="form-control bg-light" />
          </div>   

          <button type="submit" className="btn btn-primary">Add</button>
          <Link to="/" className="btn btn-outline-secondary ms-3">Cancel</Link>
        </form>
      </>
  )
}