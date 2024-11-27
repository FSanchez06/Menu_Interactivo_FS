const Tarea = require('./tarea');

class Tareas {
    _listado = {};

    constructor() {
        this._listado = {};
    }

    get listadoArr() {
        return Object.values(this._listado);
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listarCompletasPendientes(completadas = true) {
        return this.listadoArr.filter(tarea => !!tarea.completadoEn === completadas);
    }

    completarTareas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (tarea && !tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                tarea.completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;
