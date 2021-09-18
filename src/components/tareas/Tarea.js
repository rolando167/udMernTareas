import { useContext } from "react";
import { TareasContext } from "../../context/Tareas/TareasContext";
import proyectoContext from "../../context/Proyectos/proyectoContext";

const Tarea = ({tarea}) => {

	const {proyecto} = useContext(proyectoContext);
	const {eliminarTarea, obtenerTareas, cambiarEstadoTarea, guardarTareaActual} = useContext(TareasContext);

	const [proyectoActual] = proyecto;

	const tareaEliminar = (id) => {
		eliminarTarea(id, proyectoActual._id);
		obtenerTareas(proyectoActual._id);
	}

	const cambiarEstado= (tarea) =>{
		if(tarea.estado){
			tarea.estado = false;
		}else{
			tarea.estado = true;
		}
		cambiarEstadoTarea(tarea);
	}

	const seleccionarTarea = (tarea) =>{
		guardarTareaActual(tarea);
	}

	return ( 
		<li className="tarea sombra">
			<p>{tarea.nombre}</p>
			<div className="estado">
				{
					tarea.estado
					?
						(
							<button
								type="button"
								className="completo"
								onClick={() => cambiarEstado(tarea)}
							>Completo
							</button>
						)
					:
					(
						<button
							type="button"
							className="incompleto"
							onClick={() => cambiarEstado(tarea)}
						>Incompleto
						</button>
					)


				}
			</div>
			<div className="acciones">
				<button
					type="button"
					className="btn btn-primario"
					onClick={() => seleccionarTarea(tarea)}
				>Editar</button>

				<button
					type="button"
					className="btn btn-secundario"
					onClick={() => tareaEliminar(tarea._id) }
				>Eliminar</button>
			</div>
		</li>
	 );
}
 
export default Tarea;