import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Edit() {

    const Navigate = useNavigate();
    const {id} = useParams();

    const [values, setValues] = useState({
        name: '',
        email: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('https://mysql-student-crud-app-f552d548bcbd.herokuapp.com/edit/' + id, values)
        .then(res => {
            console.log(res)
            Navigate('/');
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        axios.get('https://mysql-student-crud-app-f552d548bcbd.herokuapp.com/read/' + id)
        .then(res => {
             console.log(res);
             setValues({...values, name: res.data[0].name, email: res.data[0].email})
             
        })
        .catch(err => console.log(err))
    }, [])

    

    


  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
            <form onSubmit={handleSubmit}>
                <h2>Update Student</h2>
                <div className="mb-2">
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder='Enter Name' className='form-control' value={values.name}
                    onChange={e => setValues({...values, name:e.target.value})} />
                </div>
                <div className="md-2">
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder='Enter Email' className='form-control' value={values.email}
                    onChange={e => setValues({...values, email:e.target.value})} />
                </div>
                <button className='btn btn-success'>Update</button>
            </form>
        </div>
    </div>
  )
}

export default Edit