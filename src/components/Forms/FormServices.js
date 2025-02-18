import axios from "axios";


const  apiUrlStudents="https://678e3089a64c82aeb11f6611.mockapi.io/students";
const  apiUrlTeachers="https://678e3089a64c82aeb11f6611.mockapi.io/teacher"

export async function handlePostClick({inputValue}) {
    const{firstname,lastname,email}=inputValue
   if (firstname && firstname.trim() !== '' && lastname && lastname.trim() !== '' && email && email.trim() !== '') {
    await axios.post(
      apiUrlStudents,
      inputValue
    );
  }
  }

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