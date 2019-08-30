/* eslint-disable no-console */
// const mongoose = require('mongoose');
const { Client } = require('pg');

const client = new Client({
  database: 'bizschema',
});

// const connect = async () => {
//   await client.connect();
//   // const res = await client.query('CREATE DATABASE bizSchema');
//   // console.log(res);
//   const res = await client.query('SELECT $1::text as stat', ['Database successfully connected']);
//   console.log(res.rows[0].stat);
//   await client.end();
// };

const createTable = async () => {
  await client.connect();
  const res = await client.query(`CREATE TABLE IF NOT EXISTS biz(
    bid       integer primary key,
    bizname   text,
    reviewCount integer,
    rating    decimal,
    price     text,
    category  text,
    location  text,
    phone     char(14),
    url       text,
    photos    integer[]
  );`);
  console.log(res);
  await client.end();
};

// connect();
// createTable();

module.exports = { client, createTable };
