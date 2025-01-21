import React, { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://res.cloudinary.com/djka72zkq/image/upload/v1737308153/samples/landscapes/nature-mountains.jpg",
    "https://img.freepik.com/foto-gratis/silla-piscina-paraguas_1203-2773.jpg?t=st=1736970477~exp=1736974077~hmac=69265ccdbcb32f9e64e06339a112f7d032eaf252eeae52f2f1de5623c2f0effd&w=900",
    "https://img.freepik.com/foto-gratis/piscina-rodeada-palmeras-lago-alpino-ascona-suiza_181624-20784.jpg?t=st=1736970558~exp=1736974158~hmac=2b8a929b489af272eaa5c3b18b78749ddfdb31dceca17170045eb63beb27b8d5&w=740",
  ];

  // Función para mover el carrusel a la siguiente imagen automáticamente
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // UseEffect para hacer avanzar las imágenes automáticamente cada 3 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 3000); // Cambia la imagen cada 3 segundos

    // Limpiar intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, [currentIndex]); // Solo vuelve a ejecutarse si currentIndex cambia

  // Funciones para avanzar y retroceder de manera manual
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="home">
      <h1>Bienvenidos a Doce Ranas</h1>
      <p>¡Disfruta de un día increíble con nuestras modernas instalaciones!</p>

      <div className="carousel">
        <div
          className="carousel-images"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div key={index} className="carousel-item">
              <img
                src={image}
                alt={`Piscina ${index + 1}`}
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

        {/* Botones de navegación */}
        <button className="prev-btn" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="next-btn" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
      <div>
        <h1>Mira un vistazo aero por nuestras instalaciones</h1>
        <video
          className="vide"
          src="https://res.cloudinary.com/djka72zkq/video/upload/v1737489824/Videosdepaisajes_ni6iky.mp4"
          autoPlay /* Habilita la reproducción automática */
          muted /* Silencia el video */
          loop /* Reproduce el video en bucle */
          playsInline /* Mejora compatibilidad con dispositivos móviles */
          style={{
            width: "100%", // Ajusta al ancho del contenedor
            height: "450px", // Define la altura deseada
            objectFit: "cover", // Recorta el video para mantener proporciones
          }}
        ></video>
      </div>
      <h1>La gente nos respalda</h1>
      <div class="testimonials">
        <div class="testimonial-item">
          <img
            src="https://res.cloudinary.com/djka72zkq/image/upload/v1737308151/samples/people/kitchen-bar.jpg"
            alt="Usuario 1"
            class="avatar"
          />
          <p class="name">Juan Pérez</p>
          <p class="review">
            "Un ambiente maravilloso y tranquilo. ¡Perfecto para relajarse
            después de una semana pesada!"
          </p>
        </div>
        <div class="testimonial-item">
          <img
            src="https://res.cloudinary.com/djka72zkq/image/upload/v1737308151/samples/sheep.jpg"
            alt="Usuario 2"
            class="avatar"
          />
          <p class="name">María González</p>
          <p class="review">
            "¡A mis hijos les encantó! Las instalaciones son limpias y cómodas."
          </p>
        </div>
        <div class="testimonial-item">
          <img
            src="https://res.cloudinary.com/djka72zkq/image/upload/v1737308152/samples/people/smiling-man.jpg"
            alt="Usuario 3"
            class="avatar"
          />
          <p class="name">Carlos López</p>
          <p class="review">
            "Excelente atención y muy buena organización. Un lugar muy
            recomendable."
          </p>
        </div>
        <div class="testimonial-item">
          <img
            src="https://res.cloudinary.com/djka72zkq/image/upload/v1737308158/samples/two-ladies.jpg"
            alt="Usuario 4"
            class="avatar"
          />
          <p class="name">Ana Rodríguez</p>
          <p class="review">
            "La mejor piscina de la ciudad, con un ambiente familiar que
            realmente me impresionó."
          </p>
        </div>
        <div class="testimonial-item">
          <img
            src="https://res.cloudinary.com/djka72zkq/image/upload/v1737308161/samples/smile.jpg"
            alt="Usuario 5"
            class="avatar"
          />
          <p class="name">Pedro Gómez</p>
          <p class="review">
            "Es mi lugar favorito para nadar y relajarme. El paisaje es
            precioso."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
