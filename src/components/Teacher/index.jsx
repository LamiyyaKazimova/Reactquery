import React from "react"
import axios from "axios";
import { useEffect,useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.scss'

function Teacher({data}){

const [userData, setUserData] = useState([]);


async function handleDeleteClick (id){
  await axios.delete(
    `https://678e3089a64c82aeb11f6611.mockapi.io/teacher/${id}`
  );

  setUserData(userData.filter(data=>data.id!==id))
}
    

    useEffect(() => {
        const data = async () => {
          const response = await axios.get(
            "https://678e3089a64c82aeb11f6611.mockapi.io/teacher"
          );
          setUserData(response.data);
        };
        data();
      
    }, []);
  
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
          {userData.map((data) => (
            <tr key={data.id}>
            <td>{data.id}</td>
              <td>{data.firstname}</td>
              <td>{data.lastname}</td>
              <td>{data.email}</td>
              <button onClick={()=>{handleDeleteClick(data.id)}}>Delete</button>
            </tr>
          ))}
        </tbody>
      </table>



  
        </div>
    )
}

export default Teacher;