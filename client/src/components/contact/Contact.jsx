import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../store/authSlice';

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
            if (result.ok) {
                const res = await result.json();
                console.log(res);
                setContactForm({
                    name: '',
                    email: '',
                    message: ''
                });
                navigate('/')
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='contact-container'>
            <h1>Contact us</h1>
            <div className="contact-area">
                <div className="contact-image">
                    <img src="./contact.svg" alt="Contact Us" />
                </div>
                <form action="" className="contact-form" onSubmit={handleSubmit}>
                    <div className="input-text">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            placeholder='Full name'
                            value={contactForm.name}
                            onChange={(e) => setContactForm({
                                ...contactForm,
                                [e.target.name]: e.target.value
                            })}
                        />
                        <label htmlFor="name">Full name</label>
                    </div>
                    <div className="input-text">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            placeholder='Email address'
                            value={contactForm.email}
                            onChange={(e) => setContactForm({
                                ...contactForm,
                                [e.target.name]: e.target.value
                            })}

                        />
                        <label htmlFor="email">Email address</label>
                    </div>
                    <div className="input-text">
                        <textarea
                            name="message"
                            id="message"
                            required
                            placeholder='Message'
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
        </div>
    )
}

export default Contact
