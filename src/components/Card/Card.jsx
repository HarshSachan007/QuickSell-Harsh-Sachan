import React from "react";
import "./Card.css";
import profile from "../../assets/profile.jpeg";
import { BsExclamationSquareFill } from "react-icons/bs";

const Card = ({ id, title, tag, status }) => {
  return (
    <div className="cardContainer">
      <div className="cardHeading">
        <span className="cardId">{id}</span>
        <div className="imageContainer">
          <img className="userImage" src={profile} alt="UserImage" />
          <div className="showStatus"></div>
        </div>
      </div>
      <div className="cardTitle">
        <p>{title}</p>
      </div>
      <div className="cardTags">
      <BsExclamationSquareFill className="tagsExcl"/>
        {tag?.map((elem, index) => (
          <div key={index} className="tags">
            <span></span> {elem}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
