import React, { useState } from 'react';

import axios from 'axios';
import '../styles/Contact.css';// Import the CSS file

const Contact = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://sneakerhead-sneakerrank-xlcs.vercel.app/api/contact/submit', {
        email,
        phone,
        message,
      });

      if (response.status === 200) {
        alert('Form submitted successfully!');
        setEmail('');
        setPhone('');
        setMessage('');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Phone:
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </label>
      <label>
        Message:
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Contact;
