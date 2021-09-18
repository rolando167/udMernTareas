import { useReducer } from 'react'
import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer';
//import { v4 as uuidv4 } from 'uuid';
import clienteAxios from '../../config/axios';

import { FORMULARIO_PROYECTO
		, OBTENER_PROYECTOS
		, AGREGAR_PROYECTO
		, VALIDAR_FORMULARIO
		, PROYECTO_ACTUAL
		, ELIMINAR_PROYECTO
		, PROYECTO_ERROR
		} from '../../types'


const ProyectoState = ({children}) => {

	 

	const initialState = {
		proyectos : [ ],
		formulario : false,
		errorFormulario: false,
		proyecto: null,
		mensaje: null
	}

	//Dispatch para ejecutar las acciones
	const [state, dispatch] = useReducer(proyectoReducer, initialState);

	// serie de funciones para el CRUD
	const mostrarFormulario = () => {
		dispatch({
			type: FORMULARIO_PROYECTO
		})
	}

	//obtener los proyectos
	const obtenerProyectos = async () =>{
		try {
			const resultado = await clienteAxios.get('/api/proyectos');
			// console.log(resultado);
			dispatch({
				type: OBTENER_PROYECTOS,
				payload: resultado.data.proyectos
			});
		} catch (error) {
			console.log(error);
		}
	}

	const agregarProyecto = async (proyecto) => {
		//proyecto.id = uuidv4();

		try {

			const resultado = await clienteAxios.post('/api/proyectos', proyecto);
			console.log('Proyecto Registrado ✔️');
			dispatch({
				type: AGREGAR_PROYECTO,
				payload: resultado.data
			})
		} catch (error) {
			console.log(error);
		}
	}

	const mostrarError = () => {
		dispatch({
			type: VALIDAR_FORMULARIO
		})
	}

	const mostrarProyectoActual = (proyectoID) =>{
		dispatch({
			type: PROYECTO_ACTUAL,
			payload: proyectoID
		})
	}

	const eliminarProyecto = async(proyectoID) =>{
		try {
			await clienteAxios.delete(`/api/proyectos/${proyectoID}`);
			console.log('Proyecto Eliminado ✔️');

			dispatch({
				type: ELIMINAR_PROYECTO,
				payload: proyectoID
			})
		} catch (error) {
			const alerta = {
				msg: 'Hubo un Error',
				categoria: 'alerta-error'
			}
			dispatch({
				type: PROYECTO_ERROR,
				payload: alerta
			})
		}
	}


	const data = {
		proyectos: state.proyectos,
		formulario: state.formulario,
		errorFormulario: state.errorFormulario,
		proyecto: state.proyecto,
		mensaje: state.mensaje,
		mostrarFormulario,
		obtenerProyectos,
		agregarProyecto,
		mostrarError,
		mostrarProyectoActual,
		eliminarProyecto
	}

	return (
		<proyectoContext.Provider
			value={data}
		>
			{children}
		</proyectoContext.Provider>

	)
}

export default ProyectoState;