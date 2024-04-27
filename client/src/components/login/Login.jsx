import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { selectLogin, userLogin } from '../../store/authSlice';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedUser = useSelector(selectLogin);
    const URL = `http://localhost:5000/api/auth/login`;
    const [userForm, setUserForm] = useState({
        email: '',
        password: ''
    })

    const handleLogin = async (e) =>{
        e.preventDefault();
        setUserForm({
            ...userForm,
            email: userForm.email.trim().toLowerCase()
        })

        try {
            const result = await fetch(URL,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(userForm)
            })
            if(result.ok){
                const res = await result.json();
                setUserForm({
                    email: '',
                    password: ''
                });
                const userData = await fetch(`http://localhost:5000/api/auth/user`,{
                    method: 'GET',
                    headers:{
                        'Authorization': `Bearer ${res.token}`
                    }
                }).then(res => res.json())
                toast.success(`Login successfull.`)
                dispatch(userLogin({
                    token: res.token,
                    user: userData
                }))
                navigate('/');
            }else{
                toast.error(`Invalid credentials.`)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(selectedUser){
            navigate('/');
        }
    },[selectedUser])
  return (
    <div className='login-container'>
            <div className="login-image">
                <img src="./login.svg" alt="Signup image" className='signup-img'  />
            </div>
            <div className="login-form">
                <h3>Log in</h3>
                <form action="" className='form' onSubmit={handleLogin}>
                    <div className="input-text">
                        <input 
                        type="text" 
                        name="email" 
                        id="email" 
                        placeholder='Username / Email' 
                        required
                        onChange={(e)=>setUserForm({...userForm, [e.target.name]:e.target.value})}
                        value={userForm.email} />
                        <label htmlFor="email">Username / Email</label>
                    </div>
                    <div className="input-text">
                        <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder='Password' 
                        required
                        onChange={(e)=>setUserForm({...userForm, [e.target.name]:e.target.value})}
                        value={userForm.password} />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-text">
                        <button type="submit" className='btn btn-primary'>Log In</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default Login
