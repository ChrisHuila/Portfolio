import React, { useRef, useState } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import emailjs from '@emailjs/browser';

const ContactForm = () => {
    const form = useRef();
    
   const [ error, setError ] = useState(null)

    const [ userdata, setUserData ] = useState({
        user_name: '',
        user_email: '',
        message:''
    })

    const { user_name, user_email, message} = userdata;

    const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const handleChange = e => {
       setUserData({
        ...userdata,
        [e.target.name]: e.target.value
       }) 
    }
    
    const sendEmail = (e) => {
        e.preventDefault();

        if( user_name.trim() === '' || user_email.trim() === '' || message.trim() === ''){
         setError('All fields are required')
         return
        }

        if(!er.test(user_email)){
         setError('Invalid email')
         return
        }

        setError(null)

        emailjs.sendForm(
            import.meta.env.VITE__SERVICE_ID,
            import.meta.env.VITE__TEMPLATE_ID, 
            form.current, 
            import.meta.env.VITE_PUBLIC_KEY)
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
  };

  return (
    <div className="contact__content">
        <h3 className="contact__title">Write me your project</h3>

        <form ref={form} onSubmit={sendEmail} className="contact__form">
            <div className="contact__form-div">
                <label className="contact__form-tag">Names</label>
                <input type="text" value={user_name} onChange={handleChange} name="user_name" placeholder="Insert your name" className="contact__form-input inputName"/>
            </div>
            
            <div className="contact__form-div">
                <label className="contact__form-tag"> Mail</label>
                <input type="email" value={user_email} name="user_email" onChange={handleChange} placeholder="Insert your email" className="contact__form-input inputMail"/>
            </div>

            <div className="contact__form-div contact__form-area">
                <label className="contact__form-tag">Project</label>
                <textarea name="message" value={message} onChange={handleChange} cols="30" rows="10" placeholder="Write your project" className="contact__form-input inputProject"></textarea>
            </div>
            
            <input type="submit" value="Send Messege" className="button" />
        </form>
        {error && <p style={{color: 'white'}}> {error} </p>}
    </div>
  )
}
 


const domNode = document.getElementById("formReact");
const root = createRoot(domNode);
root.render(
  <StrictMode >
    <ContactForm />
  </StrictMode>
);