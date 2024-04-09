import  Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
export default function TvDetalis() {
    let [details,usedetalis]=useState(null)
            let [favs , usefavs]=useState([])
  let [mylists,setlists]=useState([]) ;

    let pram=useParams()
    async function getdata(id) {
        let {data}=await Axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=8de4ff3852fc4cff102502a96f2168ee&language=en-US`)
        usedetalis(data)
    }

    useEffect(()=> {
        getdata(pram.idt)
        const storedFavs = JSON.parse(localStorage.getItem("favs"));
        const storedlists=JSON.parse(localStorage.getItem("mylists"))
        if (storedFavs) {
          usefavs(storedFavs);
        }    
        if(storedlists) {
          setlists(storedlists)
        }
    },[])
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
    <div className='detaliss'>
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
          {/* <button className='btn btn-info mt-2' onClick={addtonewlist} >Add To New List   </button> */}
         </>:<> <h3> There Are No lists Avavalble </h3> </>}
      </div>
      <div>{details?
            <div className='row w-75 mx-auto detaliss'>
                <div className="col-lg-4 col-md-6 col-sm-12">
                        <img className='c w-100  ' src={"https://image.tmdb.org/t/p/w500"+details.poster_path} alt="" />
                </div>
                <div className='col-lg-8 col-md-6 col-sm-12 text-detaliss' >
                    <h2>  <i>{details.name} </i></h2>
                    <h5> <i> {details.tagline}</i> </h5>
                    <p className='overv py-3'> {details.overview} </p>
                    <ul>
                        <li>Number Of Episodes: <strong>{details.number_of_episodes}</strong> </li>
                        <li>Popularity: <strong>{details.popularity}</strong> </li>
                        <li>Vote Count: <strong> {details.vote_count}</strong></li>
                        <li> Vote Average: <strong> {details.vote_average}</strong></li>
                    </ul>
                    <button className='btn btn-outline-primary  m-2' onClick={()=>addtofav(details)} > Add To fav </button>
                                <button className='btn btn-outline-info  m-1' onClick={()=>addtolist(details)} > Add To List </button>

                    <Link className='btn btn-primary' to={details.homepage}  target="_blank"> Watch Now </Link>  
                </div>
            </div>      
      :<div className='vh-100 d-flex align-items-center justify-content-center'>
            <i className='fas fa-spinner fa-spin fa-2x'></i>        
        </div>}</div>
    </div>
  )
}
