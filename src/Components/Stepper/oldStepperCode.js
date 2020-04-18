// import React, { useEffect, useState } from "react";
// import LengthConverter from "./LengthConverter";
// import "./stepper.css";

// //constants....
// let timeoutVar = 0;
// let timeoutAfter = 500;
// let timeoutInterval = 25;
// var factors = {
//   // list of ratios of all units
//   px: 96,
//   in: 1,
//   cm: 2.54,
//   mm: 25.4,
//   pt: 72, // default points per inch
//   pc: 6,
//   g: 1,
//   sheet: 1,
// };

// const ELXStepper = (props) => {
//   //state management...
//   const [loading, setLoading] = useState(false);
//   const [config, setConfig] = useState(props.config);
//   const [stepperUpClass, setStepperUpClass] = useState("tango-step-button-up");
//   const [stepperDownClass, setStepperDownClass] = useState(
//     "tango-step-button-down"
//   );
//   const [inputClass, setInputClass] = useState("tango-unit-edit");
//   const [inputReadOnly, setInputReadOnly] = useState(false);
//   const [editBoxConfig, setEditBoxConfig] = useState();
//   const [inputValue, setInputValue] = useState("");

//   //Future Methods...
//   let attachConverter;
//   let onErrorValue;
//   let onErrorUnits;

//   //Variables...
//   var _editBoxConfig = {};
//   var _config = JSON.parse(JSON.stringify(config));
//   var converter = null;
//   var lastValue = "";

//   //useEffect.....
//   useEffect(() => {
//     handleSetConfiguration();
//   }, [props.config]);

//   const handleSetConfiguration = () => {
//     let cssStepUp = stepperUpClass;
//     let cssStepDown = stepperDownClass;
//     let cssInputClass = inputClass;
//     let cssInputReadonly = inputReadOnly;

//     if (_config.mode == undefined) _config.mode = true;

//     if (_config.mode == false) {
//       cssStepUp = "tango-step-button-up-disabled";
//       cssStepDown = "tango-step-button-down-disabled";
//       _editBoxConfig.mode = false;
//       _editBoxConfig.enabled = false;
//     }
//     if (_config.showUnit == undefined) _config.showUnit = false;
//     else _editBoxConfig.showUnit = _config.showUnit;
//     if (_config.unit != undefined) _editBoxConfig.unit = _config.unit;
//     if (_config.minValue == undefined) _config.minValue = -Number.MAX_VALUE;
//     else _editBoxConfig.min = _config.minValue;

//     if (_config.maxValue == undefined) _config.maxValue = Number.MAX_VALUE;
//     else _editBoxConfig.max = _config.maxValue;

//     if (_config.stepValue == undefined)
//       // giving step value is not recommended, by default unit's default step is used
//       _config.stepValue = 1;
//     else _editBoxConfig.step = _config.stepValue;

//     if (_config.initValue == undefined) {
//       if (_config.minValue == -Number.MAX_VALUE) _config.initValue = 0;
//       else _config.initValue = _config.minValue;
//     } else {
//       _editBoxConfig.value = _config.initValue;
//     }

//     if (_config.enabled == undefined || _config.enabled == true) {
//       cssStepUp = "tango-step-button-up";
//       cssStepDown = "tango-step-button-down";
//     } else {
//       cssStepUp = "tango-step-button-up-disabled";
//       cssStepDown = "tango-step-button-down-disabled";
//     }
//     _editBoxConfig.enabled = _config.enabled;
//     //.....................
//     if (_config.decimalPrecision == undefined)
//       // giving precision value is not recommended, by default unit's default precision is used
//       _config.decimalPrecision = 0;
//     else _editBoxConfig.precision = _config.decimalPrecision;

//     if (_config.useConverter == undefined) {
//       _config.useConverter = false;
//     } else {
//       _editBoxConfig.useConverter = _config.useConverter;
//     }

//     if (_config.useConverter != null && _config.useConverter) {
//       if (
//         _config.converter != undefined &&
//         _config.converter != null &&
//         _config.converter
//       ) {
//         _editBoxConfig.converter = _config.converter;
//       }
//     }

//     if (_config.stepValue == undefined) {
//       //config.useConverter = false;
//     } else {
//       _editBoxConfig.step = _config.stepValue;
//     }
//     //_editBoxConfig config starts....
//     if (_editBoxConfig.useConverter == undefined) {
//       _editBoxConfig.useConverter = false;
//     }

