import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'


function Read() {
    const {id} = useParams();
    const [student, setStudent] = useState([])
    
    useEffect(() => {
        axios.get('https://mysql-student-crud-app-f552d548bcbd.herokuapp.com/read/' + id)
        .then(res => {
             console.log(res);
             setStudent(res.data);
             console.log(student)
        })
        .catch(err => console.log(err))
    }, [])


  return (
    <div>
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
            <h2>Student details</h2>
            <table className='table'>
            <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
        {student.map((student, index) => {
              return <tr key={index} className="">
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              </tr>           
            })}
        </tbody>
            </table>
                <Link to='/' className='btn btn-primary me-2'>Back</Link>
        </div>
      </div>
    </div>
  )
}

export default Read
