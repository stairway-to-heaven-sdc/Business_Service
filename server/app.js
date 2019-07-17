
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {
  getBizInfo, bizCreate, bizUpdate, bizDelete, getDishPhotos,
} = require('../database/seeder/helper.js');

const app = express();
app.use(cors());
app.use(express.static(`${__dirname}/../client/dist`));
app.use('/bizs/:bId', express.static(`${__dirname}/../client/dist`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/biz/:bId', async (req, res) => {
  try {
    const result = await getBizInfo(JSON.parse(req.params.bId));
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.put('/biz/:bId', (req, res) => {
  try {
    bizUpdate(JSON.parse(req.params.bId), req.body.biz);
    res.status(200);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post('/biz/:bId', (req, res) => {
  try {
    bizCreate(JSON.parse(req.body.biz));
    res.status(200);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete('/biz/:bId', (req, res) => {
  try {
    bizDelete(JSON.parse(req.params.bId));
    res.status(200);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get first photo and total photo counts by requesting dish menu
app.get('/biz_dishes/:bId/:dishes', async (req, res) => {
  try {
    const result = await getDishPhotos(JSON.parse(req.params.dishes), JSON.parse(req.params.bId));
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});


module.exports = app;