//     if (_editBoxConfig.enabled == undefined) {
//       {
//         _editBoxConfig.enabled = true;
//       } // edit box is enabled by default}
//     }
//     //..............
//     if (_editBoxConfig.showUnit == undefined) {
//       _editBoxConfig.showUnit = true;
//     } // whether to show default unit with numeric value or not

//     if (_editBoxConfig.min == undefined) {
//       _editBoxConfig.min = -Number.MAX_VALUE;
//     }

//     if (_editBoxConfig.max == undefined) {
//       _editBoxConfig.max = Number.MAX_VALUE;
//     }

//     if (_editBoxConfig.value == undefined) {
//       if (_editBoxConfig.min == -Number.MAX_VALUE) _editBoxConfig.value = 0;
//       else _editBoxConfig.value = _editBoxConfig.min;
//     }

//     if (_editBoxConfig.enabled == false) {
//       cssInputClass = "tango-unit-edit disabled";
//       cssInputReadonly = "readonly";
//     }

//     //Converter adjustments..........
//     if (_editBoxConfig.useConverter != null && _editBoxConfig.useConverter) {
//       if (_editBoxConfig.converter != undefined) {
//         converter = _editBoxConfig.converter;
//       }
//       if (converter == null || _editBoxConfig.converter == undefined) {
//         // set default converter
//         converter = new LengthConverter(_editBoxConfig);
//       }
//     }

//     //Attaching new unit....
//     if (_editBoxConfig.useConverter != null && _editBoxConfig.useConverter) {
//       attachConverter = function (conv) {
//         if (conv != undefined) {
//           converter = conv;
//           // initialize converter, set error handlers
//           if (onErrorValue) converter.onErrorValue = onErrorValue;
//           if (onErrorUnits) converter.onErrorUnits = onErrorUnits;
//           converter.setShowUnit(_editBoxConfig.showUnit);
//         }
//       };
//     }

//     if (_editBoxConfig.useConverter != null && _editBoxConfig.useConverter) {
//       getDefaultUnit = function () {
//         return converter ? converter.getDefaultUnit() : "";
//       };
//     }

//     //Converters settings starts...

//     // Set initial value
//     if (_editBoxConfig.useConverter != null && _editBoxConfig.useConverter) {
//       if (converter && converter.getValueWithDefaultUnits) {
//         setInputValue(
//           converter.getValueWithDefaultUnits(_editBoxConfig.value.toString())
//         );
//       } else setInputValue(_editBoxConfig.value);
//     } else {
//       setInputValue(_editBoxConfig.value);
//     }
//     // if (editBoxConfig.onkeydown != "undefined" && typeof editBoxConfig.onkeydown == "function") {
//     //   editTag.on("keydown", editBoxConfig.onkeydown);
//     // }
//     //.............................ends
//     if (_editBoxConfig.useConverter != null && _editBoxConfig.useConverter) {
//       converter.onErrorValue = onErrorValue = function (e) {
//         console.log(
//           "ID: " +
//             " : ERROR : " +
//             e +
//             ". Override onErrorValue() function to handle this error."
//         );
//       };
//     }

//     // override this to have your own handling on error in unit part of given value text
//     if (_editBoxConfig.useConverter != null && _editBoxConfig.useConverter) {
//       converter.onErrorUnits = onErrorUnits = function (e) {
//         console.log(
//           "ID: " +
//             " : ERROR : " +
//             e +
//             ". Override onErrorUnits() function to handle this error."
//         );
//       };
//     }

//     //Resetting __Config on Basis of __editBoxConfig starts..........
//     if (_config.onchange == undefined) {
//       _editBoxConfig.afterTextChange = function () {
//         afterChange(_editBoxConfig);
//       };
//     } else {
//       if (typeof _config.onchange != "function") {
//         console.log("Invalid assignment to the onchange function...");
//       } else {
//         _editBoxConfig.onchange = _config.onchange;
//       }
//     }

//     if (_config.onkeydown != undefined) {
//       if (typeof config.onkeydown != "function") {
//         console.log("Invalid assignment to the onchange function...");
//       } else {
//         _editBoxConfig.onkeydown = config.onkeydown;
//       }
//     }
//     //...........................................................ends

