import React from "react";

function FocusTime({ focusDuration, setFocusDuration })
{
  return (
    <div className="col">
      <div className="input-group input-group-lg mb-2">
        <span className="input-group-text" data-testid="duration-focus">
          {/* TODO: Update this text to display the current focus session duration */}
          Focus Duration: {("0" + focusDuration).substr(-2)}:00
        </span>
        <div className="input-group-append">
          {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="decrease-focus"
            onClick={() => {
              if (focusDuration > 5) setFocusDuration(focusDuration - 5);
            }}
          >
            <span name="focus" className="oi oi-minus" />
          </button>
          {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="increase-focus"
            onClick={() => {
              if (focusDuration < 60) setFocusDuration(focusDuration + 5);
            }}
          >
            <span name="focus" className="oi oi-plus" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FocusTime;