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
module.exports = { db, cs };
