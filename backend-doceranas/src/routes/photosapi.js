const express = require("express");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config(); // Cargar variables de entorno desde .env

const router = express.Router();

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Ruta para traer todas las fotos
router.get("/api/photos", async (req, res) => {
  try {
    const { resources } = await cloudinary.search
      .expression("folder=Todas") // Nombre correcto de la carpeta en Cloudinary
      .sort_by("public_id", "desc")
      .max_results(30) // Ajusta el número de imágenes
      .execute();

    // Mapea los recursos a una estructura simplificada
    const photos = resources.map((resource) => ({
      id: resource.asset_id,
      src: resource.secure_url,
      alt: resource.public_id,
    }));

    res.json(photos);
  } catch (error) {
    console.error("Error al obtener fotos de Cloudinary:", error);
    res.status(500).json({
      error: "Error al cargar las fotos.",
      details: error.message,
    });
  }
});

router.get("/api/photos/:folderName", async (req, res) => {
  const folderName = req.params.folderName; // Obtener el nombre de la carpeta desde los parámetros de ruta

  if (!folderName) {
    return res
      .status(400)
      .json({ error: "El nombre de la carpeta es obligatorio." });
  }

  try {
    // Hacer la búsqueda en la carpeta especificada
    const { resources } = await cloudinary.search
      .expression(`folder:sitio/${folderName}/*`) // Buscar en la carpeta especificada
      .sort_by("public_id", "desc") // Ordenar las imágenes
      .max_results(30) // Limitar el número de resultados
      .execute();

    // Mapea los recursos a una estructura simplificada
    const photos = resources.map((resource) => ({
      id: resource.asset_id,
      src: resource.secure_url,
      alt: resource.public_id,
    }));

    res.json(photos); // Enviar las fotos encontradas
  } catch (error) {
    console.error("Error al obtener fotos de Cloudinary:", error);
    res.status(500).send("Error al cargar las fotos.");
  }
});

module.exports = router;
