import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import FocusTime from "./FocusTime";
import BreakTime from "./BreakTime";
import Controls from "./Controls";


function nextTick(prevState) {
  
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}


function nextSession(focusDuration, breakDuration) {

  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function formatTime(totalTime) {
  return (
    (totalTime - (totalTime %= 60)) / 60 +
    (9 < totalTime ? ":" + totalTime : ":0" + totalTime)
  );
}

function Pomodoro() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [, setIsTimerPaused] = useState(true);

  const [session, setSession] = useState(null);

  const [, setTakingBreak] = useState(false);

  const [focusDuration, setFocusDuration] = useState(25);

  const [breakDuration, setBreakDuration] = useState(5);

  const [aria, setAria] = useState(0);

  const [elapsedTime, setElapsedTime] = useState(0);

  const [, setTimeRemaining] = useState(focusDuration * 60);

  const [breakTimeRemaining, setBreakTimeRemaining] = useState(0);

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will *NOT* need to make changes to the callback function
   */
  useInterval(
    () => {
      setBreakTimeRemaining(breakTimeRemaining + 1);
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        setSession(nextSession(focusDuration, breakDuration));
      }
      setSession(nextTick);
      if (session.label === "Focusing") {
        setAria(
          (100 * (focusDuration * 60 - session.timeRemaining)) /
            (focusDuration * 60)
        );
      } else {
        setAria(
          (100 * (breakDuration * 60 - session.timeRemaining)) /
            (breakDuration * 60)
        );
      }
    },
    isTimerRunning ? 1000 : null
  );

  useInterval(() => {
    if (session && session.timeRemaining) {
      return setElapsedTime(elapsedTime + 1);
    }
  }, 1000);

  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  function stop() {
    if (!session) return;
    setSession(false);
    setTakingBreak(false);
    setIsTimerRunning(false);
    setIsTimerPaused(false);
    setTimeRemaining(focusDuration * 60);
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <FocusTime
            focusDuration={focusDuration}
            setFocusDuration={setFocusDuration}
          />
        </div>
        <div className="col">
          <div className="float-right">
            <BreakTime
              breakDuration={breakDuration}
              setBreakDuration={setBreakDuration}
            />
          </div>
          <Controls
            isTimerRunning={isTimerRunning}
            playPause={playPause}
            stop={stop}
          />
        </div>
        <div>
          {session && (
            <div className="row mb-2">
              <div className="col">
                <h2 data-testid="session-title">
                  {session && session.label} for {" "}
                  {(
                    "0" +
                    (session.label === "Focusing"
                      ? focusDuration
                      : breakDuration)
                  ).substr(-2)}
                  :00 minutes
                </h2>
                <p className="lead" data-testid="session-sub-title">
                  {session && formatTime(session.timeRemaining)} remaining
                </p>
              </div>
            </div>
          )}
          {session && (
            <div className="row mb-2">
              <div className="col">
                <div className="progress" style={{ height: "20px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={aria}
                    style={{ width: `${aria}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
