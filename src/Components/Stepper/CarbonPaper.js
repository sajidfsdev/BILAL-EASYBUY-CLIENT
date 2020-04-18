YUI().add("he-controls-stepper", function (Y) {
  // numaric stepper class
  Stepper = function (cfg) {
    var that = this;
    var config = cfg || {};
    //	if(cfg == undefined)
    //		config = {};
    //	else
    //		config = cfg;

    this.parentTag = null;
    this.parentTagId = null;

    this.timeoutVar = 0;
    this.timeoutAfter = 500;
    this.timeoutInterval = 25;
    this.stepperUpClass = "tango-step-button-up";
    this.stepperDownClass = "tango-step-button-down";

    var _editBoxConfig = {};

    // normalize configuration object

    if (config.mode == undefined) config.mode = true;

    if (config.mode == false) {
      this.stepperUpClass = "tango-step-button-up-disabled";
      this.stepperDownClass = "tango-step-button-down-disabled";
      _editBoxConfig.mode = false;
      _editBoxConfig.enabled = false;
    }

    if (config.showUnit == undefined) config.showUnit = false;
    else _editBoxConfig.showUnit = config.showUnit;

    if (config.unit != undefined) _editBoxConfig.unit = config.unit;

    if (config.minValue == undefined) config.minValue = -Number.MAX_VALUE;
    else _editBoxConfig.min = config.minValue;

    if (config.maxValue == undefined) config.maxValue = Number.MAX_VALUE;
    else _editBoxConfig.max = config.maxValue;

    if (config.stepValue == undefined)
      // giving step value is not recommended, by default unit's default step is used
      config.stepValue = 1;
    else _editBoxConfig.step = config.stepValue;

    if (config.initValue == undefined) {
      if (config.minValue == -Number.MAX_VALUE) config.initValue = 0;
      else config.initValue = config.minValue;
    } else {
      _editBoxConfig.value = config.initValue;
    }

    if (config.enabled == undefined || config.enabled == true) {
      this.stepperUpClass = "tango-step-button-up";
      this.stepperDownClass = "tango-step-button-down";
    } else {
      this.stepperUpClass = "tango-step-button-up-disabled";
      this.stepperDownClass = "tango-step-button-down-disabled";
    }
    _editBoxConfig.enabled = config.enabled;

    if (config.decimalPrecision == undefined)
      // giving precision value is not recommended, by default unit's default precision is used
      config.decimalPrecision = 0;
    else _editBoxConfig.precision = config.decimalPrecision;

    if (config.useConverter == undefined) {
      config.useConverter = false;
    } else {
      _editBoxConfig.useConverter = config.useConverter;
    }

    if (config.useConverter != null && config.useConverter) {
      if (
        config.converter != undefined &&
        config.converter != null &&
        config.converter
      ) {
        _editBoxConfig.converter = config.converter;
      }
    }

    if (config.stepValue == undefined) {
      //config.useConverter = false;
    } else {
      _editBoxConfig.step = config.stepValue;
    }

    this.editBox = new UnitEditBox(_editBoxConfig);

    if (config.onchange == undefined) {
      this.editBox.afterTextChange = function () {
        that.afterChange(that.editBox);
      };
    } else {
      if (typeof config.onchange != "function") {
        console.log("Invalid assignment to the onchange function...");
      } else {
        _editBoxConfig.onchange = config.onchange;
      }
    }

    if (config.onkeydown != undefined) {
      if (typeof config.onkeydown != "function") {
        console.log("Invalid assignment to the onchange function...");
      } else {
        _editBoxConfig.onkeydown = config.onkeydown;
      }
    }

    // user-defined function call after value change
    this.afterChange = function (u) {};

    this.render = function (parent) {
      YUI().use("node", "event", "node-event-delegate", "event-key", function (
        Y
      ) {
        var sInnerHTML = "";
        //var editTag = null;
        that.parentTagId = parent;
        if (that.parentTagId && typeof that.parentTagId != "undifiend") {
          that.parentTag = Y.one(that.parentTagId);
          if (that.parentTag && that.parentTag != "undifiend") {
            // build innerHTML
            sInnerHTML =
              "<div class='tango-default-skin-stepper'>" +
              "<div class='tango-step-text-parent'>" +
              "<div class='tango-step-text'></div>" +
              "</div>" +
              "<div class='tango-step-buttons'>" +
              "<div class='" +
              that.stepperUpClass +
              "'></div>" +
              "<div class='" +
              that.stepperDownClass +
              "'></div>" +
              "</div>" +
              "</div>";

            that.parentTag._node.innerHTML = sInnerHTML;

            // subscribe to events
            that.parentTag.delegate(
              "mousedown",
              that.onMouseDownStepUp,
              ".tango-step-button-up",
              that,
              that.timeoutAfter
            );
            that.parentTag.delegate(
              "mousedown",
              that.onMouseDownStepDown,
              ".tango-step-button-down",
              that,
              that.timeoutAfter
            );
            //			        that.parentTag.delegate(['mouseup', 'mouseleave'], that.clearTimeoutVar, '.tango-step-button-up', that);
            //			        that.parentTag.delegate(['mouseup', 'mouseleave'], that.clearTimeoutVar, '.tango-step-button-down', that);

            that.parentTag.delegate(
              ["mouseleave"],
              that.clearTimeoutVar,
              ".tango-step-button-up",
              that
            );
            that.parentTag.delegate(
              ["mouseleave"],
              that.clearTimeoutVar,
              ".tango-step-button-down",
              that
            );

            that.parentTag.delegate(
              ["mouseup"],
              that.onMouseUp,
              ".tango-step-button-up",
              that
            );
            that.parentTag.delegate(
              ["mouseup"],
              that.onMouseUp,
              ".tango-step-button-down",
              that
            );

            that.editBox.render(parent + " .tango-step-text");
          }
        }
      });
    };

    this.onMouseDownStepUp = function (e, interval) {
      console.log(interval);
      that.editBox.onIncrement();
      clearTimeout(that.timeoutVar);
      that.timeoutVar = setTimeout(function () {
        that.onMouseDownStepUp(e, that.timeoutInterval);
      }, interval);
      //changeInheritState(that);
    };

    this.onMouseDownStepDown = function (e, interval) {
      that.editBox.onDecrement();
      clearTimeout(that.timeoutVar);
      that.timeoutVar = setTimeout(function () {
        that.onMouseDownStepDown(e, that.timeoutInterval);
      }, interval);
      //changeInheritState(that);
    };

    this.clearTimeoutVar = function () {
      clearTimeout(that.timeoutVar);
    };

    this.onMouseUp = function () {
      clearTimeout(that.timeoutVar);
      if (config.onMouseUp) {
        config.onMouseUp(that.editBox.getValue());
      }
    };

    this.setValue = function (value) {
      that.editBox.setValue(value);
    };

    this.getValue = function () {
      return that.editBox.getValue();
    };

    this.getConvertedValue = function (unit) {
      return that.editBox.getConvertedValue(unit);
    };

    this.setEnabled = function (bEnabled) {
      var mainNode = Y.one(that.parentTagId);
      if (bEnabled == true) {
        if (mainNode.one(".tango-step-button-up-disabled")) {
          mainNode
            .one(".tango-step-button-up-disabled")
            .removeClass("tango-step-button-up-disabled")
            .addClass("tango-step-button-up");
          mainNode
            .one(".tango-step-button-down-disabled")
            .removeClass("tango-step-button-down-disabled")
            .addClass("tango-step-button-down");
          that.editBox.setEnabled(bEnabled);
        }
      } else {
        if (mainNode.one(".tango-step-button-up")) {
          mainNode
            .one(".tango-step-button-up")
            .removeClass("tango-step-button-up")
            .addClass("tango-step-button-up-disabled");
          mainNode
            .one(".tango-step-button-down")
            .removeClass("tango-step-button-down")
            .addClass("tango-step-button-down-disabled");
          that.editBox.setEnabled(bEnabled);
        }
      }
    };

    this.getMinValue = function () {
      return config.minValue == "undefined"
        ? -Number.MAX_VALUE
        : config.minValue;
    };

    this.getMaxValue = function () {
      return config.maxValue == "undefined"
        ? Number.MAX_VALUE
        : config.maxValue;
    };

    this.setMinValue = function (minValue) {
      that.editBox.setMinValue(minValue);
      // config.minValue = minValue ;
    };

    this.setMaxValue = function (maxValue) {
      that.editBox.setMaxValue(maxValue);
      //config.maxValue = maxValue ;
    };

    this.getDefaultUnit = function (unit) {
      return that.editBox.getDefaultUnit(unit);
    };

    this.setDefaultUnit = function (unit) {
      if (that.editBox) that.editBox.setDefaultUnit(unit);
    };

    this.setMinValue = function (minValue) {
      if (that.editBox) that.editBox.setMinValue(minValue);
      config.minValue = minValue;
    };

    this.setMaxValue = function (maxValue) {
      if (that.editBox) that.editBox.setMaxValue(maxValue);
      config.maxValue = maxValue;
    };
  };

  /*   // For changing the state of the hotspot-indicator and hotspot to unlocked state
    function changeInheritState(that) {
      if (that.data && that.data.get("inheritState") == "1") {
        var selElm = document.getElementById(
          that.node.getDOMNode().id + "_hotspotInherited"
        );
        if (selElm != undefined || selElm != null) {
          selElm.classList.remove("hotspotlock");
          selElm.classList.add("hotspotunlock");
          selElm.setAttribute("title", Liferay.Language.get("local-hotspot"));
          that.data.set("inheritState", "2");
        }
      }
  
      if (that.node) {
        that.node.one("#hotspot-indicator").removeClass("empty-hotspot");
        that.node.one("#hotspot-indicator").addClass("mapped-hotspot");
      }
     }
  */
  /* sample code to create stepper */
  /*
  function CreateStepper(){
      var step = new elixir.tango.common.Stepper({
          minValue: 0,
          maxValue: 100,
          //stepValue: 0.45,
          initValue: 20,
          //decimalPrecision: 2,
          showUnit : true,
          unit : 'in'
      });
      
      step.render('#x_pos_stepper');
  };
  */
});
