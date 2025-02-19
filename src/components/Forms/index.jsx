import React from "react";
import './index.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handlePostClick, handlePostTeacherClick } from "./FormServices";

function Form({ inputValue, setInputValue }) {
    function handleChange(e) {
        const { name, value } = e.target;
        setInputValue((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    }

    const queryClient = useQueryClient();

  
    const mutationStudents = useMutation({
        mutationFn: handlePostClick,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
        },
    });


    const mutationTeacher = useMutation({
        mutationFn: handlePostTeacherClick,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teacher"] });
        },
    });

    const handleAddTeacher = () => {
        mutationTeacher.mutate({ inputValue,setInputValue });
    };

    const handleAddStudent = () => {
        mutationStudents.mutate({ inputValue,setInputValue });
    };

    return (
        <div className="form">
            <input onChange={handleChange} type="text" name="firstname" placeholder="Adı daxil edin" />
            <input onChange={handleChange} type="text" name="lastname" placeholder="Soyadı daxil edin" />
            <input onChange={handleChange} type="email" name="email" placeholder="Emaili daxil edin" />
            <div className="all-button">
                <button onClick={handleAddTeacher}> Add Teacher</button>
                <button onClick={handleAddStudent}> Add Students</button>
            </div>
        </div>
    );
}

export default Form;
