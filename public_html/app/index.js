/**
 * Front-end controller to page mount
 *
 * Browser compatibilities
 *	Chrome  Firefox   IE    Opera   Safari   iOS Safari   Android   Blackberry
 *	5+      4+        9+    10.5+   4.0+     4.1+         2.1+      7+
 * 
 * Author: W3plan Technologies <https://www.w3plan.net/>
 * Copyright 2015-2020 W3plan Technologies
 * Code licensed under the GNU GPLv3 license <http://www.gnu.org/licenses/gpl.html>
 */

/**
 * PlannerFw Portable Controller
 */
(function(){
// check PlannerFw library loading
if (!window.planner) {
  alert("Failed to load PlannerFw library");
  return;
}

// sets top error handler
window.onerror = function (errorMsg, file, line, col, error) {
  planner.errorHandler(0, errorMsg, line);
  pfTemplate = "";
  pfIndex = null;
};

// check environment support
planner.checkEnvironment();

var pfIndex = {};
var pfTemplate = "";
pfIndex.tm = "";

// starts tracking time
if (pfConfig.trackExecutedTime) {
  pfIndex.start = planner.startMeter();
  planner.updateTrackTime(0);
}

if (typeof pfTemplatePath == 'undefined' && pfTemplatePath.length < 5) {
  throw new Error("Invalid template path");
}

pfTemplatePath = decodeURIComponent(pfTemplatePath).trim();

if (pfTemplatePath.indexOf("?tm=") !== -1) {
  pfIndex.tm = pfTemplatePath.substring(pfTemplatePath.indexOf("?tm=")).replace(/&/g, "%26");
  pfTemplatePath = pfTemplatePath.substring(0, pfTemplatePath.indexOf("?tm="));
}

pfTemplatePath = planner.adaptTemplatePath(pfTemplatePath);
pfTemplate = planner.lexicrc32(pfTemplatePath);
pfTemplatePath = "?___=" + pfTemplatePath.replace(/&/g, "%26") + pfIndex.tm;

if (!pfModelData) {
  planner.loadTemplate(pfConfig.environment, pfConfig.templateTimeout, pfConfig.templateGateway + pfTemplatePath, pfProcess, "WOMODEL");
} else if (typeof pfModelData === "string" && pfModelData.length > 10) {
  if (planner.getModeldataType(pfModelData) === "XML"){
    pfModelData = planner.string2Xml(pfModelData);
    pfModelData = planner.xml2Json(pfModelData);
    pfModelData = pfModelData[Object.keys(pfModelData)[0]];
  } else {
    pfModelData = planner.responseJsonEncode(pfModelData);
  }
  if (pfModelData.modelDataFailed !== "undefined" && pfModelData.modelDataFailed) {
    pfModelData.modelDataFailed = null;
    throw new Error("Failed modeldata");
  } else {
    if (pfConfig.trackExecutedTime) {
      planner.updateTrackTime(pfIndex.start);
    }
    planner.loadTemplate(pfConfig.environment, pfConfig.templateTimeout, pfConfig.templateGateway + pfTemplatePath, pfProcess, pfModelData);
  }
} else if ( pfModelData && 
            typeof pfModelData === "object" && 
            typeof pfModelData.pfDataSet !== "undefined"
          )
{
  if (pfModelData.modelDataFailed !== "undefined" && pfModelData.modelDataFailed) {
    pfModelData.modelDataFailed = null;
    throw new Error("Failed modeldata");
  } else {
    planner.loadTemplate(pfConfig.environment, pfConfig.templateTimeout, pfConfig.templateGateway + pfTemplatePath, pfProcess, pfModelData);
  }
} else {
  throw new Error("Invalid modeldata");
}

/**
 * Callback when template loaded
 * 
 * @param {object} modeldata    modeldata to template function 
 */
function pfProcess(modeldata) {
  if (pfConfig.trackExecutedTime) {
    planner.updateTrackTime(pfIndex.start);
  }  
  var html = "";
  
  if (typeof pfTemplateFailed !== "undefined" && pfTemplateFailed) {
    pfTemplateFailed = null;
    throw new Error("The controller can't load template");
  } else if (modeldata.hasOwnProperty("modelDataFailed") && typeof modeldata.modelDataFailed === "string" && modeldata.modelDataFailed.length > 0) {
    modeldata.modelDataFailed = "";
    throw new Error("The controller can't load modeldata");
  } 
  
  if (typeof modeldata === "string" && modeldata == "WOMODEL") {
    html = window[pfTemplate].run();
  } else {
    planner.checkModelData(modeldata);    
    if (modeldata.pfDataSet.hasOwnProperty(pfTemplate)) {
      modeldata = modeldata.pfDataSet[pfTemplate];
    } else {
      // when modeldata doesn't include encoding template-path property
      modeldata = modeldata.pfDataSet;
    }
    
    planner.validateSdjs(modeldata);
    html = window[pfTemplate].run(modeldata);
  }
  
  // rendering result page
  document.open();
  document.write(html);
  document.close();
  
  if (pfConfig.trackExecutedTime) {
    planner.updateTrackTime(pfIndex.start, true);
    planner.errorHandler(3, planner.getElapsedDetailTime(pfIndex.start));
  }
  
  pfModelData = null;
  pfTemplatePath = "";
  pfTemplate = "";
  pfIndex = null;
}
})();
