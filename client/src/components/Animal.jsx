import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './Animal.css';


export default function Animal() {

  const [animals, setAnimals] = useState([]);
  //const selectAnimalType = ["All", ...new Set (animals.map(animal => animal.animalType))]
  //console.log(selectAnimalType)
  // const [animalType, setAnimalType] = useState(selectAnimalType)
  const[adopted, setAdopted]=useState(false);
  let [searchInput, setSearchInput] = useState({
    searchType : "animalType",
    input: ""
  });
  
  const [searchResults, setSearchResults] = useState([]);

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

const fetchData = () => {
  const { searchType, input } = searchInput
  fetch(`/api/animals/search?searchType=${searchType}&input=${input}`)
  .then(res => res.json())
  .then(response => {
   
    setSearchResults(response)
    console.log(searchResults)
  })
}

    const handleChange =  (event) => {
      const value = event.target.value;
      const name = event.target.name
      // const test = searchInput.input
      setSearchInput((state) => ({
        ...state,
        [name] : value
      }))
      fetchData();
    }
    
  return (

    <>
      <div className="search-bar-container">
        <div className='input-wrapper'>
         
          <form>
          <label  htmlFor='searchType'>
            Search By: 
            <select name="searchType"
            onChange={(e) => handleChange(e)}>
              <option value="animalType">Animal Type</option>
              <option value="name">Name</option>
              <option value="age">Age</option>
              <option value="size">Size</option>
              <option value="admissionDate">Admission Date</option>
            </select>
          </label>
          <FaSearch id="search-icon" />
          <input placeholder='Type to search...'
          name = "input"
          value={searchInput.input}
          onChange={(e) => handleChange(e)}
        />
         <div className='results-list'>
          {searchResults.map((e,id) => {
            return <Link to={`/${e.id}`}
            className='search-result'
            key={id}
            >
              {searchInput.searchType === "animalType" && e.animalType}
              {searchInput.searchType === "name" && e.name}
              {searchInput.searchType === "age" && e.age}
              {searchInput.searchType === "size" && e.size}
              {searchInput.searchType === "admissionDate" && e.admissionDate}
            </Link>
          })}
         </div>
        {/* <button>SEARCH</button> */}
         </form>
        </div>
       
      </div>
     
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
    </>
  )
};
