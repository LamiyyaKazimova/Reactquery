import react from "react";
import axios from "axios";


const  apiUrl="https://678e3089a64c82aeb11f6611.mockapi.io/teacher";


export const getTeachers=async()=>{
const response=await axios.get(apiUrl)
return response.data
}

export const deleteTeacher=async(id)=>{
await axios.delete(`${apiUrl}/${id}`)
}
