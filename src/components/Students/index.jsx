import React, { useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStudent, getStudents } from "./StudentServices";

function Students() {
  const [specialty, setSpecialty] = useState("");
  const [minpoint, setMinPoint] = useState("");
  const [maxpoint, setMaxPoint] = useState("");
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["students"], queryFn: getStudents });

  const mutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  function specialtyValue(e) {
    setSpecialty(e.target.value);
  }

  function minValue(e) {
    const value = e.target.value;
    // setMinPoint(value === "" ? "" : Number(value));
    if(value>100){
    setMinPoint(99)
    }else{
    setMinPoint(value)
    }
  }

  function maxValue(e) {
    const value = e.target.value;
    // setMaxPoint(value === "" ? "" : Number(value));
    if(value>100){
    setMaxPoint(100)
    }else{
    setMaxPoint(value)
    }
  }

  function searchValue(e) {
    setSearch(e.target.value);
  }

  function resetFilters() {
    setSpecialty("");
    setMinPoint("");
    setMaxPoint("");
    setSearch("");
    setCurrentPage(1);
  }
  const { studentData, totalPages, pageNumbers } = useMemo(() => {
    if (!query.data) return { studentData: [], totalPages: 0, pageNumbers: [] };

    const filteredData = query.data.filter((student) => {
      const matchesSpecialty =
        !specialty ||
        (student.specialty &&
          student.specialty.trim().toLowerCase() ===
            specialty.trim().toLowerCase());

      const matchesPoint =
        (minpoint === "" || student.point >= minpoint) &&
        (maxpoint === "" || student.point <= maxpoint);

      const searchFiltered =
        (student.firstname &&
          student.firstname.toLowerCase().includes(search.toLowerCase())) ||
        (student.lastname &&
          student.lastname.toLowerCase().includes(search.toLowerCase()));

      return matchesSpecialty && matchesPoint && searchFiltered;
    });

    const totalFilteredData = filteredData.length;
    const totalPages = Math.ceil(totalFilteredData / pageSize);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const studentData = filteredData.slice(startIndex, endIndex);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return { studentData, totalPages, pageNumbers };
  }, [specialty, minpoint, maxpoint, search, currentPage, query.data]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div className="teacher-table">
      <div className="all">
        <select
          onChange={specialtyValue}
          value={specialty}
          name="specially"
          id="student"
        >
          <option value="">Hamisi</option>
          <option value="kompüter elmleri">kompüter elmləri</option>
          <option value="kompüter muhendisliyi">kompüter mühəndisliyi</option>
          <option value="kibertehlukesizliyi">kibertəhlükəsizliyi</option>
        </select>

        <div className="inputs">
          <input
            type="number"
            value={minpoint}
            onChange={minValue}
            placeholder="Min"
            onKeyDown={(e) =>{if(!/^[0-9]$/.test(e.key) && e.key !== "Backspace"){e.preventDefault()}}}
          />
          <input
            type="number"
            value={maxpoint}
            onChange={maxValue}
            placeholder="Max"
            onKeyDown={(e) =>{if(!/^[0-9]$/.test(e.key) && e.key !== "Backspace"){e.preventDefault()}}}
          />
        </div>

        <div className="search-input">
          <input
            type="text"
            value={search}
            onChange={searchValue}
            placeholder="Axtarış"

          />
        </div>

        <button onClick={resetFilters} className="reset-button">
          Filtrləri sıfırla
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Ad</th>
            <th scope="col">Soyad</th>
            <th scope="col">Email</th>
            <th scope="col">Ixtisas</th>
            <th scope="col">Qiymət</th>
            <th scope="col">Sil</th>
          </tr>
        </thead>
        <tbody>
          {studentData && studentData.length > 0 ? (
            studentData.map((data) => (
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
                  Sil
                </button>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Məlumat yoxdur</td>
            </tr>
          )}
        </tbody>
      </table>

      <nav aria-label="Page navigation" className="page">
        <ul className="pagination pagination-lg">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Əvvəl
            </button>
          </li>

          {pageNumbers.map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Sonrakı
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Students;
