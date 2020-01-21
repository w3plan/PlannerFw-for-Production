/**
 Name: PlannerFw Template
 Template path: /main/pub/index.js
 Template path encoded: pf524297a5
 Modeldata: JSON or XML
 
 Version: 0.0.1
 Website: https://www.w3plan.net/
 Author:  W3plan Technologies
 License: GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 This file was created at 2019-12-12 15:08:35 by PlannerFw Preprocessor
*/
var pf524297a5 = {
  run: function() {
    return '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <meta http-equiv="X-UA-Compatible" content="IE=edge">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <link href="/css/pf/main.css" rel="stylesheet">\n  <title>Site Home</title>\n  <!-- \n      Copyright W3plan Technologies <https://www.w3plan.net/> \n  -->\n  <style>\n    .cardbg  { \n      background-image: url(\'/img/pf/home-bg.jpg\');\n      background-size: cover;\n      background-repeat: no-repeat;\n      background-position: left top;\n      height:920px;\n      margin-top: 15px;\n      margin-bottom: 15px;\n    }\n    .cardbg:hover {\n      -webkit-transform: scale(1.15);\n      -ms-transform: scale(1.15);\n      transform: scale(1.15);\n    }\n    .footer {\n      height:160px;\n    }\n    .cprt {\n      margin-top: 100px;\n      text-align: right;\n    }\n  </style>\n</head>\n\n<body>\n<div class="header">  \n  <h1> A PlannerFw Site </h1>\n  <h3>&nbsp;</h3>\n</div>\n\n<div class="topnav">\n  <a href="#">Home</a>\n  <a href="#">About</a>\n</div>\n\n<div class="row">\n  <div class="leftcolumn" style="width:100%;">\n    <div class="cardbg">      \n    </div>\n  </div>\n</div>\n\n<div class="footer">\n  <nav></nav>\n  <div class="cprt">\n    Copyright © 2015-<span id="cprtyear"></span><script>document.getElementById("cprtyear").innerHTML = new Date().getFullYear()</script> <a href="https://www.w3plan.net/" target="_blank"><img style="margin:auto 10px; vertical-align: middle;" src="/img/pf/w3plan-logo-small.png" width="24" height="24" alt="W3plan Logo">W3plan Technologies</a>\n  </div>\n</div>\n</body>\n</html>\n'
      .replace(/\\'/g, "'")
      .replace(/\\v/g, "\\'");
  }
};
