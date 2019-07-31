/* eslint-disable no-console */
const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
});

client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Success!');
  }
});

const keyspace = `CREATE KEYSPACE IF NOT EXISTS bizSchema
  WITH REPLICATION = {
    'class' : 'SimpleStrategy',
    'replication_factor' : 1
  };`;
const bizTable = `CREATE TABLE IF NOT EXISTS bizSchema.biz(
  bId INT primary key,
  bizname TEXT,
  reviewCount INT,
  rating DECIMAL,
  price DECIMAL,
  category list<TEXT>,
  location map<TEXT, TEXT>,
  phone TEXT,
  url TEXT,
  photos list<int>,
);`;

client.execute(keyspace)
  .then(() => client.execute(bizTable, (err, result) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Creating Keyspace and Biztable \n');
    }
  }));

module.exports = { client };
// const mongoose = require('mongoose');

// const url = 'mongodb://localhost';// localhost';
// const mongoDBURI = process.env.MONGOLAB_URI || url;
// mongoose.connect(mongoDBURI,
//   {
//     dbName: 'Yelp',
//     useNewUrlParser: true,
//   }).then(() => console.log('mongoDB connected'))
//   .catch(err => console.log(err));

// const db = mongoose.connection;

// const bizSchema = mongoose.Schema({
//   bId: Number,
//   bizname: String,
//   reviewCount: Number,
//   rating: Number,
//   price: String,
//   category: [String],
//   location: Object,
//   phone: String,
//   url: String,
//   photos: [Number],
// });

// const Biz = mongoose.model('Biz', bizSchema);
