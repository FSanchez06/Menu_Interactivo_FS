const fs = require('fs');
const path = require('path');

const guardarDB = (data) => {
    const dirPath = path.resolve(__dirname, '../db');
    const archivotxt = path.join(dirPath, 'data.txt');
    const archivojson = path.join(dirPath, 'data.json');

    // Verificar si el directorio existe, si no, crearlo
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    const formattedText = data.map((tarea, index) =>
        `${index + 1}. ${tarea.desc} :: ${tarea.completadoEn ? 'Completada' : 'Pendiente'}`
    ).join('\n');

    fs.writeFileSync(archivotxt, formattedText);
    fs.writeFileSync(archivojson, JSON.stringify(data, null, 2));
};

module.exports = {
    guardarDB
};
