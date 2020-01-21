/**
 Name: PlannerFw Template
 Template path: /pf/demo1/demo-en/rightcolumn/karina-storm.js
 Template path encoded: pf5f873182
 Modeldata: JSON or XML
 
 Version: 0.0.1
 Website: https://www.w3plan.net/
 Author:  W3plan Technologies
 License: GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 This file was created at 2019-12-19 14:51:09 by PlannerFw Preprocessor
*/
var pf5f873182 = {
  run: function(pfDataSet) {
    var __pf19edb768 = "";
    __pf19edb768 +=
      '<!--\r\n  Template for update\r\n   \r\n  Copyright W3plan Technologies <https://www.w3plan.net/>\r\n-->\r\n<img src="';
    __pf19edb768 += pfDataSet.image.src;
    __pf19edb768 += '" alt="MODIS Image 2 of Karina" border="0">\r\n<div>';
    __pf19edb768 += pfDataSet.caption;
    __pf19edb768 += "</div> \r\n ";
    return __pf19edb768.replace(/\\'/g, "'").replace(/\\v/g, "\\'");
  }
};
