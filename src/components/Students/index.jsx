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
  const [currentpage, setCurrentPage] = useState(1);
  let pageSize = 10;

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
    setMinPoint(Number(e.target.value));
  }

  function maxValue(e) {
    setMaxPoint(Number(e.target.value));
  }

  function searchValue(e) {
    setSearch(e.target.value);
  }

  function pageValue(page) {
    setCurrentPage(page);
  }

  const studentData = useMemo(() => {
    if (!query.data) return [];
  
    const filteredData =  query.data.filter((student) => {
      const matchesSpecialty =!specialty || (student.specialty && student.specialty.toLowerCase() === specialty.toLowerCase());
  
      const matchesPoint =
        (minpoint === null || student.point >= minpoint) &&
        (maxpoint === null || student.point <= maxpoint);
  
      const searchFiltered =
        (student.firstname && student.firstname.toLowerCase().includes(search.toLowerCase())) ||
        (student.lastname && student.lastname.toLowerCase().includes(search.toLowerCase()));
  
      return matchesSpecialty && matchesPoint && searchFiltered;
    });
  
    const startIndex = (currentpage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [specialty, minpoint, maxpoint, search, currentpage, query.data]);
  
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
          <input type="text" value={search} onChange={searchValue} />
        </div>
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

      <button
        className="buttons"
        onClick={() => pageValue(currentpage - 1)}
        disabled={currentpage === 1}
      >
        Previous
      </button>
      <button
        className="buttons"
        onClick={() => pageValue(currentpage + 1)}
        disabled={currentpage === Math.ceil(query.data?.length / pageSize)}
      >
        Next
      </button>
    </div>
  );
}

export default Students;
