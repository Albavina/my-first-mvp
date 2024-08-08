import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import"./Collaborator.css"

export default function Collaborator() {
  return (
    <> 
    <h2>How would you like to collaborate with us?</h2>
  
    <div className='collaboration-buttons'>
      <div>
        <button type="submit"> 
        <div>
        <Outlet />
        <Link to="donate">
        Donate
        </Link>
      </div>
      </button>
    </div>

    <div>
      <button type="submit"> 
        <div>
        <Outlet />
        <Link to="becomePartner">
          Become a partner  
        </Link>
        </div>
      </button>
    </div> 

    <div>
      <button type="submit"> 
        <div>
        <Outlet />
        <Link to="volunteer">
        Volunteer  
        </Link>
        </div>
      </button>
      </div> 
    </div>

    <div>
      <img src="https://cdn.pixabay.com/photo/2023/09/04/22/35/boy-8233868_1280.png"
      className='collaborator-img'/> 
    </div>
       
    </>
  )
}
