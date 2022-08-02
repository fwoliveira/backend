import React,{useState,useEffect}from "react";
import { Link } from "react-router-dom";
import api from '../../services/api';
import "./styles.css";

export const ListaUsuarios = () => {
    const[data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        mensagem:''
    });
    const getUsers = async () => {
        const valueToken = localStorage.getItem('token')
        const headers={
            'headers': {'Authorization': 'Bearer '+ valueToken},
        }
        await api.get("/users",headers)
        .then((response) => {
            setData(response.data.users)
        }).catch((err) => {
            if(err.response){
                setStatus({ 
                     type: 'error',
                     mensagem: err.response.data.mensagem
                })
            }else{
                setStatus({ 
                    type: 'error',
                    mensagem: 'Erro: Tente mais tarde!'
                })
            }
        })
    }
    useEffect(()=>{
        getUsers();
    },[]);
   
    return (
        <>
        
        <div className="heder1">
            <h1>usuarios</h1>
        <ul className="heder">
        <li>
            <Link to="/dashboard">dashboard</Link>
        </li>
        <li>
            <Link to="/usuarios">usuarios</Link>
        </li>
       </ul>
       </div >
      
       {data.map(user =>(
        <div className="table">
            <div key={user.id}>
            <div> {user.name} </div>
            <div> {user.id} </div>
            <div> {user.gender}</div>
        </div>
<hr />
        </div>
       ))}


        
        </>
        
    )
}