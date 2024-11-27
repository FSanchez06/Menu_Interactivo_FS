const { menu, pausa, leerInput, seleccionarTareas } = require('./helpers/menu');
const { guardarDB } = require('./helpers/guardarArchivo');
const Tareas = require('./models/tareas');

const principal = async () => {
    let opt = '';
    const tareas = new Tareas();

    do {
        opt = await menu();

        switch (opt) {
            case '1': // Crear tarea
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                console.log('Tarea creada exitosamente.'.green);
                break;

            case '2': // Listar tareas
                console.log('\nListado de tareas:'.blue);
                tareas.listadoArr.forEach((tarea, i) => {
                    const idx = `${i + 1}.`.green;
                    const { desc, completadoEn } = tarea;
                    const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;
                    console.log(`${idx} ${desc} :: ${estado}`);
                });
                break;

            case '3': // Listar tareas completas
                console.log('\nTareas completadas:'.green);
                tareas.listarCompletasPendientes(true).forEach((tarea, i) => {
                    console.log(`${(i + 1).toString().green}. ${tarea.desc}`);
                });
                break;

            case '4': // Listar tareas pendientes
                console.log('\nTareas pendientes:'.red);
                tareas.listarCompletasPendientes(false).forEach((tarea, i) => {
                    console.log(`${(i + 1).toString().green}. ${tarea.desc}`);
                });
                break;

            case '5': // Completar tarea(s)
                const ids = await seleccionarTareas(tareas.listadoArr);
                tareas.completarTareas(ids);
                console.log('Tareas actualizadas correctamente.'.green);
                break;

            case '6': // Borrar tarea
                console.log('Funcionalidad de borrar tarea aún no implementada.'.yellow);
                break;

            case '0': // Salir
                console.log('\nSaliendo del programa...'.green);
                break;

            default:
                console.log('Opción no válida, por favor intente nuevamente.'.red);
        }

        guardarDB(tareas.listadoArr);

        if (opt !== '0') {
            await pausa();
        }

    } while (opt !== '0');
};

principal();
