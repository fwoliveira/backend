import React,{useState,useEffect}from "react";
import { Link } from "react-router-dom";
import api from '../../services/api';
import "./styles.css";
import Table from "react-bootstrap/Form";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export const ListaUsuarios = () => {
    const[data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        mensagem:'',
        loading: true
    });

   
    confirDelete = e => {
        setState({ [e.target.name]: e.target.value });
      };
    
      submitHandler = e => {
        e.preventDefault();
    
        confirmAlert({
          title: "CAUTION !!!!",
          message:
            "Are you absolutely sure you want to delete section " +
            user.name +
            "?",
          buttons: [
            {
              label: "Yes",
              onClick: () => handleDelete(user.id)
            },
            {
              label: "No",
              onClick: () => history.push("/cemeteries")
            }
          ]
        });
      };






    const handleDelete = async (idUser) => {
        const valueToken = localStorage.getItem("token");
        const headers = {
          "headers": {
            "Authorization": "Bearer " + valueToken,
          },
        }
        await api.delete("/user/"+idUser, headers)
        .then((response) => {
          setStatus({
            type: "success",
            mensagem: response.data.mensagem
          })
          getUsers();
        }).catch( (err) => {
          if (err.response) {
            setStatus({
              type: "error",
              mensagem: err.response.data.mensagem
            })
          } else {
            setStatus({
              type: 'error',
              mensagem: "Erro tente mais tarde!!"
            })
          }
        })
      }

      




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
       
        <Table striped bordered hover className="table">
                <thead className="table">
                  <tr className="tr-table">
                    <th>#</th>
                    <th>Nome</th>
                    <th>Email</th>
                    
                  </tr>
                </thead>
                
                <tbody>
                {data.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <button >
                                <Link className="btn-editar" to={"/usuarios/editar/"+user.id}>Editar</Link>
                            </button>
                            <button className="btn-excluir" onClick={() => confirDelete(user)} > 
                            Excluir                                
                            </button>
                        </tr>
                ))}
                </tbody>
      </Table>
<hr />
        
       


        
        </>
        
    )
}