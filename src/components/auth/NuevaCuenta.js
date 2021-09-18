import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/Alertas/alertasContext";
import AuthContext from "../../context/Autenticacion/authContext";

const NuevaCuenta = (props) => {

	//extraer los valores del context
	const alertaContext = useContext(AlertaContext);
	const {alerta, mostrarAlerta} = alertaContext;

	const authContext = useContext(AuthContext);
	const {autenticado, mensaje, registrarUsuario} = authContext;

	// en caso de de login registro, o duplicado
	useEffect(() =>{

		if(autenticado) {
			props.history.push('/proyectos');
		}

		if(mensaje){
			mostrarAlerta(mensaje.msg, mensaje.categoria);
		}

	}, [mensaje, autenticado, props.history ])


	const [usuario, setUsuario] = useState({
        nombre:'',
		email:'',
		password:'',
		confirmar:''
	});

	const {nombre, email, password, confirmar} = usuario;

	const handleChange = (event) => {
		setUsuario({
			...usuario,
			[event.target.name]:event.target.value
		})
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		if(nombre.trim() === '' || email.trim() === ''|| password.trim() === '' ||  confirmar.trim() === ''){
			mostrarAlerta('Todos los campos son obligartorios', 'alerta-error');
			return;
		}

		if(password.length < 6){
			mostrarAlerta('El password debe tener al menos 6 caracteres', 'alerta-error');
			return;
		}

		if(password != confirmar){
			mostrarAlerta('Los Passwords no coinciden', 'alerta-error');
			return;
		}


		registrarUsuario({
			nombre,
			email,
			password
		})
	}

	return ( 
		<div className="form-usuario">
			{alerta? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
			
			<div className="contenedor-form sombra-dark">
				<h1>Nueva Cuenta</h1>
				<form onSubmit={handleSubmit}>
                    <div className="campo-form">
						<label htmlFor="nombre">Nombre</label>
						<input
							type="text"
							id="nombre"
							name="nombre"
							placeholder="Tu nombre"
							onChange={handleChange}
							value={nombre}
						/>
					</div>
					<div className="campo-form">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Tu email"
							onChange={handleChange}
							value={email}
						/>
					</div>
					<div className="campo-form">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Tu password"
							onChange={handleChange}
							value={password}
						/>
					</div>

                    <div className="campo-form">
						<label htmlFor="confirmar">Repetir Password</label>
						<input
							type="password"
							id="confirmar"
							name="confirmar"
							placeholder="Repite Password"
							onChange={handleChange}
							value={confirmar}
						/>
					</div>
					<div className="campo-form">
						<input type="submit" className="btn btn-primario btn-block" value="Registrar" />
					</div>
				</form>
				<Link to={'/'} className="enlace-cuenta">
				Login</Link>
			</div>
		</div>
	);
}

export default NuevaCuenta;