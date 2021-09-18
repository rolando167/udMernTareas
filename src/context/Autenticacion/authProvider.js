import AuthContext from "./authContext";
import authReducer from "./authReducer";
import clienteAxios from "../../config/axios";
import authToken from '../../config/tokenAuth';
import { useReducer } from "react";

import { REGISTRO_EXITOSO
	, REGISTRO_ERROR
	, OBTENER_USUARIO
	, LOGIN_EXITOSO
	, LOGIN_ERROR
	, CERRAR_SESION
	} from "../../types";


const AuthProvider = ({children}) => {

	const initialState = {
		token: localStorage.getItem('token'),
		autenticado: null,
		usuario: null,
		mensaje: null,
		cargando: true
	}

	const [state, dispatch] = useReducer(authReducer, initialState);

	// Las Funciones
	const registrarUsuario = async (datos) =>{
		try {
			const respuesta = await clienteAxios.post('/api/usuarios', datos);

			console.log(respuesta.data);
			dispatch({
				type:REGISTRO_EXITOSO,
				payload: respuesta.data
			});
			usaurioAutenticado();

		} catch (error) {
			console.log(error.response.data.msg);
			const alerta = {
				msg: error.response.data.msg,
				categoria: 'alerta-error'
			}
			dispatch({
				type:REGISTRO_ERROR,
				payload: alerta
			})
		}
	}

	//retorna el usuario autenticado
	const usaurioAutenticado = async () => {
		const token = localStorage.getItem('token');
		if(token){
			//TODO: funcion para enviar el token por headers
			authToken(token);
		}
		try {
			const respuesta = await clienteAxios.get('/api/auth');

			dispatch({
				type:OBTENER_USUARIO,
				payload: respuesta.data.usuario
			})
		} catch (error) {
			dispatch({
				type:LOGIN_ERROR
			})
		}
	}

	const iniciarSesion = async (datos) => {

		try {
			const respuesta = await clienteAxios.post('/api/auth', datos);
			//console.log(respuesta);

			dispatch({
				type: LOGIN_EXITOSO,
				payload: respuesta.data
			});

			usaurioAutenticado();

		} catch (error) {
			console.log(error);

			const alerta = {
				msg: error.response.data.msg,
				categoria: 'alerta-error'
			}

			dispatch({
				type: LOGIN_ERROR,
				payload: alerta
			})
		}
	}

	// CIERRA LA SECION DEL USUARIO - CERRAR_SESION
	const cerrarSesion = () => {
		console.log('cerrando sesion...');
		dispatch({
			type:CERRAR_SESION
		})
	}

	// -------------------
	const data = {
		token: state.token,
		autenticado: state.autenticado,
		usuario: state.usuario,
		mensaje: state.mensaje,
		cargando: state.cargando,
		registrarUsuario,
		usaurioAutenticado,
		iniciarSesion,
		cerrarSesion
	}

	return(
		<AuthContext.Provider
			value={data}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider;
