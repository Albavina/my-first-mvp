import React from 'react'
import { useState } from 'react';
import "./SponsorForm.css"

let emptyForm = {firstName:"", lastName:"", email: "", phoneNumber:0, age: 0, kindOfCollaboration: ""}

export default function partnerForm() {
    const [collaborators, setCollaborators]=useState([]);
    const [newCollaborator, setNewCollaborator]=useState(emptyForm);


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
        setNewCollaborator((collaboratorList) => ({...collaboratorList, [name]:value}))}


  return (
    <>
    <h2>BECOME A PARTNER</h2>
    <h3>With your help you will improve the living conditions of the animals in the shelter and the number of animals we can save will depend on it.
If you want to collaborate financially as a member, fill out the following form and click on the send button. We will contact you immediately to ask for your bank details and confirm all the data:</h3>
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

            <div>
            <button type="submit" className="adopt-button">Send</button>
            </div>
        </form>    
    </div>

    </>
  )
}

