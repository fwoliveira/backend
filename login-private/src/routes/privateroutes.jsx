import React, {useContext} from "react";
import{Switch, Router, Redirect} from "react-router-dom";

import { Context } from "../Context/AuthContext";



function CustomRoute({isPrivate, ...rest}){

    const { authenticated } = useContext(Context);
    if (isPrivate && ! authenticated){
        return <Redirect to="/" />
    }
    return <Route{...rest} />
}

export default function PrivateRoute(){
    return (
        <Switch>
         <CustomRoute exact path="/" component={Login} />
         <CustomRoute isPrivate  path="/dashboard" component={Dashboard} />
        </Switch>
    )
}