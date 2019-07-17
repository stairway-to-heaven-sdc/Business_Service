const {
  db, Biz, User, Photo,
} = require('../index');
const { generateBiz, generatePhoto, generateUser } = require('./generator');

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index += 1) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
};

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
  getPhotos: async (pid) => {
    const length = pid + 19;
    let id = pid;
    const result = [];
    while (id <= length) {
      // eslint-disable-next-line no-await-in-loop
      const photo = await Photo.findOne({ pId: id });
      const photoObj = {
        pId: photo.pId,
        imgUrl: photo.imgUrl,
        uId: photo.uId,
        bId: photo.bId,
        text: photo.text,
        tag: photo.tag,
      };
      result.push(photoObj);
      id += 1;
    }
    return result;
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
  getDishPhotos: async (dishes) => {
    const result = [];
    await asyncForEach(dishes, async (item) => {
      const allPhotos = await Photo.find({ tag: item });
      const firstPhoto = allPhotos[0].imgUrl;
      const photoCount = allPhotos.length;
      result.push({ imgUrl: firstPhoto, photoCount, dish: item });
    });

    return result;
  },
  getUserInfo: async (uid) => {
    const result = await User.findOne({ uId: uid });
    // eslint-disable-next-line no-underscore-dangle
    return result._doc;
  },
};
