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
        </tbody>
      </table>
    </div>
  );
};

export default Pricing;
