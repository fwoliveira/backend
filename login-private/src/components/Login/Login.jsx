import React, { useState, useContext } from "react";
// import Container from "react-bootstrap/container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { UserCircle } from "phosphor-react";
import api from '../../services/api';
import { useHistory } from 'react-router-dom'
import "./styles.css";
import { Context } from "../../Context/AuthContext";

export function Login() {

  const history = useHistory();
  
    const {authenticated , sigIn }= useContext(Context);
    console.log(`Situação do usuario na pagina login: ${authenticated}`);

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [status, setStatus] = useState({
    type:'',
    mensagem: '',
    loading: false
  })

  const valorInput = e => setUser({
      ...user,
     [e.target.name]: e.target.value
    })

    const loginSubmit = async e => {
      e.preventDefault();
      // console.log(user.email);
      // console.log(user.password);
      const headers = {
        content_type: 'application/json'
      }

      setStatus({
        loading: true
      })

      await api.post('/login', user, {headers})
      .then((response) =>{
        // console.log(response)
        setStatus({
          type: 'success',
          mensagem: response.data.mensagem,
          loading: false
        })
        setStatus({loading: false});
        localStorage.setItem('token', JSON.stringify(response.data.token));
        sigIn(true);
        return history.push('/dashboard');

      }).catch((error) =>{
        setStatus({
          type: 'error',
          mensagem: 'erro: tente mais tarde!',
        })
        if(error.response){
          // console.log(error.response)
          setStatus({
            type: 'error',
            mensagem: error.response.data.mensagem,
            loading: false
          })
        }
      })
    }

  return (
    <div className="box">
      
      {/* <Container className="box"> */}
      <Form onSubmit={loginSubmit} className="borderForm">
        {status.type == 'error'? <p>{status.mensagem}</p>: ""}
      {status.type == 'success'? <p>{status.mensagem}</p>: ""}
      {status.loading ? <p>Validando</p>: ""}
        <div className="user">
          <UserCircle size={60} color="#030202" />{" "}
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="FormLabel">
            Nome de Usuário ou Endereço de Email:
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={valorInput}
            placeholder="Digite seu e-mail ou usuário"
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
        ? <Button variant="dark" disabled type="submit">Acessando</Button>
        : <Button variant="dark"  type="submit">Acessar</Button>}
       
      </Form>
      {/* </Container> */}
    </div>
  );
}
