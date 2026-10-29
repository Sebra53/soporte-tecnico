const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
 
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
 
app.get('/', (req, res) => {
  res.status(200).json({ mensaje: 'API Soporte funcionando' });
});
 
app.listen(PORT, () => {
  console.log(`API en http://localhost:${PORT}`);
});
