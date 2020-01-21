/**
 * Self-Description JSON Schema v1.2.1
 *
 * Author: W3plan Technologies <https://www.w3plan.net/>
 * Copyright 2015-2020 W3plan Technologies
 * Code licensed under MIT License
 */

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
 * Print error message on current page
 *
 * Static method
 * 
 * @private 
 * @param {integer} errorLevel  PlannerFw defined error level from 0 to 3
 * @param {string} errorMsg     PlannerFw error message
 * @param {integer=} lineNo     Error line number
 * @param {string=} color       Color code to print out text
 */
errorHandle.printMessage = function(errorLevel, errorMsg, lineNo, color) {
  lineNo = lineNo || 0;
  color = color || "#000";
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
 * @param {integer=} lineNo     Error line number
 * @param {string=} color       Color code to print out text
 */
errorHandle.consoleMessage = function(errorLevel, errorMsg, lineNo, color) {
  lineNo = lineNo || 0;
  color = color || "#000";
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
 * Self-Description JSON Schema class
 * 
 * @constructor
 * @class
 * @author: W3plan Technologies
 *
 */
var sdjsmd = function() {
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
   * @param {object} obj    An object 
   * @return {boolean}	    return true if object has no property otherwise return false
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
   * Check that data is constrained by the constraint condition
   * 
   * @private 
   * @param {object} cstr                data constraints 
   * @param {string|number} name         member name or array index to validate
   * @param {string|number|boolean|null} val  value of name
   * @param {string|number} property     equals to name or array member name when name parameter is an array index
   * @return {boolean}   return true if data is right constrained by the constraint otherwise return false
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
      errorHandle.printMessage(2, "The value " + val + " of " + property + " member " + name + " againsts constraint " + JSON.stringify(cstr));
      return false;
    }
  };
  
	/**
	 * Validate JSON member type, show error message if type is error
	 * 
	 * @private 
	 * @param {string} type                                   data type
   * @param {string|number} name                            member name or array index to validate
	 * @param {string|number|boolean|array|object|null} val   value of name
   * @param {string|number} property                        equals to name or array member name when name parameter is an array index
	 * @return {boolean}
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
          errorHandle.printMessage(2, "The value " + val + " of " + property + " member " + name + " againsts type: " + type);
          vflag = false;
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
          errorHandle.printMessage(2, "The value " + val + " of " + property + " member " + name + " against type: " + type);
          vflag = false;
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
      errorHandle.printMessage(2, "The value " + val + " of " + property + " member " + name + " againsts type: " + type);
      return false;
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
 * Derived class
 * 
 * @constructor
 * @author: W3plan Technologies
 * 
 * @param {string} version   Released version number
 * @class
 * @extends sdjsmd
 * 
 */
var sdjsApp = function(version) {
  "use strict";
  
  // inheritances
  sdjsmd.apply(this, arguments);
  
  /**
  * @const
  */
  this.TITLE = "Self-Description JSON Schema";
  this.DESCRIPTION = "The JavaScript Library for JSON description and constraints";
  this.VERSION = version;
  this.COPYRIGHT = "Copyright " + (new Date()).getFullYear() + " W3plan Technologies";
  
  /**
   * If browser version is lower than Chrome 1+, Firefox 3.5+, IE8+, Opera 10.5+ and Safari 4+
   * then show error message and stop processing
   * 
   * @public 
   * @return {undefined}
   */
  this.checkJsonSupport = function() {
    if (!(window.JSON && typeof window.JSON.parse === "function")) {
      throw new Error("Your browser doesn't support JSON");
    }
  };
  
  /**
   * Public method of errorHandle.printMessage
   *
   * @public
   * @see errorHandle.printMessage
   */
  this.boxMessage = function(errorLevel, errorMsg, lineNo) {
    lineNo = lineNo || "";
    errorHandle.printMessage(errorLevel, errorMsg, lineNo);
  };
  
  /**
   * Public method of errorHandle.consoleMessage
   *
   * @public
   * @see errorHandle.consoleMessage
   */
  this.consoleMessage = function(errorLevel, errorMsg, lineNo, color) {
    lineNo = lineNo || "";
    color = color || "";
    errorHandle.consoleMessage(errorLevel, errorMsg, lineNo, color);
  };
};

/**
 *
 * Create global object
 * 
 */
window.sdjs = new sdjsApp("Version 1.1.0");

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
