import React, { useRef, useState } from 'react';
import axios from 'axios';

function Tpreact(props) {
    const employes = props.employesP;

    const [btnvalue, setBtnvalue] = useState("Add Employes")
    const [search_input_value, setSearch_input_value] = useState("");
    const txtfrm = useRef();
    const txtid = useRef();
    const txtnom = useRef();
    const txtprenom = useRef();
    const txtpost = useRef();
    const txtnomDep = useRef();
    const txtcodeDep = useRef();


    const handlesubmet = async (e)=>{
        let new_employes = ({
            "id": txtid.current.value,
            "nomEmp": txtnom.current.value,
            "prenomEmp": txtprenom.current.value,
            "poste": txtpost.current.value,
            "Departement": {
                "codeDep": txtcodeDep.current.value,
                "nomDep": txtnomDep.current.value
            }
        })
        e.preventDefault();        
        if(btnvalue === "Add Employes"){
            await axios.post("http://localhost:8080/employes",new_employes);
            props.getEmployesP();
            txtfrm.current.reset();

        }else{
            await axios.put("http://localhost:8080/employes/"+txtid.current.value, new_employes);
            props.getEmployesP();
            setBtnvalue("Add Employes");
            txtfrm.current.reset();
        }
    }

    const handleModifer = async(id)=>{
        await axios.get("http://localhost:8080/employes/"+id)
        .then(res=>{
            txtid.current.value = id;
            txtid.current.readOnly = true;
            txtnom.current.value = res.data.nomEmp;
            txtprenom.current.value = res.data.prenomEmp;
            txtpost.current.value = res.data.poste;
            txtcodeDep.current.value = res.data.Departement.codeDep;
            txtnomDep.current.value = res.data.Departement.nomDep;

        })
        setBtnvalue("Modifer");
    }

    const handleDelete = async(id)=>{
        if(window.confirm("Supremer Le Emp ?")){
            await axios.delete("http://localhost:8080/employes/"+id).
            then(res=>props.getEmployesP(), alert("delet aevc succes"))

        }
    }
  return (
    <div className=''>
        <div className='border border-primary'>
            <form id='form' ref={txtfrm}>
                    <h1 className='text-center'>{btnvalue}</h1>
                <table>
                    <tr>
                        <td>id</td><td><input ref={txtid} type='text'  placeholder='id'/></td>
                    </tr>
                    <tr>
                        <td>nom</td><td> <input ref={txtnom} type='text' placeholder='nome'/></td>
                    </tr>
                    <tr>
                        <td>prenom</td><td> <input ref={txtprenom} type='text' placeholder='prenome'/></td>
                    </tr>
                    <tr>
                        <td>Poste</td><td> <input ref={txtpost} type='text' placeholder='Poste'/></td>
                    </tr>
                    <tr>
                        <td>Code Dep</td><td> <input ref={txtcodeDep} type='text' placeholder='Code Dep'/></td>
                    </tr>
                    <tr>
                        <td>Départment</td>
                        <td>
                            <select ref={txtnomDep}>
                                <option value="RH">RH</option>
                                <option value="IT">IT</option>
                            </select>
                        </td>
                    </tr>
                    <tr><input id='btnsubmet' type='button' className='btn btn-success' onClick={(e)=>handlesubmet(e)} value={btnvalue}/></tr>
                </table>
            </form>
        </div>
        <hr/>
        <div className='container'>
            <h1 className='text-center'>Liste Des Employés</h1>
            <i>Search about Emp </i><input id='searchinput' placeholder='Chercher avec nom ou prenom' type='search' onInput={(e)=>setSearch_input_value(e.target.value)}/>
            <table border="2px" className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Poste</th>
                        <th>Départment</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                {
                    employes.map((emp, i)=>(
                        (emp.nomEmp.toLowerCase().search(search_input_value.toLowerCase()) !== -1 || emp.prenomEmp.toLowerCase().search(search_input_value.toLowerCase()) !== -1)?
                        <tr key={i}>
                            <td>{emp.nomEmp}</td>
                            <td>{emp.prenomEmp}</td>
                            <td>{emp.poste}</td>
                            <td>{emp.Departement.nomDep}</td>
                            <td>
                                <button onClick={()=>handleModifer(emp.id)} className='btn btn-warning'>Modifer</button>
                                <button onClick={()=>handleDelete(emp.id)} className='btn btn-danger ms-2'>Supremer</button>
                            </td>
                        </tr>
                        :""
                    ))
                }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Tpreact;