const knex = require('../../connection')
const HTTP_SUCCESS = 200;
const HTTP_BAD_REQUEST = 400;

async function showClient(req, res) {
  try {
    const client = await knex('clients').select('*'); 

    return res.status(HTTP_SUCCESS).json(client);
  } catch (error) {
    return res.status(HTTP_BAD_REQUEST).json(error.message);
  }
}

module.exports = {
  showClient,
};

