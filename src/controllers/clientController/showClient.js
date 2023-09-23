const knex = require('../../connection');
const HTTP_SUCCESS = 200;
const HTTP_BAD_REQUEST = 400;


async function showClient(req, res){
    const clientId = req.params.id;
    try {
        const client = await knex('clients').where('id', clientId).first();

        if(!client){
            return res.status(404).json({ mensagem: 'Cliente não encontrado'});
        }

        return res.status(HTTP_SUCCESS).json({ mensagem: client});
    } catch (error) {
        return res.status(HTTP_BAD_REQUEST).json({ mensagem: error.message });
    }
}

module.exports = {
    showClient,
}