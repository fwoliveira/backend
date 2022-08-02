import React , {useState} from "react";
import api from '../../services/api'
import {Link, useHistory} from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./styles.css";
import { UserCircle } from "phosphor-react";

const initialValue = {
    name:'',
    email:'',
    password:'',
}
 
export const UsuariosForm = () => {
    const history = useHistory();
    const[values, setValues] = useState(initialValue);
    const[acao,setAcao] = useState('Novo');
    const [status, setStatus] = useState({
        type: '',
        mensagem:'',
        loading: false
    }) 
    const valorInput = e => setValues({
        ... values,
        [e.target.name]: e.target.value
    })
    const formSubmit =  async e => {
        e.preventDefault();
        setStatus({loading: true});
    
    const headers={
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('token')}
        }
        await api.post("/user",values,headers)
        .then( (response) =>{
            console.log(response);
            setStatus({loading: false})
            return history.push('/usuarios')
        }).catch((err) =>{
            if(err.response){
                setStatus({
                    type: 'error',
                    mensagem: err.response.data.mensagem,
                    loading: false
                })
            }else{
                setStatus({
                    type: 'error',
                    mensagem: 'Erro: tente mais tarde!',
                    loading: false
                })
            }
        } )
     
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
            type="name"
            name="name"
            onChange={valorInput}
            placeholder="Digite seu nome"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="FormLabel"> Email: </Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={valorInput}
            placeholder="Digite seu e-mail"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={valorInput}
            placeholder="Digite sua senha"
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