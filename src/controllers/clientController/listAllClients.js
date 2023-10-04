const knex = require("../../connection");

const HTTP_SUCCESS = 200;
const HTTP_BAD_REQUEST = 400;

async function listAllClients(req, res) {
  try {
    const clients = await knex("clients").select("*");

    for (const client of clients) {
      const charges = await knex("charges").where({ client_id: client.id });
      client.status = "Em dia";

      for (const charge of charges) {
        const today = new Date();
        const dueDate = new Date(charge.due_date);

        today.setHours(0, 0, 0, 0);
        dueDate.setHours(0, 0, 0, 0);

        if (
          today > dueDate &&
          (charge.status === "Pendente" || charge.status === "Vencida")
        ) {
          client.status = "Inadimplente";
          break;
        }
      }

      await knex("clients")
        .where({ id: client.id })
        .update({ status: client.status });
    }

    return res.status(HTTP_SUCCESS).json(clients);
  } catch (error) {
    return res.status(HTTP_BAD_REQUEST).json({ message: error.message });
  }
}

module.exports = {
  listAllClients,
};
