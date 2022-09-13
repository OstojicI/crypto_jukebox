const express = require('express')
const {createTransaction} = require('./db')

const router = express.Router()

router.get('/', (req, res) => {
  return res.json({homepage: 'Welcome to the index page.'});
})

router.post('/transactions', async (req, res) => {
  const transaction = req.body;
  console.log(transaction);
  return res.json(await createTransaction(transaction));
})

module.exports = router;
