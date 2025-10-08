import  sequelize  from "./database/db";

async function syncDB() {
  try {
    await sequelize.sync({ alter: true }); // usa { force: true } si quieres recrear desde cero
    console.log("✅ Tablas sincronizadas correctamente");
  } catch (error) {
    console.error("❌ Error al sincronizar:", error);
  } finally {
    await sequelize.close();
  }
}

syncDB();
