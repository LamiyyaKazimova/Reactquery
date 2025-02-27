import React, { useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStudent, getStudents } from "./StudentServices";

function Students({ data }) {
  const [specialty, setSpecialty] = useState(null);
  const [minpoint, setMinPoint] = useState(null);
  const [maxpoint, setMaxPoint] = useState(null);
  const [search, setSearch] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["todos"], queryFn: getStudents });

  const mutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  function specialtyValue(e) {
    setSpecialty(e.target.value);
  }

  function minValue(e) {
    const value = e.target.value;
    setMinPoint(value === "" ? null : Number(value)); 
  }

  function maxValue(e) {
    const value = e.target.value;
    setMaxPoint(value === "" ? null : Number(value)); 
  }

  function searchValue(e) {
    setSearch(e.target.value);
  }

  function pageValue(page) {
    setCurrentPage(page);
  }

  function resetFilters() {
    setSpecialty("");
    setMinPoint("");
    setMaxPoint("");
    setSearch("");
    setCurrentPage(1);
  }

  const studentData = useMemo(() => {
    if (!query.data) return [];
  
    const filteredData = query.data.filter((student) => {
      const matchesSpecialty = !specialty || (student.specialty && student.specialty.trim().toLowerCase() === specialty.trim().toLowerCase());
  
      const matchesPoint =
        (minpoint === null || student.point >= minpoint) &&
        (maxpoint === null || student.point <= maxpoint);
  
      const searchFiltered =
        (student.firstname && student.firstname.toLowerCase().includes(search.toLowerCase())) ||
        (student.lastname && student.lastname.toLowerCase().includes(search.toLowerCase()));
  
      return matchesSpecialty && matchesPoint && searchFiltered;
    });
  
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [specialty, minpoint, maxpoint, search, currentPage, query.data]);

  const totalPages = Math.ceil(query.data?.length / pageSize);

  return (
    <div className="teacher-table">
      <div className="all">
        <select
          onChange={specialtyValue}
          value={specialty.value}
          name="specially"
          id="student"
        >
          <option value="">Hamisi</option>
          <option value="kompüter elmleri">kompüter elmləri</option>
          <option value="kompüter muhendisliyi">kompüter mühəndisliyi</option>
          <option value="informasiya texnalogiyalari">informasiya texnalogiyaları</option>
          <option value="kibertehlukesizliyi">informasiya texnalogiyaları</option>
        </select>

        <div className="inputs">
          <input
            type="number"
            value={minpoint}
            onChange={minValue}
            placeholder="Min"
          />
          <input
            type="number"
            value={maxpoint}
            onChange={maxValue}
            placeholder="Max"
          />
        </div>

        <div className="search-input">
          <input type="text" value={search} onChange={searchValue} placeholder="Axtarış" />
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
          studentData?.map((data) => (
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
        ):(
        <tr>
          data yoxdu
        </tr>
        )}
        </tbody>
      </table>

      {/* <div className="buttons">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#"
                onClick={() => pageValue(currentPage - 1)}
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>

            
            {Array.from({ length: totalPages }, (_, index) => (
              <li className={`page-item ${currentPage === index + 1 ? "active" : ""}`} key={index}>
                <a className="page-link" href="#" onClick={() => pageValue(index + 1)}>
                  {index + 1}
                </a>
              </li>
            ))}

        
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#"
                onClick={() => pageValue(currentPage + 1)}
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div> */}
    </div>
  );
}

export default Students;
