import React from "react";
import "./Pricing.css";

const Pricing = () => {
  return (
    <div className="pricing">
      <h2>Tarifas</h2>
      <table>
        <thead>
          <tr>
            <th>Día</th>
            <th>Tarifa</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Lunes a Viernes</td>
            <td>$30.000 CLP</td>
          </tr>
          <tr>
            <td>Fines de Semana</td>
            <td>$50.000 CLP</td>
          </tr>
          <tr>
            <td>Estacionamiento</td>
            <td>$5.000 CLP por día</td>
          </tr>
          <tr>
            <td>Juegos Infables</td>
            <td>$10.000 CLP por persona</td>
          </tr>
          <tr>
            <td>Canchas de Deporte</td>
            <td>$20.000 CLP por hora</td>
          </tr>
          <tr>
            <td>Parrilla</td>
            <td>$15.000 CLP por día</td>
          </tr>
          <tr>
            <td>Días Festivos</td>
            <td>$70.000 CLP</td>
          </tr>
          <tr>
            <td>Navidad y Año Nuevo</td>
            <td>$100.000 CLP</td>
          </tr>
          <tr>
            <td>Bodas</td>
            <td>$150.000 CLP</td>
          </tr>
          <tr>
            <td>Caminata en Caballo</td>
            <td>$25.000 CLP por persona</td>
          </tr>
          <tr>
            <td>Transporte</td>
            <td>$30.000 CLP</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Pricing;
