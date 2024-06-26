import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { selectLogin, userLogin } from '../../store/authSlice';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [passVisible, setPassVisible] = useState(false);
    const selectedUser = useSelector(selectLogin);
    const URL = `http://localhost:5000/api/auth/login`;
    const [userForm, setUserForm] = useState({
        email: '',
        password: ''
    })

    const handlePassVisible = () => {
        setPassVisible(!passVisible);
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        setUserForm({
            ...userForm,
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
            const res = await result.json();
            if (result.ok) {
                setUserForm({
                    email: '',
                    password: ''
                });
                const userData = await fetch(`http://localhost:5000/api/auth/user`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${res.token}`
                    }
                }).then(res => res.json())
                toast.success(`Login successfull.`)

                dispatch(userLogin({
                    token: res.token,
                    user: userData
                }))
                navigate('/');
            } else {
                toast.error(res.message)
                res.extraDetails && res.extraDetails.map(msg => {
                    toast.error(msg);
                })
            }
        } catch (error) {
            toast.error(`Something went wrong. Please try again.`)
        }
    }

    useEffect(() => {
        if (selectedUser) {
            navigate('/');
        }
    }, [selectedUser])
    return (
        <div className='login-container'>
            <h1 className='mt-md mb-md'>Log in</h1>
            <form action="" className='login-form' onSubmit={handleLogin}>
                <div className="input-area mt-md">
                    <input
                        type="text"
                        name="email"
                        id="email"
                        required
                        onChange={(e) => setUserForm({ ...userForm, [e.target.name]: e.target.value })}
                        value={userForm.email} />
                    <label htmlFor="email">Username / Email</label>
                </div>
                <div className="input-area">
                    <input
                        type={passVisible ? "text" : "password"}
                        name="password"
                        id="password"
                        required
                        onChange={(e) => setUserForm({ ...userForm, [e.target.name]: e.target.value })}
                        value={userForm.password} />
                    <label htmlFor="password">Password</label>
                    {passVisible ?
                        <FaEyeSlash onClick={handlePassVisible} /> :
                        <FaEye onClick={handlePassVisible} />}
                </div>
                <div className="input-button">
                    <button type="submit" className='btn btn-primary'>Log In</button>
                </div>
            </form>
        </div>
    )
}

export default Login
