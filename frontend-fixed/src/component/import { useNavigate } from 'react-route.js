import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import encryptUser from '../utils/encryptUser.js';
import { useSnackbar } from '../Context/SnackbarContext.js';
import { useForm } from 'react-hook-form';


const SignUpForm = () => {
    // const [signUpFormData, setFormData] = useState({
    //     name: '',
    //     email: '',
    //     password: ''
    // });
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

    const handleOnchange = (e) => {
        console.log('event', e);
    }

    // const handleSubmit = (e) => {
    //     console.log('handle submit', e);
    // }

    return (
         <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div id="Signup-form-box">
            <h1 style={{ color: 'white' }}>Register</h1>
            {/* <input className='input-field' value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Enter name' />
            <input className='input-field' value={email} onChange={(e) => setEmail(e.target.value)} type='text' placeholder='Enter Email' />
            <input className='input-field' value={password} onChange={(e) => setpassword(e.target.value)} type='password' placeholder='Enter Password' />
            <button id="register-button" type='button' onClick={collectData}>SignUp</button> */}
            <input className='input-field' value={signUpFormData.name} type='text' placeholder='Enter name' />
            <input className='input-field' value={signUpFormData.email} onChange={(e) => handleOnchange(e.target.value)} type='text' placeholder='Enter Email' />
            <input className='input-field' value={signUpFormData.password} onChange={(e) => handleOnchange(e.target.value)} type='password' placeholder='Enter Password' />
            <button id="register-button" type='button' onClick={handleSubmit}>SignUp</button>
        </div>
    </form>
    )
}

