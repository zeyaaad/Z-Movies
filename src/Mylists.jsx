import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Mylists() {

    let [mylists,setlists]=useState([]) ;

    useEffect(()=> {
        let sortedlists=JSON.parse(localStorage.getItem("mylists"))    
        if(sortedlists) {
            setlists(sortedlists);
    }
    },[])
    useEffect(() => {
        const contforcreatelist = document.getElementById("conttocreatenewlist");
        const btncreatenewlist = document.getElementById("btncreatenewlist");
        
        if (contforcreatelist && btncreatenewlist) {
            btncreatenewlist.style.display = 'block';
        }
}, []);

    function addnewlist() {
        let contforcreatelist=document.getElementById("conttocreatenewlist") ;
        let btncreate=document.getElementById("btncreatelist")
        let nameoflist=document.getElementById("name")
        let alertlist=document.getElementById("alertlist")
        if(contforcreatelist!==null) {
                contforcreatelist.classList.replace("d-none" , "d-block") ;
        btncreate.onclick=function() {
            let regname = /^[a-zA-Z][a-zA-Z0-9\s]*$/ig ;
            let statname=regname.test(nameoflist.value)
            if(statname) {
                 let newlist={
                name:nameoflist.value ,
                values:[] ,
            }
        let updatelists=[...mylists]
        let stat=true
        for(let i=0 ; i<mylists.length ; i++) {
            if(mylists[i].name === nameoflist.value) {
                stat=false 
                break
            }
        }
        if(stat) {
            updatelists.push(newlist)
            localStorage.setItem("mylists" , JSON.stringify(updatelists)) ;
            setlists(updatelists);  
            contforcreatelist.classList.replace("d-block" , "d-none")
            alertlist.classList.replace("d-block" , "d-none")
            nameoflist.value=""
        } else {
            alertlist.classList.replace("d-none" , "d-block")
            alertlist.innerHTML="Your list Already Exist !"
        }
    } else {
                alertlist.classList.replace("d-none" , "d-block")
                alertlist.innerHTML="Name of List Must Start With letters"
            }
        }
      
        } else {
            alert("Error Connection Plz try later")
        }

           
    }

function closecont() {
    let contforcreatelist=document.getElementById("conttocreatenewlist") ;
    let nameoflist=document.getElementById("name")
    let alertlist=document.getElementById("alertlist")
    contforcreatelist.classList.replace("d-block" , "d-none");
     nameoflist.value="";
     alertlist.classList.replace("d-block" , "d-none");
}

function dellist(i) {
    let updatelists=[...mylists] 
    updatelists.splice(i,1)
    setlists(updatelists)
    localStorage.setItem("mylists" , JSON.stringify(updatelists)) ;
    }

    return (
    <div className='row w-75 mx-auto'>
        <div id='conttocreatenewlist' className='conttocreatenewlist bg-dark d-none' > 
        <button className='btn btn-close' onClick={closecont} > </button>
            <label htmlFor="name">Name Of List :</label>
            <p className="alert alert-danger d-none p-1" id='alertlist'></p>
            <input type="text" name='name' id='name' className='form-control' />
            <button className='btn btn-primary' id='btncreatelist' > Create </button>
        </div>
        <div className="btncreatenewlist">
             <button onClick={addnewlist} className='btn btn-outline-primary' > Create New List </button>
        </div>
        {mylists.length!==0?<>
            <table className='table table-hover table-dark'>
                <thead>
                    <tr>
                        <th> Number </th>
                        <th> Name List </th>
                        <th> Number of Movies and TVs </th>
                        <th> View </th>
                        <th> Delete</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {mylists.map((list,i)=> <tr key={i} >
                        <td> {i+1} </td>
                        <td> {list.name} </td>
                        <td> {list.values.length} </td>
                        <td> <Link className='btn btn-primary ' to={`/listdetalis/${list.name}`} >View</Link> </td>
                        <td> <button onClick={()=>dellist(i)} className='btn btn-danger'> Delete </button> </td>
                    </tr> )}
                </tbody>
            </table>
        </>:<div className='d-flex align-items-center justify-content-center mt-5' > 
                <h2> There Is No Lists  </h2>
             </div>}

    </div>
  )
}
