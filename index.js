const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 


const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: 'root',
    password: 'password',
    database: 'base_empleados'
});


app.get('/api/empleados', (req, res) => {
    connection.query('SELECT * FROM personal', (err, results) => {
        if (err) {
            console.error("❌ Error SQL:", err.message);
            return res.status(500).send('Error en consulta SQL');
        }
        res.json(results); // Aquí enviamos el JSON real
    });
});


app.post('/crear', (req, res) => {
    const { nombre, cargo, sueldo } = req.body;
    connection.query('INSERT INTO personal (nombre, cargo, sueldo) VALUES (?, ?, ?)', [nombre, cargo, sueldo], (err) => {
        if (err) return res.status(500).send('Error al insertar');
        res.status(201).send('Creado');
    });
});


app.put('/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, cargo, sueldo } = req.body;
    connection.query('UPDATE personal SET nombre = ?, cargo = ?, sueldo = ? WHERE id = ?', [nombre, cargo, sueldo, id], (err) => {
        if (err) return res.status(500).send('Error al actualizar');
        res.send('Actualizado');
    });
});


app.delete('/eliminar/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM personal WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send('Error al eliminar');
        res.send('Eliminado');
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});