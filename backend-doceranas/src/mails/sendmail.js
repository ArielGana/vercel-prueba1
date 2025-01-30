const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../../.env" });
// Configurar el transportador
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Correo desde el cual se enviará el correo.
    pass: process.env.EMAIL_PASS, // Contraseña de la aplicación.
  },
});
console.log("Usuario:", process.env.EMAIL_USER);
console.log("Contraseña:", process.env.EMAIL_PASS);

// Verificar conexión con el servidor SMTP
transporter.verify((error, success) => {
  if (error) {
    console.error("Error al configurar el transporte:", error);
  } else {
    console.log("Servidor listo para enviar correos.");
  }
});

// Función para enviar correos
const enviarCorreo = async (destinatario, asunto, mensajeHtml) => {
  if (!destinatario || !asunto || !mensajeHtml) {
    console.error(
      "Todos los campos son obligatorios: destinatario, asunto, mensajeHtml."
    );
    return;
  }

  try {
    const info = await transporter.sendMail({
      from: `"Doce-Ranas" <${process.env.EMAIL_USER}>`, // Usar email configurado como remitente.
      to: destinatario,
      subject: asunto,
      html: mensajeHtml,
    });

    console.log("Correo enviado correctamente:", info.messageId);
  } catch (error) {
    console.error("Error al enviar el correo:", error.message);
  }
};

// Ejemplo de uso
enviarCorreo(
  "ganaariel5@gmail.com",
  "¡Hola!",
  "<h1>¡Gracias por reservar en nuestras instalaciones!</h1><p>Esperamos que tu estadía sea increíble con nosotros. A continuación, te enviamos el código QR de tu reserva, junto con el código correspondiente en este mensaje.</p>"
);
