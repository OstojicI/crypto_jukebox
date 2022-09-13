const express = require('express')
const bodyParser = require('body-parser')
const {init, getDbInstance} = require('./db')
const app = express()
const routes = require('./routes')
const cors = require("cors");
const watchForPayments = require('./receivePayment');
const port = process.env.APP_PORT;
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {origin: "*"}
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
app.use(routes)

console.log('App initialized');


io.on('connection', socket => {
  console.log(socket.id);
  // console.log(socket);
  socket.on('chat message', (msg) => {
    // console.log(socket.id);
    // console.log('message: ' + msg);
  });

});

init().then(() => {
  const onPayment = (async transaction => {
    console.log(transaction)
    const found = await getDbInstance().collection('transactions').findOne({code: transaction.memo, status: 'pending'});
    if (transaction.amount <= process.env.SONG_PRICE || !found)
      return;
    io.emit('stellar', found);

    await getDbInstance().collection('transactions').updateOne({_id: found._id}, {
      $set: {
        status: 'completed'
      }
    })
    console.log(found, 'found');
  })
  watchForPayments(onPayment);

  http.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
})

