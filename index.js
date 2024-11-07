const { menu, pausa, leerInput } = require('./helpers/menu');
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
                break;

            case '2': // Listar tareas
                console.log(tareas.listadoArr);
                break;
        }

        await pausa();
    } while (opt !== '0');
};

principal();
