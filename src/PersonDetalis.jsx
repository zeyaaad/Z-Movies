import  Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
export default function PersonDeralis() {
    let [details,usedetalis]=useState(null)
    
    let pram=useParams()
    async function getdata(id) {
        let {data}=await Axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=8de4ff3852fc4cff102502a96f2168ee&language=en-US`)
        usedetalis(data)
    }

    useEffect(()=> {
        getdata(pram.idp)
    },[])

  return (
    <div className='detaliss'>
      <div>{details?
            <div className='row w-75 mx-auto '>
                <div className="col-lg-4 col-md-6 col-sm-12">
                        <img className='c w-100  ' src={"https://image.tmdb.org/t/p/w500"+details.profile_path} alt="" />
                </div>
                <div className='col-lg-8 col-md-6 col-sm-12 text-detaliss' >
                    <h2>  <i>{details.name} </i></h2>
                    <h5>  BD: {details.birthday} <small>In</small> {details.place_of_birth} </h5>
                    <p className='overv py-3 infoaboutperson'> {details.biography} </p>
                </div>
            </div>      
      :<div className='vh-100 d-flex align-items-center justify-content-center'>
            <i className='fas fa-spinner fa-spin fa-2x'></i>        
        </div>}</div>
    </div>
  )
}
