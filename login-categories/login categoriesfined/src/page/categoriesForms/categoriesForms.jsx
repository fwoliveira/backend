import React, { useState, useContext, useEffect } from "react";
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import '../../components/Login/styles.css';
import { UserCircle } from "phosphor-react";



const initialValue = {
    name: '',
    description: ''
}

export const CategoriesForm = (props) => {

    const history = useHistory();

    const [id] = useState(props.match.params.id);
    
    const [values, setValues] = useState(initialValue);
    const [acao, setAcao] = useState('Novo');
    const [status, setStatus] = useState({
        type: '',
        mensagem: '',
        loading: false
    })

 


    const valorInput = e => setValues({
        ... values,
        [e.target.name]: e.target.value
    })

    useEffect( () => {

      const getcategories = async () => {

        const valueToken = localStorage.getItem('token');
        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + valueToken
            }
        }

        await api.get("/categories/show/"+id, headers)
            .then( (response) => {
                if(response.data.categories){
                  setValues(response.data.categories);
                  setAcao('Editar')
                } else {
                  setStatus({
                    type: 'warning',
                    mensagem:'Categorias não encontrada!!!'
                  })
                } 
                // setData(response.data.users)
            }).catch( (err) => {
                if(err.response){
                    setStatus({
                        type:'error',
                        mensagem: err.response.data.mensagem
                    })
                } else {
                    setStatus({
                        type:'error',
                        mensagem: 'Erro: tente mais tarde.....!'
                    })
                }
            })
    }
    
    if(id) getcategories();
    }, [id])

    const formSubmit = async e => {
        e.preventDefault();
        setStatus({ loading: true });

        const valueToken = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'headers': {'Authorization': 'Bearer ' + valueToken}
        }

        if(!id){

          await api.post("/categories/create", values, headers)
              .then( (response) => {
                      console.log(response);
                      setStatus({loading: false});
                      return history.push('/categories')
                  }).catch( (err) => {
                      if(err.response){
                          setStatus({
                              type: 'error',
                              mensagem: err.response.data.mensagem,
                              loading: false
                          })
                      } else {
                          setStatus({
                              type: 'error',
                              mensagem: 'Erro: tente mais tarde...',
                              loading: false
                          })                
                      }  
                  })
        } else {
          await api.put("/categories/update",values, headers)
              .then( (response) => {
                      console.log(response);
                      setStatus({loading: false});
                      return history.push('/categories')
                  }).catch( (err) => {
                      if(err.response){
                          setStatus({
                              type: 'error',
                              mensagem: err.response.data.mensagem,
                              loading: false
                          })
                      } else {
                          setStatus({
                              type: 'error',
                              mensagem: 'Erro: tente mais tarde...',
                              loading: false
                          })                
                      }  
                  })
        }
    }
    return (
        <>
        <div className="box">
           
             {/* <Container className="box"> */}
      <Form onSubmit={formSubmit} className="borderForm">
         <h1  className="h1-usuarios-novo">Usuários</h1>
        {status.type == 'error'? <p>{status.mensagem}</p>: ""}
      {status.type == 'success'? <p>{status.mensagem}</p>: ""}
      {status.loading ? <p>Enviando</p>: ""}
        <div className="user">
          <UserCircle size={60} color="#030202" />{" "}
        </div>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nome:</Form.Label>
          <Form.Control
          value={values.name}
            type="name"
            name="name"
            onChange={valorInput}
            placeholder="Digite seu nome"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescripition">
          <Form.Label className="FormLabel"> descripition: </Form.Label>
          <Form.Control
            value={values.description}
            type="text"
            name="description"
            onChange={valorInput}
            placeholder="Descrição"
          />
        </Form.Group>
        {status.loading 
        ? <Button variant="dark" disabled type="submit">Enviando</Button>
        : <Button variant="dark"  type="submit">Enviar</Button>}
       
      </Form>
      {/* </Container> */}
        </div>
        </>
    )
}