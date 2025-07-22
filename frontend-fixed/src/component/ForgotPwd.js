import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import encryptUser from '../utils/encryptUser.js';
import { useSnackbar } from '../Context/SnackbarContext.js';
// import { useForm } from 'react-hook-form';



const Forgotpwd = () => {
    const [email, setEmail] = useState('');

    const SECRET_KEY = 'my_super_secret_key_32_chars__';
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    const [errors, setErrors] = useState({});

    const validationForm = () => {
        const newErrors = {};
        if (!email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }



    const ResetpwdForm = async () => {
        if (!validationForm()) {
            return;
        }
        const data = {
            email: encryptUser(email, SECRET_KEY)
        }



        try {
            let response = await fetch('http://localhost:5000/forgotpwd', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            console.log('response', response);
            const result = await response.json();
            console.log('Email', result);
            if (response.status === 200) {
                localStorage.setItem("email", JSON.stringify(data));
                navigate('/reset');
                showSnackbar('Email Id is valid', 'success');



            } else {
                showSnackbar('Invalid Email Id', 'error');
            }
        } catch {
            showSnackbar('Some Technical Error', 'error');
        }
    }

    return (

        <div id='forgot-form-box'>
            <h3>Reset Your Password</h3>
            <input className='input-field' value={email} onChange={(e) => {
                setEmail(e.target.value)
                if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
                    setErrors(prev => ({ ...prev, email: null }));
                }
            }} type='email' placeholder='Enter your registered Email' />

            {errors.email && <div className="error">{errors.email}</div>}

            <button id="Resetpwd-button" type='button' onClick={ResetpwdForm} >Reset Password</button>
        </div>

    )
}
export default Forgotpwd;