import React from 'react'
import"./Collaborator.css"

export default function Collaborator() {
  return (
    <> 
    <h2>How would you like to collaborate with us?</h2>
    <div className='collaboration-buttons'>
          <button>Donation</button>
       
          <button>Raising funds</button>
       
          <button>Volunteer</button>
        </div> 
        <img src="https://cdn.pixabay.com/photo/2023/09/04/22/35/boy-8233868_1280.png"
    className='about-you-img'/>   
    </>
  )
}
