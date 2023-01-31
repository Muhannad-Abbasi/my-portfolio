import React, { useState } from 'react';
import { send } from 'emailjs-com';
import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import CircularProgress from '@mui/material/CircularProgress';
import './Footer.scss';

const Footer = () => {
  const [formData, setFormData] = useState({ from_name: '', reply_to: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { username, email, message } = formData;

  const handleChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    send(
      'service_g3wl7pb',
      'template_oy6pw24',
      formData,
      'WGjhTCU-N1OyWcfGJ'
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setIsFormSubmitted(true);
    })
    .catch((err) => {
      console.log('FAILED...', err);
    });
  };

  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <img src={images.email} alt="email" />
          <a href="mailto:muhannad.abbasi.1995@gmail.com" className="p-text">muhannad.abbasi.1995@gmail.com</a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="phone" />
          <a href="tel:+46 739876885" className="p-text">+46 73 9876885</a>
        </div>
      </div>
      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input 
              className="p-text"
              type="text"
              placeholder="Your Name"
              name="from_name"
              value={username}
              onChange={handleChangeInput}
            />
          </div>
          <div className="app__flex">
            <input
              className="p-text"
              type="email"
              placeholder="Your Email"
              name="reply_to" 
              value={email}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          <button
            type="button" 
            className="p-text" 
            onClick={handleSubmit}
          >
            {
              !loading
              ?
                'Send Message'
              : 
              <span>
                {<><CircularProgress size={15} sx={{ marginRight: .5 }}/> <p>Sending...</p></>} 
              </span>
            }
          </button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">
            Thank you for getting in touch!
          </h3>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg',
);