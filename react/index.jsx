import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const ContactForm = () => {
   console.log('hola');
  return (
          <div className="contact__content">
                        <h3 className="contact__title">Write me your project</h3>

                        <form action="" className="contact__form">
                            <div className="contact__form-div">
                                <label className="contact__form-tag">Names</label>
                                <input type="text" placeholder="Insert your name" className="contact__form-input inputName"/>
                            </div>
                            
                            <div className="contact__form-div">
                                <label className="contact__form-tag"> Mail</label>
                                <input type="email" placeholder="Insert your email" className="contact__form-input inputMail"/>
                            </div>

                            <div className="contact__form-div contact__form-area">
                                <label className="contact__form-tag">Project</label>
                                <textarea name="" id="" cols="30" rows="10" placeholder="Write your project" className="contact__form-input inputProject"></textarea>
                            </div>

                            <button className="button" type="submit">Send Messege</button>
                        </form>
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