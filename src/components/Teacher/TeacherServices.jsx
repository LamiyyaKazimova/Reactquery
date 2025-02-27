import axios from "axios";


const  apiUrl="http://localhost:3000/teacher";


export const getTeachers=async()=>{
const response=await axios.get(apiUrl)
return response.data
}

export const deleteTeacher=async(id)=>{
await axios.delete(`${apiUrl}/${id}`)
}
