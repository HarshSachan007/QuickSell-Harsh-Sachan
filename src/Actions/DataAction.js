import axios from "axios";

// Action creators for fetching data
export const fetchDataRequest = () => ({ type: "DATA_REQUEST" });
export const fetchDataSuccess = (data) => ({
  type: "DATA_SUCCESS",
  payload: data,
});
// export const fetchDataFailure = () => ({ type: "DATA_FAILURE" });

// Action creators for selecting and sorting data
export const selectDataRequest = () => ({ type: "SELECT_DATA_REQUEST" });
export const selectDataSuccess = (selectedData, user) => ({
  type: "SELECT_DATA_SUCCESS",
  payload: { selectedData, user },
});
export const selectDataFailure = (error) => ({
  type: "SELECT_DATA_FAILURE",
  payload: error.message,
});

// Fetch all data from the API
export const fetchAllData = (data) => async (dispatch) => {
  dispatch(fetchDataRequest());
  dispatch(fetchDataSuccess(data));
};

export const selectData =
  (group, allTickets, orderValue) => async (dispatch) => {
    try {
      dispatch(selectDataRequest());

      let user = false;
      let selectedData = [];

      if (group === "status") {
        // Group by status
        const statusSet = new Set(allTickets.map((elem) => elem.status));
        const statusArr = [...statusSet];

        statusArr.forEach((status, index) => {
          const filteredTickets = allTickets.filter(
            (elem) => elem.status === status
          );
          const sortedTickets = filteredTickets.sort(sortFunction(orderValue));
          selectedData.push({
            [index]: { title: status, value: sortedTickets },
          });
        });
      } else if (group === "user") {
        // Group by user
        user = true;
        allTickets?.allUser?.forEach((userElem, index) => {
          const filteredTickets = allTickets?.allTickets?.filter(
            (ticketElem) => userElem.id === ticketElem.userId
          );
          const sortedTickets = filteredTickets.sort(sortFunction(orderValue));
          selectedData.push({
            [index]: { title: userElem.name, value: sortedTickets },
          });
        });
      } else {
        // Group by priority
        const priorityList = ["Urgent", "High", "Medium", "Low", "No_priority"];

        priorityList.forEach((priority, index) => {
          const filteredTickets = allTickets.filter(
            (elem) => index === elem.priority
          );
          const sortedTickets = filteredTickets.sort(sortFunction(orderValue));
          selectedData.push({
            [index]: { title: priority, value: sortedTickets },
          });
        });
      }

      dispatch(selectDataSuccess(selectedData, user));
    } catch (error) {
      dispatch(selectDataFailure(error));
    }
  };

const sortFunction = (orderValue) => (a, b) => {
  if (orderValue === "title") {
    // Sort tickets in ascending order based on title
    return a.title.localeCompare(b.title);
  } else if (orderValue === "priority") {
    // Sort tickets in descending order of priority
    return b.priority - a.priority;
  }
  // Default to no sorting
  return 0;
};
