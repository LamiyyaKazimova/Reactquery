import React, { useState } from "react";
import "./index.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handlePostClick } from "./Services/studentServices";
import { handlePostTeacherClick } from "./Services/teacherServices";


function Form({ inputValue, setInputValue }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormHidden, setIsFormHidden] = useState(false);
  const [isStudentDisabled, setIsStudentDisabled] = useState(false);
  const [isTeacherDisabled, setIsTeacherDisabled] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  const queryClient = useQueryClient();

  function handleVisible() {
    setIsFormVisible(!isFormVisible);
  }

  function handleHidden() {
    setIsFormHidden(!isFormHidden);
  }

  function handleStudentButtonClick() {
    handleAddStudent();
    handleVisible();
    setIsStudentDisabled(!isStudentDisabled);
  }

  function handleTeacherButtonClick() {
    handleAddTeacher();
    handleHidden();
    setIsTeacherDisabled(!isTeacherDisabled);
  }

  const mutationStudents = useMutation({
    mutationFn:handlePostClick,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setInputValue({
        firstname: "",
        lastname: "",
        email: "",
        specialty: "",
        point: "",
      });
    },
  });

  const mutationTeacher = useMutation({
    mutationFn:handlePostTeacherClick,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setInputValue({
        firstname: "",
        lastname: "",
        email: "",
        profession: "",
      });
    },
  });

  const handleAddTeacher = () => {
    mutationTeacher.mutate({ inputValue, setInputValue });
  };

  const handleAddStudent = () => {
    mutationStudents.mutate({ inputValue, setInputValue });
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
          <select
            onChange={handleChange}
            value={inputValue.specialty}
            name="specialty"
            id="student"
          >
            <option value="">Ixtisas secin</option>
            <option value="kompüter elmleri">kompüter elmləri</option>
            <option value="kompüter muhendisliyi">kompüter mühəndisliyi</option>
            <option value="informasiya texnalogiyalri">
              informasiya texnalogiyaları
            </option>
            <option value="kibertehlukesizliyi">
              kibertehlukesizliyi
            </option>
          </select>
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
        <button onClick={handleStudentButtonClick} disabled={isTeacherDisabled}>
          Add Students
        </button>
      </div>

      <div className={isFormHidden ? "show-form" : "none-form"}>
        <div className="teacher-input">
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
          <select
            onChange={handleChange}
            value={inputValue.profession}
            name="profession"
          >
            <option value="">sahe secin</option>
            <option value="proqramlasdirma">proqramlasdirma</option>
            <option value="suni intelekt">suni intelekt</option>
            <option value="optimallasdirma">optimallasdirma</option>
            <option value="data muhendisliyi">data muhendisliyi</option>
          </select>
        </div>
      </div>

      <div className="all-button">
        <button onClick={handleTeacherButtonClick} disabled={isStudentDisabled}>
          Add Teacher
        </button>
      </div>
    </div>
  );
}

export default Form;
