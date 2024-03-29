import React, {useContext} from "react";
import{Switch, Route, Redirect} from "react-router-dom";
import { Login } from "../components/Login/Login";
import { Context } from "../Context/AuthContext";
import {ListaCategories} from "../page/categories/categories";
import { CategoriesForm} from "../page/categoriesForms/categoriesForms";




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
         <CustomRoute isPrivate  path="/categories/novo" component={CategoriesForm} />
          <CustomRoute isPrivate  path="/categories/editar/:id" component={ CategoriesForm} />
         <CustomRoute isPrivate  path="/categories" component={ListaCategories} />
        
         
         

         
        </Switch>
    )
}