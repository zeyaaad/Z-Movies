import  Axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
export default function Home() {
  let [movies, setMovies] = useState([]); 
  let [tvs, setTvs] = useState([]);
  let [people, setPeople] = useState([]);
  let [timeWindow, setTimeWindow] = useState('day'); 
  let [stat , usestat]=useState(false)
  let [searchmoives,setsearchmoives]=useState([])
  let [searchmtvs,setsearchtvs]=useState([])
  let [searchpersons,setsearchpersons]=useState([])
  let [typesearch , settypesearch]=useState("movie") ;
  let [favs , usefavs]=useState([]) ;
  let [mylists,setlists]=useState([]) ;
const [loading, setLoading] = useState(false);
  async function getData(media, callback) {
    setLoading(true); 
    try {
        let { data } = await Axios.get(`https://api.themoviedb.org/3/trending/${media}/${timeWindow}?api_key=8de4ff3852fc4cff102502a96f2168ee&language=en-US`);
        callback(data.results.slice(10, 20));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); 
    }
  }

  useEffect(() => {
    localStorage.removeItem("searchdatam")
    localStorage.removeItem("searchdatap")
    localStorage.removeItem("searchdattv")
    getData("movie", setMovies);
    getData("tv", setTvs);
    getData("person", setPeople);
    usestat(true)
    console.log(typesearch); 
  const storedFavs = JSON.parse(localStorage.getItem("favs"));
  const storedlists=JSON.parse(localStorage.getItem("mylists"))
  if (storedFavs) {
    usefavs(storedFavs);
  }    
  if(storedlists) {
    setlists(storedlists)
  }
  }, [timeWindow , typesearch]); 

  const handleTimeWindowChange = (e) => {
    setTimeWindow(e.target.value);
  }

  async function seacrhf(e) {

  let { data } = await Axios.get(`https://api.themoviedb.org/3/search/${typesearch}?api_key=8de4ff3852fc4cff102502a96f2168ee&query=${e.target.value}`);
  if(typesearch==="movie") {
    setsearchmoives(data.results.slice(0, 10));
    localStorage.removeItem("searchdattv")
    localStorage.removeItem("searchdata")
    localStorage.removeItem("searchdatap")
    if(data.results.length>0) {
      localStorage.setItem("searchdatam" , JSON.stringify(data.results)) ;
    }
  } else if(typesearch==="tv") {
    setsearchtvs(data.results.slice(0, 10))
    localStorage.removeItem("searchdatam")
    localStorage.removeItem("searchdatap")
    if(data.results.length>0) {
      localStorage.setItem("searchdattv" , JSON.stringify(data.results)) ;
    }
  } else {
    setsearchpersons(data.results.slice(0, 10))
    localStorage.removeItem("searchdatam")
    localStorage.removeItem("searchdattv")
    if(data.results.length>0) {
      localStorage.setItem("searchdatap" , JSON.stringify(data.results)) ;
    }
  }

}

function changetypeseacrh(e) {
  settypesearch(e.target.value)

}

let contseacrh=document.querySelector(".contseacrh") ;
function closecontseacr(){
  contseacrh.classList.add("d-none")
}



function addtofav(elemnt) {
  let contalertforuser=document.getElementById("contalertforuser")
  let textalert=document.getElementById("textalert")
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
    let contalertforuser=document.getElementById("contalertforuser")
      contalertforuser.classList.replace("d-block" , "d-none")
  }

