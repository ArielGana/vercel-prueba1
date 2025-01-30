const express = require("express");
const router = express.Router();
const sql = require("../db"); // Asegúrate de tener la ruta correcta a tu archivo de conexión

// Ruta para obtener los datos de una reserva por el código único 'codigoreserva'
router.get("/reserva/:codigoreserva", async (req, res) => {
  const { codigoreserva } = req.params;

  try {
    // Consulta para obtener la reserva
    const reserva = await sql`
      SELECT * FROM agenda WHERE codigoreserva = ${codigoreserva}
    `;

    if (reserva.length === 0) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    // Enviar la reserva encontrada como respuesta
    res.status(200).json({ reserva: reserva[0] });
  } catch (error) {
    console.error("Error al obtener la reserva:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});
// Ruta para eliminar la reserva
router.delete("/delete/:codigoreserva", async (req, res) => {
  const { codigoreserva } = req.params;

  try {
    // Consulta para eliminar la reserva
    const result = await sql`
        DELETE FROM agenda WHERE codigoreserva = ${codigoreserva}
      `;

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    // Respuesta confirmando que la reserva ha sido eliminada
    res.status(200).json({ message: "Reserva eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la reserva:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
