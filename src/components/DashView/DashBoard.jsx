import React from "react";
import { useSelector } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import "./DashBoard.css";
import Card from "../Card/Card";
import profile from "../../assets/profile.jpeg";
import imageLinks from "../../assets/images.jsx";

const DashBoard = () => {
  const { selectedData, user } = useSelector(
    (state) => state.SelectDataReducer
  );

  return (
    selectedData && (
      <div className="dynamicContainer">
        {selectedData.map((elem, index) => (
          <div key={index} className="dynamicCardContainer">
            <div className="dynamicCardHeader">
              <div className="customLeftView">
                {!user ? (
                  <div className="headerImageContainer">
                    <img src={imageLinks[elem[index].title]} />
                  </div>
                ) : (
                  <div className="userImageContainer">
                    <img src={profile} alt="UserImage" />
                  </div>
                )}
                <span style={{ marginLeft: "10px" }}>
                  {elem[index]?.title} {elem[index]?.value?.length}
                </span>
              </div>
              <div className="customRightView">
                <AiOutlinePlus />{" "}
                <span style={{ letterSpacing: "2px" }}>...</span>
              </div>
            </div>
            <div className="dynamicList">
              {elem[index]?.value?.map((elem, ind) => (
                <Card
                  key={ind}
                  id={elem.id}
                  title={elem.title}
                  tag={elem.tag}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default DashBoard;
