import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Animal.css';


export default function Animal() {

  const [animals, setAnimals] = useState([]);
  //const selectAnimalType = ["All", ...new Set (animals.map(animal => animal.animalType))]
  //console.log(selectAnimalType)
  // const [animalType, setAnimalType] = useState(selectAnimalType)
  const[adopted, setAdopted]=useState(false);
  

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
    
  // const handleFilterType = (type) => {
  //   console.log(type)
  // }

    
  return (
    <div className ="container">
      <h2>Friends looking for a home</h2>
      {/* <div className="animal-type">
        {animalType.map((type) => 
        <button key={type}
        onClick={() => handleFilterType(type)}>{type}</button>)}
      </div>  */}
      
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
            <p className="adopted-conditional">{animal.adoptionDate ? "ADOPTED" : null}</p>
          </div>
        </Link>
          )}
           
      </div>
    </div>
  )
};
