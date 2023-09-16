const knex = require('../connection');

const HTTP_SUCCESS = 200;

async function showUser(req, res){
    try {
      const users = await knex('users').select('id', 'name', 'email');

      return res.status(HTTP_SUCCESS).json(users);
    } catch (error) {
       return res.status(500).json({mensagem: error.message});
    }
  }

  module.exports= {
    showUser
  }