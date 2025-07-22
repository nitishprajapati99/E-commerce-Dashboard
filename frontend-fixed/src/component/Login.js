import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import encryptUser from '../utils/encryptUser.js';
import { useSnackbar } from "../Context/SnackbarContext";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const SECRET_KEY = 'my_super_secret_key_32_chars__';

  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  })
  //Validation
  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if ((!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) newErrors.email = "Invalid email format";
    else {
      if (!password) newErrors.password = "Password is required";
      else if (password.length < 8) newErrors.password = "Password at least 8 characters";
      else if (!/[A-Z]/.test(password)) newErrors.password = "password must contains atleast one uppercase later";
      else if (!/[0-9]/.test(password)) newErrors.password = "password must contains numbers ";
      
    }
    setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  }
  //button to login the user
  const handleLogin = async () => {
    if (!validateForm()) return;
    const loginData = {
      email: encryptUser(email, SECRET_KEY),
      password: password
    }

    let result = await fetch('http://localhost:5000/user/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    result = await result.json();
    console.log('result', result);

    if (result.auth) {
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', JSON.stringify(result.auth));

      showSnackbar('you are login successfully', 'success');
      navigate('/');
    } else {
      showSnackbar('Invalid Credentials', 'error');
    }
  }
  const forgotpassword = () => {
    console.log('remember me please');
    navigate('/forgotpwd');
  }




  return (
    <div id="login-form-box">
      <h1 style={{ color: 'white' }}>Login</h1>
      <input onChange={(e) => {
        setEmail(e.target.value)
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
          setErrors(prev => ({ ...prev, email: null }));
        }
      }} value={email} className="input-field" type="text" placeholder='Enter your email '></input>
      {errors.email && <div className='error'> {errors.email}</div>}
      <input onChange={(e) => {
        setPassword(e.target.value)
        const value = e.target.value;
        if (
          value.length >= 8 &&
          /[A-Z]/.test(value) &&
          /[0-9]/.test(value)
        ) {
          setErrors(prev => ({ ...prev, password1: null }));
        }
      }} value={password} className="input-field" type="password" placeholder='Enter password '></input>
      {errors.password && <div className='error' >{errors.password}</div>}
      <button id="login-button" onClick={handleLogin} type='button' >Login</button>
      <button id="forgot-button" onClick={forgotpassword} type='button' >Forgot Password</button>
    </div>)
}

export default Login;