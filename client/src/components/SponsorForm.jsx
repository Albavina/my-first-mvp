import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import "./SponsorForm.css"

let emptyForm = {firstName:"", lastName:"", email: "", phoneNumber:0, age: 0, kindOfCollaboration: ""}

export default function SponsorForm() {
    const [animalInfo, setAnimalInfo]=useState(null);
    const [collaborators, setCollaborators]=useState([]);
    const [newCollaborator, setNewCollaborator]=useState(emptyForm);

    const navigate = useNavigate();

    const {id} = useParams(); //This is to take the id from the URL
    console.log(id)
    const getAnimalInfo = async () => {
        try{
            const result = await fetch(`/api/animals/${id}`);
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
        setNewCollaborator((collaboratorList) => ({...collaboratorList, [name]:value}))}
      
      const handleCancelClick=()=>{
        navigate("/");
      }


  return (
    <>
    <h2>SPONSORSHIP</h2>
    <h3>Maybe you do not have the space, the time or permission where you live to have a pet but you still want to help one somehow.
    The sponsorship is the best option for you. The fee is from €5/month. Everyone can choose to sponsor one of our friends by donating €5/month or, if their finances allow it, prefer to give €10/month, €15/month or the amount they choose. 
    If you want to go ahead, it's very simple. You just have to fill out this form:
    </h3>
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
                <button type="submit" className="cancel-button" onClick={handleCancelClick}>Cancel</button>
              </div>
        </form>    
    </div>


    <h3>Once you have sponsored a dog, you will receive information via email about its status, its progress and its life in general. We will also send you, on its behalf, a postcard to wish you a happy Christmas, as well as photos throughout the year.🤗</h3>
    </>
  )
}
