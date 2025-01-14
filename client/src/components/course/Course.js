import React from "react";
import "./course.css";

const PlanCard = ({ title, features, price ,position}) => (
  <div className={`plan-card ${position}`}>
    <h2 className="plan-title">{title}</h2>
    <div className="plan-content">
      <h3>הקורס כולל:</h3>
      <div className="table-plan-card">
        <div className="index-plan-card">
          {features.map((feature, index) => (
            <div className="key-plan-card" key={index}>
               <div className="tick-v-plan-card">✔️</div>
               <div className="feature-plan-card">{feature}</div>
            </div>
          ))}
        </div>
      </div>
      <h4 className="table-plan-card-price">מחיר: {price}</h4>
    </div>
  </div>
);

const Course = () => {
  return (
    <div className="container-plan-card">
      <PlanCard title="mini" features={["יישום", "יישום", "יישום" , "יישום"]} price="100₪" position="right"/>
      <PlanCard title="standard" features={["יישום", "יישום", "יישום", "יישום", "יישום", "יישום"]} price="200₪" position="left"/>
      <PlanCard title="extra" features={["יישום", "יישום", "יישום", "יישום", "יישום","יישום", "יישום", "יישום"]} price="300₪"position="right" />
    </div>
  );
};

export default Course;
