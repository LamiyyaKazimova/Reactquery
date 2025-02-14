
import React from "react"
import axios from "axios";
import './index.scss';

function Form({message,setMessage,inputValue,setInputValue}){


    
    function handleChange(e) {
        const { name, value } = e.target;
        setInputValue((prevValue) => ({
          ...prevValue,
          [name]: value,
        }));
      }
    
      async function handlePostClick() {
        const{firstname,lastname,email}=inputValue
       if (firstname && firstname.trim() !== '' && lastname && lastname.trim() !== '' && email && email.trim() !== '') {
        await axios.post(
          "https://678e3089a64c82aeb11f6611.mockapi.io/students",
          inputValue
        );
        setMessage("Proses uğurla başa çatdı!");
      }
      }


      async function handlePostTeacherClick() {
       const{firstname,lastname,email}=inputValue
       if (firstname && firstname.trim() !== '' && lastname && lastname.trim() !== '' && email && email.trim() !== '') {
        await axios.post(
          "https://678e3089a64c82aeb11f6611.mockapi.io/teacher",
          inputValue
        );
        setMessage("Proses uğurla başa çatdı!");
      }
      }
    return(
      <div className="form">
    <input onChange={handleChange} type="text" name="firstname"  placeholder="Adı daxil edin"/>
      <input onChange={handleChange} type="text" name="lastname" placeholder="Soyadı daxil edin" />
      <input onChange={handleChange} type="email" name="email" placeholder="Emaili daxil edin" />
      <div className="all-button">
      <button onClick={handlePostTeacherClick}> Add Teacher</button>
      <button onClick={handlePostClick}> Add Students</button>
      </div>

      
      
      



      {Boolean(message)  && <p>{message}</p>}


      </div>
    )
}

export default Form;
