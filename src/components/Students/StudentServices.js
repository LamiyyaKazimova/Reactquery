import axios from "axios";


const  apiUrl="http://localhost:3000/students";


export const getStudents=async()=>{
const response=await axios.get(apiUrl)
return response.data
}

export const deleteStudent=async(id)=>{
await axios.delete(`${apiUrl}/${id}`)
}
