/**
 * PlannerFw Library v4.0
 *
 *	Chrome  Firefox   IE    Opera   Safari   iOS Safari   Android   Blackberry
 *	5+      4+        9+    10.5+   4.0+     4.1+         2.1+      7+
 * 
 * Author: W3plan Technologies <https://www.w3plan.net/>
 * Copyright 2015-2020 W3plan Technologies
 * Code licensed under the GNU GPLv3 license <http://www.gnu.org/licenses/gpl.html>
 */

//"use strict";
(function(){
/**
 * Error handling
 *
 * Static class
 * 
 * @constructor
 * @class
 * 
 * @author: W3plan Technologies
 */
var errorHandle = function () {};

/**
 * Output error message to console, current page or error handling page 
 * 
 * Static method
 * 
 * @private 
 * @param {integer} errorLevel  PlannerFw defined error level from 0 to 3
 * @param {string} errorMsg     PlannerFw error message
 * @param {integer=} lineNo     Error line number
 * @param {string=} color       Color code to print out text
 */
errorHandle.outputMessage = function(errorLevel, errorMsg, lineNo, color) {
  lineNo = lineNo || 0;
  color = color || "#000";
  if (typeof pfConfig != "undefined" && pfConfig.environment.toLowerCase() == "production" && errorLevel !== 0) {
    errorHandle.consoleMessage(errorLevel, errorMsg, lineNo, color);
  } else if (typeof pfConfig != "undefined" && pfConfig.environment.toLowerCase() == "development" && errorLevel === 3) {
    errorHandle.consoleMessage(errorLevel, errorMsg, lineNo, color);
  } else {
    errorHandle.printMessage(errorLevel, errorMsg, lineNo, color);
  }
};

/**
 * Print error message to current page
 * 
 * Static method
 * 
 * @private 
 * @param {integer} errorLevel  PlannerFw defined error level from 0 to 3
 * @param {string} errorMsg     PlannerFw error message
 * @param {integer} lineNo      Error line number
 * @param {string=} color       Color code to print out text
 */
errorHandle.printMessage = function(errorLevel, errorMsg, lineNo, color) {
  var lineSect = lineNo ? (" - Line: " + lineNo) : "";
  var pmsg = "";
  var tm = new Date();
  
  if (errorLevel == 3 || typeof errorLevel == "string" && errorLevel.toLowerCase() == "notice") {
    pmsg = tm.getHours() + ":" + tm.getMinutes() + ":" + tm.getSeconds() + "<strong> - Notice: </strong>" + errorMsg + lineSect;
  } else if (errorLevel == 2 || typeof errorLevel == "string" && errorLevel.toLowerCase() == "warning") {
    pmsg = tm.getHours() + ":" + tm.getMinutes() + ":" + tm.getSeconds() + "<strong> - Warning: </strong>" + errorMsg + lineSect;
    color = "#ff00ff";
  } else {
    pmsg = tm.getHours() + ":" + tm.getMinutes() + ":" + tm.getSeconds() + "<strong> - Error: <strong>" + errorMsg + lineSect;
    color = "#ff0000";
  }
  
  var node = document.createElement("div");
  var mlStart = '<div style="margin-bottom:2px; padding:10px; background-color:#dddddd; color:' + color + '"><span style="margin-right:20px; color:#000; float:right; font-weight:bold; font-size:30px; line-height:20px; cursor:pointer;" onclick="this.parentElement.style.display=' + "'none'" + ';">&times;</span>';
  var mlEnd = "</div>";
  
  node.innerHTML = mlStart + pmsg + mlEnd;
  
  if (document.getElementsByTagName("body")[0]) {
    document.getElementsByTagName("body")[0].insertBefore(node, document.getElementsByTagName("body")[0].firstChild);
  } else {
    window.onload = function(){ alert(pmsg); };
  }
};

/**
 * Print error message on the browser console
 *
 * Static method
 * 
 * @private 
 * @param {integer} errorLevel  PlannerFw defined error level from 0 to 3
 * @param {string} errorMsg     PlannerFw error message
 * @param {integer} lineNo     Error line number
 * @param {string} color       Color code to print out text
 */
errorHandle.consoleMessage = function(errorLevel, errorMsg, lineNo, color) {
  var lineSect = lineNo ? (" - Line: " + lineNo) : "";
  var tm = new Date();
    
  if (errorLevel == 3 || typeof errorLevel == "string" && errorLevel.toLowerCase() == "notice") {
    console.log("%c " + tm.getHours() + ":" + tm.getMinutes() + ":" + tm.getSeconds() + " - Notice:\n" + errorMsg + lineSect, "color: " + color);
  } else if (errorLevel == 2 || typeof errorLevel == "string" && errorLevel.toLowerCase() == "warning") {
    console.log("%c " + tm.getHours() + ":" + tm.getMinutes() + ":" + tm.getSeconds() + " - Warning:\n" + errorMsg + lineSect, "color: " + color);
  } else {
    console.log("%c " + tm.getHours() + ":" + tm.getMinutes() + ":" + tm.getSeconds() + " - Error:\n" + errorMsg + lineSect, "color: " + color);
  }
};

/**
 * Tool kit
 * 
 * Static class
 * 
 * @constructor
 * @class
 * 
 * @author: W3plan Technologies
 * 
 */
var toolKit = function () {};

/**
 * Calculates a string's CRC32 checksum to check data integrity of stored data to see
 * whether the data has been modified or changed, and returns as a hexadecimal or decimal string 
 * 
 * CRC32 polynomial table is used to speed up the checksum calculation
 *
 * Static method
 *
 * @private
 * @param {string} str     A string in Latin1 (ISO8859-1) character set
 * @param {number=} radix  10 or 16, it can be omitted
 * @return {string}	  A decimal string if radix is 10 otherwise a hexadecimal string
 */
toolKit.crc32 = function(str, radix) {
  var table =
  "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
  var crc = 0;
  var x = 0;
  var y = 0;
  
  crc = crc ^ (-1);
  for (var i = 0, iTop = str.length; i < iTop; i++) {
    y = (crc ^ str.charCodeAt(i)) & 0xFF;
    x = "0x" + table.substr(y * 9, 8);
    crc = (crc >>> 8) ^ x;
  }
  var cs = (crc ^ (-1)) >>> 0;
  if (radix && radix == 10) {
    return cs;
  } else {
    return cs.toString(16);
  }
};

/**
 * PlannerFw base
 * 
 * Base class
 * 
 * @constructor
 * @class
 * 
 * @author: W3plan Technologies
 *
 */
var plannerBase = function() {
  /**
   * Private property container
   * 
   * @private
   * 
   */	
  var pfvault = {
    /**
     * Keep total execution time
     */	
    stepTotal : 0,
    
    /**
     * Keep step execution time
     */	
    stepVal : "",
    
    /**
     * cache template path
     */	
    cachedtmpath : "",
    
    /**
     * Store "tm" when template is ready or "md" when modeldata is ready
     */	
    dtlabel : "",
    
    /**
     * Store date object when template or modeldata is ready
     */
    dtobj : null,
    
    /**
     * A flag for template ready
     */	
    tmready : false,
    
    /**
     * A flag for modeldata ready
     */	
    mdready : false,
    
    /**
     * Store modeldata when modeldata is ready 
     */
    pfModel : null,      // PlannerFw doesn't cache modelData
    
    /**
     * Store template path encodings for template function without parameter
     */
    runWithVoid : [],   // for page update
    
    /**
     * Store template path encodings for template function with parameter
     */
    runWithVal : []    // for page update
  };
  
  /**
   * Return current time in microseconds (1 microseconds = 0.001 milliseconds)
   * 
   * @private 
   * @return {number}
   */
  var getMicrotime = function() {
    return Date.now ? Date.now() : (new Date()).getTime();
  };
  
  /**
   * Return a customized XMLHttpRequest object
   * 
   * @private
   * @param {string} src           The URL of a remote file
   * @param {string} method        HTTP request method
   * @param {integer} timeout      Set timeout to XMLHttpRequest object
   * @param {boolean=} isProduct   True for production environment, otherwise false
   * @return {object}   An XMLHttpRequest object
   */
  var getReqObj = function(src, method, timeout, isProduct) {
    method = method.toLowerCase();
    
    var urlPath = src.substring(0, src.indexOf("?"));
    var qstr = src.substring(src.indexOf("?") + 1);
    if (!urlPath) {
      urlPath = src;
      qstr = "";
    }
    
    var req = new XMLHttpRequest();
    
    if (method == "post") {
      req.open("POST", urlPath, true);
      req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
    } else if (method == "put") {
      req.open("PUT", urlPath, true);
      req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
    } else if (method == "delete") {
      req.open("DELETE", urlPath, true);
      req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
    } else {
    	// Bypass the browser cache
      if (!isProduct && qstr) {
        src = urlPath + '?' + qstr + '&_=' + getMicrotime();
      } else if (!isProduct && !qstr) {
        src = urlPath + "?_=" + getMicrotime();
      }
      req.open("GET", src, true);
    }
    
    req.setRequestHeader("X-Requested-With", "ModelXMLHttpRequest");
    req.responseType = "text";
    
    req.timeout = timeout;
    if (method == "post" || method == "put" || method == "delete") {
      req.send(qstr);
    } else {
      req.send();
    }
    return req;
  };
  
  /**
   * Return true if request for same domain otherwise show error message and stop processing
   * 
   * @private 
   * @param {string} requ   Request URL
   * @return {boolean}
   */
  var checkAllowedRequest = function(requ) {
    if (/^(ftp:|ftps:|ws:|wss:|http:|https:)?\/\//i.test(requ)) {
      var reqHost = requ.split("/")[2].toLowerCase(); 
      reqHost = reqHost.split(":")[0];
      if (reqHost != window.location.hostname.toLowerCase()) return false;
    }
    return true;
  };
  
  /**
   * Determine modeldata content is either XML or JSON string
   * 
   * @private
   * @param {string} model   string that includes modeldata content
   * @return {string}        "JSON" or "XML"
   */
  var getModelType = function(model) {
    if (/^\s*<([\s\S]*)>\s*$/g.test(model) && /<pfDataSet>([\s\S]*?)<\/pfDataSet>/g.test(model)) {
      return "XML";
    }
    return "JSON";
  };
  
  /**
   * Check if an URL is from the same host
   * 
   * @private
   * @param {string} url   URL or URL path
   * @return {boolean}   True if tested URL from the same host, otherwise false
   */
  var isSameHost = function(url) {
    var removeProtocol = url.replace(/^\s*\/\//, "").replace(/^\s*(http|https|ftp|ftps|ws|wss):\/\//i, "");
    
    if (url.length > removeProtocol.length) {
      var host = window.location.hostname.toLowerCase();
      if (removeProtocol.indexOf("/") === -1) {
        removeProtocol += "/";
      }
      if (removeProtocol.substring(0, removeProtocol.indexOf("/")).toLowerCase() !== host) {
        return false;
      }
    }
    return true;
  };
  
  /**
   * Omit protocol from an URL 
   * 
   * @public 
   * @param {string} url   A request URL
   * @return {string}   An URL without protocol portion
   */
  var omitProtocol = function(url) {
    var protpos = url.indexOf("://");
    
    if (protpos !== -1) {
      url = url.substr(protpos + 1);
    } else if (url.substr(0, 1) !== "/")  {
      url = "/" + url;
    }
    return url;
  };
  
  /**
   * callback for failed to load template
   * 
   * @private
   * @return {object}   return error object
   */
  var loadFailed = function () {
    throw new Error("Template can't be loaded, checking the template path");
  };
  
  /**
   * 
   * @private
   * @param {array} md    
   */
  var parseUpdateParam = function(md) {
    var valObj = {};
    var tmWithVoid = [], tmWithVal = [], tmField = [], mdField = [];
    var item, tempcheck, val;
    
    for (var i = 0, len = md.length; i < len; i++) {
      item = md[i];
      
      if (typeof item === 'string' && item.length > 4) {
        item = planner.adaptTemplatePath(item);
        tmWithVoid.push(item.replace(/&/g, "%26"));
        if (item.indexOf("?tm=") !== -1) {
          item = item.substring(0, item.indexOf("?tm="));
        }
        pfvault.runWithVoid.push(planner.lexicrc32(item));
      } else if (Array.isArray(item) && item.length === 2) {
        val = item[1];
        if (Object.prototype.toString.call(val) === "[object Object]") {
          val = JSON.stringify(val);
        }
        
        item = planner.adaptTemplatePath(item[0]);
        tmWithVal.push(item.replace(/&/g, "%26"));
        if (item.indexOf("?tm=") !== -1) {
          item = item.substring(0, item.indexOf("?tm="));
        }
        tempcheck = planner.lexicrc32(item);
        tmField.push(tempcheck + item.replace(/&/g, "%26"));
        mdField.push(encodeURIComponent(val));
        pfvault.runWithVal.push(tempcheck);
      }
    }
    
    if (tmWithVoid.length > 0) {
      valObj.tmWithVoid = tmWithVoid;
    }
    
    if (tmWithVal.length > 0) {
      valObj.tmWithVal = tmWithVal;
    }
    
    if (tmField.length > 0) {
      valObj.tmField = tmField;
    }
    
    if (mdField.length > 0 && mdField.join('~~').replace(/~/g, "") !== "") {
      valObj.mdField = mdField;
    }
    
    return valObj;
  };
  
  /**
   * Callback for planner.updateSegments
   * when block template and modeldata loaded
   * 
   * @private
   * @param {object} modeldata    modeldata to template function
   */
  var updateProcess = function (modeldata) {
    var tempNoParam = pfvault.runWithVoid;
    var tempwithParam = pfvault.runWithVal;
    var mdData = null;
    var idfunc = "";
    
    if (typeof pfTemplateFailed !== "undefined" && pfTemplateFailed) {
      pfTemplateFailed = null;
      throw new Error("The controller can't load template");
    } else if (modeldata.hasOwnProperty("modelDataFailed") && typeof modeldata.modelDataFailed === "string" && modeldata.modelDataFailed.length > 0) {
      modeldata.modelDataFailed = "";
      throw new Error("The controller can't load modeldata");
    }
    
    if (typeof modeldata === "string" && modeldata == "WOMODEL") {
      for (var i = 0, len = tempNoParam.length; i < len; i++) {
        idfunc = tempNoParam[i];
        document.getElementById(idfunc).innerHTML = window[idfunc].run();
      }
      
      pfvault.runWithVoid = [];
    } else {
      planner.checkModelData(modeldata);     // updateProcess is an async function
      
      for (var j = 0, leng = tempwithParam.length; j < leng; j++) {
        idfunc = tempwithParam[j];
        mdData = modeldata.pfDataSet[idfunc];
        planner.validateSdjs(mdData);
        document.getElementById(idfunc).innerHTML = window[idfunc].run(mdData);
      }
      
      pfvault.runWithVal = [];
    }
  }
  
  /**
   * Minimized code by strip comments, white spaces and line breaks
   * 
   * @private 
   * @param {string} str   code string to minimize
   * @return {string}   	 minimized code string
   */
  this.minimizeCode = function(str) {
    return str.replace(/[\t\n\r]/g, " ")
              .replace(/\/\*((?!\*\/).)*\*\//g, "")
              .replace(/ {2,}/g, " ")
              .replace(/> +</g, "><")
              .replace(/\{ +/g, "{")
              .replace(/ +\}/g, "}")
              .trim();
  };
  
  /**
   * Check object is a PlannerFw template object
   * 
   * @public
   * @param {object} temp    PlannerFw template object
   * @return {boolean}       true if object is a PlannerFw template object otherwise false
   */
  this.isPfTemplate = function(temp) {
    var flag = false;
    for (var key in temp) {
      if (temp.hasOwnProperty(key)) {
        if (typeof temp[key] === 'function' && temp[key].constructor === Function){
          if (key == "run") {
            var temprun = temp.run.toString();
            var tptest = /\s*\.replace\(\/\\\\'\/g, *"'"\)\s*\.replace\(\/\\\\v\/g, *"\\\\'"\);\s*}\s*$/i.test(temprun);
            if (!tptest) {
              return false;
            }
          }
        } else {
          return false;
        }
        flag = true;
      }
    }
    
    if (!flag) {
      return false;
    }
    
    return true;
  };
  
  /**
   * Return encoded JSON otherwise show an error message and stop processing
   * 
   * @public
   * @param {string|object} rdata   A string or JSON object
   * @return {object}               A JSON
   */
  this.responseJsonEncode = function(rdata) {
    if (typeof rdata === "string") {
      try {
        rdata = this.minimizeCode(rdata);
        rdata = JSON.parse(rdata);
      } catch (e) {
        throw new Error("Data isn't a JSON string, " + e.message);
      }
    }
    
    if (rdata && typeof rdata === "object" && Object.keys(rdata).length > 0 ) {
      return rdata;
    }
    throw new Error("Data isn't JSON");
  };
  
  /**
   * Determine modeldata content is either XML or JSON string
   *
   * @public
   * @see getModelType
   */
  this.getModeldataType = function(str) {
    return getModelType(str);
  };
  
  /**
   * Check modeldata, throw error if modeldata is invalid
   * 
   * @public
   * @param {object} mdjson   HTTP response modeldata JSON
   * @return {boolean}        Return true if success
   */
  this.checkModelData = function(mdjson) {
    if (typeof mdjson === "undefined" || !mdjson || !mdjson.hasOwnProperty("pfDataSet") || Object.keys(mdjson).length < 1) {
      throw new Error("Modeldata is invalid");
    }
    return true;
  };
  
  /**
   * Adapt irregular template path
   *
   * @public
   * @param {string} tm     Template path
   * @return {string}       Adapted template path
   */
  this.adaptTemplatePath = function(tm) {
    tm = decodeURIComponent(tm).trim();
    tm = tm.replace(/\\/g, '/').replace(/\/$/g, '');
    
    if (tm.indexOf("/tmpl/") !== -1) {
      tm = tm.substring(tm.indexOf("/tmpl/") + 5);
    }
    return "/" + tm.replace(/^(tmpl\/|\/)/i, "");
  };
  
  /**
   * Plannerfw Event Handler for page update
   * 
   * @public
   * @param {array} val    An array of template paths that are related to element id and update content
   */
  this.updateSegments = function(val) {
    if (Array.isArray(val) && val.length > 0) {
      window.onerror = function (errorMsg, file, line, col, error) {
        errorHandle.outputMessage(0, errorMsg, line);
      };
      
      if (!pfConfig) {
        throw new Error("You have to load planner-setting.js along with planner.js");
      }
      
      var valObj = parseUpdateParam(val);
      
      if (valObj.hasOwnProperty("tmWithVoid")) {
        this.loadTemplate(pfConfig.environment, pfConfig.templateTimeout, pfConfig.templateGateway + "?___=" + valObj.tmWithVoid.join("~~"), updateProcess, "WOMODEL");
      }
      
      if (valObj.hasOwnProperty("tmWithVal")) {
        this.loadTemplate(pfConfig.environment, pfConfig.templateTimeout, pfConfig.templateGateway + "?___=" + valObj.tmWithVal.join("~~"), updateProcess);
        
        if (valObj.hasOwnProperty("mdField")) {
          this.loadModelData(pfConfig.environment, pfConfig.modeldataTimeout, pfConfig.modeldataGateway + "?___=" + valObj.tmField.join("~~") + "&md=" + valObj.mdField.join("~~"), "GET", updateProcess);
        } else {
          this.loadModelData(pfConfig.environment, pfConfig.modeldataTimeout, pfConfig.modeldataGateway + "?___=" + valObj.tmField.join("~~"), "GET", updateProcess);
        }
      }
    }
  };
  
  /**
   * Load PlannerFw template like an external JavaScript file
   * 
   * @public 
   * @param {string} env      Either development or production
   * @param {string} timeout  timeout to request template from the server in milliseconds
   * @param {string} url      Template URL path
   * @param {function} cb     Callback function to execute after template loaded
   * @param {object=} param   Optional parameter to Callback function
   */
  this.loadTemplate = function(env, timeout, url, cb, param) {
    param = param || "";
    var timeflag = false;
    
    if (checkAllowedRequest(url)) {
      if (pfvault.cachedtmpath !== url) {
        if (env.toLowerCase() !== "production") {
          // Bypass the browser cache
          url += '&_=' + getMicrotime();
        }
        
        pfvault.tmready = false;
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = url;
        script.addEventListener("error", loadFailed);
        script.onerror = loadFailed;
        
        setTimeout(function() {
          if (!timeflag) {
            throw new Error("Request template timeout");
          }
        }, timeout);
        
        if (script.readyState) {   // IE
          script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
              timeflag = true;
              script.onreadystatechange = null;
              if (cb && typeof cb === "function" && param) {
                cb(param);
              } else if (cb && typeof cb === "function" && pfvault.mdready) {
                cb(pfvault.pfModel);
                pfvault.cachedtmpath = "";
                pfvault.tmready = false;
                pfvault.mdready = false;
                pfvault.pfModel = null;
              } else {
                pfvault.tmready = true;
                pfvault.cachedtmpath = url;
                if (pfConfig.trackExecutedTime) {
                  pfvault.dtobj = new Date();
                  pfvault.dtlabel = "tm";
                }
              }
            }
          };
        } else {
          script.onload = function() {
            timeflag = true;
            if (cb && typeof cb === "function" && param) {
              cb(param);
            } else if (cb && typeof cb === "function" && pfvault.mdready) {
              cb(pfvault.pfModel);
              pfvault.cachedtmpath = "";
              pfvault.tmready = false;
              pfvault.mdready = false;
              pfvault.pfModel = null;
            } else {
              pfvault.tmready = true;
              pfvault.cachedtmpath = url;
              if (pfConfig.trackExecutedTime) {
                pfvault.dtobj = new Date();
                pfvault.dtlabel = "tm";
              }              
            }
          };
        }
        
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
      }
    } else {
      throw new Error("Cross-origin template request blocked");
    }
  };
  
  /**
   * Load PlannerFw modeldata with XMLHTTPRequest object
   * 
   * @public
   * @see getReqObj
   * @param {string} env       Either development or production
   * @param {string} timeout   Timeout to request template from the server in milliseconds
   * @param {string} mdsrc     Request URL for modeldata gateway
   * @param {string=} method   HTTP request method
   * @param {function=} cb     An optional callback after load the modeldata completed, 
   *                           the parameter of callback is the modeldata from mdsrc
   */
  this.loadModelData = function(env, timeout, mdsrc, method, cb) {
    method = method || "get";
    var isProduct = false;
    
    if (env.toLowerCase() == "production") isProduct = true;
    
    if (checkAllowedRequest(mdsrc)) {
      pfvault.mdready = false;
      var xhr = getReqObj(mdsrc, method, timeout, isProduct);
      
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status >= 200 && xhr.status < 300 || [301, 304, 404].indexOf(xhr.status) != -1) {
            if (getModelType(xhr.responseText) == "XML") {
              var xmlObj = planner.string2Xml(xhr.responseText);
              var resultJson = planner.xml2Json(xmlObj);
              var root = Object.keys(resultJson)[0];
              
              if (cb && typeof cb === "function" && pfvault.tmready) {
                cb(resultJson[root]);
                pfvault.cachedtmpath = "";
                pfvault.tmready = false;
                pfvault.mdready = false;
              } else {
                pfvault.mdready = true;
                pfvault.pfModel = resultJson[root];
                if (pfConfig.trackExecutedTime) {
                  pfvault.dtobj = new Date();
                  pfvault.dtlabel = "md";
                }                
              }
            } else {
              var model = planner.responseJsonEncode(xhr.responseText); 
              // use planner because loadModelData is async function
              
              if (cb && typeof cb === "function" && pfvault.tmready) {
                cb(model);
                pfvault.cachedtmpath = "";
                pfvault.tmready = false;
                pfvault.mdready = false;
              } else {
                pfvault.mdready = true;
                pfvault.pfModel = model;
                if (pfConfig.trackExecutedTime) {
                  pfvault.dtobj = new Date();
                  pfvault.dtlabel = "md";
                }                
              }
            }
          } else {
            throw new Error("Failed to access the modeldata");
          }
        }
      };
      
      xhr.onerror = function() {
        throw new Error("Error to access the modeldata");
      };
      
      xhr.ontimeout = function() {
        throw new Error("Modeldata request timeout");
      };
    } else {
      throw new Error("Cross-origin modeldata request blocked");
    }
  };
  
  /**
   * Set a new Cookie 
   * 
   * @public 
   * @param {string} name       Cookie name
   * @param {string} value      Cookie value
   * @param {string=} expires   An optional Cookie expire time
   * @param {string=} path      An optional Cookie path
   * @return {undefined}  
   */
  this.setCookie = function(name, value, expires, path) {
    expires = expires || "";
    path = path || "/";
    document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + expires + "; path=" + path;
  };
  
  /**
   * Return cookie value if cookie existing otherwise null
   * 
   * @public 
   * @param {string} name       Cookie name
   * @return {string|object}	  Cookie value or null
   */
  this.getCookie = function(name) {
    var nameEq = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0, len = ca.length; i < len; i++) {
      var c = ca[i];
      
      while (c.charAt(0) == " ") {
        c = c.substring(1, c.length);
      }
      
      if (c.indexOf(nameEq) === 0) {
        var cVal = c.substring(nameEq.length, c.length);
        try {
          return decodeURIComponent(cVal);
        } catch(e) {
          return cVal;                          
        }
      }
    }
    return null;
  };
  
  /**
   * Delete cookie by cookie name and cookie path
   * 
   * @public 
   * @param {string} name    Cookie name
   * @param {string=} path   An optional Cookie path
   * @return {undefined}
   */
  this.deleteCookie = function(name, path) {
    path = path || '/';
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=" + path;
  };
  
  /**
   * Return current Date object
   * 
   * @public 
   * @return {object}   Date Object
   */
  this.startMeter = function() {
    return new Date();
  };
  
  /**
   * Return elapsed time from a start time to current time in milliseconds
   * 
   * @public 
   * @param {object} start   Start Date object
   * @return {string}        Elapsed time
   */
  this.getElapsedTime = function(start) {
    return "Total elapsed time: " + (new Date() - start) + " [milliseconds]";
  };
  
  /**
   * Return elapsed time in the details
   * 
   * @public 
   * @param {object} start   Start Date object
   * @return {string}        Elapsed time in the details
   */
  this.getElapsedDetailTime = function(start) {
    var tmtime = "";
    var mdtime = "";
    var mdtmtime = "";
    var steps = pfvault.stepVal.split(".");
    var dtime = (+steps[0]) + (+steps[1]) + (+steps[2]);
    
    if (steps.length === 3) {
      if (pfvault.dtobj && pfvault.dtlabel.length > 0) {
        if (pfvault.dtlabel == "tm"){
          tmtime = pfvault.dtobj - start - (+steps[0]);
          mdtime = +steps[1];
        } else {
          mdtime = pfvault.dtobj - start - (+steps[0]);
          tmtime = +steps[1];
        }
        
        pfvault.dtlabel = "";
        pfvault.dtobj = null;
        mdtmtime = "ms \n2. Getting template ready: " + tmtime + "ms \n   Getting modeldata ready: " + mdtime;
      } else if (pfConfig.trackExecutedTime) {
        mdtmtime = "ms \n2. Getting template ready: " + steps[1];
      } else {
        mdtmtime = "ms \n2. Getting template and modeldata ready: " + steps[1];
      }
      
      dtime = "\n1. Checking environment and parse the url: " + steps[0] + 
              mdtmtime +
              "ms \n3. Rendering page: " + steps[2] + 
              "ms \n" + "\nTotal elapsed time: " + dtime + "ms";
    }
    return dtime;
  };
  
  /**
   * Initial tracking time or update tracking time
   * 
   * @public 
   * @param {object} start   Start Date object
   * @param {boolean=} keepVal   Save execution times to Cookie if true
   * @return {undefined}
   */
  this.updateTrackTime = function(start, keepVal) {
    keepVal = keepVal || false;
    if (start) {
      var currentTotal = new Date() - start;
      if (keepVal) {
        pfvault.stepVal += "." + (currentTotal - pfvault.stepTotal);
      } else {
        var divider = (pfvault.stepVal) ? "." : "";
        pfvault.stepVal += divider + (currentTotal - pfvault.stepTotal);
      }
      pfvault.stepTotal = currentTotal;
    } else {
      pfvault.stepTotal = 0;
      pfvault.stepVal = "";
    }
  };
};

