import React from "react";
import "./course.css";

const PlanCard = ({ title, features, price }) => (
  <div className="plan-card">
    <h2 className="plan-title">{title}</h2>
    <div className="plan-content">
      <h3>הקורס כולל:</h3>
      <table className="table-plan-card">
        <tbody >
          {features.map((feature, index) => (
            <tr key={index}>
              <td>{feature}</td>
              <td>✔️</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4 className="table-plan-card-price">מחיר: {price}</h4>
    </div>
  </div>
);

const Course = () => {
  return (
    <div className="container-plan-card">
      <PlanCard title="mini" features={["יישום", "יישום", "יישום"]} price="100₪" />
      <PlanCard title="standard" features={["יישום", "יישום", "יישום", "יישום"]} price="200₪" />
      <PlanCard title="extra" features={["יישום", "יישום", "יישום", "יישום", "יישום"]} price="300₪" />
    </div>
  );
};

export default Course;
