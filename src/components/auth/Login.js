import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/Alertas/alertasContext";
import AuthContext from "../../context/Autenticacion/authContext";

const Login = (props) => {

	//extraer los valores del context
	const alertaContext = useContext(AlertaContext);
	const {alerta, mostrarAlerta} = alertaContext;

	const authContext = useContext(AuthContext);
	const {autenticado, mensaje, iniciarSesion} = authContext;

	//Inicial
	const [usuario, setUsuario] = useState({
		email:'',
		password:''
	});

	const {email, password} = usuario;


		// En caso de que el password o usuario no exista
		useEffect(() =>{

			if(autenticado) {
				props.history.push('/proyectos');
			}
	
			if(mensaje){
				mostrarAlerta(mensaje.msg, mensaje.categoria);
			}
	
		}, [mensaje, autenticado, props.history ])

	const handleChange = (event) => {
		setUsuario({
			...usuario,
			[event.target.name]:event.target.value
		})
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		if(email.trim() === '' || password.trim() === ''){
			mostrarAlerta('Completar los campos', 'alerta-error');
		}

		iniciarSesion({email, password});
	}

	return ( 
		<div className="form-usuario">
			{alerta? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
			
			<div className="contenedor-form sombra-dark">
				<h1>Iniciar Sesión</h1>
				<form onSubmit={handleSubmit}>
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
						<input type="submit" className="btn btn-primario btn-block" value="Iniciar Sesión" />
					</div>
				</form>
				<Link to={'/nueva-cuenta'} className="enlace-cuenta">
				Crear Cuenta</Link>
			</div>
		</div>
	);
}

export default Login;