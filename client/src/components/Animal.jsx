import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Animal.css';


export default function Animal() {

  const [animals, setAnimals] = useState([]);


  useEffect(() => {
    getAnimals()}, []);

  async function getAnimals(){
    try{
      const result = await fetch("/api/animals");
      const info = await result.json();
      setAnimals(info);      
      }catch (error){
        console.log(error)};
    };
  
  const handleAnimalType = () =>{
    setAnimals(animalType.toLowerCase("dog"))
  }
  
  return (
    <div className ="container">
      <h2>Friends looking for a home</h2>
      <div className="animal-type">
        <button onClick={handleAnimalType}>DOGS</button>
        <button>CATS</button>
        <button>OTHERS</button>
      </div>
      {/* <div className='selector'>
        <form>
          <input type="text">Type</input>
          <input type="text">Age</input>
        </form>
      </div> */}
      <div className="outlet-grid">
        <Outlet />
      </div>
      <div className='animal-grid' >
          {animals.map(animal => 
        <Link to={`/${animal.id}`}
        className='animal-card' key={animal.id}>
            <img className="animal-picture" alt="Animal Picture"
            src = {animal.picture}/>
          <div className='container'>
            <h4><b>{animal.name}</b></h4>  
            <p>With us since {animal.admissionDate.split("T")[0]}</p>
          </div>
        </Link>
          )}
           
      </div>
    </div>
  )
};
