import React from "react";
import styled from "styled-components";
import { FaGithub, FaLinkedin, FaPhone, FaFile } from "react-icons/fa";

const Foot = styled.div`
  height: 30vh;
  background-color: gray;
  display: grid;
  grid-template-rows: 1fr 10%;
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flex {
    width: 60%;
    display: flex;
    justify-content: space-between;
  }
`;

const Footer = () => {
  return (
    <Foot>
      <div className="center">
        <div className="flex">
          <div>
            {" "}
            1455 Boulevard de Maisonneuve O<br />
            Montréal, QC
            <br />
            H3G 1M8{" "}
          </div>
          <ul>
            <li>about us</li>
            <li>philosophy</li>
            <li>mission</li>
            <li>tenets</li>
          </ul>
          <ul className="personal">
            <div>
              <FaLinkedin />
              {" linked-in"}
            </div>
            <div>
              <FaGithub />
              {" github"}
            </div>
            <div>
              <FaFile />
              {" resume"}
            </div>
            <div>
              <FaPhone />
              {" contact"}
            </div>
          </ul>
        </div>
      </div>
      <div className="center">
        <span> 2019, localhost:4000 inc, Rudolph llc. & associates </span>
      </div>
    </Foot>
  );
};

export default Footer;