//     if (props.config.converter == undefined || props.config.converter == null) {
//       converter = new LengthConverter(_editBoxConfig);
//     }

//     //setting states Back...........
//     setLoading(false);
//     setEditBoxConfig(_editBoxConfig);
//     setStepperUpClass(cssStepUp);
//     setStepperDownClass(cssStepDown);
//     setConfig(_config);
//     setInputClass(cssInputClass);
//     setInputReadOnly(cssInputReadonly);
//   }; //..........handle set config...

//   /////////////////////
//   /////Other Methods starts...
//   const afterChange = (u) => {};

//   let getDefaultUnit = () => {
//     return converter.getDefaultUnit();
//   }; //........................

//   const setPixelsPerInch = (ppi) => {
//     // the ratio of points per inch is changeable
//     factors["px"] = ppi;
//   };

//   const getPixelsPerInch = () => {
//     return factors["px"];
//   };

//   const setShowUnit = (value) => {
//     // true/false
//     editBoxConfig.showUnit = value;
//   };

//   const getShowUnit = () => {
//     return editBoxConfig.showUnit;
//   };

//   const getInnerHTML = () => {
//     return "Some HTML";
//   };

//   //Input Methods starts........
//   const handleOnBlur = (event) => {
//     var value = inputValue;
//     if (editBoxConfig.useConverter != null && editBoxConfig.useConverter) {
//       if (converter && converter.getValueWithDefaultUnits) {
//         editBoxConfig.value = converter.getValueWithDefaultUnits(value);
//       } else editBoxConfig.value = value;
//     } else {
//       editBoxConfig.value = value;
//     }
//     editBoxConfig.value = validateValueWithUnits(editBoxConfig.value);
//     setInputValue(editBoxConfig.value);
//     afterTextChange(this, true); // call user-defined handler after text change...
//     //});
//   };

//   const handleOnEnterKeyPress = (e) => {
//     // if (e.keyCode == 13) {
//     //   window.alert("Enter Key pressed");
//     // }
//   };

//   const handleChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const afterTextChange = (u, blur) => {
//     // to be over-riden by client app if desired, UnitEditBox object is available at 'u' here...
//     if (
//       editBoxConfig.onchange != "undefined" &&
//       typeof editBoxConfig.onchange == "function"
//     ) {
//       editBoxConfig.onchange.call(this, getValue(), blur);
//     }
//   };

//   const getValue = () => {
//     if (editBoxConfig.useConverter != null && editBoxConfig.useConverter) {
//       return converter.getNumeric(editBoxConfig.value);
//     } else {
//       return editBoxConfig.value;
//     }
//   };

//   // const validateValueWithUnits = (value) => {
//   //   var numeric = converter.getNumeric(value);
//   //   var uin = converter.getUnit(value);
//   //   var result = validateValue(numeric);
//   //   result =
//   //     result +
//   //     (editBoxConfig.showUnit == true && uin != null && uin != ""
//   //       ? " " + uin
//   //       : "");
//   //   editBoxConfig.value = result;

//   //   return result;
//   // };

//   const validateValue = (value) => {
//     if (value > editBoxConfig.max) {
//       value = editBoxConfig.max;
//     } else if (value < editBoxConfig.min) {
//       value = editBoxConfig.min;
//     }
//     return value;
//   };

//   const incrementValue = (value) => {
//     if (editBoxConfig.useConverter != null && editBoxConfig.useConverter) {
//       var numeric = converter.getNumeric(value);

//       var uin = converter.getUnit(value);
//       var step_value = converter.getStepValue(uin);
//       var result = Math.floor(numeric / step_value) * step_value + step_value;
//       result = validateValue(result);
//       result =
//         result +
//         (editBoxConfig.showUnit == true
//           ? " " + converter.getDefaultUnit()
//           : "");
//       editBoxConfig.value = result;
//       if (
//         editBoxConfig.onchange != "undefined" &&
//         typeof editBoxConfig.onchange == "function"
//       ) {
//         editBoxConfig.onchange.call(this, result);
//       }
//       return result;
//     } else {
//       var result = parseInt(value) + 1;
//       if (result > editBoxConfig.max) {
//         return value;
//       }
//       editBoxConfig.value = result;
//       if (
//         editBoxConfig.onchange != "undefined" &&
//         typeof editBoxConfig.onchange == "function"
//       ) {
//         editBoxConfig.onchange.call(this, result);
//       }
//       return result;
//     }
//   };

