import  Axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
export default function People() {
     let [tvs, settvs] = useState([]); 
     let [stat, usestat]=useState(false)
    let num=new Array(13).fill(1).map((ele , i)=> i+1)
     let [searchmoives,setsearchmoives]=useState([])
    let [favs , usefavs]=useState([])
  let [mylists,setlists]=useState([]) ;
    const [loading, setLoading] = useState(false);
  async function getData(page) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true); 
    try {
      const { data } = await Axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`);
      settvs(data.results);
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
    getData(1)
    usestat(true)
  const storedFavs = JSON.parse(localStorage.getItem("favs"));
  const storedlists=JSON.parse(localStorage.getItem("mylists"))
  if (storedFavs) {
    usefavs(storedFavs);
  }    
  if(storedlists) {
    setlists(storedlists)
  }
  }, []);

let panpans = document.getElementsByClassName("panpan");

Array.from(panpans).forEach(element => {
  element.onclick = function() {
    Array.from(panpans).forEach(ele => {
      ele.classList.remove("activepage");
    });
    element.classList.add("activepage");
  };
});

  async function seacrhf(e) {

  let { data } = await Axios.get(`https://api.themoviedb.org/3/search/tv?api_key=8de4ff3852fc4cff102502a96f2168ee&query=${e.target.value}`);
    setsearchmoives(data.results.slice(0, 10));

    localStorage.removeItem("searchdatam")
    localStorage.removeItem("searchdatap")
    if(data.results.length>0) {
      localStorage.setItem("searchdattv" , JSON.stringify(data.results)) ;
    }
  console.log(data.results)
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
    {!loading? <> 
       {stat?      
    <>
                        <div id='contalertforuser' className='contalertforuser bg-dark d-none ' >
          <h2 id='textalert'> Suucefuly Added </h2>
          <button className='btn btn-primary' onClick={closealert} id='ok' > Ok  </button>
         </div>
            <div id='addtolistcont' className="addtolist bg-dark text-white d-none ">
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
           <div className="row search w-100 text-align-center">
    <div className='col-lg-2 col-md-12 btnsands'>
    <Link className='btn btn-primary' to="/searchpage"> Search  </Link>
  </div>
  <div className='col-lg-8 col-md-10 col-sm-12 searchall'>
    <input className='form-control w-100' type="text" onChange={seacrhf} placeholder='Search about Any TV..' />
    {searchmoives.length > 0 && (
      <div className="contseacrh row ">
        <button className='btn btn-close col-12 ' id='closecontseacr' onClick={closecontseacr} ></button>
        {searchmoives.map((m, i) => (
          m.poster_path &&
          <div key={i} className="col-lg-4 col-md-6 col-sm-12 card">
            <Link className='btn' to={`/tvdetalis/${m.id}`}><img className='card-img-top w-100' src={"https://image.tmdb.org/t/p/w500"+m.poster_path} alt="" /></Link>
            <h5>{m.name}</h5>
          </div>
        ))}
      </div>
    )}

  </div>

</div>



                {tvs?<div className="row mt-10 contdisplay justify-content-center ">
          {tvs.map((tv , i)=> <div key={i} className="card col-lg-2 col-md-4 col-sm-6 " >
    <Link className='btn' to={`/tvdetalis/${tv.id}`} >             <img className='card-img-top w-100  ' src={"https://image.tmdb.org/t/p/w500"+tv.poster_path} alt="" />
 </Link>
            <div className="card-body">
    <h5 className="card-title"> {tv.name}  </h5>
    <p className="card-text">Release Date: {tv.release_date}</p>
    {/* <Link className='btn btn-outline-info mx-auto w-100' to={`/tvdetalis/${tv.id}`} > Read More </Link> */}
    <button className='btn btn-outline-primary w-100 mt-1' onClick={()=>addtofav(tv)} > Add To fav </button>
          <button className='btn btn-outline-info w-100 mt-1' onClick={()=>addtolist(tv)} > Add To List </button>


  </div>
</div>  )}
        </div>: <div className='vh-100 d-flex align-items-center justify-content-center'>
            <i className='fas fa-spinner fa-spin fa'></i>        
        </div> }

      <nav aria-label="..." className='py-5'>
  <ul className="pagination pagination-sm d-flex justify-content-center">
    {num.map((n)=> <li key={n} onClick={()=>getData(n)} className="page-item panpan "><span className="page-link bg-transparent text-white py-1  ">{n}</span></li>  )}
    
  </ul>
</nav>
      </>:<div className='vh-100 d-flex align-items-center justify-content-center'>
            <i className='fas fa-spinner fa-spin fa-2x'></i>        
        </div>}
     </> : <div className='vh-100 d-flex align-items-center justify-content-center'>
            <i className='fas fa-spinner fa-spin fa-2x'></i>        
        </div>}



      </>
  )
}
