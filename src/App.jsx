import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavLink } from "react-router"
import './App.scss';
import Form from "./components/Forms";
import Teacher from "./components/Teacher";
import Students from "./components/Students";
import Index from "./components/Documentation";



const initialValue = {
  firstname: "",
  lastname: "",
  email: "",
 specialty:"",
 profession:"",
 point:"",
};



function App() {
  const [inputValue, setInputValue] = useState(initialValue);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <BrowserRouter>
          <div>
            <nav>
              <ul className="link">
              <NavLink to="/" className="my-link" end>Documentation</NavLink>
    <NavLink to="/form" className="my-link">Form</NavLink>
    <NavLink to="/teacher" className="my-link">Teacher</NavLink>
    <NavLink to="/students" className="my-link">Students</NavLink>

              </ul>
            </nav>

            <Routes>
             <Route path="/" element={<Index/>} />
              <Route path="/form" element={<Form inputValue={inputValue} setInputValue={setInputValue}  />} />
              <Route path="/teacher" element={<Teacher data={inputValue} />} />
              <Route path="/students" element={<Students data={inputValue} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
