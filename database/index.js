/* eslint-disable no-console */
const pgp = require('pg-promise')({
  capSQL: true, // generate capitalized SQL
});

const db = pgp({ database: 'bizschema' });

const cs = new pgp.helpers.ColumnSet(
  [
    'bid',
    'bizname',
    'reviewcount',
    'rating',
    'price',
    'category',
    'location',
    'phone',
    'url',
    'photos',
  ], {
    table: 'biz',
  },
);

const createTable = async () => {
  await db.connect();
  const res = await db.any(`CREATE TABLE IF NOT EXISTS biz(
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
  )`)
    .then(data => data)
    .catch(err => console.log(err));
  console.log(res);
};

module.exports = { db, cs, createTable };
