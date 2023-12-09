import { useState, useEffect } from 'react';
import Tpreact from './Tpreact';
import axios from 'axios';

function AppTp() {
    const [employes, setEmployes] = useState([]);
    

    const getEmployes = async()=>{
        await axios.get("http://localhost:8080/employes").then(
            res=>setEmployes(res.data)
        )
    }

    useEffect(
        getEmployes
    ,[])


    return (
        <div>
            <Tpreact getEmployesP={getEmployes} employesP={employes}/>
        </div>
    )
}


export default AppTp;