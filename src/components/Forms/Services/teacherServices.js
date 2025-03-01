import axios from "axios";
const  apiUrlTeachers="http://localhost:3000/teacher"


export async function handlePostTeacherClick({inputValue}) {
    const{firstname,lastname,email}=inputValue
    if (firstname && firstname.trim() !== '' && lastname && lastname.trim() !== '' && email && email.trim() !== '') {
     await axios.post(
       apiUrlTeachers,
       inputValue
     );
     alert("proses ugurla basa catdi!") 
   }
   
   }
