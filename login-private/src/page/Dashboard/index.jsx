import React, {useContext} from "react";
import { Context } from "../../Context/AuthContext";


export const Dashboard = () => {
    const token = localStorage.getItem('token')
    const {authenticated, handleLogout} = useContext(Context)
    console.log(`Situação do usuario na pagina Dashboard: ${authenticated}`);
    return (
        <>
        <h1>Dashboard</h1>
        <h3>token:{ token }</h3>
        <button type="button" onClick={handleLogout}>Sair</button>
        </>
        
    )
}