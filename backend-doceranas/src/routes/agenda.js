// routes/visitorRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// Ruta para insertar los datos de un visitante
router.post("/add-visitor", (req, res) => {
  const { nombre, apellido, telefono, correo, fechavisita } = req.body;

  // Validar que todos los campos estén presentes
  if (!nombre || !apellido || !telefono || !correo || !fechavisita) {
    return res.status(400).json({
      message: "Todos los campos son requeridos",
    });
  }

  // Consulta SQL para insertar los datos
  const query = `
    INSERT INTO agenda (nombre, apellido, telefono, correo, fechavisita)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [nombre, apellido, telefono, correo, fechavisita],
    (err, results) => {
      if (err) {
        console.error("Error al insertar los datos:", err);
        return res.status(500).json({
          message: "Error al guardar los datos",
          error: err,
        });
      }
      res.status(201).json({
        message: "Datos del visitante guardados correctamente",
        data: results,
      });
    }
  );
});

module.exports = router;
