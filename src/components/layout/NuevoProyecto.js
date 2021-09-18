import { useContext, useState } from "react";
import proyectoContext from '../../context/Proyectos/proyectoContext'

const NuevoProyecto = () => {

	const proyectoContextLocal = useContext(proyectoContext);

	const { formulario, errorFormulario } = proyectoContextLocal;

	const { mostrarFormulario, agregarProyecto, mostrarError } = proyectoContextLocal;

	const [proyecto, setProyecto] = useState({
		nombre:''
	});

	const { nombre } = proyecto;

	const handleChange = (event) =>{
		setProyecto({
			...setProyecto,
			[event.target.name]: event.target.value
		})
	}

	const handleSubmit = (event) =>{
		event.preventDefault();

		if(nombre.trim().length===0) {
			mostrarError();
			return;
		}

		agregarProyecto(proyecto);

		setProyecto({
			nombre: ''
		})
	}

	return (
		<>
			<button
			type="button"
			className="btn btn-block btn-primario"
			onClick={() => mostrarFormulario()}
			>Nuevo Proyecto</button>

			 {
				formulario
				? 
				 (<form
						className="formulario-nuevo-proyecto"
						onSubmit={handleSubmit}
					>
						<input
							type="text"
							className="input-text"
							placeholder="Nuevo Proyecto"
							name="nombre"
							value={nombre}
							onChange={handleChange}
						/>
						<input
							type="submit"
							className="btn btn-primario btn-block"
							value="Agregar Proyecto"
						/>
					</form>
				)
				: null
			 }

			 {errorFormulario? <p className="mensaje error">Ingresar Nombre</p> : null}
		</>
	);
}
 
export default NuevoProyecto;