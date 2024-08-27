import React from "react";
import { styles } from "../styles/style";

const About = () => {
  return (
    <div className="text-black dark:text-white">
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        What is <span className="text-gradient">HBSULAB?</span>
      </h1>

      <br />
      <div className="w-[95%] 800px:w-[85%] m-auto">
        <p className="text-[18px] font-Poppins">
          Chapter 1: The Beginning
          <br />
          <br />
          Chapter 2: The Journey
          <br />
          <br />
          Chapter 3: The Future
          <br />
          <br />
          Chapter 4: The Community
          <br />
          <br />
          Chapter 5: The Courses
          <br />
          <br />
          Chapter 6: The Team
          <br />
          <br />
          Chapter 7: The Founder
        </p>
        <br />

        <h5 className="text-[18px] font-Poppins">Team of HBSULAB</h5>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default About;
