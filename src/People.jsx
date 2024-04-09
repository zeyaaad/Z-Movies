import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function People() {
  let [people, setpeople] = useState([]); 
   let [stat , usestat]=useState(false)
  let [searchmoives,setsearchmoives]=useState([])
  async function getData(page) {
    let { data } = await Axios.get(`https://api.themoviedb.org/3/discover/person?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`);
    setpeople(data.results)
  }

  useEffect(() => {
    localStorage.removeItem("searchdatam")
    localStorage.removeItem("searchdatap")
    localStorage.removeItem("searchdattv")
    getData(1)
    usestat(true)
  }, []);

  async function seacrhf(e) {

  let { data } = await Axios.get(`https://api.themoviedb.org/3/search/person?api_key=8de4ff3852fc4cff102502a96f2168ee&query=${e.target.value}`);
    setsearchmoives(data.results.slice(0, 10));

    localStorage.removeItem("searchdatam")
    localStorage.removeItem("searchdattv")
    if(data.results.length>0) {
      localStorage.setItem("searchdatap" , JSON.stringify(data.results)) ;
    }
  console.log(data.results)
}


  let contseacrh=document.querySelector(".contseacrh") ;
  function closecontseacr(){
      contseacrh.classList.add("d-none")
  }

  return (
    
      <>
      {stat?      <>
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
          m.profile_path &&
          <div key={i} className="col-lg-4 col-md-6 col-sm-12 card">
            <Link className='btn' to={`/persondetalis/${m.id}`}><img className='card-img-top w-100' src={"https://image.tmdb.org/t/p/w500"+m.profile_path} alt="" /></Link>
            <h5>{m.name}</h5>
          </div>
        ))}
      </div>
    )}

  </div>

</div>
          {people?<div className="row contdisplay mt-10 justify-content-center ">
          {people.map((p,i)=> <div key={i} className="card col-lg-2 col-md-4 col-sm-6 " >
    <Link className='btn' to={`/persondetalis/${p.id}`} ><img className='card-img-top w-100  ' src={"https://image.tmdb.org/t/p/w500"+p.profile_path} alt="" />
</Link>
            <div className="card-body">
    <h5 className="card-title"> {p.name}  </h5>
    {/* <Link className='btn btn-outline-info mx-auto w-100' to={`/persondetalis/${p.id}`} >More Info..</Link> */}
  </div>
</div>  )}
        </div>: <div className='vh-100 d-flex align-items-center justify-content-center'>
            <i className='fas fa-spinner fa-spin fa fa-3x'></i>        
        </div> }
      </>:<div className='vh-100 d-flex align-items-center justify-content-center'>
            <i className='fas fa-spinner fa-spin fa-2x'></i>        
        </div>}




      </>
  )
}
