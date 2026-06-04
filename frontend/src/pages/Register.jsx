import { useState } from "react";
import axios from "axios";
import { register } from "../api/authService";
import { useNavigate } from "react-router-dom";
import '../styles/register.css'

function Register() {
    const [ Form , setForm ] = useState({
        name:'',
        email:'',
        password:''
    });

    const navigate=useNavigate();

    function handleChange(e) {
        setForm({
            ...Form ,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const  res = await register(Form);
            alert('account created successfully');
            console.log(res);
            navigate('/login');
        } catch (e) {
           alert(
             e.response?.data?.message || 'Register Failed'
           )
        }
    }

    return (
      <div className="register-container">
        <div className="register-box">
            <h2>Register Page</h2>
    <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={Form.name}
            onChange={handleChange}
            required
          />
        </div>
         <br />
      <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={Form.email}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={Form.password}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <button type="submit">Create Account</button>

        <p
          className="login-link"
          onClick={() => navigate("/")}
        >
          Already have an account? Login
        </p>
       </form>
        </div>
        </div>
    )
}

export default Register;