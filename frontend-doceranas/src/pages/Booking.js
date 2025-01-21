import React, { useState, useEffect } from "react";
import axios from "axios"; // Importamos axios
import "./Booking.css";

const Booking = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hora, setHora] = useState("");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [horasDisponibles, setHorasDisponibles] = useState([]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Obtén los valores del formulario

    // Combina fecha y hora en el formato requerido por la base de datos
    const fechavisita = `${document.getElementById("fecha").value} ${hora}`;
    // Aquí se obtiene la información del formulario
    const formData = {
      nombre: e.target.nombre.value,
      apellido: e.target.apellido.value,
      telefono: e.target.tel.value,
      correo: e.target.correo.value,
      fechavisita: fechavisita,
      mensaje: message,
    };

    try {
      // Enviar la información a la ruta de la API
      const response = await axios.post(
        "http://localhost:5000/api/agenda/add-visitor",
        formData
      );

      if (response.data.message) {
        alert(
          `Reserva para: ${formData.nombre}, Fecha y hora: ${formData.fechavisita}`
        );
        setIsModalOpen(false);
        setHora("");
        setMessage("");
      }
    } catch (error) {
      console.error("Error al enviar la reserva:", error);
      alert("Hubo un error al procesar tu reserva. Intenta de nuevo.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    setHora("");
    setMessage("");
  };

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const generateCalendar = () => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const calendarDays = [];
    const today = new Date();

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="calendar-day empty" />
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const formattedDate = date.toISOString().split("T")[0];
      const isToday = today.toISOString().split("T")[0] === formattedDate;

      calendarDays.push(
        <div
          key={formattedDate}
          className={`calendar-day ${isToday ? "today" : ""}`}
          onClick={() => handleDateClick(formattedDate)}
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  const generateHorasDisponibles = (inicio, fin, intervalo) => {
    const horas = [];
    let current = inicio;
    while (current < fin) {
      const horasStr = String(current).padStart(2, "0");
      horas.push(`${horasStr}:00`, `${horasStr}:${intervalo}`);
      current++;
    }
    return horas;
  };

  useEffect(() => {
    // Genera las horas de 9:00 a 18:30
    const horas = generateHorasDisponibles(9, 18, "30");
    setHorasDisponibles(horas);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectHora = (horaSeleccionada) => {
    setHora(horaSeleccionada);
    setIsDropdownOpen(false);
  };

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const monthName = monthNames[currentDate.getMonth()];

  return (
    <div className="booking">
      <h2>Reserva Tu Visita</h2>

      <div className="calendar-controls">
        <button onClick={() => changeMonth(-1)}>◀</button>
        <h3>
          {monthName} {currentDate.getFullYear()}
        </h3>
        <button onClick={() => changeMonth(1)}>▶</button>
      </div>

      <div className="calendar">{generateCalendar()}</div>
      <div className="leyenda">
        <h5 className="leytext">Ocupado</h5>
      </div>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Reserva para el {selectedDate}</h3>
            <form onSubmit={handleSubmit}>
              <label>Nombre:</label>
              <input type="text" id="nombre" required />

              <label>Apellido:</label>
              <input type="text" id="apellido" required />

              <label>Teléfono:</label>
              <input type="number" id="tel" required />

              <label>Correo:</label>
              <input type="email" id="correo" required />

              <label>Fecha:</label>
              <input
                type="date"
                id="fecha"
                value={selectedDate || ""}
                readOnly
              />

              <label>Hora:</label>
              <div className="time-picker">
                <input
                  type="text"
                  id="hora"
                  placeholder="Selecciona una hora"
                  value={hora}
                  readOnly
                  onClick={toggleDropdown}
                />
                {isDropdownOpen && (
                  <ul className="time-dropdown">
                    {horasDisponibles.map((h, index) => (
                      <li
                        key={index}
                        className="time-item"
                        onClick={() => selectHora(h)}
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <label>Mensaje o Consulta:</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button type="submit">Confirmar</button>
              <button type="button" onClick={closeModal}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
