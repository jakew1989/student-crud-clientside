import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './App.css'

function Home() {


  const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("https://mysql-student-crud-app-f552d548bcbd.herokuapp.com/")
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }, [])

    console.log(`data is ${data}`)

    const handleDelete = (id) => {
      axios.delete("https://mysql-student-crud-app-f552d548bcbd.herokuapp.com/delete/" +id)
      .then(res => {
        location.reload();
      })
      .catch(err => console.log(err))
    }
  return (
    <div className="flex-column d-flex vw-100 vh-100 bg-primary justify-content-center align-items-center">
    <div className="w-70 bg-white rounded p-3 position-relative">
      <h2>About</h2>
      <p>Introducing my CRUD (create, read, update, delete) app that allows the user to add, delete and modify students name and email. The list is auto-incrementing so each user added will have its own unique ID.</p>
      <br />
      <p>Using Axios, requests are made to a local server which in turn uses express to execute database queries.</p>.
      <br />
      <p>The database was created using mySQL workbench and is stored in a Heroku server. Feel free to add, delete and modify the students yourself!</p>
      
      
    </div>
    <div id="container" className='w-70 bg-white rounded p-3 position-relative'>
      <div className='d-flex justify-content-between title-container'>
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
              <td className='edit-button-container'>
              <Link to={`/read/${student.id}`} className='btn btn-sm btn-info edit-button'>Read</Link>
              <Link to={`/edit/${student.id}`} className='btn btn-sm btn-primary mx-2 edit-button'>Edit</Link>
              <button onClick= { () => handleDelete(student.id)} className='btn btn-sm btn-danger edit-button'>Delete</button>
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