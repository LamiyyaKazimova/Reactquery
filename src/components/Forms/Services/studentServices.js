import axios from "axios";


const  apiUrlStudents="http://localhost:3000/students";
export async function handlePostClick({inputValue}) {
    const{firstname,lastname,email}=inputValue
   if (firstname && firstname.trim() !== '' && lastname && lastname.trim() !== '' && email && email.trim() !== '') {
    await axios.post(
      apiUrlStudents,
      inputValue
    );
    alert("Proses ugurla basa catdi!")
  }
  }


   
  


