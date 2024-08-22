import React from 'react'
import {useState, useEffect} from "react"
import "./AdminCollaborators.css"

let emptyForm = {firstName:"", lastName:"", email:"", phoneNumber:"", age: 0, kindOfCollaboration: ""}
export default function AdminCollaborators() {
  const [collaborators, setCollaborators] = useState([]);
  const [newCollaborator, setNewCollaborator]=useState(emptyForm);
  const [addForm, setAddForm] = useState(false);
  const [updatedCollaborator, setUpdatedCollaborator]=useState(emptyForm)
  const [updateForm, setUpdateForm] = useState(false);
  const [formSentMessage, setFormSentMessage] = useState(false);

  useEffect(() => {
    getCollaborators();
  }, []);

 
const getCollaborators = async () => {
    try{
        const response = await fetch("/api/collaborators") 
        const collaboratorsList = await response.json()
        setCollaborators (collaboratorsList)
    }catch(error){
        console.log(error)
    }
}
const addCollaborator = async () => {
  try {
    const response = await fetch("/api/collaborators", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCollaborator)
    });
    const addedCollaborator = await response.json();
    setCollaborators (addedCollaborator);
    setNewCollaborator(emptyForm);  
    setFormSentMessage(true) 
    }catch(err) {
      console.log(err);
    };
 }
const handleSubmit = event => {
  event.preventDefault();
  addCollaborator();
  setNewCollaborator(emptyForm);
};

const handleChange = (event) => {
  const {name, value} = event.target;
  setNewCollaborator((collaboratorList) => ({...collaboratorList, [name]:value}))
}

const handleShowForm = (boolean) =>{
  setAddForm(boolean)
}

const updateCollaborator = async (id) => {
  try{
    const result = await fetch (`/api/collaborators/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCollaborator)
    });
    const updatedInfo= await result.json();
    setUpdatedCollaborator(updatedInfo)
    getCollaborators()
    setFormSentMessage(true)
    setUpdateForm(false)
  }catch(error){
    console.log(error)
    }
  }

  const handleUpdateChange = (event) =>{
    const {name, value} = event.target;
    setUpdatedCollaborator((data) => ({...data, [name]:value}));
  }

  const handleUpdateSubmit = (e, id) =>{
    e.preventDefault()
    updateCollaborator(id)
    setUpdatedCollaborator(emptyForm)
  }
  const handleUpdateForm = (boolean, collab) => {
    setUpdateForm(boolean)
    setUpdatedCollaborator(collab)
  }

const deleteCollaborator = async (id) => {
  try {
    const response = await fetch(`/api/collaborators/${id}`, {
      method: "DELETE"
    });
    // upon success, update tasks
    const data = await response.json();
    setCollaborators(data);
  } catch (error) {
    console.log(error);
  }
}
  return (
  <>
    <h2>Collaborators List</h2>
    <div className='collaborators-table'>
      <table>
        <tbody>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>E-mail</th>
          <th>Phone Contact</th>
          <th>Age</th>
          <th>Kind of collaboration</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
        {collaborators.map((collaborator) =>
      <tr key={collaborator.id}>
        <td>{collaborator.firstName}</td> 
        <td>{collaborator.lastName}</td> 
        <td>{collaborator.email}</td>
        <td>{collaborator.phoneNumber}</td> 
        <td>{collaborator.age}</td>
        <td>{collaborator.kindOfCollaboration}</td>
        <td>
          <button 
            type="submit" 
            className="update-collab"
            onClick={() => handleUpdateForm (!updateForm, collaborator)}
            >Update
          </button>
        </td>
        <td>
        <button 
          type="submit" 
          className="delete-collab"
          onClick={()=>deleteCollaborator(collaborator.id)}
          >Delete</button>
        </td>
      </tr>
      )}
      </tbody>
      </table> 
    </div>
    <div>
      <button 
      className='add-button'
      onClick={()=>handleShowForm(!addForm)}>
        Add a new collaborator
      </button>
    </div>
    {addForm &&
    <div>
         <form onSubmit={handleSubmit}>
              <div>
                <label>First Name</label>
                <input
                type="text" 
                id="firstName"
                name="firstName"
                value={newCollaborator.firstName}
                onChange={handleChange}/>
              </div>
              <div>
                <label>Last Name</label>
                <input type="text" 
                id="lastName"
                name="lastName"
                value={newCollaborator.lastName}
                onChange={handleChange}/>
              </div>
              <div>
                <label>Age</label>
                <input 
                type="number"
                id="age"
                name="age"
                value={newCollaborator.age}
                onChange={handleChange} />
              </div>
              <div>
                <label>E-mail</label>
                <input type="email"
                id="email"
                name="email"
                value={newCollaborator.email}
                onChange={handleChange}  />
              </div>
              <div>
                <label>Phone Contact</label>
                <input 
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                value={newCollaborator.phoneNumber}
                onChange={handleChange} />
              </div>
              <div>
                <label>Kind of collaboration</label>
                <input type="text"
                id="kindOfCollaboration"
                name="kindOfCollaboration"
                value={newCollaborator.kindOfCollaboration}
                onChange={handleChange}  />
              </div>

             
              <button type="submit" className="adopt-button">Send</button>
              <div className='form-sent-message'>{formSentMessage ? <h4>FORM CORRECTLY SENT!</h4> : null}
              </div>
             
        </form>
        </div>}
    <div>
      {/* {collaborators.map((collab) =>  */}
      {/* <div key={collab.id} className='collaborator-update'> */}
      <div className='collaborator-update'>
      {updateForm &&
      <form onSubmit={e => handleUpdateSubmit(e, updatedCollaborator.id)}>
        <div>
        <label>First Name</label>
            <input 
            type="text" 
            id="firstName" 
            name="firstName"
            value={updatedCollaborator.firstName}
            onChange={handleUpdateChange}/>
        </div>
        <div>
        <label>Last Name</label>
            <input 
            type="text" 
            id="lastName" 
            name="lastName"
            value={updatedCollaborator.lastName}
            onChange={e => handleUpdateChange(e)}/>
        </div>
        <div>
        <label>E-mail</label>
            <input 
            type="email" 
            id="email" 
            name="email"
            value={updatedCollaborator.email}
            onChange={e => handleUpdateChange(e)}/>
        </div>
        <div>
        <label>Phone Number</label>
            <input 
            type="number" 
            id="phoneNumber" 
            name="phoneNumber"
            value={updatedCollaborator.phoneNumber}
            onChange={e => handleUpdateChange(e)}/>
        </div>
        <div>
        <label>Age</label>
            <input 
            type="number" 
            id="age" 
            name="age"
            value={updatedCollaborator.age}
            onChange={e => handleUpdateChange(e)}/>
        </div>
        <div>
        <label>Kind of Collaboration</label>
            <input 
            type="text" 
            id="kindOfCollaboration" 
            name="kindOfCollaboration"
            value={updatedCollaborator.kindOfCollaboration}
            onChange={e => handleUpdateChange(e)}/>
        </div>
        <button type="submit" className='submit-button'>Send</button>
        <div className='form-sent-message'>
          {formSentMessage ? <h4>FORM CORRECTLY SENT!</h4> : null}
        </div>
      </form>}
      </div>
      {/* )} */}
    </div>
  </>
  )
}
