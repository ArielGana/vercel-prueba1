const express = require("express");
const router = express.Router();
const db = require("../db");
require("dotenv").config({ path: "../.env" });
const nodemailer = require("nodemailer");

const sendEmail = async (formData) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Cambiar según el proveedor
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "doceranas@gmail.com",
    to: formData.correo,
    subject: "Reserva Confirmada",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: 0 auto; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <header style="text-align: center; padding-bottom: 20px;">
          <h1 style="color: #4CAF50;">Reserva Confirmada</h1>
          <p style="font-size: 16px; color: #555;">¡Hola ${formData.nombre}!</p>
        </header>
  
        <main>
          <p style="font-size: 18px; line-height: 1.6; color: #555;">Tu reserva ha sido confirmada con éxito. Aquí tienes los detalles:</p>
          <ul style="list-style-type: none; padding: 0;">
            <li style="font-size: 16px; margin: 10px 0;"><strong>Fecha:</strong> ${formData.fechavisita}</li>
            <li style="font-size: 16px; margin: 10px 0;"><strong>Código de Reserva:</strong> ${formData.codigoreserva}</li>
          </ul>
          
          <p style="font-size: 16px; color: #555;">Gracias por elegirnos. Te esperamos pronto.</p>
        </main>
  
        <footer style="text-align: center; padding-top: 20px; font-size: 14px; color: #777;">
          <p>&copy; 2025 Tu Empresa. Todos los derechos reservados.</p>
        </footer>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo enviado con éxito.");
  } catch (error) {
    console.error("Error enviando correo:", error);
  }
};

router.post("/add-visitor", async (req, res) => {
  const {
    nombre,
    apellido,
    telefono,
    correo,
    fechavisita,
    codigoreserva,
    mensaje,
  } = req.body;

  // Validar que todos los campos estén presentes
  if (
    !nombre ||
    !apellido ||
    !telefono ||
    !correo ||
    !fechavisita ||
    !codigoreserva ||
    !mensaje
  ) {
    return res.status(400).json({
      message: "Todos los campos son requeridos",
    });
  }

  try {
    // Consulta SQL para insertar los datos
    const result = await db`
      INSERT INTO agenda (nombre, apellido, telefono, correo, fechavisita, codigoreserva, mensaje)
      VALUES (${nombre}, ${apellido}, ${telefono}, ${correo}, ${fechavisita}, ${codigoreserva}, ${mensaje})
      RETURNING *;
    `;

    // Datos del visitante insertado
    const formData = {
      nombre,
      correo,
      fechavisita,
      codigoreserva,
      mensaje,
    };

    // Enviar el correo
    await sendEmail(formData);

    res.status(201).json({
      message: "Datos del visitante guardados correctamente",
      data: result,
    });
  } catch (err) {
    console.error("Error al insertar los datos:", err);
    return res.status(500).json({
      message: "Error al guardar los datos",
      error: err,
    });
  }
});

module.exports = router;
