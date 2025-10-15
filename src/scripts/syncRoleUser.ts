import sequelize from "../database/db";
import { RoleUser } from "../models/authorization/RoleUser";
import { Role } from "../models/authorization/role";
import { User } from "../models/authorization/user";

(async () => {
    try {
        console.log("🔄 Sincronizando modelo RoleUser...");

        // 🔹 Primero sincroniza las tablas base si no existen
        await Role.sync({ alter: true });
        await User.sync({ alter: true });

        // 🔹 Luego sincroniza la tabla role_users forzando la recreación
        await RoleUser.sync({ force: true });

        console.log("✅ Tabla 'role_users' sincronizada correctamente.");
    } catch (error) {
        console.error("❌ Error al sincronizar la tabla 'role_users':", error);
    } finally {
        await sequelize.close();
        console.log("🔌 Conexión cerrada.");
    }
})();
