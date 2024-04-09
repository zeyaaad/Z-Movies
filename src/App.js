import { Navigate, Route, Routes, useNavigate } from 'react-router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import People from './People';
import Moives from './Moives';
import Tv from './Tv';
import SingUp from './SingUp';
import SingIn from './SingIn';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import NotFound from './NotFound';
import MovieDetials from './MovieDetials';
import TvDetalis from './TvDetials';
import PersonDeralis from './PersonDetalis';
import NavBar from './Navbar';
import Searchpage from './Searchpage';
import Favpage from './Favpage';
import Mylists from './Mylists';
import Listdetalis from './Listdetalis';
function App() {

  let [userdata , setuserdata]=useState(null)
  let [stat , usestat]=useState(false)
  let navigate=useNavigate()
  useEffect(()=> {
      if(localStorage.getItem("usertoken")) {
          userdatatoken()
      }
  }, [])

  
  function LogOut() {
    setuserdata(null)
    localStorage.removeItem("usertoken") ;
    navigate("/singin")
  }
  function userdatatoken() {
    let token=localStorage.getItem("usertoken") ;
    let decodetoken=jwtDecode(token)
    setuserdata(decodetoken)
    console.log(decodetoken)
  }
  function ProtectRoute({ children }) {
  if (localStorage.getItem("usertoken") === null) {
    return <Navigate to="/singin" />;
  } else {
    return children;
  }
}
   setTimeout(() => {
    usestat(true)
  }, 1500);
  return (
    <div className="App">
       {stat?  <div  className='container' >
      <NavBar LogOut={LogOut} userData={userdata}/>
      <Routes>
      <Route path='' element={<SingIn />} />
          <Route path='home' element={<ProtectRoute><Home/></ProtectRoute>} />  
          <Route path='movies' element={<ProtectRoute><Moives/></ProtectRoute>} />  
          <Route path='people' element={<ProtectRoute><People/></ProtectRoute>} />  
          <Route path='searchpage' element={<ProtectRoute><Searchpage/></ProtectRoute>} />  
          <Route path='singup' element={<SingUp/>} />  
          <Route path='singin' element={<SingIn userdatatoken={userdatatoken}/> } />  
          <Route path='tv' element={<ProtectRoute><Tv/></ProtectRoute>} />  
          <Route path='favpage' element={<ProtectRoute><Favpage/></ProtectRoute>} />  
          <Route path='mylists' element={<ProtectRoute><Mylists/></ProtectRoute>}/>  
          <Route path='listdetalis' element={<ProtectRoute><Listdetalis/></ProtectRoute>}> 
            <Route path=':idlist' element={<ProtectRoute><Listdetalis/></ProtectRoute>} /> 
           </Route>  
          <Route path='moviedetalis' element={<ProtectRoute><MovieDetials/></ProtectRoute>} > 
            <Route path=':id' element={<ProtectRoute><MovieDetials/></ProtectRoute>} /> 
          </Route>  
          <Route path='tvdetalis' element={<ProtectRoute><TvDetalis/></ProtectRoute>} > 
            <Route path=':idt' element={<ProtectRoute><TvDetalis/></ProtectRoute>} /> 
          </Route>  
          <Route path='persondetalis' element={<ProtectRoute><PersonDeralis/></ProtectRoute>} > 
            <Route path=':idp' element={<ProtectRoute><PersonDeralis/></ProtectRoute>} /> 
          </Route>  
          <Route path='*' element={<NotFound/>} />  
    </Routes>

    </div>:<div className='vh-100 d-flex align-items-center justify-content-center'>
            <i className='fas fa-spinner fa-spin fa-2x'></i>        
        </div>}
    </div>
  )
   

  
}

export default App;
