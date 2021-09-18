import Proyecto from "./Proyecto"
import proyectoContext from '../../context/Proyectos/proyectoContext'
import { useContext, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import AlertaContext from "../../context/Alertas/alertasContext";

const ListadoProyectos = () => {

	//Extraer proyecto de state inicial
	const proyectoContextLocal = useContext(proyectoContext);
	const { proyectos } = proyectoContextLocal;
	const { mensaje, obtenerProyectos } = proyectoContextLocal;

	const alertaContext = useContext(AlertaContext);
	const { alerta, mostrarAlerta }= alertaContext;

	useEffect(() =>{

		if(mensaje){
			mostrarAlerta(mensaje.msg, mensaje.categoria);
		}

		obtenerProyectos();
		// esLint-disable-next-line
		
	}, [mensaje]);

	//validar si tiene contenido
	if(proyectos.length === 0 ) return <h4>No hay proyectos, comienza creando uno!!</h4>;

	return (
		<ul className="listado-proyectos">
			{alerta? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}

			<TransitionGroup>
				{
					proyectos.map(proyecto => (
						<CSSTransition
								key={proyecto._id}
								timeout={500}
								classNames="tarea"
								>
						<Proyecto
							key={proyecto._id}
							proyecto={proyecto}
						/>
					</CSSTransition>
					))
				}
			</TransitionGroup>

		</ul>
	 );
}
 
export default ListadoProyectos;