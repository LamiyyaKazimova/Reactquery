import React, { useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTeacher, getTeachers } from "./TeacherServices";

function Teacher() {
  const [search, setSearch] = useState("");
  const [profession, setProfession] = useState("");



  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["teachers"], queryFn: getTeachers });

  const mutation = useMutation({
    mutationFn: deleteTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });

  function searchValue(e) {
    setSearch(e.target.value);
  }

  
  function professionValue(e) {
    setProfession(e.target.value);
  }

  function resetFilters() {
    setSearch("");
    setProfession("");
  }

  const teacherData = useMemo(() => {
    if (!query.data) return [];

    return query.data.filter((teacher) => {
      const matchesSearch =
        teacher.firstname.toLowerCase().includes(search.toLowerCase()) ||
        teacher.lastname.toLowerCase().includes(search.toLowerCase());

      const matchesProfession =
        (!profession)|| (teacher.profession.toLowerCase() === profession.toLocaleLowerCase());

      return matchesSearch && matchesProfession;
    });

   
  }, [search, profession, query.data]);



  return (
    <div className="teacher-table">
      <div className="all">
        <input
          type="text"
          value={search}
          onChange={searchValue}
          placeholder="Müəllim adı ilə axtarış"
        />

        <select onChange={professionValue} value={profession}>
          <option value="">Hamisi</option>
          <option value="proqramlasdirma">proqramlasdirma</option>
          <option value="suni intelekt">suni intelekt</option>
          <option value="optimallasdirma">Optimallasdirma</option>
          <option value="data muhendisliyi">Data muhendisliyi</option>
        </select>

        <button onClick={resetFilters}>Filtrləri sıfırla</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Ad</th>
            <th scope="col">Soyad</th>
            <th scope="col">Email</th>
            <th scope="col">Sahə</th>
            <th scope="col">Sil</th>
          </tr>
        </thead>
        <tbody>
          {teacherData.length > 0 ? (
            teacherData.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.id}</td>
                <td>{teacher.firstname}</td>
                <td>{teacher.lastname}</td>
                <td>{teacher.email}</td>
                <td>{teacher.profession}</td>
                <td>
                  <button onClick={() => mutation.mutate(teacher.id)}>
                    Sil
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Müəllim tapılmadı</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Teacher;
