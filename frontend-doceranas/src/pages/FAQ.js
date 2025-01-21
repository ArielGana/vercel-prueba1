import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "¿Cómo puedo realizar una reserva?",
      answer:
        "Puedes realizar una reserva a través de nuestro sitio web, seleccionando la fecha y la hora disponibles, completando tus datos de contacto y confirmando la reserva.",
    },
    {
      question: "¿Cuál es la política de cancelación?",
      answer:
        "Si necesitas cancelar tu reserva, puedes hacerlo con al menos 24 horas de antelación para obtener un reembolso completo.",
    },
    {
      question: "¿Puedo cambiar mi hora de reserva?",
      answer:
        "Sí, puedes cambiar la hora de tu reserva con una antelación mínima de 12 horas, dependiendo de la disponibilidad.",
    },
    {
      question: "¿Necesito un depósito para reservar?",
      answer:
        "No, no necesitamos un depósito para reservar. Sólo necesitas proporcionar tus datos y confirmar la reserva.",
    },
  ];

  return (
    <div className="faq">
      <h2>Preguntas Frecuentes</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              <span>{faq.question}</span>
              <span className="toggle-icon">
                {activeIndex === index ? "-" : "+"}
              </span>
            </div>
            <div
              className={`faq-answer ${activeIndex === index ? "show" : ""}`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
