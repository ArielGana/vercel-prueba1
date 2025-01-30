require("dotenv").config();
const express = require("express");
const cors = require("cors");
const photoRoutes = require("./routes/photosapi");
const agendaRoutes = require("./routes/agenda");
const reservas = require("./routes/reservas");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const apiRoutes = require("./routes/photosapi");

app.use("/api", apiRoutes);
app.use("/api/agenda", agendaRoutes); // Agendar
app.use("/api", reservas);
app.use(photoRoutes);
// Rutas básicas
app.get("/", (req, res) => {
  res.send("¡Bienvenido al backend de Sitio Piscina!");
});

// Puerto y inicio del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
