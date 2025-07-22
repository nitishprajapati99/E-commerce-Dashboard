import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import encryptUser from '../utils/encryptUser.js';
import { useSnackbar } from '../Context/SnackbarContext';




const Resetpwd = () => {
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const { showSnackbar } = useSnackbar();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validationForm = () => {
        const newErrors = {};
        if (!password) newErrors.password = "Password is required";
        else if (password.length < 8) newErrors.password = "password must contain at least 8 character";
        else if (!/[A-Z]/.test(password)) newErrors.password = "password must contain one uppercase character";
        else if (!/[0-9]/.test(password)) newErrors.password = "password must contain numbers";
        else {
            //for password 1
            if (!password1) newErrors.password1 = "password is required";
            else if (password1.length < 8) newErrors.password1 = "password must contain at least 8 character";
            else if (!/[A-Z]/.test(password1)) newErrors.password1 = "password must contain one uppercase character";
            else if (!/[0-9]/.test(password1)) newErrors.password1 = "password must contain numbers";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

    }

    const updatepwd = async () => {
        if (!validationForm()) return;
        const data = { password };
        const storedemail = JSON.parse(localStorage.getItem("email"));
        const { email } = (storedemail);
        console.log('email', email);
        const response = await fetch(`http://localhost:5000/user/updatepwd/${email}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.status !== 200) {
            console.log(response);
        } else {

            showSnackbar('Password updated Successfully', 'success');
            navigate('/login')

        }


    }


    return (
        <div id='updatepwd-form-box'>
            <h4>Reset Your Password</h4>

            <input onChange={(e) => {
                setPassword(e.target.value)
                const value = e.target.value;
                if (
                    value.length >= 8 &&
                    /[A-Z]/.test(value) &&
                    /[0-9]/.test(value)
                ) {
                    setErrors(prev => ({ ...prev, password: null }));
                }
            }
            } className='input-field' type='password' placeholder='Enter your new password' value={password} />
            {errors.password && <div className="error"> {errors.password}</div>}
            <input onChange={(e) => {
                setPassword1(e.target.value)
                const value = e.target.value;
                if (
                    value.length >= 8 &&
                    /[A-Z]/.test(value) &&
                    /[0-9]/.test(value)
                ) {
                    setErrors(prev => ({ ...prev, password1: null }));
                }
            }
            } className='input-field' type='password' placeholder='Confirm your  password' value={password1} />
            {errors.password1 && <div className="error"> {errors.password1}</div>}

            <button id="updatepwd-button" type='button' onClick={updatepwd} >Update Password</button>




        </div>
    )
}
export default Resetpwd;