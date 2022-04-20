import React from "react";
import { Link } from "react-router-dom";
import bg from "../img/bg.jpeg";
import logo from "../img/logo.png";
import "./Home.scss";
const Home = () => {
  return (
    <>
      <div className="home">
        <img className="bg" style={{ objectFit: "cover" }} src={bg} alt="" />
        <div className="description">
          <div className="logo_description">
            <img className="logo" src={logo} />
            <div>
              <h1>Money Saver</h1>
              <p>Become more aware of how you’re spending</p>
              <p>Improve your money management</p>
              <p>Plays a crucial role in calculating your profitability</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
