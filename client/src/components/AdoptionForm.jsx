import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import "./AdoptionForm.css"


export default function AdoptionForm() {
    const [animalInfo, setAnimalInfo]=useState(null);

    const {id} = useParams(); //This is to take the id from the URL


    const getAnimalInfo = async () => {
        try{
            const result = await fetch(`api/animals/${id}`);
            console.log(typeof id)
            const info = await result.json();
            setAnimalInfo(info);
        }catch (error){
            console.log(typeof id)
            console.log(error)
        };
    };
    useEffect(() => {getAnimalInfo()}, [])


  return (
    <>
       <div>
            <h2>🎉We are very happy to know that you want to adopt 🎉</h2>
            <h3>In order to proceed, we need you to fulfill the following form 📑</h3>
       </div>
        <div>
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
         <form>
              <div>
                <label>First Name</label>
                <input type="text" />
                <label>Last Name</label>
                <input type="text" />
              </div>
              <div>
                <label>E-mail</label>
                <input type="mail" />
                <label>Phone Contact</label>
                <input type="number"/>
              </div>
              <div>
                <label>Address</label>
                <input type="text" />
              </div>

              <div>
                {/* AQUÍ AL PULSAR TIENE Q MANDARSE LA INFORMACIÓN AL COLLABORATOR BACKEND */}
                <button type="submit" className="adopt-button">Send</button>
              </div>
        </form>
        <h5>As soon as we receive the information we will contact you in order to tell you what the next steps are 😉</h5>
    </>
  )
}
