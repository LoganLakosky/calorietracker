import "./TrackerPage.css";
import "../mainPageComponents/ButtonStyles.css";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function TrackerPage() {
  const [currList, setCurrList] = useState<number[]>([]);

  const [hideRightArrow, setHideRightArrow] = useState(false);

  const [hideLeftArrow, setHideLeftArrow] = useState(false);

  const [statsInput1Value, setStatsInput1Value] = useState("");

  const [statsInput2Value, setStatsInput2Value] = useState("");

  const [handleDisable, setHandleDisable] = useState(false);

  const [caloriesLostValue, setCaloriesLostValue] = useState<number>();

  const [caloriesGainedToday, setCaloriesGainedToday] = useState<number>();

  const [caloriesLostToday, setCaloriesLostToday] = useState<number>();

  const [daysArr, setDaysArr] = useState<string[] | undefined>([]);

  const [daysLeftArr, setDaysLeftArr] = useState<string[] | undefined>([]);

  const { daysLeft } = useParams();

  const { currDay } = useParams();

  const daysLeftTmp = daysLeft;

  const currDayTmp = currDay;

  useEffect(() => {
    function getDaysLeft() {
      setDaysLeftArr(() => [currDayTmp!]);
      setDaysArr(() => [daysLeftTmp!]);
      const parsedDaysLeft = parseInt(daysLeft!);
      handleCurrList(parsedDaysLeft);

      const parsedTotalDays = parseInt(daysArr![0]);
      if (5 > parsedTotalDays) {
        setHideLeftArrow(true);
        setHideRightArrow(true);
        return;
      }
    }
    getDaysLeft();
  }, []);

  function handleCurrList(daysLeft: number) {
    let tmp = 0;
    const b: number[] = [];
    while (tmp < daysLeft) {
      tmp = tmp + 1;
      b.push(tmp);
    }

    setCurrList(() => [...b]);
  }

  let curridx = 0;
  function moveBtnsLeft() {
    if (currList[0] == 1) return;

    curridx = curridx + 1;

    setHideRightArrow(false);
    if (curridx == 1) {
      currList.pop();
      const temp = [currList[0]];
      temp[0] = temp[0]! - 1;
      setCurrList(() => [temp[0]!, ...currList]);
    }
  }

  function moveBtnsRight() {
    currList.shift();
    const idx = currList.length - 1;
    let a = currList[idx];

    a = a + 1;
    const parsedTotalDays = parseInt(daysArr![0]);

    if (a == parsedTotalDays) {
      setHideRightArrow(true);
      setCurrList(() => [...currList, a]);
      return;
    } else {
      setHideRightArrow(false);
      setCurrList(() => [...currList, a]);
    }
  }

  function statsInput1(e: ChangeEvent<HTMLInputElement>) {
    const tmp = parseInt(e.target.value);
    if (tmp >= 10000) return;
    setStatsInput1Value(e.target.value);
  }

  function statsInput2(e: ChangeEvent<HTMLInputElement>) {
    const tmp = parseInt(e.target.value);
    if (tmp >= 10000) return;
    setStatsInput2Value(e.target.value);
  }

  function handleDaySubmition() {
    if (statsInput1Value == "") {
      alert("Please enter the amount of calories you lost.");
      return;
    }
    if (statsInput2Value == "") {
      alert("Please enter the amount of calories you consumed.");
      return;
    }

    const intStatsInput1Value = parseInt(statsInput1Value);
    const intStatsInput2Value = parseInt(statsInput2Value);

    if (intStatsInput2Value > intStatsInput1Value) {
      const caloriesGained = intStatsInput2Value - intStatsInput1Value;
      setCaloriesGainedToday(caloriesGained);
      const newCalorieCount = caloriesLostValue! - caloriesGained;

      setCaloriesLostValue(newCalorieCount);
    } else {
      const caloriesLost = intStatsInput1Value - intStatsInput2Value;

      const newCalorieCount = caloriesLost + caloriesLostValue!;

      setCaloriesLostToday(caloriesLost);

      setCaloriesLostValue(newCalorieCount);
    }

    setStatsInput1Value("");
    setStatsInput2Value("");
    setHandleDisable(true);
  }

  function allowStatsEditing() {
    setHandleDisable(false);
  }

  function handleDaySwap(item: number) {
    window.location.href = `http://localhost:5173/Trackers/dwadasd/2/${item}`;
  }

  return (
    <div className="trackerMainPageContainer">
      <div className="trackerMainPage">
        <div className="trackerMainPageTop">
          <div className="trackerMainPageTopMiddle">
            <div className="progressContainer">
              <div className="progressContainerTop">
                <h3>Total Calories lost:</h3>
              </div>
              <span>{caloriesLostValue}</span>
            </div>
            <div className="daysLeftContainer">
              <div className="daysLeftContainerTop">
                <h3>Days Left:</h3>
              </div>
              <span>10</span>
            </div>
          </div>
        </div>
        <div className="trackerStatsContainer">
          <div className="trackerStats">
            <div className="trackerStatsTop">
              <div className="daysTracker">
                <h2>Days Tracker</h2>
              </div>

              <div className="mainDaysButtonsContainer">
                {hideLeftArrow && (
                  <button className="leftArrowBtn" onClick={moveBtnsLeft}>
                    <FontAwesomeIcon className="faArrowLeft" icon={faAngleLeft} />
                  </button>
                )}

                <div className="daysButtonsContainer">
                  {currList.map((item) => {
                    return (
                      <button
                        className="daysButtons"
                        key={item}
                        onClick={() => handleDaySwap(item)}
                      >
                        Day {item}
                      </button>
                    );
                  })}
                </div>
                {hideRightArrow && (
                  <button className="rightArrowBtn" onClick={moveBtnsRight}>
                    <FontAwesomeIcon className="faArrowRight" icon={faAngleRight} />
                  </button>
                )}
              </div>
            </div>
            <div className="mainTrackerStatsContainer">
              <div className="mainTrackerStats">
                <div className="mainTrackerStatsTop">
                  <h2>Day {daysLeftArr} Stats</h2>
                </div>
                <div className="mainTrackerStatsMiddle">
                  <div className="mainFormContainer">
                    <form className="mainForm">
                      <div className="statsInputContainer1">
                        <label htmlFor="statsInput1">
                          Enter calories burned on Day {daysLeftArr}
                        </label>
                        <input
                          type="number"
                          maxLength={5}
                          value={statsInput1Value}
                          id="statsInput1"
                          disabled={handleDisable}
                          onChange={statsInput1}
                        />
                      </div>
                      <div className="statsInputContainer2">
                        <label htmlFor="statsInput2">
                          Enter calories consumed on Day {daysLeftArr}
                        </label>
                        <input
                          type="number"
                          value={statsInput2Value}
                          id="statsInput2"
                          disabled={handleDisable}
                          onChange={statsInput2}
                        />
                      </div>
                    </form>
                    <div className="statsButtonContainer">
                      {!handleDisable && (
                        <button className="statsButton" onClick={() => handleDaySubmition()}>
                          Submit Day {daysLeftArr}
                        </button>
                      )}
                      {handleDisable && (
                        <button className="statsButton" onClick={allowStatsEditing}>
                          Edit Day {daysLeftArr} Stats
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
