const { generateBiz } = require('./generator');
const { createTable } = require('../index');

const seed = async () => {
  await createTable();
  await generateBiz();
};
seed();
