import React, { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import { deleteTeacher, getTeachers } from "./TeacherServices";

function Teacher({ data }) {
  const [profession, setProfession] = useState(null);

  const queryClient = useQueryClient();

  const query = useQuery({ queryKey: ["todos"], queryFn: getTeachers });

  const mutation = useMutation({
    mutationFn: deleteTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  function prefessionValue(e) {
    setProfession(e.target.value.toLowerCase());
  }

  const teacherData = useMemo(() => {
    if (!query.data) {
      return [];
    }

    if (!profession) {
      return query.data;
    }

    return query.data.filter((teacher) => teacher.profession === profession);
  }, [profession, query.data]);

  if (teacherData.length === 0) {
    return (
      <div className="not-found">
        No teacher found for the selected specialty.
      </div>
    );
  }

  return (
    <div className="teacher-table">
      <select
        onChange={prefessionValue}
        value={profession}
        name="profession"
        id="profession"
      >
        <option value="Secin">Seçin</option>
        <option value="Müəllim">Müəllim</option>
        <option value="Developer">Developer</option>
        <option value="Həkim">Həkim</option>
      </select>
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
          {teacherData?.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.firstname}</td>
              <td>{data.lastname}</td>
              <td>{data.email}</td>
              <td>{data.profession}</td>
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

export default Teacher;
