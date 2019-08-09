/* eslint-disable no-console */
const faker = require('faker');
const _ = require('lodash');
// const profiler = require('v8-profiler');
const { client } = require('../index');


const generateBiz = async () => {

  const first = [
    'Anchor', 'Bon', 'Chon', 'Buffalo', 'Wild', 'Chicken', 'Salad', 'Dell', 'Rhea\'s', 'Grandy\'s', 'Gus\'s', 'World',
    'Famous', 'Fried', 'Lee\'s', 'Ma', 'Yu', 'Ching\'s', 'Bucket', 'Pollo', 'Ranch', 'Rostipollos', 'Roscoe\'s', 'House of',
    'Slim', 'Smithfield\'s', 'St.', 'Swiss', 'Tip-Top', 'White', 'Coffee', 'Fence', 'Wing', 'American', 'Boston', 'Famous',
    'Brown\'s', 'California', 'Rice', 'Cluck', 'Dixie', 'Lee', 'Flav\'s', 'Golden', 'Hillbilly\'s', 'Kennedy', 'Kyochon',
    'Louisiana', 'Los Pollos', 'Nando\'s', 'Mrs.', 'Winner\'s', 'Pioneer', 'Raising', 'Red', 'Roy', 'Royal', 'Southern',
    'Tastee', 'Wild', 'Wing',
  ];

  const second = [
    'Recipe', 'Street', 'Zone', 'Castle', 'Loco', 'Hermanos', 'Skillet', 'International', 'Blast', 'Cottage',
    'Delight', 'Express', 'Hut', 'Licken', 'Rotisserie', 'Shop', '& Pasta', 'Market', '\'n Biscuits', 'Bar',
    'Chicken', 'Wings', 'Chick', 'Inn', 'Way', 'Basket', 'House', 'Tropical', 'and Waffles', 'Chickens',
    'Bar-B-Q', 'BBQ', 'Chalet', 'Restaurant', 'Pot', 'Farm',
  ];
  const typeOne = [
    'Canjun/Creole', 'American', 'African', 'Japanese', 'Korean', 'Halal', 'Asian Fusion', 'Tex-Mex', 'Mexican', 'Taiwanese',
    'Vietnamese', 'Chinese', 'Indian', 'Italian', 'Filipino', 'Mediterranean', 'Caribbean', 'Pakistani', 'Thai', 'Indonesian',
    'Kosher', 'Latin American', 'Germany', 'Russian', 'French', 'Middle Eastern', 'Southern', 'Fast food', 'Gluten-free',
    'Salvadoran', 'Greek',
  ];
  const typeTwo = [
    'Hookah Bars', 'Hot pot', 'Dounts', 'Sandwiches', 'Pizza', 'Burgers', 'Coffee & Tea', 'Bakeries', 'Nightlife',
    'Seafood', 'Chicken Wings', 'Bubble Tea', 'Wine Bars', 'Noodles', 'Buffets', 'Cupcakes', 'Shaved Ice', 'Salad',
    'Grocery', 'Bars', 'Desserts', 'Ice Cream & Frozen Yogurt', 'Beer, Wine & Spirits', 'Soup', 'Macarons', 'Wraps',
    'Food Stands', 'Hot Dogs', 'Tacos', 'Karaoke', 'Acai Bowls', 'Cocktail Bars', 'Gelato', 'Lounges', 'Caterers',
    'Cafes', 'Breakfast & Brunch', 'Juice Bars & Smoothies', 'Delis',
  ];
  const district = [
    'Montrose', 'Chinatown', 'South Main', 'Museum District', 'Downtown', 'Braeswood Place', 'Fourth Ward', 'Energy Corridor',
  ];

  let queries = [];

  const batch25 = async (queries, bId) => {
    await client.batch(queries, { prepare: true })
      .then(() => {
        console.log(bId);
      })
      .catch(err => console.log(err));
  };
  for (let bId = 1; bId <= 10000000; bId += 1) {
    let name = '';
    const length = Math.ceil(Math.random() * 2 + 1);
    for (let i = 0; i < length; i += 1) {
      if (i === length - 1) {
        name += _.sample(second);
      } else {
        name += `${_.sample(first)} `;
      }
    }
    const type = [];
    type.push(_.sample(typeOne));
    type.push(_.sample(typeTwo));
    let nhood = '';
    nhood += _.sample(district);
    const bizname = name;
    const reviewCount = faker.random.number(8000);
    const rating = faker.random.arrayElement([1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]);
    const price = faker.random.arrayElement(['$', '$$', '$$$', '$$$$', '$$$$$']);
    const category = type;
    const phone = (faker.phone.phoneNumberFormat(1)).toString();
    const url = faker.internet.url();
    const photos = [1, 2, 3];
    const address1 = faker.address.streetAddress();
    const address2 = faker.address.secondaryAddress();
    const city = faker.address.city(3);
    const state = faker.address.stateAbbr();
    const zipcode = (faker.address.zipCode('#####')).toString();
    const neighborhood = nhood;
    const latitude = (Number(faker.address.latitude())).toString();
    const longitude = (Number(faker.address.longitude())).toString();
    const locObj = {
      address1,
      address2,
      city,
      state,
      zipcode,
      neighborhood,
      latitude,
      longitude,
    };

    queries.push({
      query: 'INSERT INTO bizSchema.biz ( bId, bizname, reviewCount, rating, price, category, location, phone, url, photos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      params: [bId, bizname, reviewCount, rating, price, category, locObj, phone, url, photos],
    });
    if (queries.length === 25) {
      console.log(bId);
      await batch25(queries, bId);
      queries = null;
      queries = [];
    }
  }
};

generateBiz();

module.exports = { generateBiz };
