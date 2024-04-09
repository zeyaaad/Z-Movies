import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

export default function Listdetalis() {
    let [mylist, setmylist] = useState(null)
    let [listname, setname] = useState("")
    let params = useParams()
    
    useEffect(() => {
        if (params.idlist !== listname) {
            setname(params.idlist);
            const myalllists = JSON.parse(localStorage.getItem("mylists"));

            if (myalllists) {
                for (let i = 0; i < myalllists.length; i++) {
                    if (myalllists[i].name === params.idlist) {
                        setmylist(myalllists[i]);
                        break;
                    }
                }
            }
        }
    }, []);
    function del(i) {
        let updatedList =  {
            name:listname ,
            values:[...mylist.values]
        }
        updatedList.values.splice(i , 1)
        setmylist(updatedList)
        let alllists=JSON.parse(localStorage.getItem("mylists")); 
        let updatelists=[...alllists] 
        let index=0 ;
        updatelists.map((list , i)=>{
            if(list.name === listname) {
                index+=i;
            }
        })
        updatelists[index]=updatedList 
        localStorage.setItem("mylists" , JSON.stringify(updatelists))
    }
    return (
        <div className='row'>
            {mylist ? <>
            <div className=' contdetalislist  mx-auto' >
                <h1 className='mx-auto listnamed'> Name : {mylist.name}  </h1>
                {mylist.values.length>0?<>{mylist.values.map((m, i) => <div className='w-100 contlistdetalis' key={i}>
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
                        <button onClick={()=>del(i)} className='btn btn-danger' > Delete </button>
                    </div>
                    
                </div>)}</> : <div className='mt-5 d-flex align-items-center justify-content-center'>
                    <h1> Your List Is Empty </h1>
                </div>}
            </div>
            </> :
                <div className='vh-100 d-flex align-items-center justify-content-center'>
                    <i className='fas fa-spinner fa-spin fa-2x'></i>
                </div>}
        </div>
    )
}