//   const decrementValue = (value) => {
//     if (editBoxConfig.useConverter != null && editBoxConfig.useConverter) {
//       var numeric = converter.getNumeric(value);
//       var uin = converter.getUnit(value);
//       var step_value = converter.getStepValue(uin);
//       var result = Math.ceil(numeric / step_value) * step_value - step_value;
//       result = validateValue(result);
//       result =
//         result +
//         (editBoxConfig.showUnit == true
//           ? " " + converter.getDefaultUnit()
//           : "");
//       editBoxConfig.value = result;
//       if (
//         editBoxConfig.onchange != "undefined" &&
//         typeof editBoxConfig.onchange == "function"
//       ) {
//         editBoxConfig.onchange.call(this, result);
//       }
//       return result;
//     } else {
//       var result = parseInt(value) - 1;
//       if (result < editBoxConfig.min) {
//         return value;
//       }
//       editBoxConfig.value = result;
//       if (
//         editBoxConfig.onchange != "undefined" &&
//         typeof editBoxConfig.onchange == "function"
//       ) {
//         editBoxConfig.onchange.call(this, result);
//       }
//       return result;
//     }
//   };

//   const onIncrement = () => {
//     //YUI().use('node', function (Y) {
//     // get edit tag
//     var value = inputValue;
//     incrementValue(value); //cfg.value is set inside this function...
//     setInputValue(editBoxConfig.value);

//     afterTextChange(this); // call user-defined handler after text change...
//     //});
//   };

//   const onDecrement = () => {
//     //YUI().use('node', function (Y) {
//     // get edit tag
//     var value = inputValue;
//     decrementValue(value); //cfg.value is set inside this function...
//     setInputValue(editBoxConfig.value);
//     afterTextChange(this); // call user-defined handler after text change...
//     //});
//   };

//   const validateValueWithUnits = (value) => {
//     // var numeric = converter.getNumeric(value);
//     var numeric = new LengthConverter(editBoxConfig).getNumeric(value);

//     // var uin = converter.getUnit(value);
//     var uin = new LengthConverter(editBoxConfig).getUnit(value);

//     var result = validateValue(numeric);
//     result =
//       result +
//       (editBoxConfig.showUnit == true && uin != null && uin != ""
//         ? " " + uin
//         : "");
//     editBoxConfig.value = result;

//     return result;
//   };

//   const setValue = (val) => {
//     var sVal = val.toString();
//     if (editBoxConfig.useConverter != null && editBoxConfig.useConverter) {
//       editBoxConfig.value = converter.getValueWithDefaultUnits(sVal);
//     } else {
//       editBoxConfig.value = sVal;
//     }

//     setInputValue(editBoxConfig.value);
//   };

//   // const setEnabled = (bEnabled) => {
//   //   if (bEnabled == true) {
//   //     setInputReadOnly(false);
//   //     // _parentTag
//   //     //   .one("#tango-unit-edit-box-id")
//   //     //   .removeClass("disabled")
//   //     //   .removeAttribute("readonly");
//   //   } else if (bEnabled == false) {
//   //     setInputReadOnly("readonly");
//   //     // _parentTag
//   //     //   .one("#tango-unit-edit-box-id")
//   //     //   .addClass("disabled")
//   //     //   .setAttribute("readonly", "readonly");
//   //   }
//   // };

//   const setDefaultUnit = (unit) => {
//     if (converter) {
//       //that.setValue(that.converter.convertValue(that.getValue(),that.getDefaultUnit(),unit));
//       var unitBefore = getDefaultUnit();
//       converter.setDefaultUnit(unit);
//       converter.resetPrecisionFactor(unit);
//       setValue(getValue() + unitBefore);
//     }
//   };

//   const setMinValue = (minValue) => {
//     editBoxConfig.min = minValue;
//   };

//   const setMaxValue = (maxValue) => {
//     editBoxConfig.max = maxValue;
//   };
//   //Input Methods ends..........

//   //Stepper Related Methods....
//   const onMouseDownStepUp = (e, interval) => {
//     console.log("caling");
//     console.log(interval);
//     onIncrement();
//     clearTimeout(timeoutVar);
//     timeoutVar = setTimeout(function () {
//       onMouseDownStepUp(e, timeoutInterval);
//     }, interval);
//     //changeInheritState(that);
//   };

