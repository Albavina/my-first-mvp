import React from 'react';
import {Routes, Route} from "react-router-dom";
import './App.css'
import Animal from './components/Animal';
import Collaborator from './components/Collaborator';
import Home from './components/Home';
import Navbar from './components/Navbar';
import ErrorPage from './components/ErrorPage';
import AnimalProfile from './components/AnimalProfile';
import Admin from './components/Admin';
import AdoptionForm from './components/AdoptionForm';
import SponsorForm from './components/SponsorForm';
import AdminAnimals from './components/AdminAnimals';
import AdminCollaborators from './components/AdminCollaborators';


function App() {

  return (
    <>
      <header className='header-img'></header>
      <Navbar />

      <h1>RESCUE A BEST FRIEND</h1>
        
    <Routes>
      <Route path="/" element ={<Animal />} >
        <Route path=":id" element ={<AnimalProfile />} />
      </Route>
      <Route path="/:id/adoptionForm" element={<AdoptionForm />}/>
      <Route path="/:id/sponsorForm" element={<SponsorForm />}/>
      <Route path="/home" element = {<Home />} />
      <Route path="/collaborator" element ={<Collaborator />} />
      <Route path="/admin" element ={<Admin />} />
      <Route path="/adminAnimals" element ={<AdminAnimals />} />
      <Route path="/adminCollaborators" element ={<AdminCollaborators />} />
    
      <Route path="*" element ={<ErrorPage />} />
    </Routes>
    </>
  );
};

export default App
