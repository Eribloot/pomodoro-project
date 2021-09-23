import React from "react";

function BreakTime({ breakDuration, setBreakDuration }) {
  return (
    <div className="col">
      <div className="input-group input-group-lg mb-2">
        <span className="input-group-text" data-testid="duration-break">
          {/* TODO: Update this text to display the current break session duration */}
          Break Duration: {("0" + breakDuration).substr(-2)}:00
        </span>
        <div className="input-group-append">
          {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="decrease-break"
            onClick={() => {
              if (breakDuration > 1) {
                setBreakDuration(breakDuration - 1);
              }
            }}
          >
            <span name="break" className="oi oi-minus" />
          </button>
          {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="increase-break"
            onClick={() => {
              if (breakDuration < 15) {
                setBreakDuration(breakDuration + 1);
              }
            }}
          >
            <span name="break" className="oi oi-plus" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BreakTime;
