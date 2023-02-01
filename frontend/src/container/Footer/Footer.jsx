import React, { useState } from 'react';
import { send } from 'emailjs-com';
import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import CircularProgress from '@mui/material/CircularProgress';
import './Footer.scss';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { TextField } from '@mui/material';
import { makeStyles } from "@mui/styles";

const Footer = () => {
  // const [formData, setFormData] = useState({ from_name: '', reply_to: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // const { username, email, message } = formData;

  const formik = useFormik({
    initialValues: {
      from_name: '',
      reply_to: '',
      message: ''
    },
    validationSchema: Yup.object().shape({
      from_name: Yup.string().max(25).required('Name is required'),
      reply_to: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      message: Yup.string().max(500).required('Message should not be empty')
    }),
    onSubmit: (values) => {
      setLoading(true);
      send(
        'service_g3wl7pb',
        'template_oy6pw24',
        values,
        'WGjhTCU-N1OyWcfGJ'
      )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setIsFormSubmitted(true);
      })
      .catch((err) => {
        console.log('FAILED...', err);
        formik.setSubmitting(false);
      });
    }
  })

  const useStyles = makeStyles({
    noBorder: {
      border: "none",
    },
  });

  const classes = useStyles();

  // const handleChangeInput = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   send(
  //     'service_g3wl7pb',
  //     'template_oy6pw24',
  //     formData,
  //     'WGjhTCU-N1OyWcfGJ'
  //   )
  //   .then((response) => {
  //     console.log('SUCCESS!', response.status, response.text);
  //     setIsFormSubmitted(true);
  //   })
  //   .catch((err) => {
  //     console.log('FAILED...', err);
  //   });
  // };

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
          <form className='width-100' onSubmit={formik.handleSubmit}>
            <div className="app__flex">
              <TextField 
                className="p-text"
                type="text"
                placeholder="Your Name"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                name="from_name"
                value={formik.values.from_name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={Boolean(formik.touched.from_name && formik.errors.from_name)}
                helperText={formik.touched.from_name && formik.errors.from_name}
              />
            </div>
            <div className="app__flex">
              <TextField
                className="p-text"
                type="email"
                placeholder="Your Email"
                name="reply_to" 
                value={formik.values.reply_to}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                InputProps={{ disableUnderline: true }}
                variant="standard"
                error={Boolean(formik.touched.reply_to && formik.errors.reply_to)}
                helperText={formik.touched.reply_to && formik.errors.reply_to}
              />
            </div>
            <div>
              <TextField
                className="p-text"
                placeholder="Your Message"
                value={formik.values.message}
                name="message"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                variant="standard"
                InputProps={{ disableUnderline: true }}
                error={Boolean(formik.touched.message && formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
              />
            </div>
            <button
              className="p-text"
              type="submit"
              disabled={formik.isSubmitting}
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
          </form>
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