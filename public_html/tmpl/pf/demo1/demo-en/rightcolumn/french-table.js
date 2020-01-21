/**
 Name: PlannerFw Template
 Template path: /pf/demo1/demo-en/rightcolumn/french-table.js
 Template path encoded: pf5e176aff
 Modeldata: JSON or XML
 
 Version: 0.0.1
 Website: https://www.w3plan.net/
 Author:  W3plan Technologies
 License: GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 This file was created at 2019-12-19 14:50:54 by PlannerFw Preprocessor
*/
var pf5e176aff = {
  run: function(pfDataSet) {
    var __pf19edb768 = "";
    __pf19edb768 +=
      '<!--\r\n  Template for update \r\n   \r\n  Copyright W3plan Technologies <https://www.w3plan.net/>\r\n-->\r\n<table border="1" cellpadding="1" cellspacing="1" width="86%"> \r\n<caption class="dcap"><strong>Grille de donnees utilisateur - French</strong></caption>\r\n  <tr>\r\n    <th rowspan="2">Ville</th>\r\n    <th colspan="3">Utilisateurs</th>\r\n  </tr>\r\n  <tr> \r\n    <th>Nom</th>\r\n    <th>Age</th>\r\n    <th>Education</th>\r\n  </tr>\r\n';

    /**
     * parse pfDataSet that will be got from the web server
     */
    for (var key in pfDataSet.grid) {
      if (pfDataSet.grid.hasOwnProperty(key)) {
        __pf19edb768 += "\r\n  <tr>\r\n    <td>";
        __pf19edb768 += pfDataSet.grid[key].city;
        __pf19edb768 += "</td> \r\n    <td>";
        __pf19edb768 += pfDataSet.grid[key].name;
        __pf19edb768 += "</td> \r\n    <td>";
        __pf19edb768 += pfDataSet.grid[key].age;
        __pf19edb768 +=
          '</td> \r\n    <td>\r\n      <select name="Education" style="cursor:pointer"> \r\n      ';

        var educations = [
          "Pas de college",
          "Un college",
          "Lycee",
          "Universite"
        ];
        for (var i = 0, len = educations.length; i < len; i++) {
          if (
            pfDataSet.grid[key].education.toLowerCase() ==
            educations[i].toLowerCase()
          ) {
            __pf19edb768 +=
              '<option value="' +
              educations[i] +
              '" selected>' +
              educations[i] +
              "</option>";
          } else {
            __pf19edb768 +=
              '<option value="' +
              educations[i] +
              '">' +
              educations[i] +
              "</option>";
          }
        }

        __pf19edb768 += "\r\n      </select>\r\n    </td>\r\n  </tr> \r\n";
      }
    }

    __pf19edb768 += "\r\n</table>\r\n";
    return __pf19edb768.replace(/\\'/g, "'").replace(/\\v/g, "\\'");
  }
};
