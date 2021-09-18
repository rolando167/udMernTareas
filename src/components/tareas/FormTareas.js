import { useContext, useEffect, useState } from "react";
import proyectoContext from "../../context/Proyectos/proyectoContext";
import { TareasContext } from "../../context/Tareas/TareasContext";


const FormTareas = () => {
	//extraer si un proyecto esta activo
	const {proyecto} = useContext(proyectoContext);
	const {tareaSeleccionada, errorTarea, agregarTarea, validarTarea,
		 obtenerTareas, actualizarTarea, limpiarTarea} = useContext(TareasContext);

	//effect si detecta si hay una tarea seleccionada
	useEffect(() =>{
		if(tareaSeleccionada !== null){
			setTarea(tareaSeleccionada)
		}else{
			setTarea({nombre:''})
		}
	}, [tareaSeleccionada])

	const [tarea, setTarea] = useState({
		nombre:''
	})

	const {nombre} = tarea;

	if(!proyecto){
		return null;
	}

	const [proyectoActual] = proyecto;


	const handleChange = (e) => {
		setTarea({
			...tarea,
			[e.target.name]: e.target.value
		})
	}

	const onSubmit = (e) => {
		e.preventDefault();

		if(nombre.trim().length === 0){
			validarTarea();
			return;
		}

		//si es Edicion o es nueva tarea
		if(tareaSeleccionada === null){
			tarea.proyecto = proyectoActual._id;
			tarea.estado = false;
			agregarTarea(tarea);
		}else{
			actualizarTarea(tarea);

			limpiarTarea();
		}

		setTarea({nombre:''});

		//obtener tareas
		obtenerTareas(proyectoActual.id);
	}

	return (
		<div className="formulario">
			<form onSubmit={ onSubmit }>
				<div className="contenedor-input">
					<input
						type="text"
						className="input-text"
						placeholder="Nombre Tarea..."
						name="nombre"
						onChange={handleChange}
						value={nombre}
					/>
				</div>
				<div className="contenedor-input">
					<input
						type="submit"
						className="btn btn-primario btn-submit btn-block"
						value={tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
					/>
				</div>

			</form>
			{
				errorTarea?<p className="mensaje error">El nombre de la tarea es obligatorio</p>
				: null
			}
		</div>
	 );
}

export default FormTareas;