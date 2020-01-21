/**
 Name: PlannerFw Template
 Template path: /pf/demo1/demo-en.js
 Template path encoded: pf7ea53175
 Modeldata: JSON or XML
 
 Version: 0.0.1
 Website: https://www.w3plan.net/
 Author:  W3plan Technologies
 License: GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 This file was created at 2020-01-15 16:17:23 by PlannerFw Preprocessor
*/
var pf7ea53175 = {
pff3c4b349: function() {
    return '<!--\n  Section template \n  Copyright W3plan Technologies <https://www.w3plan.net/>\n-->\n\n<head>\n  <meta charset="utf-8">\n  <meta http-equiv="X-UA-Compatible" content="IE=edge">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <meta name="description" content="PlannerFw is a template-path driven, universal content-presenting frontend framework. PlannerFw separates dynamic data from web presentation since the web server">\n  <link href="/css/pf/main.css" rel="stylesheet">\n  <link href="/css/pf/assistant.css" rel="stylesheet">\n  <link href="/css/pf/double-ring.css" rel="stylesheet">\n  \n  <title>PlannerFw Demo</title>\n   \n  <!--\n    Apply PlannerFw Library for page update\n  -->\n  <script src="/app/lib/planner-setting.js"></script>\n  <script src="/app/lib/planner.js"></script>\n</head>\n\n<body>\n  <div class="header">\n    <img src="/img/pf/plannerfw-logo.jpg" style="float:left;padding:1px;margin:15px 15px;" alt="Header image" width="115" height="42" title=" PlannerFw Logo ">\n    \n    <h1>PlannerFw Demo</h1>\n    <h3>The presentation demo</h3>\n  </div>\n'
      .replace(/\\'/g, "'")
      .replace(/\\v/g, "\\'");
  },
pf9111f76a: function() {
return '<!--\n  Section template\n  Copyright W3plan Technologies <https://www.w3plan.net/>\n-->\n\n<div class="topnav">\n  <a href="#" id="tool1" onclick="showHome()">Information</a>\n  <a href="#" id="tool2" onclick="showDcss()">PFCSS</a>\n</div>\n\n<script>\n  function showHome() {\n    document.getElementById("home-content").style.display = "inline";\n    document.getElementById("dynamic-css").style.display = "none";\n    document.getElementById("tool1").style.color = "#ff0";\n    document.getElementById("tool2").style.color = "#fff";\n  }\n  \n  function showDcss() {\n    document.getElementById("home-content").style.display = "none";\n    document.getElementById("dynamic-css").style.display = "inline";\n    document.getElementById("tool1").style.color = "#fff";\n    document.getElementById("tool2").style.color = "#ff0";\n  }\n  \n  setInterval(function() {\n    var today = new Date();\n    document.getElementById("clocktxt").innerHTML = ("0" + today.getHours()).slice(-2) + ":" + ("0" + today.getMinutes()).slice(-2) + ":" + ("0" + today.getSeconds()).slice(-2);\n  }, 1000);\n</script>\n'.replace(/\\'/g, "'").replace(/\\v/g, "\\'");
},
pf7e53c287: function(pfDataSet) {
var __pf19edb768 = "";
__pf19edb768 +=
  '<!--\n  Section template\n  Copyright W3plan Technologies <https://www.w3plan.net/>\n-->\n\n<div class="leftcolumn">\n  <div id="home-content">\n    <div class="card">\n      ';
if (pfDataSet.comment1 && pfDataSet.comment2) {
  __pf19edb768 +=
    "\n        <dl>\n          <dt><strong>Comment one: </strong></dt>\n          <dd>";
  __pf19edb768 += pfDataSet.comment1;
  __pf19edb768 +=
    "</dd>\n          <dt><strong>Comment two: </strong></dt>\n          <dd>";
  __pf19edb768 += pfDataSet.comment2;
  __pf19edb768 += "</dd>\n        </dl> \n        <p>&nbsp;</p>\n      ";
}
__pf19edb768 += " \n      <h3>";
__pf19edb768 += pfDataSet.title;
__pf19edb768 +=
  "</h3>\n      <p>NASA's Terra satellite passed over Hurricane Karina before it weakened to a tropical storm early on August 15 and imagery showed the vertical wind shear was already taking its toll.</p>\n      <p>NASA's Terra satellite passed over Karina on August 14 at 2:40 p.m. EDT when it was still clinging to hurricane status and noticed that wind shear was already having an effect on the storm's structure. The Moderate Resolution Imaging Spectroradiometer or MODIS instrument captured an image that showed that the bulk of Karina's clouds were being pushed to the western side of the storm. That was an indication that vertical wind shear was moderate to strong and it continued weakening the storm.</p>\n      <p>On August 15, Karina continued to experience 20 to 25 knots of easterly vertical wind shear, which has caused the center to become partly exposed on the eastern side of the deep convection (rising air that forms the thunderstorms that make up the tropical storm).</p>\n      <p>A tropical storm has maximum sustained wind speed between 39 and 73 mph. By 5 a.m. EDT (0900 UTC) on August 15, Karina's maximum sustained winds had decreased to 70 mph (110 kph) and the National Hurricane Center expects additional weakening over the next two days.</p>\n      <p>Karina's center was located latitude 17.2 north and longitude 119.1 west, about 715 miles (1,150 km) west-southwest of the southern tip of Baja California, Mexico. Karina was moving toward the west near 12 mph (19 kph) and is expected to turn to the west-northwest. The estimated minimum central pressure is 990 millibars.</p>\n      <p>Wind shear is expected to decrease while Karina moves over sea surface temperatures of near 26C (80F). Tropical cyclones need sea surface temperatures of at least 26C/80F to maintain strength. The National Hurricane Center noted, \"this could allow Karina to re-intensify as forecast by the GFDL and the Navy COAMPS computer forecast models. However, any deviation north of the forecast track would take the system over colder water, which would prevent strengthening.\"</p>\n      <p>&nbsp;</p>\n      <div class=\"fakeimg\" id=\"";
__pf19edb768 += planner.lexicrc32(
  "/pf/demo1/demo-en/rightcolumn/karina-storm.js"
);
__pf19edb768 += '">\n        <img src="';
__pf19edb768 += pfDataSet.image.src;
__pf19edb768 += '" alt="MODIS Image 1 of Karina" border="0">\n        <div>';
__pf19edb768 += pfDataSet.caption;
__pf19edb768 +=
  '</div>\n      </div>\n    </div>\n     \n    <div class="card">\n      <h3>Dynamic data table</h3>\n      <div id="';
__pf19edb768 += planner.lexicrc32(
  "/pf/demo1/demo-en/rightcolumn/french-table.js"
);
__pf19edb768 +=
  '" class="dtable">\n        <table border="1" cellpadding="1" cellspacing="1" width="86%">\n          <caption class="dcap"><strong>User data grid</strong></caption>\n          <tr>\n            <th rowspan="2">City</th>\n            <th colspan="3">Users</th>\n          </tr>\n          <tr> \n            <th>Name</th>\n            <th>Age</th>\n            <th>Education</th>\n          </tr>\n          ';

for (var key in pfDataSet.grid) {
  if (pfDataSet.grid.hasOwnProperty(key)) {
    __pf19edb768 += "\n          <tr>\n            <td>";
    __pf19edb768 += pfDataSet.grid[key].city;
    __pf19edb768 += "</td>\n            <td>";
    __pf19edb768 += pfDataSet.grid[key].name;
    __pf19edb768 += "</td>\n            <td>";
    __pf19edb768 += pfDataSet.grid[key].age;
    __pf19edb768 +=
      '</td>\n            <td>\n              <select name="Education" style="cursor:pointer">\n              ';

    var educations = [
      "No College",
      "Some College",
      "Graduate School",
      "College"
    ];
    for (var i = 0, len = educations.length; i < len; i++) {
      if (
        pfDataSet.grid[key].education.toLowerCase() ==
        educations[i].toLowerCase()
      ) {
        __pf19edb768 +=
          '<option value="' +
          educations[i] +
          '"' +
          " selected>" +
          educations[i] +
          "</option>";
      } else {
        __pf19edb768 +=
          '<option value="' +
          educations[i] +
          '"' +
          ">" +
          educations[i] +
          "</option>";
      }
    }

    __pf19edb768 +=
      "\n              </select>\n            </td>\n          </tr>\n          ";
  }
}

__pf19edb768 +=
  '\n        </table>\n      </div> \n    </div>\n  </div>\n\n  <div id="pfcss-content">\n    <div class="card">\n      <div id="dynamic-css" class="content about-off" style="display: none;">\n        <div class="hoja">PlannerFw</div>\n      </div>\n    </div>\n  </div>\n</div>\n';
return __pf19edb768.replace(/\\'/g, "'").replace(/\\v/g, "\\'");
},
pf576b7802: function(pfDataSet) {
    var __pf19edb768 = "";
    __pf19edb768 +=
      '<!--\n  Section template\n  Copyright W3plan Technologies <https://www.w3plan.net/>\n--> \n<script>\n /**\n  * define data that you want to update with update handler\n  */\n  var upData = [\n                 ["/pf/demo1/demo-en/rightcolumn/karina-storm.js", ""],\n                 ["/pf/demo1/demo-en/rightcolumn/french-table.js", ""]\n               ];\n</script>\n\n<div class="rightcolumn">\n  <div class="card">\n    <div class="clock" id="clocktxt">01:19:15</div>\n  </div>\n   \n  <div class="card">\n    <h3>Dynamic Unordered List</h3>\n    <ul class="ulist">\n    ';

    /**
     * Nested planner tag sample
     * pfDataSet as a parameter from entirety
     *
     */
    for (var i = 0, len = pfDataSet.length; i < len; i++) {
      __pf19edb768 +=
        '<li><a href="#' + pfDataSet[i] + '">' + pfDataSet[i] + "</a></li>";
    }

    __pf19edb768 +=
      '\n    </ul>\n  </div>\n  <div class="card">\n    <h3>DOM Operations</h3>\n    <button id="swft" class="button" onclick="planner.updateSegments(upData)">Update table and image simultaneously</button>\n    <p>&nbsp;</p>\n  </div>\n</div>\n';
    return __pf19edb768.replace(/\\'/g, "'").replace(/\\v/g, "\\'");
  },
pf7f871edb: function() {
    var __pf19edb768 = "";
    __pf19edb768 +=
      '<!--\n  Section template\n  Copyright W3plan Technologies <https://www.w3plan.net/>\n-->\n\n<div class="footer">\n  <nav> \n    <a href="https://www.w3plan.net/customer/general/about" target="_blank"><img src="/img/pf/w3plan-logo.jpg" alt="w3plan" title="w3plan" width="100" height="40"></a>\n    <a href="https://www.w3plan.net" target="_blank"><img src="/img/pf/plannerfw-logo.jpg" alt="PlannerFw" title="PlannerFw" width="100" height="38"></a>\n    <a href="https://github.com/w3plan" target="_blank"><img src="/img/pf/sdjs-logo.jpg" alt="SDJS" title="SDJS" width="70" height="38"></a> \n    <a href="http://ci-wp-pf.com/" target="_blank"><img src="/img/pf/ci-wp-pf_logo.jpg" alt="CI-WP-PF platform" title="CI-WP-PF platform" width="100" height="38"></a>\n    <a href="http://phpfiddle.org/" target="_blank"><img src="/img/pf/phpfiddle.png" title="PhpFiddle" alt="PhpFiddle" width="100" height="40"></a>\n  </nav>\n  <div class="cprt">\n    (C) Copyright 2015 - ';
    __pf19edb768 += new Date().getFullYear();
    __pf19edb768 += " by W3plan Technologies\n  </div>\n</div>\n</body>\n";
    return __pf19edb768.replace(/\\'/g, "'").replace(/\\v/g, "\\'");
  },
run: function(pfDataSet) {
    var __pf19edb768 = "";
    __pf19edb768 +=
      "<!DOCTYPE html>\n<html>\n  <!--\n    Source page template \n    Copyright W3plan Technologies <https://www.w3plan.net/>\n  -->\n  \n  ";
    __pf19edb768 +=
      /**
       * include header section
       */
      this.pff3c4b349();
    __pf19edb768 += "\n  \n  ";
    __pf19edb768 +=
      /**
       * include navimenu section
       */
      this.pf9111f76a();
    __pf19edb768 += '\n   \n  <div class="row">    \n    ';
    __pf19edb768 +=
      /**
       * include leftcolumn section
       */
      this.pf7e53c287(pfDataSet);
    __pf19edb768 += "\n    \n    ";
    __pf19edb768 +=
      /**
       * include rightcolumn section
       */
      this.pf576b7802(pfDataSet.imageType);
    __pf19edb768 += "\n  </div>\n  \n  ";
    __pf19edb768 +=
      /**
       * include footer section
       */
      this.pf7f871edb();
    __pf19edb768 += "\n</html>\n";
    return __pf19edb768.replace(/\\'/g, "'").replace(/\\v/g, "\\'");
  }
};