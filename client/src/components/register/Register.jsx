import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectLogin } from '../../store/authSlice';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Register = () => {
    const URL = `http://localhost:5000/api/auth/signup`;
    const [passVisible, setPassVisible] = useState(false);
    const selectedUser = useSelector(selectLogin);
    const navigate = useNavigate();
    const [userForm, setUserForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })
    const handlePassVisible = () => {
        setPassVisible(!passVisible);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUserForm({
            ...userForm,
            name: userForm.name.trim().split(' ').filter(e => e !== '').join(' '),
            email: userForm.email.trim().toLowerCase()
        })

        if (userForm.password === userForm.confirmPassword) {
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
                        name: '',
                        email: '',
                        phone: '',
                        password: '',
                        confirmPassword: ''
                    });
                    toast.success(res.message);
                    navigate('/login');
                } else {
                    toast.error(res.message);
                    res.extraDetails && res.extraDetails.map(msg => {
                        toast.error(msg);
                    })
                }
            } catch (error) {
                toast.error(`Something went wrong. Please try again.`)
            }
        } else {
            toast.error(`Password and confirm password not matching.`);
        }
    }

    const sanitizeNumber = (e) => {
        const validNumber = e.target.value.replace(/\D/g, "");
        setUserForm({
            ...userForm,
            phone: validNumber
        })
    }

    useEffect(() => {
        if (selectedUser) {
            navigate('/');
        }
    }, [selectedUser])

    return (
        <div className='register-container'>
            <h1 className='mb-md mt-lg'>Register yourself</h1>
            <form action="" className='register-form' onSubmit={handleSubmit}>
                <div className="input-area mt-sm">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        onChange={(e) => setUserForm({ ...userForm, [e.target.name]: e.target.value })}
                        value={userForm.name} />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="input-area">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        onChange={(e) => setUserForm({ ...userForm, [e.target.name]: e.target.value })}
                        value={userForm.email} />
                    <label htmlFor="email">Email address</label>
                </div>
                <div className="input-area">
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        required
                        onChange={sanitizeNumber}
                        value={userForm.phone} />
                    <label htmlFor="phone">Phone number</label>
                </div>
                <div className="input-area">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        onChange={(e) => setUserForm({ ...userForm, [e.target.name]: e.target.value })}
                        value={userForm.password} />
                    <label htmlFor="password">Password</label>
                </div>
                <div className="input-area">
                    <input
                        type={passVisible ? "text" : "password"}
                        name="confirmPassword"
                        id="confirmPassword"
                        required
                        onChange={(e) => setUserForm({ ...userForm, [e.target.name]: e.target.value })}
                        value={userForm.confirmPassword} />
                    <label htmlFor="confirmPassword">Confirm password</label>
                    {passVisible ?
                        <FaEyeSlash onClick={handlePassVisible} /> :
                        <FaEye onClick={handlePassVisible} />}
                </div>
                <div className="input-button">
                    <button type="submit" className='btn btn-primary'>Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register
