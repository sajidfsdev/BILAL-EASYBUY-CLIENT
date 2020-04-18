import React from "react";
import "./stepper.css";

const ELXStepper = (props) => {
  return (
    <React.Fragment>
      <div
        className="tango-default-skin"
        style={{ width: "100px", marginLeft: "20px" }}
      >
        <div className="tango-default-skin-stepper">
          <div className="tango-step-text-parent">
            <div className="tango-step-text">
              {/* <input
                id="tango-unit-edit-box-id"
                type="text"
                autocomplete="off"
                className={"tango-unit-edit"}
              /> */}
            </div>
          </div>
          <div className="tango-step-buttons">
            <div className={"tango-step-button-up"}></div>
            <div className={"tango-step-button-down"}></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}; //........................

ELXStepper.defaultProps = {
  config: {},
};

export default ELXStepper;
