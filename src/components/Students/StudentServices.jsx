import axios from "axios";


const  apiUrl="https://678e3089a64c82aeb11f6611.mockapi.io/students";


export const getStudents=async()=>{
const response=await axios.get(apiUrl)
return response.data
}

export const deleteStudent=async(id)=>{
await axios.delete(`${apiUrl}/${id}`)
}