//   const onMouseDownStepDown = (e, interval) => {
//     onDecrement();
//     clearTimeout(timeoutVar);
//     timeoutVar = setTimeout(function () {
//       onMouseDownStepDown(e, timeoutInterval);
//     }, interval);
//     //changeInheritState(that);
//   };

//   const clearTimeoutVar = () => {
//     clearTimeout(timeoutVar);
//   };

//   const onMouseUp = () => {
//     clearTimeout(timeoutVar);
//     if (config.onMouseUp) {
//       config.onMouseUp(editBoxConfig.getValue());
//     }
//   };

//   // const setValue = (value) => {
//   //   editBoxConfig.setValue(value);
//   // };

//   // const getValue = () => {
//   //   return editBoxConfig.getValue();
//   // };

//   // const getConvertedValue = (unit) => {
//   //   return editBoxConfig.getConvertedValue(unit);
//   // };

//   const setEnabled = (bEnabled) => {
//     // var mainNode = Y.one(that.parentTagId);
//     // if (bEnabled == true) {
//     //   if (mainNode.one(".tango-step-button-up-disabled")) {
//     //     mainNode
//     //       .one(".tango-step-button-up-disabled")
//     //       .removeClass("tango-step-button-up-disabled")
//     //       .addClass("tango-step-button-up");
//     //     mainNode
//     //       .one(".tango-step-button-down-disabled")
//     //       .removeClass("tango-step-button-down-disabled")
//     //       .addClass("tango-step-button-down");
//     //     that.editBox.setEnabled(bEnabled);
//     //   }
//     // } else {
//     //   if (mainNode.one(".tango-step-button-up")) {
//     //     mainNode
//     //       .one(".tango-step-button-up")
//     //       .removeClass("tango-step-button-up")
//     //       .addClass("tango-step-button-up-disabled");
//     //     mainNode
//     //       .one(".tango-step-button-down")
//     //       .removeClass("tango-step-button-down")
//     //       .addClass("tango-step-button-down-disabled");
//     //     that.editBox.setEnabled(bEnabled);
//     //   }
//     // }
//   };

//   const getNumeric = (value) => {
//     var numeric = parseFloat(value); // get the numeric component
//     if (numeric === null || isNaN(numeric)) {
//       // if match returns null, throw error...  use === so 0 values are accepted
//       //throw "Invalid numeric value.";
//       // if (that.onErrorValue) that.onErrorValue("Invalid numeric value.");
//       return 0;
//     }
//     return numeric;
//   };

//   const getMinValue = () => {
//     return config.minValue == "undefined" ? -Number.MAX_VALUE : config.minValue;
//   };

//   const getMaxValue = () => {
//     return config.maxValue == "undefined" ? Number.MAX_VALUE : config.maxValue;
//   };

//   // const setMinValue = (minValue) => {
//   //   editBoxConfig.setMinValue(minValue);
//   //   // config.minValue = minValue ;
//   // };

//   // const setMaxValue = (maxValue) => {
//   //   editBoxConfig.setMaxValue(maxValue);
//   //   //config.maxValue = maxValue ;
//   // };

//   // const getDefaultUnit = (unit) => {
//   //   return editBoxConfig.getDefaultUnit(unit);
//   // };

//   // const setDefaultUnit = (unit) => {
//   //   if (editBoxConfig) editBoxConfig.setDefaultUnit(unit);
//   // };

//   // const setMinValue = (minValue) => {
//   //   if (editBoxConfig) editBoxConfig.setMinValue(minValue);
//   //   config.minValue = minValue;
//   // };

//   // const setMaxValue = (maxValue) => {
//   //   if (editBoxConfig) editBoxConfig.setMaxValue(maxValue);
//   //   config.maxValue = maxValue;
//   // };

//   //Main GUI starts...
//   let mainGUI = null;

//   if (loading === true) {
//     mainGUI = (
//       <React.Fragment>
//         <div>Loading...</div>
//       </React.Fragment>
//     );
//   } else {
//     mainGUI = (

//     );
//   }

//   return <React.Fragment>{mainGUI}</React.Fragment>;
// }; //........................

// ELXStepper.defaultProps = {
//   config: {},
// };

// export default ELXStepper;
