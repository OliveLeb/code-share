const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

app.get('/', (req,res) => {
    const id = req.id;
    res.redirect(`${id}`);
})

app.use(express.static('public'));

app.get('/:id', (req,res) => {
    res.sendFile(`${__dirname}/public/index.html`);
})

module.exports = app;