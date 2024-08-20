import React, { useState, useEffect } from 'react'
import "./AdminAnimal.css"

let emptyForm = {animalType:"", name:"", age: 0, size:"", admissionDate: "", picture: "", description: ""}

export default function Admin() {
    const [animals, setAnimals]=useState([]);
    const [newAnimal, setNewAnimal] = useState(emptyForm);
    const [showForm, setShowForm] = useState(false);
    const [updatedAnimal, setUpdatedAnimal] = useState({animalType:"", name:"", age: 0, size:"", admissionDate: "", adoptionDate:"", picture: "", description: ""});
    const [updateForm, setUpdateForm] = useState (false);
    const [formSentMessage, setFormSentMessage] = useState(false);
   
    const getValue = (value) => value || "";
   
    useEffect(() => {
        getAnimals();
    }, []);

    const getAnimals = async () => {
        try{
            const response = await fetch("/api/animals") 
            const animalList = await response.json()
            setAnimals (animalList)
        }catch(error){
            console.log(error)
        }
    }

    const addAnimal = async () => {
        try {
        const response = await fetch("/api/animals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAnimal)
        });
        const addedAnimal = await response.json();
        setAnimals (addedAnimal);
        setNewAnimal(emptyForm);
        setFormSentMessage(true)  
        }catch(err) {
          console.log(err);
        };
        }

    const handleSubmit = event =>{
       event.preventDefault();
        addAnimal();
        setNewAnimal(emptyForm)
    };

    const handleChange = event => {
        const {name, value} = event.target;
        setNewAnimal((previousAnimalList) => ({...previousAnimalList, [name]:value}));
    };

  const updateAnimal = async (id) => {
    try{
      const result = await fetch (`/api/animals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAnimal)
      });
      const updatedInfo= await result.json();
      setUpdatedAnimal(updatedInfo)
      setFormSentMessage(true)
    }catch(error){
      console.log(error)
    }
  }
  const handleUpdateSubmit = (event, id) =>{
    event.preventDefault();
    const formattedAdmissionDate = new Date(updatedAnimal.admissionDate)
    const formattedAdoptionDate = new Date(updatedAnimal.adoptionDate)
    setUpdatedAnimal((previousAnimalInfo) => ({ ...previousAnimalInfo, admissionDate: formattedAdmissionDate, adoptionDate: formattedAdoptionDate}))
    updateAnimal(id);
    setUpdatedAnimal(emptyForm)
 };

 const handleUpdateChange = event => {
     const {name, value} = event.target;
     setUpdatedAnimal((previousAnimalInfo) => ({...previousAnimalInfo, [name]:value}));
 };

  const handleShowForm = (boolean) => {
    setShowForm(boolean)
  };

  // const handleUpdateForm = (boolean, animal) => {
  //   setUpdateForm(boolean);
  //   setUpdatedAnimal(animal);
  // };

  const handleUpdateForm = (boolean, animal) => {
    setUpdateForm(boolean);
  //Had to add this const in order to be able to send the date to the DB, otherwise, it gives an error
    const formattedAnimal = {
      ...animal,
      admissionDate: animal.admissionDate ? new Date(animal.admissionDate).toISOString().substring(0, 10) : "",
      adoptionDate: animal.adoptionDate ? new Date(animal.adoptionDate).toISOString().substring(0, 10) : ""
    };
    setUpdatedAnimal(formattedAnimal);
  };

  const deleteAnimal = async (id) => {
    try {
      const response = await fetch(`/api/animals/${id}`, {
        method: "DELETE"
      });
      // upon success, update tasks
      const data = await response.json();
      setAnimals(data);
    } catch (error) {
      console.log(error);
    }
  };

    return (
    <>
    <h2>Animals List</h2>
    <button className='add-button' onClick={() => handleShowForm (!showForm)}>Introduce a new animal</button>
    {showForm &&  <form onSubmit={e => handleSubmit(e)}>
        <div>
            <label>Name</label>
            <input 
            type="text" 
            id="name" 
            name="name"
            value={newAnimal.name}
            onChange={e => handleChange(e)}/>
        </div>
        <div>
            <label>Animal type</label>
            <input 
            type="text" 
            id="animalType" 
            name="animalType"
            value={newAnimal.animalType}
            onChange={e => handleChange(e)}/>
        </div>
        <div>
            <label>Age</label>
            <input 
            type="number" 
            id="age" 
            name="age"
            value={newAnimal.age}
            onChange={e => handleChange(e)}/>
        </div>
        <div>
            <label>Size</label>
            <input 
            type="size" 
            id="size" 
            name="size"
            value={newAnimal.size}
            onChange={e => handleChange(e)}/>
        </div>
        <div>
            <label>Admission Date</label>
            <input 
            type="date" 
            id="admission" 
            name="admissionDate"
            value={newAnimal.admissionDate}
            onChange={e => handleChange(e)}/>
        </div>
        <div>
            <label>Animal Picture</label>
            <input 
            type="url" 
            id="picture" 
            name="picture"
            placeholder='Introduce URL'
            value={newAnimal.picture}
            onChange={e => handleChange(e)}/>
        </div>
        <div>
            <label>Description</label>
            <textarea 
            type="text" 
            id="description" 
            name="description"
            value={newAnimal.description}
            onChange={e => handleChange(e)}></textarea>
        </div>
        <button type="submit" className='submit-button'>Submit</button>
        <div className='form-sent-message'>{formSentMessage ? <h4>FORM CORRECTLY SENT!</h4> : null}</div>
    </form>
    }
    <div className='container'>
      {animals.map((animal) =>
      <div key={animal.id} className='animal-list'>
        <h4>{animal.name}</h4>
        <img src={animal.picture} className='animal-list-picture'/>
          <div>
            <button className="update-button" onClick={() => handleUpdateForm (!updateForm, animal)}>Update</button>
        {updateForm &&  
        <form onSubmit={e => handleUpdateSubmit(e, animal.id)}>
        <div>
            <label>Name</label>
            <input 
            type="text" 
            id="name" 
            name="name"
            value={getValue(updatedAnimal.name)}
            onChange={e => handleUpdateChange(e)}></input>
        </div>
        <div>
            <label>Animal type</label>
            <input 
            type="text" 
            id="animalType" 
            name="animalType"
            value={getValue(updatedAnimal.animalType)}
            onChange={e => handleUpdateChange(e)}></input>
        </div>
        <div>
            <label>Age</label>
            <input 
            type="number" 
            id="age" 
            name="age"
            value={getValue(updatedAnimal.age)}
            onChange={e => handleUpdateChange(e)}></input>
        </div>
        <div>
            <label>Size</label>
            <input 
            type="size" 
            id="size" 
            name="size"
            value={getValue(updatedAnimal.size)}
            onChange={e => handleUpdateChange(e)}></input>
        </div>
        <div>
            <label>Admission Date</label>
            <input 
            type="date" 
            id="admission" 
            name="admissionDate"
            value={getValue(updatedAnimal.admissionDate)}
            onChange={e => handleUpdateChange(e)}></input>
        </div>
        <div>
            <label>Adoption Date</label>
            <input 
            type="date" 
            id="adoption" 
            name="adoptionDate"
            value={getValue(updatedAnimal.adoptionDate)}
            onChange={e => handleUpdateChange(e)}></input>
        </div>
        <div>
            <label>Animal Picture</label>
            <input 
            type="url" 
            id="picture" 
            name="picture"
            placeholder='Introduce URL'
            value={getValue(updatedAnimal.picture)}
            onChange={e => handleUpdateChange(e)}></input>
        </div>
        <div>
            <label>Description</label>
            <textarea 
            type="text" 
            id="description" 
            name="description"
            value={getValue(updatedAnimal.description)}
            onChange={e => handleUpdateChange(e)}></textarea>
        </div>
        <button type="submit" className='submit-button'>Send</button>
        <div className='form-sent-message'>{formSentMessage ? <h4>FORM CORRECTLY SENT!</h4> : null}</div>
    </form>}
          <div>
            
          </div>
            <button className="delete-button" onClick={() => deleteAnimal(animal.id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

