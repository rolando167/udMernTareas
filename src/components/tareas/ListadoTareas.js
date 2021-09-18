import Tarea from "./Tarea";
import { useContext } from "react";
import proyectoContext from "../../context/Proyectos/proyectoContext";
import {TareasContext} from "../../context/Tareas/TareasContext";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const ListadoTareas = () => {

	const {proyecto, eliminarProyecto} = useContext(proyectoContext);
	const {tareasProyecto} = useContext(TareasContext);


	if(!proyecto) {
		return <h2>Seleccionar un Proyecto ⛔!!</h2>;
	}

	// Aplicar Array desctruturin para extraer el proyecto actual
	const [proyectoActual] = proyecto;

	return (
		<>
			<h2>Proyecto: {proyectoActual?proyectoActual.nombre:null}</h2>
			<ul className="listado-tareas">

				{
					tareasProyecto.length === 0?
						<li className="tarea">No hay Tareas</li>
					:
					<TransitionGroup>
					{
						tareasProyecto.map(tarea =>(
							<CSSTransition
							key={tarea._id}
							timeout={500}
							classNames="tarea"
							>
							<Tarea
								tarea={tarea}
							/>
					</CSSTransition>
					))}
					</TransitionGroup>

				}

			</ul>
			<button
				type="button"
				className="btn btn-eliminar"
				onClick={()=> eliminarProyecto(proyectoActual._id)}
			>Eliminar Proyecto 🔴</button>
		</>
	 );
}
 
export default ListadoTareas;