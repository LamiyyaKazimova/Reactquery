import React from "react"
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import "bootstrap/dist/css/bootstrap.min.css";
import './index.scss'
import { deleteTeacher, getTeachers } from "./TeacherServices";

function Teacher({data}){


  const queryClient=useQueryClient()

  const query=useQuery({queryKey:['todos'],queryFn:getTeachers})

 const mutation = useMutation({
     mutationFn: deleteTeacher,
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['todos'] })
     },
   })

    return(
        <div className="teacher-table">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Ad</th>
            <th scope="col">Soyad</th>
            <th scope="col">Email</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {query.data?.map((data) => (
            <tr key={data.id}>
            <td>{data.id}</td>
              <td>{data.firstname}</td>
              <td>{data.lastname}</td>
              <td>{data.email}</td>
              <button onClick={()=>{
                mutation.mutate(data.id)
              }}>Delete</button>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    )
}

export default Teacher;