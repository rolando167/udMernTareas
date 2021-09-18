import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login'
import NuevaCuenta from './components/auth/NuevaCuenta'
import Proyectos from './components/proyectos/Proyectos'
import ProyectoState from './context/Proyectos/proyectoState';
import TareasProvider from './context/Tareas/TareasProvider';
import AlertaProvider from './context/Alertas/alertasProvider';
import AuthProvider from './context/Autenticacion/authProvider';
import tokenAuth from './config/tokenAuth';
import RutaPrivada from './components/rutas/RutaPrivada';

//revisar si tenemos un token
const token = localStorage.getItem('token');
if(token){
	tokenAuth(token);
}

function App() {
	console.log(process.env.REACT_APP_BACKEND_URL);
	return (
		<ProyectoState>
			<TareasProvider>
				<AlertaProvider>
					<AuthProvider>
						<Router>
							<Switch>
								<Route exact path="/" component={Login} />
								<Route  path="/nueva-cuenta" component={NuevaCuenta} />
								<RutaPrivada  path="/proyectos" component={Proyectos} />
							</Switch>
						</Router>
					</AuthProvider>
				</AlertaProvider>
			</TareasProvider>
		</ProyectoState>
	);
}

export default App;
