import Barra from "../layout/Barra";
import Sidebar from "../layout/Sidebar";
import FormTareas from "../tareas/FormTareas";
import ListadoTareas from "../tareas/ListadoTareas";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/Autenticacion/authContext";

const Proyectos = () => {

	//extraer la informacion de autenticacion
	const authToken = useContext(AuthContext);
	const {usaurioAutenticado} = authToken;

	useEffect(() =>{
		usaurioAutenticado();
	}, []);

	return ( 
		<div className="contenedor-app">
			<Sidebar />
			<div className="seccion-principal">
				<Barra />
				<main>
					<FormTareas />

					<div className="contenedor-tareas">
						<ListadoTareas />
					</div>
				</main>
			</div>
		</div>
	 );
}

export default Proyectos;