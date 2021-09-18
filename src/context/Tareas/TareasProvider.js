import { useReducer } from "react";
import { TareasContext } from "./TareasContext";
import {TareasReducer}  from './TareasReducer';
// import { v4 as uuidv4 } from 'uuid';
import clienteAxios from "../../config/axios";

import {
	TAREAS_PROYECTO
	, AGREGAR_TAREA
	, VALIDAR_TAREA
	, ELIMINAR_TAREA
	, ESTADO_TAREA
	, TAREA_ACTUAL
	, ACTUALIZAR_TAREA
	, LIMPIAR_TAREA
} from '../../types/index';

const TareasProvider = ({children}) => {

	// 1. Se crea para los Reducer
	const initialState = {
		 
		tareasProyecto: [],
		errorTarea: false,
		tareaSeleccionada: null
	}

	// 2. Crear state  y dispatch, se importa el reducer que se usara y estados iniciales
	const [state, dispatch] = useReducer(TareasReducer, initialState );


	const obtenerTareas = async(proyecto) => {
		try {

			const resultado = await clienteAxios.get('/api/tareas', {params: {proyecto}});

			// console.log(resultado.data.tareas);
			dispatch({
				type:TAREAS_PROYECTO,
				payload: resultado.data.tareas
			})
		} catch (error) {
			console.log(error);
		}
	}

	const agregarTarea = async (tarea) => {
		console.log(tarea);

		try {
			// tarea.id = uuidv4();
			const resultado = await clienteAxios.post('/api/tareas', tarea);
			console.log(resultado);

			dispatch({
				type: AGREGAR_TAREA,
				payload: tarea
			})
		} catch (error) {
			console.log(error);
		}
	}

	const validarTarea = () =>{
		dispatch({
			type: VALIDAR_TAREA,
		})
	}

	const eliminarTarea = async (id, proyecto) => {
		try {
			await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}});
			dispatch({
				type:ELIMINAR_TAREA,
				payload: id
			})
		} catch (error) {
			console.log(error);
		}
	}

	const cambiarEstadoTarea = (tarea) => {
		try {
			dispatch({
				type: ESTADO_TAREA,
				payload: tarea
			})
		} catch (error) {
			console.log(error);
		}
	}

	//Extraer una tarea para edicion
	const guardarTareaActual = (tarea) =>{
		try {
			dispatch({
				type: TAREA_ACTUAL,
				payload: tarea
			})
		} catch (error) {
			console.log(error);
		}
	}

	const actualizarTarea = (tarea) =>{
		dispatch({
			type: ACTUALIZAR_TAREA,
			payload: tarea
		})
	}
	
	const limpiarTarea = ()=> {
		dispatch({
			type:LIMPIAR_TAREA
		})
	}


	// ------ 🛢️
	const data = {
		 
		tareasProyecto: state.tareasProyecto,
		errorTarea: state.errorTarea,
		tareaSeleccionada: state.tareaSeleccionada,
		obtenerTareas,
		agregarTarea,
		validarTarea,
		eliminarTarea,
		cambiarEstadoTarea,
		guardarTareaActual,
		actualizarTarea,
		limpiarTarea
	}

	return (
		<TareasContext.Provider
			value={ data }
		>
			{children}
		</TareasContext.Provider>
	 );
}

export default TareasProvider;