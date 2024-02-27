import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/v1/login', credentials)
            .then(response => {
                console.log(response)
                localStorage.setItem('token', response.data.token);
                navigate("/");
                props.showAlert('Login Success', 'success')
            })
            .catch(err => {
                console.log(err)
                props.showAlert('Invalid Credentials', 'danger')
            })

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='mt-3'>
            <h3>Login to continue Cloud-Notebook</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login