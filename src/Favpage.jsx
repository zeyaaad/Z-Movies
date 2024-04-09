import React, { useState } from 'react'
import { Link } from 'react-router-dom'
export default function Favpage() {
    let [favs , setfavs]=useState(JSON.parse(localStorage.getItem("favs"))||[])
    function deleteitem(i){
      let newfavs=[...favs] 
      newfavs.splice(i,1)
      setfavs(newfavs)
      localStorage.setItem("favs" , JSON.stringify(newfavs));
    }
    function deleteAll(){
      let newfavs=[...favs] 
      newfavs=[];
      setfavs(newfavs)
      localStorage.setItem("favs" , JSON.stringify(newfavs));
    }
  return (
    <div className='row'>
      {favs.length!==0?<>
        <button onClick={deleteAll} className='btn btn-danger clearfav'> Clear </button>
        <h2 className='favstitle' > Your FAVs : </h2>
      <div className=' contdetalislist  mx-auto' >
                {favs.map((m, i) => <div className='w-100 contlistdetalis' key={i}>
                    <div className='left' >
                         <img className='w-50' src={"https://image.tmdb.org/t/p/w500" + m.poster_path} alt="" /> 
                            <div>
                                <h3> Name :  {m.title ? <> {m.title} </> : <>{m.name}</>} </h3>
                                <h4> Type : {m.title ? <> Movie</> : <>TV</>}  </h4>
                                <p>Vote : {m.vote_average}</p>     
                            </div>  
                    </div>
                    <div className='right' >
                        {m.title ? <Link className='btn btn-primary w-100 mt-1' to={`/moviedetalis/${m.id}`} >View</Link> : <Link className='btn btn-primary w-100 mt-1' to={`/tvdetalis/${m.id}`} > View </Link>}
                        <button onClick={()=>deleteitem(i)} className='btn btn-danger' > Delete </button>
                    </div>
                    
                </div>)}
            </div>
      </>:<div className='d-flex  align-items-center justify-content-center'>
            <h1 className='mt-10'> Your Favs Is Empty ! </h1>
        </div>}


    </div>
  )
}
