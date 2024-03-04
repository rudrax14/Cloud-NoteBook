import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import axios from 'axios';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  const host = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:5000';
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { name, email, password } = credentials;
    await axios.post(`${host}/api/v1/register`, { name, email, password })
      .then(response => {
        console.log(response)
        // localStorage.setItem('token', response.data.token);
        navigate("/login");
        setIsLoading(false);
        props.showAlert('Account Created', 'success')
      })
      .catch(err => {
        console.log(err)
        props.showAlert('Invalid Credentials', 'danger')
      }
      )
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <>
      {/* conditional operator */}
      {!isLoading ? (
        <div className='mt-3'>
          <h3>Login to continue Cloud-Notebook</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name='name' onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" name='email' onChange={onChange} aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default Signup