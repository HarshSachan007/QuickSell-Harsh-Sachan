import React, { useEffect, useState } from "react";
import { TiThList } from "react-icons/ti";
import "./TopNav.css";
import { useDispatch, useSelector } from "react-redux";
import { selectData } from "../../Actions/DataAction";

const TopNav = () => {
  const dispatch = useDispatch();
  const { allTickets, allUser } = useSelector((state) => state.DataReducer);

  const [displayOnClick, setDisplayOnClick] = useState(false);
  const [groupValue, setGroupValue] = useState("status");
  const [orderValue, setOrderValue] = useState("priority");

  const handleGroupValue = (e, valueBool) => {
    setDisplayOnClick(!displayOnClick);
    valueBool ? setGroupValue(e.target.value) :setOrderValue(e.target.value);
  };

  useEffect(() => {
    if (groupValue === "user") {
      dispatch(selectData(groupValue, { allTickets, allUser }, orderValue));
    } else {
      dispatch(selectData(groupValue, allTickets, orderValue));
    }
  }, [allTickets, groupValue, allUser, orderValue]);

  return (
    <div style={{ paddingLeft: "10px" }}>
      <div className="displayButton">
        <button
          className="btn"
          onClick={() => setDisplayOnClick(!displayOnClick)}
        >
        <TiThList />
        <span> Display</span>
        </button>
        {displayOnClick && (
          <div className="dropOnClick">
            <div className="selectGroup">
              <span>Grouping</span>
              <select
                className="selectStyle"
                value={groupValue}
                onChange={(e) => handleGroupValue(e, true)}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="selectGroup">
              <span>Ordering</span>
              <select
                value={orderValue}
                onChange={(e) => handleGroupValue(e, false)}
                className="selectStyle"
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNav;
