const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const PORT = Number(process.env.PORT || 3000);
 
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
 
function validarId(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({ mensaje: 'ID inválido' });
  }
  req.ticketId = id;
  next();
}
 
function validarTicket(req, res, next) {
  const b = req.body || {};
  const campos = ['asunto', 'solicitante', 'descripcion',
    'categoria', 'prioridad', 'estado', 'fechaRegistro'];
  if (campos.some(c => typeof b[c] !== 'string')) {
    return res.status(400).json({
      mensaje: 'Todos los campos del ticket son obligatorios y de texto'
    });
  }
  const t = {};
  for (const c of campos) t[c] = b[c].trim();
  if (t.asunto.length < 3 || t.asunto.length > 150 ||
      t.solicitante.length < 3 || t.solicitante.length > 120 ||
      t.descripcion.length < 5 || t.descripcion.length > 2000) {
    return res.status(400).json({
      mensaje: 'Revisa las longitudes de asunto, solicitante y descripción'
    });
  }
  if (!['Hardware', 'Software', 'Red'].includes(t.categoria) ||
      !['Baja', 'Media', 'Alta'].includes(t.prioridad) ||
      !['Abierto', 'En proceso', 'Cerrado'].includes(t.estado)) {
    return res.status(400).json({
      mensaje: 'Categoría, prioridad o estado inválidos'
    });
  }
  const fecha = new Date(`${t.fechaRegistro}T00:00:00Z`);
  if (!/^[1-9]\d{3}-\d{2}-\d{2}$/.test(t.fechaRegistro) ||
      Number.isNaN(fecha.getTime()) ||
      fecha.toISOString().slice(0, 10) !== t.fechaRegistro) {
    return res.status(400).json({ mensaje: 'Fecha inválida: usa YYYY-MM-DD' });
  }
  req.ticket = t;
  next();
}
 
function errorBD(res, error) {
  console.error(error.code || error.message);
  return res.status(500).json({ mensaje: 'No fue posible completar la operación' });
}
 
app.get('/', (req, res) => {
  res.status(200).json({ mensaje: 'API Soporte funcionando' });
});
 
app.get('/api/tickets', (req, res) => {
  db.query('SELECT * FROM tickets ORDER BY id DESC', (error, filas) => {
    if (error) return errorBD(res, error);
    res.status(200).json(filas);
  });
});
 
app.get('/api/tickets/:id', validarId, (req, res) => {
  db.query('SELECT * FROM tickets WHERE id = ?',
    [req.ticketId], (error, filas) => {
      if (error) return errorBD(res, error);
      if (filas.length === 0) {
        return res.status(404).json({ mensaje: 'Ticket no encontrado' });
      }
      res.status(200).json(filas[0]);
    });
});
 
app.post('/api/tickets', validarTicket, (req, res) => {
  const t = req.ticket;
  const sql = `INSERT INTO tickets
    (asunto, solicitante, descripcion, categoria,
     prioridad, estado, fechaRegistro)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const valores = [t.asunto, t.solicitante, t.descripcion,
    t.categoria, t.prioridad, t.estado, t.fechaRegistro];
  db.query(sql, valores, (error, resultado) => {
    if (error) return errorBD(res, error);
    res.status(201).json({ id: resultado.insertId, ...t });
  });
});
 
app.put('/api/tickets/:id', validarId, validarTicket, (req, res) => {
  const t = req.ticket;
  const sql = `UPDATE tickets SET asunto = ?, solicitante = ?,
    descripcion = ?, categoria = ?, prioridad = ?,
    estado = ?, fechaRegistro = ? WHERE id = ?`;
  const valores = [t.asunto, t.solicitante, t.descripcion,
    t.categoria, t.prioridad, t.estado, t.fechaRegistro, req.ticketId];
  db.query(sql, valores, (error, resultado) => {
    if (error) return errorBD(res, error);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Ticket no encontrado' });
    }
    res.status(200).json({ mensaje: 'Ticket actualizado correctamente' });
  });
});
 
app.delete('/api/tickets/:id', validarId, (req, res) => {
  db.query('DELETE FROM tickets WHERE id = ?',
    [req.ticketId], (error, resultado) => {
      if (error) return errorBD(res, error);
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ mensaje: 'Ticket no encontrado' });
      }
      res.status(200).json({ mensaje: 'Ticket eliminado correctamente' });
    });
});
 
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});
 
app.use((error, req, res, next) => {
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ mensaje: 'El cuerpo debe ser JSON válido' });
  }
  console.error(error.code || error.message);
  res.status(500).json({ mensaje: 'Error interno de la API' });
});
 
db.query('SELECT 1', (error) => {
  if (error) {
    console.error('No se pudo conectar a MySQL:', error.code);
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`API y MySQL listos en http://localhost:${PORT}`);
  });
});
