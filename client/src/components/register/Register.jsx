import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectLogin } from '../../store/authSlice';


const Register = () => {
    const URL = `http://localhost:5000/api/auth/signup`;
    const selectedUser = useSelector(selectLogin);
    const navigate = useNavigate();
    const [userForm, setUserForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setUserForm({
            ...userForm,
            name: userForm.name.trim().split(' ').filter(e=>e!=='').join(' '),
            email: userForm.email.trim().toLowerCase()
        })

        try {
            const result = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(userForm)
            })
            if(result.ok){
                setUserForm({
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: ''
                });
                navigate('/login');
            }else{
                console.log(`User already exists.`)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const sanitizeNumber = (e) =>{
        const validNumber = e.target.value.replace(/\D/g, "");
        setUserForm({
            ...userForm,
            phone: validNumber
        })
    }

    useEffect(()=>{
        if(selectedUser){
            navigate('/');
        }
    },[selectedUser])

    return (
        <div className='register-container'>
            <div className="register-image">
                <img src="./sign-up-form.svg" alt="Signup image" className='signup-img' />
            </div>
            <div className="register-form">
                <h3>Register yourself</h3>
                <form action="" className='form' onSubmit={handleSubmit}>
                    <div className="input-text">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder='Name'
                            required
                            onChange={(e) => setUserForm({ ...userForm, [e.target.name]: e.target.value })}
                            value={userForm.name} />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="input-text">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder='Email address'
                            required
                            onChange={(e) => setUserForm({ ...userForm, [e.target.name]: e.target.value })}
                            value={userForm.email} />
                        <label htmlFor="email">Email address</label>
                    </div>
                    <div className="input-text">
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            placeholder='Phone number'
                            required
                            onChange={sanitizeNumber}
                            value={userForm.phone} />
                        <label htmlFor="phone">Phone number</label>
                    </div>
                    <div className="input-text">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder='Password'
                            required
                            onChange={(e) => setUserForm({ ...userForm, [e.target.name]: e.target.value })}
                            value={userForm.password} />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-text">
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder='Confirm password'
                            required
                            onChange={(e) => setUserForm({ ...userForm, [e.target.name]: e.target.value })}
                            value={userForm.confirmPassword} />
                        <label htmlFor="confirmPassword">Confirm password</label>
                    </div>
                    <div className="input-text">
                        <button type="submit" className='btn btn-primary'>Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
