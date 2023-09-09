import { useState } from "react";
import "./ButtonStyles.css";
import { ChangeEvent } from "react";
import { Link } from "react-router-dom";

type TrackerListType = {
  name: string;
  startDate: string;
  endDate: string;
  totalDays: string;
  currDay: string;
};

export function MainPage() {
  const [trackerList, setTrackerList] = useState<TrackerListType[]>([]);

  const [hideEndDate, setHideEndDate] = useState(false);

  const [hideCreateTracker, setHideCreateTracker] = useState(false);

  const [trackerName, setTrackerName] = useState("");

  const [startDateValue, setStartDateValue] = useState("");

  const [endDateMax, setEndDateMax] = useState("");

  const [endDateValue, setEndDateValue] = useState("");

  const [currDay, setCurrDay] = useState("");

  function getMinDate() {
    const currentFullDate = new Date();
    const currentDay = currentFullDate.getDate();
    let currentMonth = currentFullDate.getMonth();
    currentMonth = currentMonth + 1;

    if (currentMonth == 13) {
      currentMonth = 1;
    }

    const currentYear = currentFullDate.getFullYear();

    const minDate = `${currentYear}-0${currentMonth}-0${currentDay}`;
    return minDate;
  }
  const minDate = getMinDate();

  function getMaxDate() {
    const currentFullDate = new Date();
    const currentDay = currentFullDate.getDate();

    const currentMonth = currentFullDate.getMonth();

    const currentYear = currentFullDate.getFullYear() + 1;

    const maxDate = `${currentYear}-0${currentMonth}-0${currentDay}`;

    return maxDate;
  }
  const maxDate = getMaxDate();

  function handleTrackerName(e: ChangeEvent<HTMLInputElement>) {
    setTrackerName(e.target.value);
  }

  function getStartDate(e: ChangeEvent<HTMLInputElement>) {
    setStartDateValue(e.target.value);
  }

  function getEndDate(e: ChangeEvent<HTMLInputElement>) {
    setEndDateValue(e.target.value);
  }

  //function getEndDate(e: ChangeEvent<HTMLInputElement>) {}

  function handleStartDateValidation() {
    if (trackerName == "") {
      alert("Please enter a name for your tracker.");
      return;
    }
    if (startDateValue == "") {
      alert("Please enter a starting date for your tracker.");
      return;
    }

    const day = startDateValue.slice(8, 10);

    let month = parseInt(startDateValue.slice(5, 7));
    month = month + 1;

    if (month == 13) month = 1;

    const year = startDateValue.slice(0, 4);

    const endDateMaxValue = `${year}-0${month}-${day}`;

    setEndDateMax(endDateMaxValue);
    setHideEndDate(true);

    return endDateMaxValue;
  }

  function handleEndDateValidation() {
    if (endDateValue == "") {
      alert("Please enter a ending date for your tracker.");
      return;
    }
    setHideCreateTracker(true);
  }

  function createTracker() {
    const date1 = new Date();

    const date2 = new Date(endDateValue);

    const differenceInTime = date2.getTime() - date1.getTime();
    let differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    let totalDays: string;
    if (differenceInDays <= 0) {
      differenceInDays = 1;
      const daysDifferenceStr = differenceInDays.toString();
      totalDays = daysDifferenceStr;
    }

    differenceInDays = differenceInDays + 1;
    const daysDifferenceStr = differenceInDays.toString();
    totalDays = daysDifferenceStr;

    let tmp = localStorage.getItem("day");

    if (tmp == null) {
      localStorage.setItem("day", "1");
      tmp = localStorage.getItem("day");
    }

    const y = {
      name: trackerName,
      startDate: startDateValue,
      endDate: endDateValue,
      totalDays: totalDays,
      currDay: tmp!,
    };

    setTrackerList((oldList) => [...oldList, y]);
    setHideEndDate(false);
    setHideCreateTracker(false);
  }

  return (
    <>
      <div className="mainPage">
        <div className="mainPageTopContainer">
          {!hideCreateTracker && (
            <div className="mainPageTopLeft">
              <label htmlFor="tracker-name">Enter new calorie tracker name</label>
              <input
                type="text"
                id="tracker-name"
                className="trackerNameInput"
                onChange={handleTrackerName}
              />
            </div>
          )}
          {!hideCreateTracker && (
            <div className="mainPageTopMiddle">
              <div className="trackerDatesContainer">
                {!hideEndDate && (
                  <div className="trackerStartDateContainer">
                    <label htmlFor="tracker-start-date">Start Date</label>
                    <input
                      type="date"
                      id="tracker-start-date"
                      className="startDateInput"
                      min={minDate}
                      max={maxDate}
                      onChange={getStartDate}
                    />
                  </div>
                )}
                {hideEndDate && (
                  <div className="trackerEndDateContainer">
                    <label htmlFor="tracker-end-date">End Date</label>
                    <input
                      type="date"
                      id="tracker-end-date"
                      className="endDateInput"
                      min={startDateValue}
                      max={endDateMax}
                      onChange={getEndDate}
                    />
                  </div>
                )}
                {!hideEndDate && (
                  <button className="confirmStartDateBtn" onClick={handleStartDateValidation}>
                    Confirm Start Date
                  </button>
                )}
                {hideEndDate && (
                  <button className="confirmStartDateBtn" onClick={handleEndDateValidation}>
                    Confirm End Date
                  </button>
                )}
              </div>
            </div>
          )}
          {hideCreateTracker && (
            <div className="mainPageTopRight">
              <button className="createTrackerBtn" onClick={createTracker}>
                Create Tracker!
              </button>
            </div>
          )}
        </div>
        <div className="trackerContainers">
          {trackerList.map((item) => {
            return (
              <div className="trackerListItem" key={item.name}>
                <Link
                  to={`/Trackers/${item.name}/${item.totalDays}/${item.currDay}`}
                  className="trackerListBtn"
                ></Link>
                <div className="trackerListItemTop">{item.name}</div>
                <div className="trackerListItemMiddleContainer">
                  <div className="trackerListItemMiddle">
                    <div className="trackerListItemMiddleTop">Calories lost: 500</div>
                    <span>Start Date: {startDateValue}</span>
                    <span>End Date: {endDateValue}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
