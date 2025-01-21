const express = require("express");
const router = express.Router();
const db = require("../db");

// Ruta de prueba

router.get("/db-status", (req, res) => {
  db.query("SELECT 1", (err, results) => {
    if (err) {
      console.error("Error en la conexión a la base de datos:", err);
      return res.status(500).json({
        message: "Error en la conexión a la base de datos",
        error: err,
      });
    }
    res.json({ message: "Conexión a la base de datos exitosa", results });
  });
});

router.get("/status", (req, res) => {
  res.json({ message: "El servidor está funcionando correctamente." });
});

module.exports = router;
