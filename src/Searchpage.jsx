import React, {  useEffect ,useState } from 'react'
import { Link } from 'react-router-dom';

export default function Searchpage() {
    let datam=JSON.parse(localStorage.getItem("searchdatam")) ;
    let datatv=JSON.parse(localStorage.getItem("searchdattv")) ;
    let datap=JSON.parse(localStorage.getItem("searchdatap")) ;
  let [favs , usefavs]=useState([]) ;
  let [mylists,setlists]=useState([]) ;
  useEffect(() => {
  const storedFavs = JSON.parse(localStorage.getItem("favs"));
  const storedlists=JSON.parse(localStorage.getItem("mylists"))
  if (storedFavs) {
    usefavs(storedFavs);
  }    
  if(storedlists) {
    setlists(storedlists)
  }
  }, []); 

let contalertforuser=document.getElementById("contalertforuser")
let textalert=document.getElementById("textalert")

function addtofav(elemnt) {
  let statm=true ;
  if(favs.length >0) {
    for(let i=0 ; i<favs.length ; i++) {
      if(elemnt.id===favs[i].id) {
        statm=false ;
        break;
      }
    }
  }
  if(statm){
    let newfavs=[...favs]
    newfavs.push(elemnt)
    usefavs(newfavs)
    localStorage.setItem("favs" , JSON.stringify(newfavs))
    textalert.innerHTML=" Added successfully To Fav "
      contalertforuser.classList.replace("d-none" , "d-block")
    } else {
      textalert.innerHTML=" It's Already In Favs ! "
      contalertforuser.classList.replace("d-none" , "d-block")
    }
  }
  
  function closealert()  {
      contalertforuser.classList.replace("d-block" , "d-none")
  }

function addtolist(item) {
  let contlist = document.getElementById("addtolistcont");
  contlist.classList.replace("d-none", "d-block");
  let updatelists = [...mylists];
  let addbtn = document.getElementById("addbtnlist");
  let nameoflist = document.getElementById("avlists");
  
  if (addbtn !== null) {
    addbtn.onclick = function () {
      // Check if the item already exists in the selected list
      const selectedList = updatelists.find(list => list.name === nameoflist.value);
      if (selectedList && selectedList.values.some(val => val.id === item.id)) {
        textalert.innerHTML = "Already Exist In List!";
        contalertforuser.classList.replace("d-none", "d-block");
        contlist.classList.replace("d-block", "d-none");
        return;
      }

      // Add the item to the selected list
      const listIndex = updatelists.findIndex(list => list.name === nameoflist.value);
      updatelists[listIndex].values.push(item);
      setlists(updatelists);
      localStorage.setItem("mylists", JSON.stringify(updatelists));
      
      textalert.innerHTML = "Added successfully To list";
      contalertforuser.classList.replace("d-none", "d-block");
      contlist.classList.replace("d-block", "d-none");
    };
  }
}

    function closeaddtolist () {
    let contlist=document.getElementById("addtolistcont")
    contlist.classList.replace("d-block" , "d-none")
  }


  return (
    <div className='w-75 mx-auto'>
                    <div id='contalertforuser' className='contalertforuser bg-dark d-none' >
          <h2 id='textalert'> Suucefuly Added </h2>
          <button className='btn btn-primary' onClick={closealert} id='ok' > Ok  </button>
         </div>
            <div id='addtolistcont' className="addtolist bg-dark text-white d-none">
              <button onClick={closeaddtolist} className='btn btn-close closecontlist' >  </button>
        {mylists.length>0?<> 
          <h3> Avalabile Lists : </h3>
          <select name="avlists" id="avlists">
              {mylists.map((list , i)=> <option value={list.name} key={i} >
            {list.name}
          </option>)}
          </select>
          <button id='addbtnlist' className='btn btn-primary d-block mt-2' > Add  </button>
         </>:<> <h3> There Are No lists Avavalble </h3> </>}
      </div>
        {datam!==null?<div className="row">
        <h2 className='mx-auto textseacrh col-12' > All Results Of Search : </h2>
            {datam.map((m , i)=> (
                m.poster_path &&
            <div key={i} className="card col-lg-3 col-md-6 col-sm-12" >
                    <Link className='btn' to={`/moviedetalis/${m.id}`} > <img className='card-img-top w-100  'src={"https://image.tmdb.org/t/p/w500"+m.poster_path} alt="" /></Link>
                    <div className="card-body">
                        <h5 className="card-title"> {m.title}  </h5>
                        <p className="card-text">Release Date: {m.release_date}</p>
                    <button className='btn btn-outline-primary w-100 mt-1' onClick={()=>addtofav(m)} > Add To fav </button>
                     <button className='btn btn-outline-info w-100 mt-1' onClick={()=>addtolist(m)} > Add To List </button>
                </div>
            </div>
            ))}
      </div>:""}
        {datatv!==null?<div className="row">
            <h2 className='mx-auto textseacrh col-12' > All Results Of Search : </h2>
             {datatv.map((m , i)=> (
                m.poster_path &&
                <div key={i} className="card col-lg-3 col-md-6 col-sm-12" >
                    <Link className='btn' to={`/tvdetalis/${m.id}`} > <img className='card-img-top w-100  'src={"https://image.tmdb.org/t/p/w500"+m.poster_path} alt="" /></Link>
                    <div className="card-body">
                        <h5 className="card-title"> {m.name}  </h5>
                        <p className="card-text">Release Date: {m.first_air_date}</p>
                    <button className='btn btn-outline-primary w-100 mt-1' onClick={()=>addtofav(m)} > Add To fav </button>
                     <button className='btn btn-outline-info w-100 mt-1' onClick={()=>addtolist(m)} > Add To List </button>
                </div>
            </div>
            ))}
      </div>:""}
        {datap!==null?<div className="row">
        <h2 className='mx-auto textseacrh col-12' > All Results Of Search : </h2>
                <div className="row">
                    {datap.map((m, i) => (
                        m.profile_path && 
                <div key={i} className="card col-lg-3 col-md-6 col-sm-12" >
                    <Link className='btn' to={`/persondetalis/${m.id}`} > <img className='card-img-top w-100  'src={"https://image.tmdb.org/t/p/w500"+m.profile_path} alt="" /></Link>
                    <div className="card-body">
                        <h5 className="card-title"> {m.name}  </h5>
                </div>
            </div>
                    ))}
                </div>
      </div>:""}

    </div>
  )
}
