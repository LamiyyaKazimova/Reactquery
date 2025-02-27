import React, { useState } from "react";
import './index.scss';
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handlePostClick } from "./Services/studentServices";
import { handlePostTeacherClick } from "./Services/teacherServices";

function Form({ inputValue, setInputValue }) {

    const [isFormVisible, setIsFormVisible] = useState(false)
    const [isFormHidden, setIsFormHidden] = useState(false)
    const[disabledValue,setDisabledValue]=useState(false)
    const[disableValue,setDisableValue]=useState(false)
    


    function handleChange(e) {
        const { name, value } = e.target;
        setInputValue((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    }

   

    const queryClient = useQueryClient();

    function handleVisible() {
        setIsFormVisible(!isFormVisible)
    }

    function handleHidden() {
        setIsFormHidden(!isFormHidden)
    }

    

    function handleStudentButtonClick() {
        handleAddStudent()
        handleVisible()
        setDisabledValue(!disabledValue)
    }

    function handleTeacherButtonClick() {
        handleAddTeacher()
        handleHidden()
        setDisableValue(!disableValue)
    }

    const mutationStudents = useMutation({
        mutationFn: handlePostClick,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
            setInputValue({
                firstname: "",
                lastname: "",
                email: "",
                specialty: "",
                point: ""
            });
            
        },
    });

    const mutationTeacher = useMutation({
        mutationFn: handlePostTeacherClick,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teacher"] });
            setInputValue({
                firstname: "",
                lastname: "",
                email: "",
                profession: ""
            });

        },
        

    });
    const navigate=useNavigate()
    const handleAddTeacher = () => {
        mutationTeacher.mutate({ inputValue, setInputValue });
        navigate("/teacher"); 
    };

    const handleAddStudent = (navigate) => {
        mutationStudents.mutate({ inputValue, setInputValue });
        navigate=("./students")
    };

    return (
        <div className="forms">
            <div className={isFormVisible ? "show-form" : "none-form"}>
                <div className="student-input">
                    <input
                        value={inputValue.firstname}
                        onChange={handleChange}
                        type="text"
                        name="firstname"
                        placeholder="Adı daxil edin"
                    />
                    <input
                       value={inputValue.lastname}
                        onChange={handleChange}
                        type="text"
                        name="lastname"
                        placeholder="Soyadı daxil edin"
                    />
                    <input
                        value={inputValue.email}
                        onChange={handleChange}
                        type="email"
                        name="email"
                        placeholder="Emaili daxil edin"
                    />
                    <input
                        value={inputValue.specialty}
                        onChange={handleChange}
                        type="name"
                        name="specialty"
                        placeholder="Ixtisas daxil edin"
                    />
                    <input
                         value={inputValue.point}
                        onChange={handleChange}
                        type="name"
                        name="point"
                        placeholder="Qiymet daxil edin"
                    />
                </div>
            </div>

            <div className="all-button">
    
        <button onClick={handleStudentButtonClick}  disabled={disabledValue}> Add Students</button>
    
    </div>

            <div className={isFormHidden ? "show-form" : "none-form"}>
                <div className="teacher-input">
                    <input
                        onChange={handleChange}
                        type="text"
                        name="firstname"
                        placeholder="Adı daxil edin"
                    />
                    <input
                        onChange={handleChange}
                        type="text"
                        name="lastname"
                        placeholder="Soyadı daxil edin"
                    />
                    <input
                        onChange={handleChange}
                        type="email"
                        name="email"
                        placeholder="Emaili daxil edin"
                    />
                    <input
                        onChange={handleChange}
                        type="name"
                        name="profession"
                        placeholder="Sahenizi daxil edin"
                    />
                </div>
            </div>

            <div className="all-button">
    
        <button onClick={handleTeacherButtonClick} disabled={disabledValue}> Add Teacher</button>
      
        



        </div>
        </div>
    );
}

export default Form;