function addtolist(item) {
  let contalertforuser=document.getElementById("contalertforuser")
  let textalert=document.getElementById("textalert")
  let contlist = document.getElementById("addtolistcont");
  contlist.classList.replace("d-none", "d-block");
  let updatelists = [...mylists];
  let addbtn = document.getElementById("addbtnlist");
  let nameoflist = document.getElementById("avlists");
  
  if (addbtn !== null) {
    addbtn.onclick = function () {
      const selectedList = updatelists.find(list => list.name === nameoflist.value);
      if (selectedList && selectedList.values.some(val => val.id === item.id)) {
        textalert.innerHTML = "Already Exist In List!";
        contalertforuser.classList.replace("d-none", "d-block");
        contlist.classList.replace("d-block", "d-none");
        return;
      }

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
      <>
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

          {!loading? <>  
                  {stat?      <>

<div className="row search w-100 text-align-center">
    <div className='col-lg-2 col-md-12 btnsands'>
    <label htmlFor="selectval"> Sort By :</label>
    <select onChange={handleTimeWindowChange} id="selectval">
      <option value="day">Day</option>
      <option value="week">Week</option>
    </select>
  </div>


    <div className='col-lg-2 col-md-12 btnsands'>
    <Link className='btn btn-primary' to="/searchpage"> Search  </Link>
    <select onChange={changetypeseacrh} >
      <option value="movie">Movie</option>
      <option value="tv">Tv</option>
      <option value="person">Person</option>
    </select>
  </div>
  <div className='col-lg-8 col-md-10 col-sm-12 searchall'>
    <input className='form-control w-100' type="text" onChange={seacrhf} placeholder='Search about Anything' />
    {searchmoives.length > 0 && typesearch === "movie" && (
      <div className="contseacrh row ">
        <button className='btn btn-close col-12 ' id='closecontseacr' onClick={closecontseacr} ></button>
        {searchmoives.map((m, i) => (
          m.poster_path &&
          <div key={i} className="col-lg-4 col-md-6 col-sm-12 card">
            <Link className='btn' to={`/moviedetalis/${m.id}`}><img className='card-img-top w-100' src={"https://image.tmdb.org/t/p/w500"+m.poster_path} alt="" /></Link>
            <h5>{m.title}</h5>

          </div>
        ))}
      </div>
    )}

    {searchmtvs.length > 0 && typesearch === "tv" && (
      <div className="contseacrh" >
        <button className='btn btn-close col-12 ' id='closecontseacr' onClick={closecontseacr} ></button>
        {searchmtvs.map((t, i) => (
          t.poster_path &&
          <div key={i} className="col-lg-4 col-md-6 col-sm-12 card">
            <Link className='btn ' to={`/tvdetalis/${t.id}`} ><img className='card-img-top w-100' src={"https://image.tmdb.org/t/p/w500"+t.poster_path} alt="" /></Link>
            <h5>{t.name}</h5>
          </div>
        ))}
      </div>
    )}

    {searchpersons.length > 0 && typesearch === "person" && (
      <div className="contseacrh">
        <button className='btn btn-close col-12 ' id='closecontseacr' onClick={closecontseacr} ></button>
        {searchpersons.map((p, i) => (
          p.profile_path &&
          <div key={i} className="col-lg-4 col-md-6 col-sm-12 card">
            <Link className='btn' to={`/persondetalis/${p.id}`} ><img className='card-img-top w-100' src={"https://image.tmdb.org/t/p/w500"+p.profile_path} alt="" /> </Link>
            <h5>{p.name}</h5>
          </div>
        ))}
      </div>
    )}
  </div>

</div>



        <div className="row  contdisplay  ">
          <div className="col-4 d-flex align-items-center tittlee">
          
            <div >
              <div className='brd w-25 mb-4' ></div>
            <h2>
              Trending <br /> Moives <br />to Watch now 
            </h2>
            <p className='muted'>Most watched movies by Week</p>

            <div className='brd mb-4 w-100' ></div>

            </div>
          </div>
          {movies.map((moive , i)=> <div key={i} className="card col-lg-2 col-md-4 col-sm-6" >
         
    <Link className='btn' to={`/moviedetalis/${moive.id}`} >   <img className='card-img-top w-100  ' src={"https://image.tmdb.org/t/p/w500"+moive.poster_path} alt="" /></Link>
    <div className="card-body">
      <h5 className="card-title"> {moive.title}  </h5>
      <p className="card-text">Release Date: {moive.release_date}</p>
      {/* <Link className='btn btn-primary w-100 mt-1' to={`/moviedetalis/${moive.id}`} > Read More </Link> */}
      <button className='btn btn-outline-primary w-100 mt-1' onClick={()=>addtofav(moive)} > Add To fav </button>
      <button className='btn btn-outline-info w-100 mt-1' onClick={()=>addtolist(moive)} > Add To List </button>

  </div>
</div>  )}
        </div>
        <div className="row contdisplay  ">
          <div className="col-4 d-flex align-items-center tittlee">
            <div >
              <div className='brd w-25 mb-4' ></div>
            <h2>
              Trending <br /> TVs <br />to Watch now 
            </h2>
            <p className='muted'>Most watched TVs by Week</p>
            <div className='brd mb-4 w-100' ></div>
            </div>
          </div>
          {tvs.map((t , i)=> <div key={i} className="card col-lg-2 col-md-4 col-sm-6" >
        <Link className='btn ' to={`/tvdetalis/${t.id}`} ><img className='card-img-top w-100  ' src={"https://image.tmdb.org/t/p/w500"+t.poster_path} alt="" /></Link> 
            <div className="card-body">
    <h5 className="card-title"> {t.name}  </h5>
    <p className="card-text">Release Date: {t.first_air_date}</p>
        {/* <Link className='btn btn-outline-danger w-100 mt-1' to={`/tvdetalis/${t.id}`} > Read More </Link>  */}
        <button className='btn btn-outline-primary w-100 mt-1' onClick={()=>addtofav(t)} > Add To fav </button>
      <button className='btn btn-outline-info w-100 mt-1' onClick={()=>addtolist(t)} > Add To List </button>



  </div>
</div>  )}
        </div>
        <div className="row contdisplay  ">
          <div className="col-4 d-flex align-items-center tittlee">
            <div >
              <div className='brd w-25 mb-4' ></div>
            <h2>
              Trending <br /> Persons <br />to Watch Now 
            </h2>
            <p className='muted'>The Most Comman Persons</p>
            <div className='brd mb-4 w-100' ></div>
            </div>
          </div>
          {people.map((p , i)=> <div key={i} className="card col-lg-2 col-md-4 col-sm-6" >
      <Link className='btn' to={`/persondetalis/${p.id}`} ><img className='card-img-top w-100  ' src={"https://image.tmdb.org/t/p/w500"+p.profile_path} alt="" />
</Link> 
            <div className="card-body">
    <h5 className="card-title"> {p.name}  </h5>
    </div>
</div>  )}
        </div>
        </>:<div className='vh-100 d-flex align-items-center justify-content-center'>
            <i className='fas fa-spinner fa-spin fa-2x'></i>        
        </div>}
           </>  : <div className='vh-100 d-flex align-items-center justify-content-center'>
            <i className='fas fa-spinner fa-spin fa-2x'></i>        
        </div>}

      </>

  )
}
