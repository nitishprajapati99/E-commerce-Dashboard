import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import encryptUser from '../utils/encryptUser.js';
import { useSnackbar } from '../Context/SnackbarContext.js';



const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const SECRET_KEY = 'my_super_secret_key_32_chars__';
    const { showSnackbar } = useSnackbar();


    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, [navigate]);
    //form validation for register api
    // ✅ Frontend validation
    const validateForm = () => {
        const newErrors = {};

        if (!name.trim()) newErrors.name = "Name is required";
        if (!email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format";

        if (!password) newErrors.password = "Password is required";
        else if (password.length < 8) newErrors.password = "Password must be at least 8 characters";
        else if (!/[A-Z]/.test(password)) newErrors.password = "Must include at least one uppercase letter";
        else if (!/[0-9]/.test(password)) newErrors.password = "Must include at least one number";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    //Collect Data
    const collectData = async () => {
        if (!validateForm()) return;
        const data = ({
            name: encryptUser(name, SECRET_KEY),
            email: encryptUser(email, SECRET_KEY),
            password: password
        });

        try {
            let result = await fetch('http://localhost:5000/user/register', {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },

            })

            const response = await result.json();
            console.log(response);

            if (result.status === 200) {

                localStorage.setItem('user', JSON.stringify(response.result));
                localStorage.setItem('token', JSON.stringify(response.auth));
                showSnackbar('User Registered successfully', 'success');
                navigate('/');
            }
            else {
                showSnackbar('user is already exist', 'error')
            }

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div id="Signup-form-box">
            <h1 style={{ color: 'white' }}>Register</h1>
            <input className='input-field' value={name} onChange={(e) => {
                setName(e.target.value)
                if (e.target.value.trim()) { setErrors(prev => ({ ...prev, name: null })); }
            }
            } type='text' placeholder='Enter name' />
            {errors.name && <div className="error">{errors.name}</div>}
            <input className='input-field' value={email} onChange={(e) => {
                setEmail(e.target.value)
                if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
                    setErrors(prev => ({ ...prev, email: null }));
                }
            }
            } type='text' placeholder='Enter Email' />

            {errors.email && <div className="error">{errors.email}</div>}
            <input className='input-field' value={password} onChange={(e) => {
                setpassword(e.target.value);

                const value = e.target.value;
                if (
                    value.length >= 8 &&
                    /[A-Z]/.test(value) &&
                    /[0-9]/.test(value)
                ) {
                    setErrors(prev => ({ ...prev, password: null }));
                }
            }} type='password' placeholder='Enter Password' />
            {errors.password && <div className="error"> {errors.password}</div>}
            <button id="register-button" type='button' onClick={collectData}>SignUp</button>
        </div>
    )
}
export default Signup;


