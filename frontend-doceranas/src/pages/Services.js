import React, { useState, useEffect } from "react";
import "./Services.css";

const services = [
  {
    name: "Piscina al aire libre",
    img: "https://res.cloudinary.com/djka72zkq/image/upload/v1737308612/sitio/f9yypkb7qkey8rhconsx.jpg",
    description:
      "Relájate en nuestra piscina, ideal para disfrutar en los días soleados y rodeada de cómodas tumbonas.",
    Folder: "piscina",
  },
  {
    name: "Estacionamiento",
    img: "https://res.cloudinary.com/djka72zkq/image/upload/v1737309033/sitio/xrha1olgzmdp2caa0evn.jpg",
    description:
      "Amplio estacionamiento disponible, con espacios seguros para tu vehículo durante toda tu estadía.",
    Folder: "Estacionamiento",
  },
  {
    name: "Cocina equipada",
    img: "https://res.cloudinary.com/djka72zkq/image/upload/v1737309033/sitio/pq9kdkpi41hlr6rswrdn.jpg",
    description:
      "Cocina moderna con todos los electrodomésticos necesarios para preparar tus comidas favoritas.",
    Folder: "Cocina",
  },
  {
    name: "Baños modernos",
    img: "https://res.cloudinary.com/djka72zkq/image/upload/v1737309033/sitio/ul04chkphlmmhituoebz.jpg",
    description:
      "Baños con diseño contemporáneo, equipados con duchas de agua caliente y amenities de lujo.",
    Folder: "Baños",
  },
  {
    name: "Parrilla disponible",
    img: "https://res.cloudinary.com/djka72zkq/image/upload/v1737309033/sitio/nqglyw7o0vwh0akzueff.jpg",
    description:
      "Disfruta de una parrilla perfecta para tus asados, equipada con todo lo necesario para una experiencia deliciosa.",
    Folder: "Parrilla",
  },
  {
    name: "Entretenciones disponible",
    img: "https://res.cloudinary.com/djka72zkq/image/upload/v1737421738/entretenciones_d2qufk.jpg",
    description:
      "Disfruta de entretenciones para niños y adultos, esto gracias a entretenciones maty y domy.",
    Folder: "Entretenciones",
  },
];

const Services = () => {
  const [activeService, setActiveService] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleService = async (index, folderName) => {
    if (activeService === index) {
      setActiveService(null);
      return;
    }

    setActiveService(index);
    setLoading(true);
    setGalleryImages([]); // Se vacía la galería solo cuando un nuevo servicio es seleccionado.

    try {
      const response = await fetch(
        `https://vercel-prueba1-server.vercel.app/api/photos/${folderName}`
      );
      const data = await response.json();
      setGalleryImages(data);
    } catch (error) {
      console.error("Error al cargar las imágenes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="services">
      <h2>Características del Lugar</h2>
      <div className="services-list">
        {services.map((service, index) => (
          <div
            key={index}
            className={`service-item ${
              activeService === index ? "active" : ""
            }`}
            onClick={() => toggleService(index, service.Folder)}
          >
            <div className="service-details">
              <div className="service-text">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
              <img
                src={service.img}
                alt={service.name}
                className="service-img"
              />
            </div>

            {/* Solo muestra la galería si el servicio está activo */}
            {activeService === index && (
              <div className="service-gallery">
                {loading ? (
                  <p>Cargando galería...</p>
                ) : galleryImages.length > 0 ? (
                  galleryImages.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image.src}
                      alt={`${service.name} ${imgIndex + 1}`}
                      className="thumbnail"
                      onClick={(e) => {
                        e.stopPropagation(); // Evita que el evento de clic llegue al div padre
                        setSelectedImage(image.src);
                      }}
                    />
                  ))
                ) : (
                  <p>No hay imágenes disponibles.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal para mostrar la imagen en grande */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={() => setSelectedImage(null)}
            >
              ✖
            </button>
            <img
              src={selectedImage}
              alt="Vista ampliada"
              className="large-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
