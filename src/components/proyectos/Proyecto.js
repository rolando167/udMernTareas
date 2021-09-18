

import { useContext } from 'react';
import proyectoContext from '../../context/Proyectos/proyectoContext';
import { TareasContext } from '../../context/Tareas/TareasContext';

const Proyecto = ({proyecto}) => {

    const { mostrarProyectoActual } = useContext(proyectoContext);

    const { obtenerTareas } = useContext(TareasContext);

    const seleccionarProyecto = id =>{
        mostrarProyectoActual(id);
        obtenerTareas(id);
    }

    return (
            <li key={proyecto._id}>
                <button
                    type="button"
                    className="btn btn-blank"
                    onClick={(e) => seleccionarProyecto(proyecto._id)}
                >
                    {proyecto.nombre}
                </button>
            </li>
     );
}

export default Proyecto;