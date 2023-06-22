import { useEffect, useState, useRef } from "react";

const useContactForm = () => {
   const isFirstInput = useRef({
      user: true,
      email: true,
      messages: true 
   })
   const { user, email, messages } = isFirstInput.current;

   const [ error, setError ] = useState(null)

   const [ userdata, setUserData ] = useState({
      user_name: '',
      user_email: '',
      message:''
   })
   const { user_name, user_email,message } = userdata;

   useEffect(() => {
      if(user){
        isFirstInput.current.user = user_name === "";
         return console.log('prueba');
         
      }
   }, [userdata])

   return { userdata, setUserData, error }
}
 
export default useContactForm;
