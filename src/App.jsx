import React from "react"
import { useState } from "react";
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import './App.scss';
import Form from "./components/Forms";
import Teacher from "./components/Teacher";
import Students from "./components/Students";


const initialValue = {
  firstname: "",
  lastname: "",
  email: "",
};
function App() {
  const [inputValue, setInputValue] = useState(initialValue);
  const [message, setMessage] = useState();
  
  return (
    <div className="App">
   <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li><a href="/">Form</a></li>
            <li><a href="/teacher">Teacher</a></li>
            <li><a href="/students">Students</a></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Form message={message} setMessage={setMessage}  inputValue={inputValue} setInputValue={setInputValue} />} />
          <Route path="/teacher" element={<Teacher data={inputValue}/>} />
          <Route path="/students" element={<Students data={inputValue}/>} />
        </Routes>

      </div>
    </BrowserRouter>
    </div>
  );

}

export default App;
