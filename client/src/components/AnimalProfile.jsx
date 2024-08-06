import {useEffect, useState} from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import "./AnimalProfile.css"

export default function AnimalProfile() {
    const [animalProfile, setAnimalProfile]=useState(null);

    const {id} = useParams(); //This is to take the id from the URL


    const getAnimalProfile = async () => {
        try{
            const result = await fetch(`api/animals/${id}`);
            const profile = await result.json();
            setAnimalProfile(profile);
        }catch (error){
            console.log(error)
        };
    };
    
    useEffect(() => {getAnimalProfile()}, [id])
    return (
    <>
        <div>Animal Profile</div>
    {animalProfile && (
        <div className="container">
          <img className="animal-picture" alt="Animal Picture"
            src = {animalProfile.picture}/>
            <div className="info">
                <p>My name is {animalProfile.name}</p>
                <p>I am {animalProfile.age} years old</p>
                <p>{animalProfile.description}</p>
            </div>
            <div>
            <button type="submit" className='adopt-button'> 
            <div>
            <Outlet />
            <Link to="adoptionForm">
            Adopt
            </Link>
            </div>
        </button>
            <button type="submit" className='sponsor-button'>Sponsor</button>
            </div>
        </div>
    )}
    
    </>
    
  )
}
