import  Axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
export default function Tvs() {
  let [Tvs , setTvs]=useState([]); 


  async function getData(media,callback) {
    let {data}=await Axios.get(`https://api.themoviedb.org/3/trending/${media}/week?api_key=f1aca93e54807386df3f6972a5c33b50`)
    callback(data.results)
  }

  useEffect(()=> {
    getData("tv" , setTvs)
  } , [])

  return (
      <>
        <div className="row ">
          {Tvs.map((moive , i)=> <div key={i} className="card col-2 " >
    <Link className='btn' to={`/moviedetalis/${moive.id}`} ><img className='card-img-top w-100  ' src={"https://image.tmdb.org/t/p/w500"+moive.poster_path} alt="" />
 </Link>
            <div className="card-body">
    <h5 className="card-title"> {moive.name}  </h5>
    <p className="card-text">Release Date: {moive.release_date}</p>
    <Link className='btn btn-outline-info mx-auto w-100' to={`/moviedetalis/${moive.id}`} > Read More </Link>
  </div>
</div>  )}
        </div>

      </>
  )
}