/**
 * PlannerFw encryption/decryption
 * 
 * Base class
 * 
 * @constructor
 * @class
 * 
 * @author: W3plan Technologies
 *
 */
var plannerCrypto = function() {
  /**
   * Encrypt ASCII string and decrypt result string with XOR cipher and an optional password
   * XOR cipher security is related to the length of password
   * 
   * @private
   * @param {string} instr    ASCII string to be encrypted and string to be decrypted
   * @param {string=} pword  	Optional XOR secret key with 8 characters at least, 
   *							            default length of secret key is 256
   * @return {string}         Encrypt/decrypt string, return an empty string if instr is empty
   */
  var pfXor = function (instr, pword) {
    if (!(instr && instr.trim())) {
      return "";
    }
    
    pword = pword || "";
    if (pword.length < 8) {
      pword =  "8q2EXsYBCDZcK3hajFFnyzdGRTbnrYbjYJzkbMFfRJFdvhPfBmpNVw2YkBZtM9kLW6MRAst7Vb3yh8KZwq2dTNuVdq8acHYeavBaPz3MPsBGpAP3zaCDvZUTvNGaWvpNwqwnQ9D8nZ8T4K9D8HRyQ2XTapaAeDSUfanvkCkRFzh4vSs3C9qBWxTwx9PUTTrAaL5PfgvQRWaCtCAZng3P8S9aEYEST79w2Ryu5Vs4etvKz4xdM8K7uCn2yFZ5C2MJ";
    }
    
    var icnt = instr.length;
    var keys = pword.split("");
    var kcnt = keys.length;
    
    var output = "";
    for (var i = 0; i < icnt; i++) {
      var charCode = instr.charCodeAt(i) ^ keys[i % kcnt].charCodeAt(0);		
      output += String.fromCharCode(charCode);
    }		
    return output;
  };
  
  /**
   * Encode data and return result
   * 
   * @public
   * @param {string} str     Plain text
   * @param {string=} pword  A secret key that the length is more than 8 characters for
                             decryption, or an empty string if using the default setting
   * @return {string}        Encoded text
   */
  this.pfEncode = function (str, pword) {
    pword = pword || "";
    try {
      var val = encodeURIComponent(str);			
      val = pfXor(val, pword);
      val = window.btoa(val);
      // encode special character "+", "/" and "=" in base64 result
      return encodeURIComponent(val);
    } catch (e) {
      errorHandle.outputMessage(2, "Encryption failed, " + e.message);
    }
  };
  
  /**
   * Decode data and return result
   * 
   * @public
   * @param {string} str     PlannerFw encrypted data
   * @param {string=} pword  A secret key that the length is more than 8 characters for
                             encryption, or an empty string if using the default setting
   * @return {string}        Decoded text
   */
  this.pfDecode = function (str, pword) {
    pword = pword || "";
    try {
      // decode special character "+", "/" and "=" in str
      var val = decodeURIComponent(str);
      val = window.atob(val);
      val = pfXor(val, pword);
      return decodeURIComponent(val);
    } catch (e) {
      errorHandle.outputMessage(2, "Decryption failed, " + e.message);
    }
  };
  
  /**
   * Public method of crc32
   *
   * @public
   * @see toolKit.crc32
   */
  this.crc32CheckSum = function(str, radix) {
    return toolKit.crc32(str, radix);
  };
  
  /**
   * Encode template path for template variable, template function, template property, modeldata property, modeldata XML element, and HTML element id to update contents 
   *
   * @public
   * @param {string} str    Template path
   * @return {string}       Encoded string with pf at the beginning and 
                            following by 8 hexadecimal characters     
   */
  this.lexicrc32 = function(str) {
    str = '/' + str.replace(/^\s+|\s+$/g, '')
                   .replace(/\\/g, '/')
                   .replace(/^\/|\/$/g, '')
                   .replace(/\.[^/.]+$/, '')
                   .toLowerCase();
    return 'pf' + toolKit.crc32(str, 16).replace('-', '');
  };
};

