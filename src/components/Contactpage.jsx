import React, { useState } from 'react';
import "../styles/contactpage.css";

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, phone, message } = formData;

    // ✅ Basic Validation
    if (!firstName || !lastName || !email || !phone || !message) {
      alert("Please fill in all the fields.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be 10 digits.");
      return;
    }

    try {
      // ✅ Fetch existing data
      const existingData = JSON.parse(localStorage.getItem('contactSubmissions')) || [];

      // ✅ Add new entry
      const updatedData = [...existingData, {
        firstName,
        lastName,
        email,
        phone,
        message
      }];

      // ✅ Save to localStorage
      localStorage.setItem('contactSubmissions', JSON.stringify(updatedData));

      // ✅ Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });

      alert("Your response has been recorded. Thank you!");
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      alert("Something went wrong while saving your data.");
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-left">
        <h1>Let's Connect & Create Something Amazing</h1>
        <p>
          Have a project in mind or just want to say hello? We’d love to hear from you.
          Share your thoughts and let’s turn ideas into reality — together.
        </p>
        <div className="social-icons">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://google.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-google"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      <div className="contact-right">
        <h2>Get a quote</h2>
        <p>We will get back to you in 24 hours</p>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
          <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
          <div className="input-row">
            <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
            <input type="tel" placeholder="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <textarea placeholder="Type message here" name="message" value={formData.message} onChange={handleChange}></textarea>
          <button type="submit" disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.message}>
  Get quote
</button>

        </form>
      </div>
    </div>
  );
}



export default ContactForm;
