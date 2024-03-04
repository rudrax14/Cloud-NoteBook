import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';


const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();
    const host = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:5000';
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios.post(`${host}/api/v1/login`, credentials)
            .then(response => {
                console.log(response)
                localStorage.setItem('token', response.data.token);
                navigate("/");
                setIsLoading(false);
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
            {/* conditional operator */}
            {!isLoading ? (
                <div>
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
            ) : (
                <Spinner />
            )}
        </div>
    )
}

export default Login