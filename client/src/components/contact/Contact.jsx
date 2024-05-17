import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../store/authSlice';
import { toast } from 'react-toastify';

const Contact = () => {
    const URL = `http://localhost:5000/contact`;
    const navigate = useNavigate();
    const selectedUser = useSelector(selectUser);
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        message: ''
    })

    useEffect(() => {
        if (selectedUser) {
            setContactForm({
                ...contactForm,
                name: selectedUser.name,
                email: selectedUser.email
            })
        }
    }, [selectedUser])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newContactForm = {
            name: contactForm.name.trim().split(' ').filter(e => e !== '').join(' '),
            email: contactForm.email.trim().toLowerCase(),
            message: contactForm.message.trim()
        }
        setContactForm(newContactForm)

        try {
            const result = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(contactForm)
            })
            const res = await result.json();
            if (result.ok) {
                console.log(res);
                setContactForm({
                    name: '',
                    email: '',
                    message: ''
                });
                toast.success(res.message);
                navigate('/')
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
    return (
        <div className='contact-container'>
            <h1 className='mt-md'>Contact us</h1>
            <form action="" className="contact-form" onSubmit={handleSubmit}>
                <div className="input-area mt-md">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({
                            ...contactForm,
                            [e.target.name]: e.target.value
                        })}
                    />
                    <label htmlFor="name">Full name</label>
                </div>
                <div className="input-area">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({
                            ...contactForm,
                            [e.target.name]: e.target.value
                        })}

                    />
                    <label htmlFor="email">Email address</label>
                </div>
                <div className="input-area">
                    <textarea
                        name="message"
                        id="message"
                        required
                        placeholder=''
                        aria-required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({
                            ...contactForm,
                            [e.target.name]: e.target.value
                        })}

                    />
                    <label htmlFor="message">Message</label>
                </div>
                <div className="submit">
                    <button type="submit" className='btn btn-primary ls-sm mt-md'>
                        Send message
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Contact
