const colors = require('colors');
const inquirer = require('inquirer');

const preguntas = [
    {
        type: 'list',
        name: 'options',
        message: '¿Qué quieres hacer?'.yellow,
        choices: [
            { value: '1', name: `${'1.'.blue} Crear tarea` },
            { value: '2', name: `${'2.'.blue} Listar tareas` },
            { value: '3', name: `${'3.'.blue} Listar tareas completas` },
            { value: '4', name: `${'4.'.blue} Listar tareas pendientes` },
            { value: '5', name: `${'5.'.blue} Completar tarea(s)` },
            { value: '6', name: `${'6.'.blue} Borrar tarea` },
            { value: '0', name: `${'0.'.blue} Salir` }
        ]
    }
];

const menu = async () => {
    console.clear();
    console.log('='.repeat(30).green);
    console.log('       Gestor de Tareas'.white.bold);
    console.log('='.repeat(30).green);

    const { options } = await inquirer.default.prompt(preguntas);
    return options;
};

const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `\nPresione la tecla ${'Enter'.green} para continuar\n`
        }
    ];
    await inquirer.default.prompt(question);
};

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message: message.yellow,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor'.red;
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.default.prompt(question);
    return desc;
};

const seleccionarTareas = async (tareas) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: !!tarea.completadoEn
        };
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione las tareas a completar:',
            choices
        }
    ];

    const { ids } = await inquirer.default.prompt(pregunta);
    return ids;
};

module.exports = {
    menu,
    pausa,
    leerInput,
    seleccionarTareas
};
