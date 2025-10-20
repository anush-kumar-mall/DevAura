// server/index.js
const express = require('express');
const app = express();
const PORT = 5000;

app.get('/api', (req, res) => {
  res.send({ message: 'Hello from server!' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
