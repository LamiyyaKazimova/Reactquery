import axios from "axios";
const  apiUrlTeachers="https://678e3089a64c82aeb11f6611.mockapi.io/teacher"


export async function handlePostTeacherClick({inputValue,setInputValue}) {
    const{firstname,lastname,email}=inputValue
    if (firstname && firstname.trim() !== '' && lastname && lastname.trim() !== '' && email && email.trim() !== '') {
     await axios.post(
       apiUrlTeachers,
       inputValue
     );
     alert("proses ugurla basa catdi!")
     setInputValue({firstname:'',lastname:'',email:''})
    
   }
   
   }
