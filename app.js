require('dotenv').config()
const express = require('express');
const app = express();
app.use(express.json());
app.get('/api/health', (req, res) => res.status(200).send({ status: 'ok' }));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}/api`));
