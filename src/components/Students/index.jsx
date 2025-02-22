import React, { useCallback, useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStudent, getStudents } from "./StudentServices";

function Students({ data }) {
  const [specialty, setSpecialty] = useState(null);
  const [minpoint, setMinPoint] = useState(null);
  const [maxpoint, setMaxPoint] = useState(null);

  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["todos"], queryFn: getStudents });

  const mutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const dataValue=""

  function specialtyValue(e) {
    setSpecialty(e.target.value);
  }

  function pointValue(e) {
    setMinPoint(e.target.value.toLowerCase());
    setMaxPoint(e.target.value.toLowerCase());
  }


  

  const teacherPointData = useMemo(() => {
    if (!query.data) {
      return [];
    }

    if (!maxpoint && minpoint) {
      return query.data;
    }

    return query.data.filter(
      (students) => students.point >= minpoint || students.point <= maxpoint
    );
  }, [maxpoint, minpoint, query.data]);

  const studentData = useMemo(() => {
    if (!query.data) {
      return [];
    }

    if (!specialty) {
      return query.data;
    }
    return query.data.filter(
      (student) => student.specialty.toLowerCase() === specialty.toLowerCase()
    );
  }, [specialty, query.data]);

  if (studentData.length === 0) {
    return (
      <div className="not-found">
        No students found for the selected specialty.
      </div>
    );
  }


  

  return (
    <div className="teacher-table">
      <div className="all">
        <select
          onChange={specialtyValue}
          value={specialty}
          name="specially"
          id="student"
        >
          <option value="">Secin</option>
          <option value="kompüter elmleri">kompüter elmləri</option>
          <option value="kompüter muhendisliyi">kompüter mühəndisliyi</option>
          <option value="informasiya texnalogiyalari">
            informasiya texnalogiyaları
          </option>
        </select>

        <div className="inputs">
          <input value={minpoint} type="text" />
          <input value={maxpoint} type="text" />
          <button className="button" onClick={pointValue}>
            Goster
          </button>
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Ad</th>
            <th scope="col">Soyad</th>
            <th scope="col">Email</th>
            <th scope="col">Ixtisas</th>
            <th scope="col">Qiymət</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {studentData?.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.firstname}</td>
              <td>{data.lastname}</td>
              <td>{data.email}</td>
              <td>{data.specialty}</td>
              <td>{data.point}</td>
              <button
                onClick={() => {
                  mutation.mutate(data.id);
                }}
              >
                Delete
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;
