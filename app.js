const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser')


app.get('/', function (req, res) {
  res.send('Hello World!');
});


const test = (req, res, next) => {
  let { destination, body } = req.body;
  if (typeof destination != "string" || typeof body != "string"
    || destination == "" || body == "" || body.length > 240
    || destination.length > 12 || destination == null || body == null
    || destination == undefined || body == undefined) {
    console.log("Error")
    res.status(400).send("Revisa lo que has escrito, algo falla")
  } else next();


  app.post('/message', (req, res, next) => {
    let { destination, body } = req.body;
    axios.post('http://messageapp:3000/message', { destination, body })
      .then(resp => {
        res.status(200).
          res.send(`${resp.data}`)
      })
      .catch(e => {
        res.status(500).
          console.log(e)
      })
  })
}

app.listen(9001, () => {
  console.log('listend on port 9001!');
});