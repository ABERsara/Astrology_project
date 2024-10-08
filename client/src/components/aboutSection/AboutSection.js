import "./about-section.css"
import React, { useEffect, useRef, useState } from "react";

const AboutSection = () => {

  return (
    <div className="about-container">
      <div className="about-me-container">
        <div className="about-me-sentences">
          <div className="sentence1-about">
            נעים להכיר,
          </div>
          <div className="sentence2-about">
            רוחי...
          </div>
        </div>
      </div>
      <div className="about-txt">
        <p>
          נעים להכיר

          לחחיוי וטכמ וטכה וע ו8טאט ו8ט
          לםווא לוכב וככ ו8אאגס ו87אאב פן9ינ
          ןטטכה לטטכ לו7כה חןואאבהף
          ]ןןוי חיוטכע לחוכע חעטגב יטטכבחחי
          וןטימ חיט וטט ןטטכה ליטטה ליוה
          ןט חעה יוכ חיכ יכב
          יכדזסבה וטרגס חטגדשז
        </p>
        {/* <img alt="מאזניים" src="/3.png" className="horoscope Libra" />
        <img alt="דלי" src="/9.png" className="horoscope Aquarius" />
        <img alt="עקרב" src="/11.png" className="horoscope Scorpio" /> */}
      </div>
      <div className="about-question">
        <p>
        ומאיפה הגעתי לזה?
        </p>
        <img alt="" src="/7white.png" className="horo Aries" />
        <img alt="" src="/6white.png" className="horo Taurus" />
      </div>
      <div className="more-txt">
        <p>
          נעים להכיר,
          לחחיוי וטכמ וטכה וע ו8טאט ו8ט
          לםווא לוכב וככ ו8אאגס ו87אאב פן9ינ
          ןטטכה לטטכ לו7כה חןואאבהף
          ]ןןוי חיוטכע לחוכע חעטגב יטטכבחחי
          וןטימ חיט וטט ןטטכה ליטטה ליוה
          ןט חעה יוכ חיכ יכב
        </p>
        
      </div>
      <div className="to-contact">
        שנדבר?
      </div>

    </div>
  );
};

export default AboutSection;
