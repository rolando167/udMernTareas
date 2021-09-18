import { useContext, useEffect } from "react";
import AuthContext from "../../context/Autenticacion/authContext";

const Barra = () => {

    //extraer la informacion de autenticacion
	const authToken = useContext(AuthContext);
	const {usuario, usaurioAutenticado, cerrarSesion} = authToken;

	useEffect(() =>{
		usaurioAutenticado();
	}, []);

 

    return ( 
        <header className="app-header">
            {
                usuario?<p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p>
                : null
            }
            
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => cerrarSesion()}
                >
                Cerrar Sesión
                </button>
            </nav>
        </header>
     );
}
 
export default Barra;