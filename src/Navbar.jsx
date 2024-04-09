import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(props) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  function toggleNav() {
    setIsNavOpen(!isNavOpen);
  }

  return ( 
    <>
      <div className='Navbar' >
          <h5> <Link to="home" >Z-Movies</Link> </h5>
          <i className="fa-solid fa-bars d-lg-none d-sm-block" onClick={toggleNav} id='iconnav'></i>
          <ul id='navlinks' className={isNavOpen ? 'visible' : 'hidden'}>
            {props.userData ? 
              <div className='links'>
                <li><Link  to="home">Home</Link></li>
                <li><Link  to="movies">Movies</Link></li>
                <li><Link  to="tv">TV</Link></li>
                <li><Link  to="people">People</Link></li>
                <li><Link  to="favpage">Favourite</Link></li>
                <li><Link  to="mylists">Mylists</Link></li>
              </div>
            : null}
            {props.userData ? 
              <div className='logout'>
                <span onClick={props.LogOut} className="btn btn-primary">Logout</span>
              </div>
            : 
              <div className='login '>
                <Link className="btn btn-primary" to="singup">Register</Link>
                <Link className="btn btn-primary" to="singin">LogIn</Link>
              </div>
            }
          </ul>
      </div>
    </>
  )
}
