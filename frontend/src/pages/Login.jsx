import { useEffect, useState } from 'react';
import axios from 'axios';
import { login } from '../api/authService';
import { useNavigate } from 'react-router-dom'; 
import '../styles/login.css'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
   
  const navigate=useNavigate();

  useEffect(()=>{
    isThatlogin();
  },[]);

  const isThatlogin = () => {
    const token = localStorage.getItem("token");
      if(token) {
         navigate('/Dashboard');
      }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(formData) ;
      alert('Login Successful');
      navigate('/Dashboard');
    } catch (error) {
      alert(
        error.response?.data?.message || 'Login Failed'
      );
    }
  };

  return (
    <div className='box'>
    <div className='Login'>
      <h2>Login NoteApp</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

      

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>


        <button type="submit">
          Login
        </button>
        <p
          className="register-link"
          onClick={() => navigate('/register')}
          >
          Don't have an account? Register
        </p>
      </form>
    </div>
    </div>
  );
}

export default Login;