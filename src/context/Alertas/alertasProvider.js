import {  useReducer } from "react";
import alertaReducer from "./alertaReducer";
import AlertaContext from "./alertasContext";
import { v4 as uuidv4 } from 'uuid';

import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types";

const AlertaProvider = ({children}) => {
	const initialState = {
		alerta: null
	}

	const [state, dispatch] = useReducer(alertaReducer, initialState);

	//funciones
	const mostrarAlerta =(msg, categoria) => {
		dispatch({
			type: MOSTRAR_ALERTA,
			payload: {
				msg,
				categoria
			}
		});

		// despues de 5 segundos limpiar la alerta
		setTimeout(() => {
			dispatch({
				type: OCULTAR_ALERTA
			})
		}, 5000);
	}

	const data = {
		alerta: state.alerta,
		mostrarAlerta
	}

	return(
		<AlertaContext.Provider
			value={data}
		>
			{children}
		</AlertaContext.Provider>
	)
}

export default AlertaProvider;