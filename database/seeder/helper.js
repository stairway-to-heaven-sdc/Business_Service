/* eslint-disable no-console */
const { db, Biz } = require('../index');
const { generateBiz } = require('./generator');

module.exports = {
  bizCreate: (biz) => {
    Biz.create(biz)
      .then(() => db.close())
      .catch(err => console.log(err));
  },
  bizUpdate: (id, biz) => {
    Biz.updateOne({ bId: id }, biz)
      .then(() => db.close())
      .catch(err => console.log(err));
  },
  bizDelete: (id) => {
    Biz.deleteOne({ bId: id })
      .then(() => db.close())
      .catch(err => console.log(err));
  },
  insertBizData: () => {
    Biz.insertMany(generateBiz())
      .then(() => db.close())
      .catch(err => console.log(err));
  },
  removeBizData: () => {
    Biz.deleteMany()
      .then((res) => {
        console.log(res);
        db.close();
      })
      .catch(err => console.log(err));
  },
  getBizInfo: async (id) => {
    const result = await Biz.findOne({ bId: id });
    // eslint-disable-next-line no-underscore-dangle
    return result._doc;
  },
};
