import { useContext , useEffect} from 'react';
import AuthContext from "../../context/Autenticacion/authContext";
import { Route, Redirect } from 'react-router-dom';

const RutaPrivada = ({ component: Component, ...props}) => {
    
    const authContext =  useContext(AuthContext);
    const { autenticado, cargando, usaurioAutenticado} = authContext;

    useEffect(() => {
        usaurioAutenticado()
    }, [])
    return ( 
        <Route { ...props} render= { props => !autenticado && !cargando? (
            <Redirect to="/" />
        ): (

            <Component {...props} />

        ) }
        />
 
     );
}
 
export default RutaPrivada;