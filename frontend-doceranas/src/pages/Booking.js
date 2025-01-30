import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Booking.css";
import { QRCodeCanvas } from "qrcode.react";

const generateReservationCode = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let code = "";

  for (let i = 0; i < 3; i++) {
    code += letters[Math.floor(Math.random() * letters.length)];
  }
  for (let i = 0; i < 4; i++) {
    code += numbers[Math.floor(Math.random() * numbers.length)];
  }

  return code;
};

const Booking = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [message, setMessage] = useState("");
  const [qrData, setQrData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Estado de carga
  const [hora, setHora] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [reserva, setReserva] = useState(null);
  const [error, setError] = useState(null);
  const [codigoReserva, setCodigoReserva] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleDateClick = (date) => {
    const selectedDate = new Date(date);
    const today = new Date();

    const selectedDay = selectedDate.toISOString().slice(0, 10);
    const todayDay = today.toISOString().slice(0, 10);

    if (selectedDay < todayDay) {
      setMessage("No puedes reservar en días pasados.");
      setIsModalOpen(true);
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
      setMessage("");
      setIsModalOpen(false);
    }
  };
  const abrirModal = () => {
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  const ModalConfirmacion = ({ mostrar, mensaje, onConfirmar, onCancelar }) => {
    if (!mostrar) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-container">
          <p>{mensaje}</p>
          <div className="modal-buttons">
            <button onClick={onConfirmar} className="confirm-button">
              Eliminar
            </button>
            <button onClick={onCancelar} className="cancel-button">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const SuccessModal = ({ message, isOpen, close, qrData, isLoading }) => {
    const qrCanvasRef = useRef(null);

    const downloadQRCode = () => {
      const canvas = qrCanvasRef.current.querySelector("canvas");
      if (canvas) {
        const imageUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = imageUrl;
        a.download = "qr_code.png";
        a.click();
      }
    };

    if (!isOpen) return null;

    return (
      <div className="modal" onClick={close}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h3
            // Aquí usas `dangerouslySetInnerHTML` para renderizar el mensaje con HTML
            dangerouslySetInnerHTML={{ __html: message }}
          />
          {/* Mostrar el spinner si está cargando, de lo contrario mostrar los detalles */}
          {isLoading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Enviando la reserva...</p>
            </div>
          ) : (
            qrData && (
              <div className="qr-code" ref={qrCanvasRef}>
                <QRCodeCanvas value={qrData} size={128} />
                <p>
                  Escanea este código para guardar los detalles de tu reserva.
                </p>
                <button className="btn" onClick={downloadQRCode}>
                  Descargar QR
                </button>
              </div>
            )
          )}
          <button className="btnmodal" onClick={close}>
            Cerrar
          </button>
        </div>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fechavisita = `${document.getElementById("fecha").value} ${hora}`;
    const reservaCodigo = generateReservationCode();
    const qrUrl = `http://example.com/qr/${reservaCodigo}`;

    const formData = {
      nombre: e.target.nombre.value,
      apellido: e.target.apellido.value,
      telefono: e.target.tel.value,
      correo: e.target.correo.value,
      fechavisita: fechavisita,
      codigoreserva: reservaCodigo,
      qrUrl: qrUrl,
      mensaje: message,
    };
    setLoading(true); // Activamos el estado de "cargando"

    try {
      await axios.post(
        "https://vercel-prueba1-server.vercel.app/api/agenda/add-visitor",
        formData
      );

      setQrData(qrUrl);
      setMessage(
        `<h2>¡Gracias por reservar en Doce Ranas!</h2>
         <p><strong>Reserva confirmada para:</strong> ${formData.nombre}</p>
         <p><strong>Fecha y hora:</strong> ${formData.fechavisita}</p>
         <p><strong>Código de Reserva:</strong> ${reservaCodigo}</p>
         <p><strong>Se ha enviado un correo con los datos de la reserva.</strong></p>`
      );

      setLoading(false);
      setIsModalOpen(true);
      setHora("");
      setSelectedDate(null);
    } catch (error) {
      setLoading(false); // También lo desactivamos si hay un error
      console.error("Error al enviar la reserva:", error);
      setMessage("Hubo un error al procesar tu reserva. Intenta de nuevo.");
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMessage("");
    setSelectedDate(null);
    setHora("");
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

      const isDisabled = new Date(formattedDate) < today && !isToday;

      calendarDays.push(
        <div
          key={formattedDate}
          className={`calendar-day ${isToday ? "today" : ""} ${
            isDisabled ? "disabled" : ""
          }`}
          onClick={() => !isDisabled && handleDateClick(formattedDate)}
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
  const [isModalfloatOpen, setIsModalfloatOpen] = useState(false);

  const toggleModalfloat = () => {
    setIsModalfloatOpen(true);
    setReserva(null); // Limpiar la reserva al abrir/cerrar el modal
    setError(null); // Limpiar el error al abrir/cerrar el modal
  };

  const toggleModalfloatcerrar = () => {
    setIsModalfloatOpen(false);
  };
  const handleInputChange = (e) => {
    // Convertir el valor a mayúsculas antes de actualizar el estado
    const upperCaseValue = e.target.value.toUpperCase();
    setCodigoReserva(upperCaseValue); // Actualizar el estado con el valor en mayúsculas
  };

  const handleSubmitreserva = async () => {
    try {
      const response = await axios.get(
        `https://vercel-prueba1-server.vercel.app/api/reserva/${codigoReserva}`
      );

      // Verifica si la respuesta contiene datos de la reserva
      if (response.data.reserva) {
        const reservaData = response.data.reserva;

        // Formatear la fecha
        const fecha = new Date(reservaData.fechavisita);
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1;
        const año = fecha.getFullYear();
        const horas = fecha.getHours();
        const minutos = fecha.getMinutes();

        const diaFormateado = `${dia.toString().padStart(2, "0")}/${mes
          .toString()
          .padStart(2, "0")}/${año}`;
        const horaFormateada = `${horas.toString().padStart(2, "0")}:${minutos
          .toString()
          .padStart(2, "0")}`;

        // Agregar los campos formateados al objeto de reserva
        reservaData.diaFormateado = diaFormateado;
        reservaData.horaFormateada = horaFormateada;

        // Actualizar el estado con los datos de la reserva
        setReserva(reservaData);
        setError(null);
      } else {
        setError("Reserva no encontrada");
        setReserva(null);
      }
    } catch (err) {
      setError("Error al obtener la reserva");
      setReserva(null);
    }
  };

  const eliminarReserva = () => {
    fetch(
      `https://vercel-prueba1-server.vercel.app/api/delete/${reserva.codigoreserva}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        toggleModalfloatcerrar();
        const mensajeExito = document.getElementById("mensaje-exito");
        mensajeExito.innerHTML = `¡La reserva fue cancelada con éxito!`;
        mensajeExito.classList.add("show");

        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => {
          mensajeExito.classList.remove("show");
        }, 3000);

        // Redirigir o realizar otras acciones
      })
      .catch((error) => {
        console.error("Error al eliminar la reserva:", error);
        alert("Oops, algo salió mal. Intenta nuevamente.");
      });
  };

  return (
    <div className="booking">
      <div id="mensaje-exito" class="mensaje-exito">
        ¡La reserva fue cancelada con éxito!
      </div>
      <h2 style={{ marginTop: "-20px" }}>Reserva Tu Visita</h2>

      <div className="calendar-controls">
        <button onClick={() => changeMonth(-1)}>◀</button>
        <h3>
          {monthName} {currentDate.getFullYear()}
        </h3>
        <button onClick={() => changeMonth(1)}>▶</button>
      </div>

      <div className="calendar">{generateCalendar()}</div>

      {selectedDate && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Reserva para visita el {selectedDate}</h3>
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

              <label>"Especifique el uso que le dará al recinto." :</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <p className="form-note">
                "Le recordamos que esta reserva tiene como objetivo la visita al
                recinto y la observación de sus instalaciones."{" "}
              </p>
              <button type="submit">Confirmar</button>
              <button type="button" onClick={closeModal}>
                Cancelar
              </button>
              {loading && (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <p>Enviando la reserva...</p> {/* Mostrar mensaje de carga */}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
      <div>
        {/* Botón flotante */}
        <button className="floating-btn" onClick={toggleModalfloat}>
          <img className="reserva" src="/icon/reserva.png"></img>
        </button>

        {/* Modal */}
        {isModalfloatOpen && (
          <div className="modal-overlay-float" onClick={toggleModalfloat}>
            <div
              className="modal-content-float"
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Digite su número de reserva</h3>
              <input
                type="text"
                placeholder="Número de reserva"
                className="input-field"
                value={codigoReserva}
                onChange={handleInputChange}
              />
              <button className="submit-btn" onClick={handleSubmitreserva}>
                Enviar
              </button>
              <button className="close-btn" onClick={toggleModalfloatcerrar}>
                Cerrar
              </button>
              {reserva && (
                <div className="datreserv">
                  <h4>Datos de la Reserva</h4>
                  <p>Nombre: {reserva.nombre}</p>
                  <p>Apellido: {reserva.apellido}</p>
                  <p>Teléfono: {reserva.telefono}</p>
                  <p>Correo: {reserva.correo}</p>
                  <p>Fecha: {reserva.diaFormateado}</p>
                  <p>Hora: {reserva.horaFormateada}</p>

                  {/* Agrega más campos según sea necesario */}
                  <button onClick={abrirModal}>cancelar visita</button>
                  <ModalConfirmacion
                    mostrar={mostrarModal}
                    mensaje="¿Estás seguro de que deseas eliminar esta reserva?"
                    onConfirmar={eliminarReserva}
                    onCancelar={cerrarModal}
                  />
                </div>
              )}

              {/* Mostrar mensaje de error */}
              {error && <p className="error-message">{error}</p>}
            </div>
          </div>
        )}
      </div>
      <p>
        "Si ya has realizado una reserva, puedes consultarla haciendo clic en el
        botón de la esquina inferior derecha."
      </p>
      <SuccessModal
        message={message}
        isOpen={isModalOpen}
        close={closeModal}
        qrData={qrData}
        isLoading={loading}
      />
    </div>
  );
};

export default Booking;
