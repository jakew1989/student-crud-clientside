import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './App.css'

function Home() {


  const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("https://mysql-student-crud-app-f552d548bcbd.herokuapp.com/")
        .then(res =>  {
          console.log(res);
          (res => setData(res.data))
  })
        .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
      axios.delete("https://mysql-student-crud-app-f552d548bcbd.herokuapp.com/delete/" +id)
      .then(res => {
        location.reload();
      })
      .catch(err => console.log(err))
    }
  return (
    <div className="d-flex vw-100 vh-100 bg-primary justify-content-center align-items-center">
    <div id="container" className='w-70 bg-white rounded p-3 position-relative'>
      <div className='d-flex justify-content-between'>
        <h2>Student List</h2>
        <Link className='btn btn-success' to="/create">Create +</Link>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student, index) => {
            return <tr key={index}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
              <Link to={`/read/${student.id}`} className='btn btn-sm btn-info'>Read</Link>
              <Link to={`/edit/${student.id}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
              <button onClick= { () => handleDelete(student.id)} className='btn btn-sm btn-danger'>Delete</button>
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default Home 