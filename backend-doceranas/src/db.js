const postgres = require("postgres");

const connectionString = process.env.DATABASE_URL;

const sql = postgres(connectionString, {
  ssl: "require", // Obligamos a usar SSL
});

// Probar la conexión
sql`SELECT 1`
  .then(() => {
    console.log("Conexión exitosa");
  })
  .catch((err) => {
    console.error("Error conectando a la base de datos:", err);
  });

module.exports = sql;
