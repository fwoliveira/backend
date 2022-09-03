import React,{useState,useEffect}from "react";
import { Link } from "react-router-dom";
import api from '../../services/api';
import "./styles.css";
import Table from "react-bootstrap/Form";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useHistory } from 'react-router-dom'

export const ListaCategories = () => {

  const history = useHistory();

  const [data, setData] = useState([]);


  const [status, setStatus] = useState({
      type:'',
      mensagem:''
  })

  const confirmDelete = (categories) => {
      confirmAlert({
        title: "CAUTION !!!!",
        message:
          "Are you absolutely sure you want to delete section " +
          categories.id +
          "?",
        buttons: [
          {
            label: "Yes",
            onClick: () => handleDelete(categories.id)
          },
          {
            label: "No",
            onClick: () => history.push("/categories")
          }
        ]
      });
    };

  const handleDelete = async (idCategories) => {
      console.log(idCategories);

      const valueToken = localStorage.getItem('token');
      const headers = {
          'headers': {
              'Authorization': 'Bearer ' + valueToken
          }
      }

      await api.delete("/categories/delete/"+idCategories, headers)
      .then( (response) => {
          setStatus({
              type: 'sucess',
              mensagem: response.data.mensagem
          })
          getUsers();
      }).catch( (err) => {
          if(err.response){
              setStatus({
                  type:'error',
                  mensagem: err.response.data.mensagem
              })
          } else {
              setStatus({
                  type:'error',
                  mensagem: 'Erro: tente mais tarde...'
              })
          }
      })
  }

  const getCategories = async () => {

      const valueToken = localStorage.getItem('token');
      const headers = {
          'headers': {
              'Authorization': 'Bearer ' + valueToken
          }
      }

      await api.get("/categories/all", headers)
          .then( (response) => {
              setData(response.data.categories)
              setStatus({loading: false})
          }).catch( (err) => {
              if(err.response){
                  setStatus({
                      type:'error',
                      mensagem: err.response.data.mensagem
                  })
              } else {
                  setStatus({
                      type:'error',
                      mensagem: 'Erro: tente mais tarde...'
                  })
              }
          })
  }

  useEffect( () => {
      getCategories();
  }, [])
   
    return (
        <>
        
        <div className="heder1">
            <h1>usuarios</h1>
        <ul className="heder">
        <li>
            <Link to="/categories/novo">Nova Categoria</Link>
        </li>
       </ul>
       </div >
       
        <Table striped bordered hover className="table">
                <thead className="table">
                  <tr className="tr-table">
                    <th>#</th>
                    <th>Nome</th>
                    <th>descrição</th>
                    
                  </tr>
                </thead>
                
                <tbody>
                {data.map(categories => (
                        <tr key={categories.id}>
                            <td>{categories.id}</td>
                            <td>{categories.name}</td>
                            <td>{categories.description}</td>
                            <button >
                                <Link className="btn-editar" to={"/categories/editar/"+categories.id}>Editar</Link>
                            </button>
                            <button className="btn-excluir" onClick={() => confirmDelete(categories)} > 
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