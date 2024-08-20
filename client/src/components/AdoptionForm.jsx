import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import "./AdoptionForm.css"

let emptyForm = {firstName:"", lastName:"", email: "", phoneNumber:0, age: 0, kindOfCollaboration: ""}

export default function AdoptionForm() {
    const [animalInfo, setAnimalInfo]=useState(null);
    const [collaborators, setCollaborators]= useState([])
    const [newCollaborator, setNewCollaborator]=useState(emptyForm);

    const {id} = useParams(); //This is to take the id from the URL

    const navigate = useNavigate();

    const getAnimalInfo = async () => {
        try{
            const result = await fetch(`api/animals/${id}`);
            console.log(result)
            const info = await result.json();
            setAnimalInfo(info);
        }catch (error){
           console.log(error)
        };
    };

    useEffect(() => {getAnimalInfo()}, [])

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

    const handleCancelClick = () =>{
      navigate("/");
    }
 
  return (
    <>
       <div>
       <h2>ADOPTION</h2>
            <h2>🎉We are very happy to know that you want to adopt 🎉</h2>
            <h3>In order to proceed, we need you to fulfill the following form 📑</h3>
       </div>
        <div>
          {/* Show the information of the animal that is going to be adopted  */}
        {animalInfo && (
            <div className="container">
              <img className="animal-picture" alt="Animal Picture"
              src = {animalInfo.picture}/>
              <div className="info">
                <p>{animalInfo.name}</p>
              </div>
            </div>
        )}
        </div>
          {/* Show the form for the collaborator to introduce personal info */}
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
                // value={checkAge(newCollaborator.age)}
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

              <div>
                <button type="submit" className="adopt-button">Send</button>
 
                <button type="submit" className="cancel-button" onClick={handleCancelClick}>Cancel</button>
              </div>
        </form>
        </div>
    <h4>As soon as we receive the information we will contact you in order to tell you what the next steps are 😉</h4>
    </>
  )
}
