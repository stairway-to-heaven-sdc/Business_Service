const {
  db, Biz, User, Photo,
} = require('../index');
const { generateBiz, generatePhoto, generateUser } = require('./generator');

module.exports = {
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
  insertPhoto: () => {
    Photo.insertMany(generatePhoto())
      .then(() => db.close())
      .catch(err => console.log(err));
  },
  getPhotoInfo: async (pid) => {
    const result = await Photo.findOne({ pId: pid });
    // eslint-disable-next-line no-underscore-dangle
    return result._doc;
  },
  removePhoto: () => {
    Photo.deleteMany()
      .then((res) => {
        console.log(res);
        db.close();
      })
      .catch(err => console.log(err));
  },
  insertUser: () => {
    User.insertMany(generateUser())
      .then(() => db.close())
      .catch(err => console.log(err));
  },
  removeUser: () => {
    User.deleteMany()
      .then((res) => {
        console.log(res);
        db.close();
      })
      .catch(err => console.log(err));
  },
};
