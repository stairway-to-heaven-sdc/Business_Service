/* eslint-disable no-console */
const { db, cs } = require('../index');
const pgp = require('pg-promise')({
  capSQL: true, // generate capitalized SQL
});
const { generateBiz } = require('./generator');

module.exports = {
  bizCreate: (biz) => {
    const bizArr = [biz.bid, biz.bizname, biz.reviewcount, biz.rating, biz.price, biz.category, JSON.stringify(biz.location), biz.phone, biz.url, biz.photos];
    db.none('INSERT INTO biz(bid, bizname, reviewcount, rating, price, category, location, phone, url, photos) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', bizArr)
      .then(data => data)
      .catch(err => console.log(err));
  },
  bizUpdate: async (id, biz) => {
    const bizArr = [id, biz.bizname, biz.reviewcount, biz.rating, biz.price, biz.category, JSON.stringify(biz.location), biz.phone, biz.url, biz.photos];
    const string = `UPDATE biz SET bizname = $2, reviewcount = $3, rating = $4, price = $5, category = $6, location = $7, phone = $8, url = $9, photos = $10
    WHERE bid = $1`;
    const result = await db.none(string, bizArr)
      .then(data => data)
      .catch(err => console.log(err));
    return result;
  },
  bizDelete: (id) => {
    db.any('DELETE FROM biz WHERE bid = $1', [id])
      .then(data => data)
      .catch(err => console.log(err));
  },
  insertBizData: async (queries) => {
    await db.none(pgp.helpers.insert(queries, cs))
      .then()
      .catch((error) => {
        console.log(error);
      });
  },
  removeBizData: async () => {
    await db.any('DELETE FROM biz')
      .then(res => console.log(res))
      .catch(err => console.log(err));
  },
  getBizInfo: async (id) => {
    const result = await db.any('SELECT * FROM biz WHERE bid = $1', [id])
      .then((data) => {
        data[0].location = JSON.parse(data[0].location);
        return data[0];
      });
    return result;
  },
};
