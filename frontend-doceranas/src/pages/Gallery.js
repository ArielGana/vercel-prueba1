import React, { useState, useEffect } from "react";
import "./PhotoGallery.css";

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Llamada a la API para obtener las fotos
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          "https://vercel-prueba1-server-lelb1j8tn-ariels-projects-1cd169f9.vercel.app/api/photos"
        ); // Asegúrate de que esta ruta coincida con tu backend
        const data = await response.json();
        setPhotos(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar las fotos:", error);
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const openModal = (photo) => setSelectedPhoto(photo);
  const closeModal = () => setSelectedPhoto(null);

  if (loading) {
    return <div className="loading">Cargando fotos...</div>;
  }

  return (
    <div className="photo-gallery">
      <h2>Galería de Fotos</h2>
      <div className="gallery-grid">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="gallery-item"
            onClick={() => openModal(photo)}
          >
            <img src={photo.src} alt={photo.alt} />
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPhoto.src} alt={selectedPhoto.alt} />
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
