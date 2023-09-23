const cron = require("node-cron");
const knex = require("./connection");

cron.schedule("0 0 * * *", async () => {
  try {
    const overdueCharges = await knex("charges")
      .where("status", "Pendente")
      .andWhere("due_date", "<", knex.fn.now());

    for (const charge of overdueCharges) {
      await knex("charges")
        .where("id", charge.id)
        .update({ status: "Vencida" });
    }
  } catch (error) {
    console.error("Erro ao executar tarefa cron:", error);
  }
});