/**
 * PFCSS processes API
 * 
 * Base class
 * 
 * @constructor
 * @class
 *
 * @author: W3plan Technologies
 *
 */
var plannerPfcss = function() {
  /**
   * CSS3 units except color units
   * 
   * @private
   * 
   */
  var cssUnits = [
        "%", "cm", "in", "mm", "pc", 
        "pt", "ch", "em", "ex", "gd", 
        "px", "rem", "vh", "vw", "vm", 
        "deg", "grad", "rad", "turn", "s",
        "ms", "hz", "khz", "vmin", "vmax"
      ];
  
  /**
   * Return true if color is hexadecimal value, false if it is not
   * 
   * @private 
   * @param {string} color   CSS color value
   * @return {boolean}       True or false
   */
  var isHexColor = function(color) {
    var hexClr = color.trim();
    var hex = hexClr.replace("#", "");
    var matched = hexClr.match(/^#[0-9a-f]+/i);
    
    if (matched && hexClr == matched[0] && (hex.length === 3 || hex.length === 6)) {
      return true; 
    }
    return false;
  };
  
  /**
   * CSS hash data container
   * 
   * @private
   * 
   */
  var cssData = {};
  
  /**
   * set initial value to cssData
   * 
   * @private
   */
  var initialCssData = function() {
    cssData = {};
  };
  
  /**
   * Format prefix of stacking data
   * 
   * @private 
   * @param {string} pref  Prefix of stacking data
   * @return {string}      Formatted prefix
   */
  var getPrefix = function(pref) {
    pref = pref.trim();
    if (pref) {
      return pref + " ";
    }
    return "";
  };
  
  /**
   * Parses nesting CSS as JSON, or show error message and stop processing if failed
   * 
   * @private 
   * @param {string} str    CSS string
   * @return {object}   JSON
   */
  var cssJsonEncode = function(str) {
    return JSON.parse(str);
  };
  
  /**
   * Create formatted CSS data that can be converted to JSON
   * 
   * @private 
   * @param {string} str    Nested CSS data
   * @return {string}   Formatted CSS data
   */
  var structJson = function(str){
    str = "{" + str + "}";
    return str.replace(/\\\r\\\n|\\\r|\\\n|\r\n|\r|\n|\t/g, " ")
              .replace(/ {2,}/g, " ")
              .replace(/"/g, "'")
              .replace(/:([^:;\{}]+)}/g, ':$1;}')
              .replace(/:([^:;\{}]+);/g, ':"$1;",')
              .replace(/",([^",:\{}]+):"/g, '","$1":"')
              .replace(/\{([^:",;\{}]+):"/g, '{"$1":"')
              .replace(/}([^:",;\{}]+):"/g, '},"$1":"')
              .replace(/;",([^;"\{}]+)\{/g, ';","$1":{')
              .replace(/}([^;"\{}]+)\{/g, '},"$1":{')
              .replace(/\{([^;"\{}]+)\{/g, '{"$1":{')
              .replace(/,( )*}/g, "}")
              .replace(/\{([^;"\{}]+)\{/g, '{"$1":{');
  };
  
  /**
   * Execute CSS nesting compilation and update object of cssData
   * 
   * @private 
   * @param {string} cJson   CSS nesting JSON
   * @param {string=} pref   A option string with prefix of stacking data, default value is ""
   * @return {undefined}
   */
  var compileNestedCss = function(cJson, pref) {
    pref = pref || "";
    for (var m in cJson) {
      if (typeof cJson[m] == "object") {
        var rule = getPrefix(pref) + m.trim();
        if (m.indexOf(',') !== -1) {
          rule = addPrefixSelectors(pref, m.trim());
        } else {
          rule = rule.replace(/ +&|& +/g, '').trim();
        }
        cssData[rule] = cssData[rule] || [];
        compileNestedCss(cJson[m], rule);
      } else {
        cssData[pref][cssData[pref].length] = "  " + m.trim() + ": " + cJson[m].trim() + "\r\n";
      }
    }
  };
  
  /**
   * Transform Compiled non-empty CSS into string
   * 
   * @private
   * @return {str}   CSS code
   */
  var TransformCompiledCss = function() {
    var str = "";
    for (var rule in cssData) {
      if (cssData[rule] != [] && cssData[rule].join("")) {
        str += rule + " {\r\n";
        str += cssData[rule].join("");
        str += "}\r\n\r\n";
      }
    }			
    return str;
  };
  
  /**
   * Add the selector and a trailing whitespace before each substring in the comma separated string, the trailing whitespace will be empty if & is the last character of the selector or the first character of the substring
   * 
   * @private
   * @param {string} prefix   the selector to add
   * @param {string=} str     the comma separated string
   * @return {string}         the new comma separated string 
   */
  var addPrefixSelectors = function (prefix, str) {
    return str.split(',').map (
      function(e) {
        var gap = ' ';
        if (e.trim() === '') {
          gap = '';
        }
        return (prefix.trim() + gap + e.trim()).replace(/ +&|& +/g, '');
      }
    ).join(',');
  };
  
  /**
   * Add a whitespace and the selector after each substring in the comma separated string, the whitespace will be empty if & is the first character of the selector or the last character of the substring
   * 
   * @private
   * @param {string} suffix   the selector to add
   * @param {string=} str     the comma separated string
   * @return {string}     the new comma separated string 
   */
  var addSuffixSelectors = function (suffix, str) {
    return str.split(',').map (
      function(e) {
        var gap = ' ';       
        if (e.trim() === '') {
          gap = '';
        }
        return (e.trim() + gap + suffix.trim()).replace(/ +&|& +/g, '');
      }
    ).join(',');
  };
  
  /**
   * Public method of addPrefixSelectors
   *
   * @public
   * @see addPrefixSelectors
   */
  this.prefixSelectors = function (prefix, str) {
    return addPrefixSelectors(prefix, str);
  };
  
  /**
   * Public method of addSuffixSelectors
   *
   * @public
   * @see addSuffixSelectors
   */
  this.suffixSelectors = function (suffix, str) {
    return addSuffixSelectors(suffix, str);
  };
  
  /**
   * Parse generic nesting mechanism to CSS code
   * 
   * @public 
   * @param {string} cssStr   Nested CSS code
   * @param {string=} option   A optional object with minified property, default value: {minified: false}
   * @return {string}   CSS code without nesting
   */
  this.parseNestedCss = function(cssStr, option) {
    option = option || {minified: false};
    cssStr = structJson(cssStr);
    var cssJson = cssJsonEncode(cssStr);
    initialCssData();
    compileNestedCss(cssJson);
    
    var cstr = TransformCompiledCss();		
    if (option.minified) {
      cstr = cstr.replace(/[\t\r\n]/g, " ")
                 .replace(/\/\*((?!\*\/).)*\*\//g, "")
                 .replace(/ {2,}/g, " ")
                 .replace(/{ +/g, "{")
                 .replace(/; }/g, ";}");
    }
    return cstr.trim();
  };
  
  /**
   * Convert RGB color to hexadecimal color, doesn't convert if failed
   * 
   * @public 
   * @param {string} rgbColor    RGB color, the color values could be integer and percentage
   * @return {string}   Hexadecimal color, RGB color if failed
   */
  this.rgb2HexColor = function(rgbColor) {
    var num = 1;
    if (rgbColor.indexOf("%") !== -1) {
      rgbColor = rgbColor.replace(/%/g, "");
      num = 2.55;
    }
    
    var rgb = rgbColor.match(/^(rgb|rgba)?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*/i);
    if (rgb && rgb.length === 5) {
      var r = parseInt(rgb[2] * num, 10);
      var g = parseInt(rgb[3] * num, 10);
      var b = parseInt(rgb[4] * num, 10);
      if (r < 256 && g < 256 && b < 256) {
        return "#" + ("0" + r.toString(16)).slice(-2) + ("0" + g.toString(16)).slice(-2) + ("0" + b.toString(16)).slice(-2);
      }
    }
    return rgbColor;
  };
  
  /**
   * Convert hexadecimal color to RGB color, doesn't convert if failed
   * 
   * @public 
   * @param {string} hexColor    Hexadecimal color
   * @return {string}   RGB color, hexadecimal color if failed
   */
  this.hexColor2Rgb = function(hexColor) {
    if (isHexColor(hexColor)) {
      var hex = hexColor.replace("#", "");
      if (hex.length == 3) 
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      var r = parseInt(hex.substr(0, 2), 16);
      var g = parseInt(hex.substr(2, 2), 16);
      var b = parseInt(hex.substr(4, 2), 16);
      if (r < 256 && g < 256 && b < 256) {
        return "rgb(" + r + ", " + g + ", " + b + ")";
      }
    }
    return hexColor;
  };
  
  /**
   * Convert hexadecimal color to RGBA color, stop convert if failed
   * 
   * @public 
   * @param {string} hexColor    Hexadecimal color
   * @param {string} alpha       A number between 0.0 (fully transparent) and 1.0 (fully opaque)
   * @return {string}   RGBA color, hexadecimal color if failed
   */
  this.hexColor2Rgba = function(hexColor, alpha) {
    if (isHexColor(hexColor)) {
      var hex = hexColor.replace("#", "");
      
      if (hex.length == 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      var r = parseInt(hex.substr(0, 2), 16);
      var g = parseInt(hex.substr(2, 2), 16);
      var b = parseInt(hex.substr(4, 2), 16);
      
      if (r < 256 && g < 256 && b < 256 && 0 <= alpha && alpha <= 1) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
      }
    }
    return hexColor;
  };
  
  /**
   * Strip CSS unit for unit calculation. Supported CSS units include:  
   *  cm, in, mm, pc, pt, ch, em, ex, gd, px, rem, vh, vw, vm,
   *  deg, grad, rad, turn, ms, s, hz, khz, vmin and vmax
   * 
   * @public 
   * @param {string} num    CSS amount and unit
   * @return {string}   CSS amount
   */
  this.stripCssUnit = function(num) {
    var numUnits = num.toString();
    return numUnits.replace(/%|cm|in|mm|pc|pt|ch|em|ex|gd|px|rem|vh|vw|vm|deg|grad|rad|turn|s|ms|hz|khz|vmin|vmax| +|;/ig, "");
  };
  
  /**
   * Return CSS amount and unit in success, doesn't convert and print error message to browser console if failed
   * 
   * @public 
   * @param {expression} expression    An JavaScript expression
   * @param {string} unit    A option of CSS unit, default unit with px
   * @return {string}   CSS amount and unit, doesn't convert if failed
   */
  this.addCssUnit = function(expression, unit) {
    unit = unit || "px";
    if (cssUnits.indexOf(unit) == -1) {
      errorHandle.outputMessage(2, "PFCSS can not process the unit");
      return expression;
    }
    
    expression = +expression;
    if (expression % 1 === 0){
      return expression + unit;
    }
    return expression.toFixed(6).replace(/^0+/, "").replace(/0+$/, "") + unit;
  };
};

/**
 * Self-Description JSON Schema for modeldata
 * 
 * Base class
 *
 * @constructor
 * @class
 * 
 * @author: W3plan Technologies
 *
 */
var plannerSdjs = function() {
  /**
   * Return true if a number is an integer, false if it is not
   * 
   * @private
   * @param {number} n   A number
   * @return {boolean}   True or false
   */
  var isInteger = function(n) {
    return Number(n) === n && n % 1 === 0;
  };
  
  /**
   * Return true if a number is a float number, false if it is not
   * 
   * @private
   * @param {number} n   A number
   * @return {boolean}   True or false
   */
  var isFloat = function(n) {
    return Number(n) === n && n % 1 !== 0;
  };
  
  /**
   * Return true if a number is a legal number, false if it is not
   * 
   * @private 
   * @param {number} n   A number
   * @return {boolean}   True or false
   */
  var isNumber = function(n) {
    return typeof n === "number" && !isNaN(n);
  };
  
  /**
   * Return true if a string is a number string, false if it is not
   * 
   * @private
   * @param {string} n   A string
   * @return {boolean}   True or false
   */
  var isNumberString = function(n) {
    return typeof n === "string" && !isNaN(n) && n == +n;
  };
  
  /**
   * Return true if a string is an exponential number string, false if it is not
   * 
   * @private
   * @param {string} n   A string
   * @return {boolean}   True or false
   */
  var isExponentialString = function(n) {
    return isNumberString(n) && /e\+|-/gi.test(n);
  };
  
  /**
   * Return true if a string is a hexadecimal number string, false if it is not
   * 
   * @private 
   * @param {string} n   A string
   * @return {boolean}   True or false
   */
  var isHexadecimalString = function(n) {
    return isNumberString(n) && /^-?0x[0-9a-f]+$/i.test(n);
  };
  
  /**
   * Return true if a string is an octal number string, false if it is not
   * 
   * @private
   * @param {string} n   A string
   * @return {boolean}   True or false
   */
  var isOctalString = function(n) {
    return isNumberString(n) && /^-?0[0-7]+$/i.test(n);
  };
  
  /**
   * Return true if a string is a date or datetime string, false if it is not
   * 
   * @private 
   * @param {string} str   A string
   * @return {boolean}   True or false
   */
  var isDateString = function(str) {
    return typeof str === "string" && new Date(str) !== "Invalid Date" && !isNaN(new Date(str));
  };
  
  /**
   * Return true if a string is an ASCII character string, false if it is not
   * 
   * @private 
   * @param {string} str   A string
   * @return {boolean}   True or false
   */
  var isAsciiString = function(str) {
    return typeof str === "string" && /^[\x00-\xFF]+$/.test(str);
  };
  
  /**
   * Return true if a string is a unicode character string, false if it is not
   * 
   * @private 
   * @param {string} str   A string
   * @return {boolean}   True or false
   */
  var isUnicode = function(str) {
    return typeof str === "string" && /[^\u0000-\u10FFFF]+$/.test(str);
  };
  
  /**
   * Return true if a string is an email string,  false if it is not
   *
   * @private 
   * @param {string} str   An string
   * @return {boolean}   True or false
   */
  var isEmail = function (str) {
    var pattern = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
    
    if (pattern.test(str)) {
      return true;
    }
    return false;
  };
  
  /**
   * Return true if a string is an absolute URL string, false if it is not
   *
   * @private 
   * @param {string} str   An string
   * @return {boolean}   True or false
   */
  var isUrl = function (str) {
    var pattern =  /^(ftp:|ftps:|ws:|wss:|http:|https:)?(\/\/)((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+=]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
    
    if (pattern.test(str)) {
      return true;
    }
    return false;
  };
  
  /**
   * Check whether an object has properties
   * 
   * @private 
   * @param {object} obj   An object 
   * @return {boolean}	   return true if object has no property otherwise return false
   */
  var isEmptyObject = function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  };
  
  /**
   * Check variable data type whether is a string 
   * 
   * @private 
   * @param {object|string|number|boolean|null|undefined} val     An variable to check 
   * @return {boolean}	return true if variable is string otherwise false
   */
  var isString = function(val) {
    return typeof val === 'string' || val instanceof String;
  };
  
  /**
   * Check variable data type whether is boolean 
   * 
   * @private
   * @param {object|string|number|boolean|null|undefined} val     An variable to check 
   * @return {boolean}	return true if variable is boolean otherwise false
   */
  var isBoolean = function(val) {
    return typeof val === 'boolean';
  };
  
  /**
   * Check variable data type whether is null 
   * 
   * @private
   * @param {object|string|number|boolean|null|undefined} val     An variable to check 
   * @return {boolean}	return true if variable is null otherwise false
   */
  var isNull = function(val) {
    return val === null;
  };
  
  /**
   * Check variable data type whether is undefined 
   * 
   * @private
   * @param {object|string|number|boolean|null|undefined} val     An variable to check 
   * @return {boolean}	return true if variable is undefined otherwise false
   */
  var isUndefined = function(val) {
    return typeof val === 'undefined';
  }; 
  
  /**
   * Check variable data type whether is instance of Error 
   * 
   * @private 
   * @param {object|string|number|boolean|null|undefined} val     An variable to check 
   * @return {boolean}	return true if variable is instance of Error otherwise false
   */
  var isError = function(val) {
    return val instanceof Error && typeof val.message !== 'undefined';
  };
  
  /**
   * Check variable data type whether is function  
   * 
   * @private 
   * @param {object|string|number|boolean|null|undefined} val     An variable to check 
   * @return {boolean}	return true if variable is function otherwise false
   */
  var isFunction = function(val) {
    return typeof val === 'function'&& val.constructor === Function;
  };
  
  /**
   * Check variable data type whether is a RegExp object
   * 
   * @private 
   * @param {object|string|number|boolean|null|undefined} val     An variable to check 
   * @return {boolean}	return true if variable data type is RegExp object otherwise false
   */
  var isRegExp = function(val) {
    return Object.prototype.toString.call(val) === "[object RegExp]";
  };
  
  /**
   * Check variable data type whether is an object
   * 
   * @private 
   * @param {object|string|number|boolean|null|undefined} val     An variable to check 
   * @return {boolean}	return true if variable data type is object otherwise false
   */
  var isObject = function(val) {
    return Object.prototype.toString.call(val) === "[object Object]";
  };
  
  /**
   * Check that data members are constrained by the constraint condition
   * 
   * @private 
   * @param {object} cstr                     data constraints 
   * @param {string|number} name              member name or array index to validate
   * @param {string|number|boolean|null} val  value of name
   * @param {string|number} property          equals to name or array member name when name parameter is an array index
   * @return {true|object}                    return true if data members are right constrained by the constraint otherwise throw an error
   */
  var validateCstr = function(cstr, name, val, property) {
    var flags = [];
    for (var key in cstr) {
      if (key == "enumeration") {
        if (Array.isArray(cstr.enumeration) && cstr.enumeration.indexOf(val) !== -1) {
          flags.push(1);
        } else {
          flags.push(0);
        }
      } else if (key == "pattern") {
        if (isString(val) && isRegExp(new RegExp(val)) && cstr.pattern.test(val)) {
          flags.push(1);
        } else { 
          flags.push(0);
        }
      } else if (key == "length") {
        if (isInteger(val) && val.length === cstr.length) {
          flags.push(1);
        } else {
          flags.push(0);
        }
      } else if (key == "maxLength") {
        if (isInteger(val) && val.length <= cstr.maxLength) {
          flags.push(1); 
        } else {
          flags.push(0);
        }
      } else if (key == "minLength") {
        if (isInteger(val) && val.length >= cstr.minLength) {
          flags.push(1);
        } else { 
          flags.push(0);
        }
      } else if (key == "totalDigits") {
        if (isNumber(val) && val.toString().repalce(".", "").length === cstr.totalDigits && 0 < cstr.totalDigits) {
          flags.push(1);
        } else {
          flags.push(0);
        }
      } else if (key == "fractionDigits") {
        if (isNumber(val) && val.toString().split('.')[1].length === cstr.fractionDigits) {
          flags.push(1);
        } else {
          flags.push(0);
        }
      } else if (key == "minExclusive") {
        if (isNumber(val) && val > cstr.minExclusive) {
          flags.push(1); 
        } else {
          flags.push(0);
        }
      } else if (key == "maxExclusive") {
        if (isNumber(val) && val < cstr.maxExclusive) {
          flags.push(1); 
        } else { 
          flags.push(0);
        }
      } else if (key == "minInclusive") {
        if (isNumber(val) && val >= cstr.minInclusive) {
          flags.push(1);
        } else {
          flags.push(0);
        }
      } else if (key == "maxInclusive") {
        if (isNumber(val) && val <= cstr.maxInclusive) { 
          flags.push(1);
        } else { 
          flags.push(0); 
        }
      }
    }
    
    if (flags.length > 0 && flags.indexOf(0) === -1) {
      return true;
    } else {
      if (name == property) name = "";
      throw new Error("The value " + val + " of " + property + " member " + name + " againsts constraint " + JSON.stringify(cstr));
    }
  };
  
  /**
	 * Validate JSON member types
	 * 
	 * @private 
	 * @param {string} type                                   data type
   * @param {string|number} name                            member name or array index to validate
	 * @param {string|number|boolean|array|object|null} val   value of name
   * @param {string|number} property                        equals to name or array member name when name parameter is an array index
	 * @return {true|object}                                  return true if member types are valid otherwise throw an error
	 */
  var validateType = function(type, name, val, property) {
    var vflag = false;
    switch(type) {
      case "string":
        if (isString(val)) vflag = true;
        break;
      case "emptyString":
        if (isString(val) && !val) vflag = true;
        break;
      case "numberString":
        if (isNumberString(val)) vflag = true;
        break;
      case "integerString":
        if (isString(val) && isInteger(+val)) vflag = true;
        break;
      case "floatString":
        if (isString(val) && isFloat(+val)) vflag = true;
        break;
      case "fractionString":
        if (/^[1-9][0-9]*\/[1-9][0-9]*$/.test(val)) vflag = true;
        break;
      case "exponentString":
        if (isExponentialString(val)) vflag = true;
        break;
      case "asciiString":
        if (isAsciiString(val)) vflag = true;
        break;
      case "hexString":
        if (isHexadecimalString(val)) vflag = true;
        break;
      case "octalString":
        if (isOctalString(val)) vflag = true;
        break;
      case "jsonString":
        try {
          JSON.parse(val);
        } catch(e) {
          if (name == property) name = "";
          throw new Error("The value " + val + " of " + property + " member " + name + " againsts type: " + type);
        }
        vflag = true;
        break;
      case "normalizedString":
        if (isNumberString(val) && val.replace(/[\t\r\n]/g, "") == val) vflag = true;
        break;
      case "regExpString":
        if (isString(val) && isRegExp(new RegExp(val))) vflag = true;
        break;
      case "url":
        if (isUrl(val)) vflag = true;
        break;
      case "urlEncoded":
        if (encodeURIComponent(decodeURIComponent(val)) === val) vflag = true;
        break;
      case "email":
        if (isEmail(val)) vflag = true;
        break;
      case "ipv4":
        if (/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(val)) vflag = true;
        break;
      case "base64":
        try {
          window.atob(val);
        } catch(e) {
          if (name == property) name = "";
          throw new Error("The value " + val + " of " + property + " member " + name + " against type: " + type);
        }
        vflag = true;
        break;
      case "uuid":
        if (/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}$/.test(val)) vflag = true;
        break;
      case "unicodeString":
        if (isUnicode(val)) vflag = true;
        break;
      case "country":
        if ("AF|AX|AL|DZ|AS|AD|AO|AI|AQ|AG|AR|AM|AW|AU|AT|AZ|BS|BH|BD|BB|BY|BE|BZ|BJ|BM|BT|BO|BQ|BA|BW|BV|BR|IO|BN|BG|BF|BI|KH|CM|CA|CV|KY|CF|TD|CL|CN|CX|CC|CO|KM|CG|CD|CK|CR|CI|HR|CU|CW|CY|CZ|DK|DJ|DM|DO|EC|EG|SV|GQ|ER|EE|ET|FK|FO|FJ|FI|FR|GF|PF|TF|GA|GM|GE|DE|GH|GI|GR|GL|GD|GP|GU|GT|GG|GN|GW|GY|HT|HM|VA|HN|HK|HU|IS|IN|ID|IR|IQ|IE|IM|IL|IT|JM|JP|JE|JO|KZ|KE|KI|KP|KR|KW|KG|LA|LV|LB|LS|LR|LY|LI|LT|LU|MO|MK|MG|MW|MY|MV|ML|MT|MH|MQ|MR|MU|YT|MX|FM|MD|MC|MN|ME|MS|MA|MZ|MM|NA|NR|NP|NL|NC|NZ|NI|NE|NG|NU|NF|MP|NO|OM|PK|PW|PS|PA|PG|PY|PE|PH|PN|PL|PT|PR|QA|RE|RO|RU|RW|BL|SH|KN|LC|MF|PM|VC|WS|SM|ST|SA|SN|RS|SC|SL|SG|SX|SK|SI|SB|SO|ZA|GS|SS|ES|LK|SD|SR|SJ|SZ|SE|CH|SY|TW|TJ|TZ|TH|TL|TG|TK|TO|TT|TN|TR|TM|TC|TV|UG|UA|AE|GB|US|UM|UY|UZ|VU|VE|VN|VG|VI|WF|EH|YE|ZM|ZW".split("|").indexOf(val.trim().toUpperCase()) !== -1) vflag = true;
        break;
      case "language":
        if (/^[a-z]{2,3}(?:-[A-Z]{2,3}(?:-[a-zA-Z]{4})?)?$/.test(val)) vflag = true;
        break;
      case "cssString":
        if (/^(?:\s*[\S ]+\s*{[^}]*})+/.test(val)) vflag = true;
        break;
      case "hexColor":
        if (/^#([a-f0-9]{3}){1,2}$/i.test(val)) vflag = true;
        break;
      case "rgbColor":
        if (/^rgb(a)?\(\d{1,3},\s?\d{1,3},\s?\d{1,3}\)$/i.test(val)) vflag = true;
        break;
      case "cssRatio":
        if (/^[1-9][0-9]*\/[1-9][0-9]*$/.test(val)) vflag = true;
        break;
      case "cssLength":
        if (isString(val) && (['ch', 'em', 'ex', 'rem', 'vh', 'vw', 'px', 'mm', 'cm', 'in', 'pt', 'pc'].indexOf(val.trim().slice(-2).toLowerCase()) !== -1 || ['vmin', 'vmax'].indexOf(val.trim().slice(-4).toLowerCase()) !== -1)) vflag = true;
        break;
      case "cssAngle":
        if (isString(val) && (['deg', 'rad'].indexOf(val.trim().slice(-3).toLowerCase()) !== -1 || ['grad', 'turn'].indexOf(val.trim().slice(-4).toLowerCase()) !== -1)) vflag = true;
        break;
      case "cssResolution":
        if (isString(val) && (['dpcm', 'dppx'].indexOf(val.trim().slice(-4).toLowerCase()) !== -1 || val.trim().slice(-3).toLowerCase() === 'dpi')) vflag = true;
        break;
      case "cssFrequency":
        if (isString(val) && (val.trim().slice(-2).toLowerCase() === 'hz' || val.trim().slice(-3).toLowerCase() === 'khz')) vflag = true;
        break;
      case "cssTime":
        if (isString(val) && (val.trim().slice(-1).toLowerCase() === 's' || val.trim().slice(-2).toLowerCase() === 'ms')) vflag = true;
        break;
      case "cssPercentage":
        if (isString(val) && (val.trim().slice(-1).toLowerCase() === '%')) vflag = true;
        break;
      case "cssPosition":
        if (["static", "relative", "absolute", "sticky", "fixed"].indexOf(val.trim().toLowerCase()) !== -1) vflag = true;
        break;
      case "date":
        if (isDateString(val) && /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(val))
          vflag = true;
        break;
      case "time":
        if (isString(val) && /^([0-1][0-9]|2[0-4]):([0-5][0-9]):[0-5][0-9](.\d{3})?$/.test(val)) vflag = true;
        break;
      case "dateTime":
        if (isString(val) && /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01]) ([0-1][0-9]|2[0-4]):([0-5][0-9]):[0-5][0-9](.\d{3})?$/.test(val)) vflag = true;
        break;
      case "gYear":
        if (isString(val) && /^\d{4}$/.test(val)) vflag = true;
        break;
      case "gMonth":
        if (isString(val) && /^--(0[1-9]|1[012])--$/.test(val)) vflag = true;
        break;
      case "gDay":
        if (isString(val) && /^---(0[1-9]|[12][0-9]|3[01])$/.test(val)) vflag = true;
        break;
      case "gYearMonth":
        if (isString(val) && /^\d{4}-(0[1-9]|1[012])$/.test(val)) vflag = true;
        break;
      case "gMonthDay":
        if (isString(val) && /^--(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(val)) vflag = true;
        break;
      case "integer":
        if (isInteger(val)) vflag = true;
        break;
      case "float":
        if (isFloat(val)) vflag = true;
        break;
      case "exponent":
        if (isNumber(val) && /^e\+|-/i.test(val)) vflag = true;
        break;
      case "zero":
        if (isNumber(val) && val === 0) vflag = true;
        break;
      case "positiveInteger":
        if (isInteger(val) && val > 0) vflag = true;
        break;
      case "nonNegativeInteger":
        if (isInteger(val) && val >= 0) vflag = true;
        break;
      case "negativeInteger":
        if (isInteger(val) && val < 0) vflag = true;
        break;
      case "nonPositiveInteger":
        if (isInteger(val) && val <= 0) vflag = true;
        break;
      case "positiveFloat":
        if (isFloat(val) && val > 0) vflag = true;
        break;
      case "nonNegativeFloat":
        if (isFloat(val) && val >= 0) vflag = true;
        break;
      case "negativeFloat":
        if (isFloat(val) && val < 0) vflag = true;
        break;
      case "nonPositiveFloat":
        if (isFloat(val) && val <= 0) vflag = true;
        break;
      case "finiteNumber":
        if (isFinite(val)) vflag = true;
        break;
      case "number":
        if (isNumber(val)) vflag = true;
        break;
      case "true":
        if (isBoolean(val) && val === true) vflag = true;
        break;
      case "false":
        if (isBoolean(val) && val === false) vflag = true;
        break;
      case "boolean":
        if (isBoolean(val)) vflag = true;
        break;
      case "null":
        if (isNull(val)) vflag = true;
        break;
      case "emptyObject":
        if (isEmptyObject(val)) vflag = true;
        break;
      case "serializeObject":
        if (isObject(val)) vflag = true;
        break;
      case "emptyArray":
        if (Array.isArray(val) && val.length === 0) vflag = true;
        break;
      case "stringArray":
        if (Array.isArray(val) && val.every(function(i){ return isString(i); })) vflag = true;
        break;
      case "positiveIntegerArray":
        if (Array.isArray(val) && val.every(function(i){ return isInteger(i) && i > 0; })) vflag = true;
        break;
      case "nonNegativeIntegerArray":
        if (Array.isArray(val) && val.every(function(i){ return isInteger(i) && i >= 0; })) vflag = true;
        break;
      case "negativeIntegerArray":
        if (Array.isArray(val) && val.every(function(i){ return isInteger(i) && i < 0; })) vflag = true;
        break;
      case "integerArray":
        if (Array.isArray(val) && val.every(function(i){ return isInteger(i); })) vflag = true;
        break;
      case "numberArray":
        if (Array.isArray(val) && val.every(function(i){ return isNumber(i); })) vflag = true;
        break;
      case "array":
        if (Array.isArray(val)) vflag = true;
        break;
    }
    
    if (vflag) {
      return true;
    } else {
      if (name == property) name = "";
      throw new Error("The value " + val + " of " + property + " member " + name + " againsts type: " + type);
    }
  };
  
  /**
   * Validate JSON object with PlannerFw Self-Described JSON Schema
   * 
   * @public 
   * @param {object} jdata      JSON object to be validated by PFSDJS  
   * @param {object|null} glb   Global PFSDJS
   * @return {undefined}
   */
  this.validateSdjs = function(jdata, glb) {
    glb = glb || {};
    for (var prop in jdata) {
      if (jdata.hasOwnProperty(prop)) {
        if (prop === "_pfGlobal" && isObject(jdata._pfGlobal)) {
          glb = jdata._pfGlobal;
        }
        
        if (isObject(jdata[prop])) {
          this.validateSdjs(jdata[prop], glb);
        } else if (Array.isArray(jdata[prop])) {
          for (var i = 0, len = jdata[prop].length; i < len; i++) {
            if (isObject(jdata[prop][i]) || Array.isArray(jdata[prop][i])) {
              this.validateSdjs(jdata[prop][i], glb);
            } else if (jdata.hasOwnProperty(prop + "_pfidx")) {
              var pfk = null;
              
              if (jdata[prop + "_pfidx"].hasOwnProperty("all") && 
                  typeof jdata[prop + "_pfidx"].all.type !== 'undefined') {
                pfk = "all";
              } else if (jdata[prop + "_pfidx"].hasOwnProperty("i" + i) && 
                  typeof jdata[prop + "_pfidx"]["i" + i].type !== 'undefined') {
                pfk = "i" + i;
              }
              
              if (pfk !== null) {
                validateType(jdata[prop + "_pfidx"][pfk].type, i, jdata[prop][i], prop);
                if (typeof jdata[prop + "_pfidx"][pfk].constraint !== 'undefined') {
                  validateCstr(jdata[prop + "_pfidx"][pfk].constraint, i, jdata[prop][i], prop);
                }
              }
            }
          }
        } else if (jdata.hasOwnProperty(prop + "_pfsch") && 
                  isString(jdata[prop + "_pfsch"]) &&
                  jdata[prop + "_pfsch"] !== "" &&
                  glb.hasOwnProperty(prop + "_" + jdata[prop + "_pfsch"]) &&
                  typeof glb[prop + "_" + jdata[prop + "_pfsch"]].type !== 'undefined') 
        { 
          // presence value is 'required' to all members of _pfGlobal value
          validateType(glb[prop + "_" + jdata[prop + "_pfsch"]].type, prop, jdata[prop], prop);
          if (typeof glb[prop + "_" + jdata[prop + "_pfsch"]].constraint !== 'undefined') {
            validateCstr(glb[prop + "_" + jdata[prop + "_pfsch"]].constraint, prop, jdata[prop], prop);
          }
        } else if (jdata.hasOwnProperty(prop + "_pfsch") && 
                  typeof jdata[prop + "_pfsch"].type !== 'undefined')
        { 
          // presence value is either 'required' or 'implied'
          validateType(jdata[prop + "_pfsch"].type, prop, jdata[prop], prop);
          if (typeof jdata[prop + "_pfsch"].constraint !== 'undefined') {
            validateCstr(jdata[prop + "_pfsch"].constraint, prop, jdata[prop], prop);
          }
        } else if (prop.length > 6 &&
                  prop.slice(-6) === "_pfsch" &&
                  jdata[prop].presence === 'implied' &&
                  typeof jdata[prop].type !== 'undefined' &&
                  !jdata.hasOwnProperty(prop.slice(0, -6)))
        {
          var pfn = "";
          var pfv = null;
          
          if (jdata.hasOwnProperty(prop.slice(0, -6) + "_default")) {
            pfn = prop.slice(0, -6) + "_default";
            pfv = jdata[pfn];
          } else if (jdata.hasOwnProperty(prop.slice(0, -6) + "_fixed")) {
            pfn = prop.slice(0, -6) + "_fixed";
            pfv = jdata[pfn];
          }
          
          if (pfv !== null) {
            validateType(jdata[prop].type, pfn, pfv, prop);
            if (typeof jdata[prop].constraint !== 'undefined')
              validateCstr(jdata[prop].constraint, pfn, pfv, prop);
          }
        }
      }
    }
  };
};

/**
 * Bidirectional JXON(lossless JavaScript XML Object Notation) transforming
 * A customized version of JXON framework from Mozilla Developer Network by W3plan Technologies
 * 
 * Base class
 * 
 * @constructor
 * @class 
 *
 * @author: W3plan Technologies
 * 
 */
var plannerJxon = function() {
  /**
   * Define variables
   * 
   * @private
   * 
   */
  var sValProp = "keyVal",		  // Name for value of node
      sAttrProp = "keyAttrs",	  // Name for attributes of node
      sAttrsPref = "_",				  // Attribute prefix 
      aCache = [],
      emptyTree = {
        toString: function() {
                    return "null";
                  },
        valueOf: function() {
                   return null;
                 }
      };
  
  /**
   * Convert variable into object if variable is not an object
   * 
   * @private
   * @param {object} vVal  A JavaScript variable
   * @return {object} An object
   */
  var objectify = function(vVal) {
    return vVal === null ? emptyTree : vVal instanceof Object ? vVal : new vVal.constructor(vVal);
  };

  /**
   * Parse string if it is one of white space character, boolean or number 
   * 
   * @private
   * @param {string} sValue  A JavaScript variable
   * @return    A string, or number, or boolean or null 
   */
  var parseText = function(sValue) {
    if (/^\s*$/.test(sValue)) {
      return null;
    }
    
    if (/^(?:true|false)$/i.test(sValue)) {
      return sValue.toLowerCase() === "true";
    }
    
    if (isFinite(sValue)) {
      return parseFloat(sValue);
    } 
    return sValue;
  };
  
  /**
   * Create JSON from an XML document object 
   * 
   * @private
   * @param {object} oParentNode  XML document object
   * @param {integer} nVerb  An integer from 0 to 3
   * @param {boolean} bNesteAttr  Attributes of element to nest as a child object or not
   * @return {object}   An JSON
   */
  var getObjTree = function(oParentNode, nVerb, bNesteAttr) {
    var bAttributes;
    var nLevelStart = aCache.length,
        bChildren = oParentNode.hasChildNodes(),
        bHighVerb = Boolean(nVerb & 2),
        sProp, vContent, nLength = 0,
        sCollectedTxt = "",
        vResult = bHighVerb ? {} : "";
    
    if (oParentNode.hasAttributes) {
      bAttributes = oParentNode.hasAttributes();
    } else {
      bAttributes = false;
    }
    
    if (bChildren) {
      for (var oNode, nItem = 0, lenc = oParentNode.childNodes.length; nItem < lenc; nItem++) {
        oNode = oParentNode.childNodes.item(nItem);
        if (oNode.nodeType === 4) {
          sCollectedTxt += oNode.nodeValue; 
        } else if (oNode.nodeType === 3) {
          sCollectedTxt += oNode.nodeValue.trim();
        } else if (oNode.nodeType === 1) {
          aCache.push(oNode);
        }
      }
    }
    
    var nLevelEnd = aCache.length;
    var vBuiltVal = parseText(sCollectedTxt);
    
    if (!bHighVerb && (bChildren || bAttributes)) {
      vResult = nVerb === 0 ? objectify(vBuiltVal) : {};
    }
    
    for (var nElId = nLevelStart; nElId < nLevelEnd; nElId++) {
      sProp = aCache[nElId].nodeName;
      vContent = getObjTree(aCache[nElId], nVerb, bNesteAttr);
      if (vResult.hasOwnProperty(sProp)) {
        if (vResult[sProp].constructor !== Array) {
          vResult[sProp] = [vResult[sProp]];
        }
        vResult[sProp].push(vContent);
      } else {
        vResult[sProp] = vContent;
        nLength++;
      }
    }
    
    if (bAttributes) {
      var nAttrLen = (oParentNode.attributes) ? oParentNode.attributes.length : 0;
      var sAPrefix = bNesteAttr ? "" : sAttrsPref;
      var oAttrParent = bNesteAttr ? {} : vResult;
      
      for (var oAttrib, nAttrib = 0; nAttrib < nAttrLen; nLength++, nAttrib++) {
        oAttrib = oParentNode.attributes.item(nAttrib);
        oAttrParent[sAPrefix + oAttrib.name] = parseText(oAttrib.value.trim());
      }
      
      if (bNesteAttr) {
        vResult[sAttrProp] = oAttrParent;
        nLength -= nAttrLen - 1;
      }
    }
    
    if (nVerb === 3 || (nVerb === 2 || nVerb === 1 && nLength > 0) && sCollectedTxt) {
      vResult[sValProp] = vBuiltVal;
    } else if (!bHighVerb && nLength === 0 && sCollectedTxt) {
      vResult = vBuiltVal;
    }
    
    // force to output {} as "" 
    if (typeof vResult === "object" && Object.getOwnPropertyNames(vResult).length === 0) {
      vResult = "";
    }
    
    // don't convert null to "null"
    if (typeof vResult === "string" && vResult.toLowerCase() == "null") {
      vResult = null;
    }
    
    aCache.length = nLevelStart;		
    return vResult;
  };
  
  /**
   * Create XML document object from JSON
   * 
   * @private
   * @param {object} oXMLDoc  Element XML document object
   * @param {object} oParentEl  Parent element XML object
   * @param {object} oParentObj  An JSON
   */
  var loadObjTree = function(oXMLDoc, oParentEl, oParentObj) {
    var vValue, oChild;

    if (oParentObj.constructor === String || oParentObj.constructor === Number || oParentObj.constructor === Boolean) {
      oParentEl.appendChild(oXMLDoc.createTextNode(oParentObj.toString()));
      if (oParentObj === oParentObj.valueOf()) { return; }
    } else if (oParentObj.constructor === Date) {
      oParentEl.appendChild(oXMLDoc.createTextNode(oParentObj.toGMTString()));
    }
    
    for (var sName in oParentObj) {
      if (oParentObj.hasOwnProperty(sName)) {
        vValue = oParentObj[sName];
        if (isFinite(sName) || vValue instanceof Function) { continue; }
        
        if (sName === sValProp) {
          if (vValue !== null && vValue !== true) {
            oParentEl.appendChild(oXMLDoc.createTextNode(vValue.constructor === Date ? vValue.toGMTString() : String(vValue))); 
          }
        } else if (sName === sAttrProp) {
          for (var sAttrib in vValue) {
            if (vValue.hasOwnProperty(sAttrib)) {
              oParentEl.setAttribute(sAttrib, vValue[sAttrib]);
            }
          }
        } else if (sName.charAt(0) === sAttrsPref) {
          oParentEl.setAttribute(sName.slice(1), vValue);
        } else if (vValue.constructor === Array) {
          for (var nItem = 0, lenv = vValue.length; nItem < lenv; nItem++) {
            oChild = oXMLDoc.createElement(sName);
            loadObjTree(oXMLDoc, oChild, vValue[nItem]);
            oParentEl.appendChild(oChild);
          }
        } else {
          oChild = oXMLDoc.createElement(sName);
          if (vValue instanceof Object) {
            loadObjTree(oXMLDoc, oChild, vValue);
          } else if (vValue !== null && vValue !== true) {
            oChild.appendChild(oXMLDoc.createTextNode(vValue.toString()));
          }
          oParentEl.appendChild(oChild);
        }
      }
    }
  };
  
  /**
   * Convert XML document object into JSON
   * 
   * @public 
   * @param {object} xmlObj   An XML document object
   * @param {integer=} verbosity   An optional verbosity level of conversion
   * @param {boolean=} nesteAttr   An optional expressing whether to nest attributes as value 
                                   to keyAttrs, default is false
   * @return {object}    A JSON
   */
  this.xml2Json = function(xmlObj, verbosity, nesteAttr) {
    var verbMask = (arguments.length > 1 && typeof verbosity === "number") ? verbosity & 3 : 1;
    return getObjTree(xmlObj, verbMask, arguments.length > 2 ? nesteAttr : verbMask === 3);
  };
  
  /**
   * Convert JSON into XML document object
   * 
   * @public 
   * @param {object} obj  A JSON
   * @param {string=} namespaceURI    A optional namespace URI to XML document
   * @param {string=} qualifiedName   A optional prefix to root node of XML document
   * @param {object=} documentType    A optional XML documentType object
   * @return {object}  An XML document object  
   */
  this.json2Xml = function (obj, namespaceURI, qualifiedName, documentType) {
    var newDoc = document.implementation.createDocument(namespaceURI || null, qualifiedName || "", documentType || null);
    loadObjTree(newDoc, newDoc, obj);
    return newDoc;
  };
  
  /**
   * Convert XML string into XML document object
   * 
   * @public 
   * @param {string} xmlStr An XML string
   * @return {object} An XML document object
   */
  this.string2Xml = function(xmlStr) {
    return (new window.DOMParser()).parseFromString(xmlStr, 'application/xml'); 
  };
  
  /**
   * Convert XML document object into serialized string
   * 
   * @public 
   * @param {object} xmlObj  An XML document object
   * @return {string} A serialized string
   */
  this.xml2String = function(xmlObj) {
    if (typeof xmlObj.xml !== "undefined") {
      return xmlObj.xml;
    }
    return (new XMLSerializer()).serializeToString(xmlObj);
  };
};

/**
 * Derived class
 * 
 * @constructor
 * @author: W3plan Technologies
 * 
 * @param {string} version   Released version number
 * @class
 * @extends plannerBase, plannerCrypto, plannerPfcss, plannerSdjs, plannerJxon
 * 
 */
var plannerApp = function(version) {
  // Multiple inheritances
  plannerBase.apply(this, arguments);
  plannerCrypto.apply(this, arguments);
  plannerPfcss.apply(this, arguments);
  plannerSdjs.apply(this, arguments);
  plannerJxon.apply(this, arguments);
  
  /**
  * @const
  */
  this.TITLE = "PlannerFw Library " + version;
  this.DESCRIPTION = "PlannerFw JavaScript Library, " + version;
  this.EDITION = "Exec";
  this.VERSION = version;
  this.COPYRIGHT = "Copyright 2015-" + (new Date()).getFullYear() + " W3plan Technologies";
  
  window.name = "PlannerFw " + version;
  
  /**
   * If browser version is lower than Chrome 1+, Firefox 3.5+, IE8+, Opera 10.5+ and Safari 4+
   * then show error message and stop processing
   * 
   * @private 
   * @return {undefined}
   */
  var checkJsonSupport = function() {
    if (!(window.JSON && typeof window.JSON.parse === "function")) {
      throw new Error("Your browser doesn't support JSON");
    }
  };
  
  /**
   * If browser version does not support XMLHttpRequest then show error message and stop processing
   * 
   * @private 
   * @return {undefined}
   */
  var checkXMLHttpRequestSupport = function() {
    if (!window.XMLHttpRequest) {
      throw new Error("Your browser doesn't support XMLHttpRequest");
    }
  };
  
  /**
   * checks global setting file is loaded
   * 
   * @private
   */
  var checkPfConfig = function() {
    if (!pfConfig) {
      alert("Failed to load planner-setting.js");
    }
  };
  
  /**
   * A dummy method to include external file(s) used by PlannerFw Preprocessor in compile time
   * for Entirety-Section structure template and Entirety-Section structure PFCSS
   * 
   * @public
   * @param {string} tm     Template path and PFCSS path
   * @param {object=} md    Modeldata as a parameter for related template function.
                            Being neglected if no modeldata to the template or when using PFCSS path
   * @return {string}	      Empty string
   */
  this.section = function(tm, md) {
    return "";
  };
  
  /**
   * Public method of checkJsonSupport and checkXMLHttpRequestSupport
   * 
   * @public 
   * @return {undefined}
   */
  this.checkEnvironment = function() {
    checkJsonSupport();
    checkXMLHttpRequestSupport();
    checkPfConfig();
  };
  
  /**
   * Error message handler to print message to browser console or the web page
   * 
   * @public
   * @param {integer} errorLevel   PlannerFw defined error level from 0 to 3 
   * @param {string} errorMeg      Error message
   * @param {integer} lineNo       Error line number
   * @return {undefined}
   */
  this.errorHandler = function(errorLevel, errorMsg, lineNo) {
    lineNo = lineNo || 0;
    errorHandle.outputMessage(errorLevel, errorMsg, lineNo);
  };
};

/**
 *
 * Create global object: planner
 *
 */
window.planner = new plannerApp("Version 4.0");

/**
 *
 * Improve old browsers to support JavaScript functions
 * 
 */

/**
 * String trim method of native implementation to old browsers
 *
 */
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, ""); 
  };
}

/**
 * Array indexOf method of native implementation to old browsers
 * 
 */
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf= function(item, i) {
    if (i === undefined) i= 0;
    if (i < 0) i+= this.length;
    if (i < 0) i= 0;
    for (var n = this.length; i < n; i++) {
      if (i in this && this[i] === item) return i;
    }
    return -1;
  };
}

/**
 * Array lastIndexOf method of native implementation to old browsers
 *
 */
if (!Array.prototype.lastIndexOf) {
  Array.prototype.lastIndexOf= function(item, i) {
    if (i === undefined) i = this.length - 1;
    if (i < 0) i += this.length;
    if (i > this.length - 1) i = this.length - 1;
    for (i++; i-- > 0;) {
      if (i in this && this[i] === item) return i;
    }
    return -1;
  };
}

/**
 * Array every method of native implementation to old browsers
 *
 */
if (!Array.prototype.every) {
  Array.prototype.every = function (fn, thisArg) {
    var arr = this;
    var arrLen = this.length;
    var ta = thisArg ? thisArg : undefined;
    
    for (var i = 0; i < arrLen; i++) {
      if (!fn.call(ta, arr[i], i, arr)) {
        return false;
      }
    }
    return true;
  };
}

/**
 * Array map method of native implementation to old browsers
 *
 */
if (!Array.prototype.map) {
  Array.prototype.map = function(callback) {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
      arr.push(callback(this[i], i, this));
    }
    return arr;
  }
}

/**
 * Array isArray method of native implementation to old browsers
 *
 */
if (!Array.isArray) {
  Array.isArray = function (arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
  };
}

/**
 * btoa method of native implementation to old browsers
 * Encode a string in Latin1 (ISO8859-1) character set with Base-64
 * 
 */
if (!window.btoa) {
  window.btoa = function(data) {
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc = "", tmp_arr = [];
    
    if (!data) return data;		
    data += '';
    do {
      o1 = data.charCodeAt(i++);
      o2 = data.charCodeAt(i++);
      o3 = data.charCodeAt(i++);			
      bits = o1 << 16 | o2 << 8 | o3;			
      h1 = bits >> 18 & 0x3f;
      h2 = bits >> 12 & 0x3f;
      h3 = bits >> 6 & 0x3f;
      h4 = bits & 0x3f;
      tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);
    
    enc = tmp_arr.join("");
    var r = data.length % 3;
    return (r ? enc.slice(0, r - 3) : enc) + "===".slice(r || 3);
  };
}

/**
 * atob method of native implementation to old browsers
 * Decode a string in Latin1 (ISO8859-1) character set with Base-64
 *
 */
if (!window.atob) {
  window.atob = function(data) {
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, tmp_arr = [];
    
    if (!data) return data;
    data += '';
    do {
      h1 = b64.indexOf(data.charAt(i++));
      h2 = b64.indexOf(data.charAt(i++));
      h3 = b64.indexOf(data.charAt(i++));
      h4 = b64.indexOf(data.charAt(i++));
      bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
      o1 = bits >> 16 & 0xff;
      o2 = bits >> 8 & 0xff;
      o3 = bits & 0xff;
      
      if (h3 == 64) {
        tmp_arr[ac++] = String.fromCharCode(o1);
      } else if (h4 == 64) {
        tmp_arr[ac++] = String.fromCharCode(o1, o2);
      } else {
        tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
      }
    } while (i < data.length);
    
    return tmp_arr.join('').replace(/\0+$/, '');
  };
}

/**
 * Fixed IE problems
 *
 */
if (!window.console) {
  window.console = {};
}

/**
 * Fixed browser console problems
 *
 */
if (!window.console.log) {
  window.console.log = function () {};
}

})();
